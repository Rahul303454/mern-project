const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
const purchaseRoutes = require("./routes/purchaseRoutes");

const app = express();

const corsOptions = {
  origin: "https://mern-project-d6f1kiblf-rahulk49855-2371s-projects.vercel.app",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/purchase", purchaseRoutes);

app.get("/", (req, res) => {
  res.send("Course Management API Running");
});

module.exports = app;