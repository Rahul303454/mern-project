import React, { useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", { email, password });

      const data = {
        token: res.data.token,
        role: res.data.role,
        userId: res.data.userId, // 👈 add
      };

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("userId", data.userId); // 👈 add

      login(data);

      if (data.role === "admin") navigate("/admin");
      else navigate("/user");
    } catch (err) {
      console.error("Login Error:", err.response?.data || err.message);

      alert(
        err.response?.data?.message || "Login Failed. Check email/password."
      );
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md transform transition duration-500 hover:scale-105">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition"
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-500 text-white py-3 rounded-xl font-semibold hover:bg-purple-600 transition-colors transform hover:scale-105 shadow-lg"
          >
            Login
          </button>
        </form>

        {/* Register Redirect */}
        <p className="mt-6 text-center text-gray-500">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-purple-600 font-medium hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
