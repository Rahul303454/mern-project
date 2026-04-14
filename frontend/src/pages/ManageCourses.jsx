import React, { useEffect, useState } from "react";
import { getCourses, updateCourse, deleteCourse } from "../services/courseService";

function ManageCourses() {
  const [courses, setCourses] = useState([]);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    instructor: "",
    duration: "",
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await getCourses();
      setCourses(res.data.courses);
    } catch (err) {
      alert("Error fetching courses");
    }
  };

  const handleEdit = (course) => {
    setEditId(course._id);
    setForm({
      title: course.title,
      description: course.description,
      instructor: course.instructor,
      duration: course.duration,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateCourse(editId, form);
      alert("Course updated!");
      setEditId(null);
      setForm({ title: "", description: "", instructor: "", duration: "" });
      fetchCourses();
    } catch (err) {
      alert("Error updating course");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this course?");
    if (!confirmDelete) return;

    try {
      await deleteCourse(id);
      alert("Course deleted!");
      fetchCourses();
    } catch (err) {
      alert("Error deleting course");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">

        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Manage Courses
        </h2>

        {/* Update Course Form */}
        {editId && (
          <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
            <h3 className="text-xl font-semibold mb-4 text-purple-600">
              Update Course
            </h3>

            <form onSubmit={handleUpdate} className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Title"
                className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500"
              />

              <input
                type="text"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Description"
                className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500"
              />

              <input
                type="text"
                name="instructor"
                value={form.instructor}
                onChange={handleChange}
                placeholder="Instructor"
                className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500"
              />

              <input
                type="text"
                name="duration"
                value={form.duration}
                onChange={handleChange}
                placeholder="Duration"
                className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500"
              />

              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Course List */}
        {courses.length === 0 ? (
          <p className="italic text-gray-600">No courses available</p>
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

                <p className="text-gray-600 mb-2">{course.description}</p>

                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Instructor:</span>{" "}
                  {course.instructor}
                </p>

                <p className="text-sm text-gray-700 mb-4">
                  <span className="font-semibold">Duration:</span>{" "}
                  {course.duration}
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleEdit(course)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(course._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageCourses;