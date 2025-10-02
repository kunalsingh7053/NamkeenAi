
import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
const Register = () => {
  const { registerUser} = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
 
 const onSubmit = async (data) => {
  const result = await registerUser(data); // call context

  if (result.success) {
    navigate("/"); // successful registration
  } else if (result.message && result.message.includes("User already exists")) {
    toast.error("User already exists! Redirecting to login...");
    navigate("/login"); // navigate here
  }
};

  return (
    <div className="flex items-center justify-center w-full min-h-[80vh] bg-white from-indigo-50 via-white to-blue-50">
      <form
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 space-y-8 border border-gray-100"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-3xl font-extrabold text-center text-indigo-700 mb-6 tracking-tight">Create Account</h2>
        <div className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-base font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              id="email"
              {...register("email", { required: "Email is required" })}
              className="mt-1 block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 text-lg"
            />
            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
          </div>
          <div className="flex gap-4">
            <div className="w-1/2">
              <label htmlFor="firstName" className="block text-base font-medium text-gray-700 mb-1">First Name</label>
              <input
                type="text"
                id="firstName"
                {...register("firstName", { required: "First name is required" })}
                className="mt-1 block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 text-lg"
              />
              {errors.firstName && <span className="text-red-500 text-sm">{errors.firstName.message}</span>}
            </div>
            <div className="w-1/2">
              <label htmlFor="lastName" className="block text-base font-medium text-gray-700 mb-1">Last Name</label>
              <input
                type="text"
                id="lastName"
                {...register("lastName", { required: "Last name is required" })}
                className="mt-1 block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 text-lg"
              />
              {errors.lastName && <span className="text-red-500 text-sm">{errors.lastName.message}</span>}
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-base font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              id="password"
              {...register("password", { required: "Password is required" })}
              className="mt-1 block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 text-lg"
            />
            {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-3 px-6 bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold rounded-xl shadow-lg hover:from-indigo-600 hover:to-blue-600 transition-all text-lg mt-4"
        >
          Register
        </button>
        <div className="text-center mt-6">
          <span className="text-base">Already have an account? </span>
          <a href="/login" className="text-indigo-600 hover:underline font-semibold">Sign in</a>
        </div>
      </form>
    </div>
  ); 
};

export default Register;
