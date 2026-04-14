const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const purchaseRoutes = require('./routes/purchaseRoutes'); // added

const app = express();

app.use(cors({
  origin: "https://mern-project-qie26haah-rahulk49855-2371s-projects.vercel.app"
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/purchase', purchaseRoutes); // added

app.get('/', (req, res) => {
  res.send("Course Management API Running");
});

module.exports = app;