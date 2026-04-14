import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";

// Admin Pages
import AddCourse from "./pages/AddCourse";
import ManageCourses from "./pages/ManageCourses";

import AdminPurchases from "./pages/AdminPurchases";

import Navbar from "./components/Navbar";

import { AuthProvider, AuthContext } from "./context/AuthContext";
import MyCourses from "./pages/MyCourses";

// PrivateRoute Component for role-based protection
const PrivateRoute = ({ children, roles }) => {
  const { user } = React.useContext(AuthContext);

  if (!user || !user.token) {
    // Not logged in
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(user.role)) {
    // Role not authorized
    return <Navigate to="/login" />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User Dashboard & Courses */}
        <Route
          path="/user"
          element={
            <PrivateRoute roles={["user"]}>
              <UserDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/courses"
          element={
            <PrivateRoute roles={["user"]}>
              <UserDashboard />
            </PrivateRoute>
          }
        />

        {/* Admin Dashboard */}
        <Route
          path="/admin"
          element={
            <PrivateRoute roles={["admin"]}>
              <AdminDashboard />
            </PrivateRoute>
          }
        />

        {/* Admin - Add Course */}
        <Route
          path="/admin/add"
          element={
            <PrivateRoute roles={["admin"]}>
              <AddCourse />
            </PrivateRoute>
          }
        />

        {/* Admin - Manage Courses */}
        <Route
          path="/admin/manage"
          element={
            <PrivateRoute roles={["admin"]}>
              <ManageCourses />
            </PrivateRoute>
          }
        />

        {/* Admin - Purchased Courses */}
        <Route
          path="/admin/purchases"
          element={
            <PrivateRoute roles={["admin"]}>
              <AdminPurchases />
            </PrivateRoute>
          }
        />

        // User My Courses Route
        <Route
          path="/my-courses"
          element={
            <PrivateRoute roles={["user"]}>
              <MyCourses />
            </PrivateRoute>
          }
        />
        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;

