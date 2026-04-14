import React from "react";
import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        
        {/* Page Title */}
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Admin Dashboard
        </h2>

        {/* Welcome Card */}
        <div className="bg-white shadow-lg rounded-xl p-6 mb-6">
          <h3 className="text-xl font-semibold text-purple-600 mb-2">
            Welcome Admin 👋
          </h3>
          <p className="text-gray-600">
            Manage courses and monitor the platform using the tools below.
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          
          {/* Add Courses */}
          <Link to="/admin/add">
            <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition cursor-pointer">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                Add Courses
              </h4>
              <p className="text-gray-600">
                Create new courses and make them available to students.
              </p>
            </div>
          </Link>

          {/* Manage Courses */}
          <Link to="/admin/manage">
            <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition cursor-pointer">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                Manage Courses
              </h4>
              <p className="text-gray-600">
                Update or delete existing courses from the platform.
              </p>
            </div>
          </Link>

          {/* Purchased Courses */}
          <Link to="/admin/purchases">
            <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition cursor-pointer">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                Purchased Courses
              </h4>
              <p className="text-gray-600">
                View which users purchased which courses.
              </p>
            </div>
          </Link>

        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;
