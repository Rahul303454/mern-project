import React, { useEffect, useState } from "react";
import API from "../services/api";

function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchPurchasedCourses();
  }, []);

  const fetchPurchasedCourses = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/purchase/user/${userId}`);

      // 🔹 Map to get course objects, deleted courses already filtered by backend
      setCourses(res.data.purchases.map(p => p.courseId));
      setLoading(false);
    } catch (error) {
      console.error(
        "Fetch Purchased Courses Error:",
        error.response?.data || error.message
      );
      setLoading(false);
      alert("Failed to fetch your courses.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">My Courses</h2>

        {loading ? (
          <p className="text-gray-600">Loading your courses...</p>
        ) : courses.length === 0 ? (
          <p className="text-gray-600 italic">
            You haven't purchased any courses yet.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course._id}
                className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition"
              >
                <h4 className="text-lg font-bold text-gray-800 mb-2">
                  {course.title}
                </h4>
                <p className="text-gray-600 mb-3">{course.description}</p>
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Instructor:</span> {course.instructor}
                </p>
                <p className="text-sm text-gray-700 mb-4">
                  <span className="font-semibold">Duration:</span> {course.duration}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyCourses;