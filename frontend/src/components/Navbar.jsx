import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <div className="text-2xl font-bold text-purple-600">
        <Link to="/">CourseMgmt</Link>
      </div>

      {/* Links */}
      <div className="flex items-center space-x-4">
        {user && user.token ? (
          <>
            {/* USER LINKS */}
            {user.role === "user" && (
              <>
                <Link
                  to="/user"
                  className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
                >
                  Home
                </Link>

                {/* 🔹 My Courses Link */}
                <Link
                  to="/my-courses"
                  className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
                >
                  My Courses
                </Link>
              </>
            )}

            {/* ADMIN LINKS */}
            {user.role === "admin" && (
              <>
                <Link
                  to="/admin"
                  className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  to="/admin/add"
                  className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
                >
                  Add Course
                </Link>
                <Link
                  to="/admin/manage"
                  className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
                >
                  Manage Courses
                </Link>
              </>
            )}

            {/* LOGOUT BUTTON */}
            <button
              onClick={handleLogout}
              className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors font-semibold"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;