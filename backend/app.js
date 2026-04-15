const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
const purchaseRoutes = require("./routes/purchaseRoutes");

const app = express();

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://mern-project-tau-eosin.vercel.app"
  ],
  credentials: true,
};

app.use(cors(corsOptions));

// IMPORTANT for preflight requests
app.options(/.*/, cors(corsOptions));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/purchase", purchaseRoutes);

app.get("/", (req, res) => {
  res.send("Course Management API Running");
});

module.exports = app;