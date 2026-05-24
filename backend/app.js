const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
const purchaseRoutes = require("./routes/purchaseRoutes");

const app = express();

// CORS Configuration
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// Handle preflight requests
app.options(/.*/, cors());

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/purchase", purchaseRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Course Management API Running");
});

module.exports = app;