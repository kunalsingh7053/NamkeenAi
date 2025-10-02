import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div className="text-center mt-20">Loading...</div>;

  if (!user) return <Navigate to="/login" replace />; // redirect if not logged in

  return children; // render protected route
};

export default PrivateRoute;
