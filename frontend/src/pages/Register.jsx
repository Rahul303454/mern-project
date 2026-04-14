import React, { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", { name, email, password, role: "user" });

      alert("Registration successful! Please login to continue.");

      navigate("/login");
    } catch (err) {
      alert("Registration failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md transform transition duration-500 hover:scale-105">

        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition"
          />

          <button
            type="submit"
            className="w-full bg-purple-500 text-white py-3 rounded-xl font-semibold hover:bg-purple-600 transition-colors transform hover:scale-105 shadow-lg"
          >
            Register
          </button>

        </form>

        <p className="mt-6 text-center text-gray-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-purple-600 font-medium hover:underline"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;