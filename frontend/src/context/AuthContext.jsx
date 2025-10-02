import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Auto fetch profile on app load
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/auth/profile", {
          withCredentials: true,
        });
        setUser(res.data); // user profile save once
        
      } catch (err) {
        setUser(null); // agar login nahi hai

      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);


 // Register function (no navigate here!)
 const registerUser = async (data) => {
  setLoading(true);
  setError(null);

  try {
    const res = await axios.post(
      "http://localhost:3000/api/auth/register",
      {
        email: data.email,
        fullName: { firstName: data.firstName, lastName: data.lastName },
        password: data.password,
      },
      { withCredentials: true }
    );

    console.log("Registration response:", res.data);
    setUser(res.data.user); // save user after registration
    toast.success("Registration successful!");
    return { success: true };
  } catch (err) {
    // Ensure message is always a string
    const message =
      (err.response?.data?.message || err.response?.data || "Something went wrong!") + "";

    setError(message);
    toast.error(message);

    return { success: false, message }; // return string message
  } finally {
    setLoading(false);
  }
};



  // ✅ Login function
  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.post(
        "http://localhost:3000/api/auth/login",
        { email, password },
        { withCredentials: true }
      );
     
      setUser(res.data.user); // login ke baad user set
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ✅ Logout function
  const logout = async () => {
    try {
      await axios.post("http://localhost:3000/api/auth/logout", {}, { withCredentials: true });
      setUser(null);

    } catch (err) {
      console.log(err);
    }
  };

  const deleteAccount = async () => {

 if (window.confirm("Are you sure you want to delete your account?")) {
      axios.delete("http://localhost:3000/api/auth/profile", { withCredentials: true })
        .then(() => {
          alert("User deleted successfully!");
                  setUser(null);
        })
        .catch(err => console.log(err));
    }

  }
    // ✅ Update profile function
  const updateProfile = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.patch(
        "http://localhost:3000/api/auth/profile/update",
        data,
        { withCredentials: true }
      );
      // Update user in context
      setUser({
        ...user,
        fullName: {
          firstName: res.data.user.fullName.split(" ")[0],
          lastName: res.data.user.fullName.split(" ")[1] || "",
        },
      });
      toast.success(res.data.message || "Profile updated successfully!");
      return { success: true, user: res.data.user };
    } catch (err) {
      const message =
        (err.response?.data?.message || err.response?.data || "Update failed!") + "";
      setError(message);
      toast.error(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };


  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout,deleteAccount,registerUser,updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
