import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Outlet, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
const Profile = () => {
  const navigate = useNavigate();
 const { user, loading,deleteAccount,logout } = useContext(AuthContext);

 
console.log("this is user=>>>>>>",user)
  if (loading) return <div className="text-center mt-20">Loading...</div>;
  if (!user) return <div className="text-center mt-20 text-red-500">User not found</div>;

  // Delete user function
  const handleDelete = async() => {
    deleteAccount();
      navigate("/register"); // Navigation happens in component, not context

  };

  const location = useLocation();
  const isUpdateProfile = location.pathname.includes('/profile/update');
// Logout function inside Profile component
const handleLogout = async () => {
  await logout();        // clears user data
  navigate("/login");    // redirect to login page
};

  return (
    <div
      className={`flex min-h-[80vh] from-blue-50 px-2
        ${isUpdateProfile
          ? 'flex-col items-center justify-center gap-6 sm:flex-row sm:items-center sm:justify-center'
          : 'flex-col items-center justify-center'}
      `}
    >
  {/* Profile Card */}
  <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 sm:p-8 flex flex-col items-center relative mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute left-4 top-4 flex items-center gap-2 px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all shadow"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        {/* Avatar */}
        <img
          src="https://i.pinimg.com/736x/d5/07/49/d50749f9c34b1ba48297e5a724577392.jpg"
          alt="User Avatar"
          className="w-24 h-24 rounded-full mb-4 border-4 border-blue-500 shadow-lg object-cover"
        />

        {/* User Info */}
     <h2 className="text-2xl sm:text-3xl font-bold mb-1 text-blue-700 dark:text-blue-300 text-center">
  {`${user.fullName?.firstName || ""} ${user.fullName?.lastName || ""}`}
</h2>
<p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 mb-4 text-center">
  {user.email || ""}
</p>

        {/* Edit Button */}
        <button onClick={()=>navigate('/profile/update')} className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg mb-3">
          Edit Profile
        </button>

        {/* Logout Button */}
        <div className='flex justify-between gap-4'>
          <button
            className="px-6 py-2 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-200 transition-all shadow-lg"
           onClick={handleLogout}
          >
            Logout
          </button>
          {/* Delete Account Button */}
         <button
  className="px-6 py-2 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-200 transition-all shadow-lg"
  onClick={ handleDelete}
>
  Delete Account
</button>

        </div>
      </div>
      {/* Outlet for UpdateProfile */}
      {isUpdateProfile && (
        <div className="w-full max-w-md mx-auto mt-6 sm:mt-0">
          <Outlet />
        </div>
      )}
    </div>
  );
};

export default Profile;
