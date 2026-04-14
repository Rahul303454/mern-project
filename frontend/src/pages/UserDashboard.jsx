
import React, { useEffect, useState } from "react";
import { getCourses } from "../services/courseService";
import API from "../services/api";

function UserDashboard() {

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {

      setLoading(true);

      const res = await getCourses();

      console.log("Courses Response:", res.data);

      setCourses(res.data.courses);

      setLoading(false);

    } catch (error) {

      console.error("Fetch Courses Error:", error.response?.data || error.message);

      setLoading(false);

      alert("Failed to fetch courses.");

    }
  };

  // =========================
  // PURCHASE COURSE
  // =========================
  const purchaseCourse = async (courseId) => {

    try {

      const userId = localStorage.getItem("userId");

      console.log("UserId:", userId);
      console.log("CourseId:", courseId);

      if (!userId || !courseId) {
        alert("UserId or CourseId missing!");
        return;
      }

      const res = await API.post("/purchase", {
        userId,
        courseId
      });

      console.log("Purchase Response:", res.data);

      alert("Course purchased successfully!");

    } catch (error) {

      console.error("Purchase Error:", error.response?.data || error.message);

      alert(error.response?.data?.message || "Failed to purchase course.");

    }

  };

  return (

    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-6xl mx-auto">

        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          User Dashboard
        </h2>

        <h3 className="text-xl font-semibold text-purple-600 mb-4">
          Available Courses
        </h3>

        {loading ? (
          <p className="text-gray-600">Loading courses...</p>
        ) : courses.length === 0 ? (
          <p className="text-gray-600 italic">No courses available.</p>
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

                <p className="text-gray-600 mb-3">
                  {course.description}
                </p>

                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Instructor:</span>{" "}
                  {course.instructor}
                </p>

                <p className="text-sm text-gray-700 mb-4">
                  <span className="font-semibold">Duration:</span>{" "}
                  {course.duration}
                </p>

                <button
                  onClick={() => purchaseCourse(course._id)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                >
                  Purchase Course
                </button>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  );

}

export default UserDashboard;

