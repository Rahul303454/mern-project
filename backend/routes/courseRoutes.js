const express = require('express');
const router = express.Router();

const Course = require('../models/Course');
const authMiddleware = require('../middleware/authMiddleware');

// =======================
// GET all courses (User + Admin)
// =======================
router.get('/', async (req, res) => {
  try {
    // 🔹 only fetch non-deleted courses
    const courses = await Course.find({ isDeleted: false });

    res.status(200).json({
      message: "Courses fetched successfully",
      courses
    });

  } catch (error) {
    console.error("Fetch Courses Error:", error);
    res.status(500).json({
      message: "Server Error"
    });
  }
});

// =======================
// ADD course (Admin only)
// =======================
router.post('/', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access Denied" });
    }

    const { title, description, instructor, duration } = req.body;

    const course = new Course({ title, description, instructor, duration });

    await course.save();

    res.status(201).json({
      message: "Course added successfully",
      course
    });

  } catch (error) {
    console.error("Add Course Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// =======================
// UPDATE course (Admin only)
// =======================
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access Denied" });
    }

    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.status(200).json({
      message: "Course updated successfully",
      course
    });

  } catch (error) {
    console.error("Update Course Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// =======================
// DELETE course (Admin only - Soft Delete)
// =======================
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access Denied" });
    }

    // 🔹 soft delete instead of hard delete
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({
      message: "Course deleted successfully (soft delete)"
    });

  } catch (error) {
    console.error("Delete Course Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;