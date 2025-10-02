import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import PageNotFound from "../pages/PageNotFound";
import Profile from "../pages/Profile";
import UpdateProfile from "../pages/UpdateProfile";
import PrivateRoute from "./PrivateRoute";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* ✅ Public Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* ✅ Protected Routes */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        >
          <Route
            path="update"
            element={
              <PrivateRoute>
                <UpdateProfile />
              </PrivateRoute>
            }
          />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
