
import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
const Login = () => {

  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login,error } = useContext(AuthContext);  

  const onSubmit = async(data) => {
    console.log(data);

      try {
         await login(data.email,data.password);
 toast.success("Login successful!");
      navigate("/");
      } catch (err) {
              toast.error(err.response?.data?.message || "Login failed");

      }
 
  };

  return (
    <div className="flex items-center justify-center w-full min-h-[80vh] bg-white from-blue-50 via-white to-indigo-50">
      <form
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 space-y-8 border border-gray-100"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-6 tracking-tight">Sign In</h2>
        <div className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-base font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              {...register("email", { required: "Email is required" })}
              className="mt-1 block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email.message}</span>
            )}

          </div>
          <div>
            <label htmlFor="password" className="block text-base font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              {...register("password", { required: "Password is required" })}
              className="mt-1 block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
            />
            {errors.password && (
              <span className="text-red-500 text-sm">{errors.password.message}</span>
            )}
          </div>
        </div>
        {error && <div className="text-red-500 text-center">{error}</div>}
        <button
          type="submit"
          className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold rounded-xl shadow-lg hover:from-blue-600 hover:to-indigo-600 transition-all text-lg mt-4"
        >
          Login
        </button>
        <div className="text-center mt-6">
          <span className="text-base">Don't have an account? </span>
          <a href="/register" className="text-blue-600 hover:underline font-semibold">Create one</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
