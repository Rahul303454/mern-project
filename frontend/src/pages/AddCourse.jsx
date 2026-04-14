import React, { useState } from "react";
import { addCourse } from "../services/courseService";

function AddCourse() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    instructor: "",
    duration: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addCourse(form);
      alert("Course added successfully!");
      setForm({ title: "", description: "", instructor: "", duration: "" });
    } catch (err) {
      alert("Error adding course");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-lg">
        
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Add New Course
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="title"
            placeholder="Course Title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />

          <input
            type="text"
            name="description"
            placeholder="Course Description"
            value={form.description}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />

          <input
            type="text"
            name="instructor"
            placeholder="Instructor Name"
            value={form.instructor}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />

          <input
            type="text"
            name="duration"
            placeholder="Course Duration (e.g. 4 weeks)"
            value={form.duration}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition"
          >
            Add Course
          </button>

        </form>

      </div>
    </div>
  );
}

export default AddCourse;