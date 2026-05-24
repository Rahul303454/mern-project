const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
const purchaseRoutes = require("./routes/purchaseRoutes");

const app = express();

// CORS Configuration
const allowedOrigins = [
  "http://localhost:3000",
  "https://mern-project-tau-eosin.vercel.app",
  "https://mern-project-5lnq1yfx8-rahulk49855-2371s-projects.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Handle preflight requests
app.options("*", cors());

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