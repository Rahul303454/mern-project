const express = require("express");
const router = express.Router();

const Purchase = require("../models/Purchase");
const Course = require("../models/Course");

// =======================
// PURCHASE COURSE
// =======================
router.post("/", async (req, res) => {
  try {
    const { userId, courseId } = req.body;
    if (!userId || !courseId) {
      return res.status(400).json({ message: "UserId and CourseId required" });
    }

    const existingPurchase = await Purchase.findOne({ userId, courseId });
    if (existingPurchase) {
      return res.status(400).json({ message: "Course already purchased" });
    }

    const purchase = new Purchase({ userId, courseId });
    await purchase.save();

    res.status(201).json({ message: "Course purchased successfully", purchase });
  } catch (error) {
    console.error("Purchase Error:", error);
    res.status(500).json({ message: "Purchase failed" });
  }
});

// =======================
// GET ALL PURCHASES (ADMIN)
// =======================
router.get("/", async (req, res) => {
  try {
    const purchases = await Purchase.find()
      .populate("userId", "name email")
      .populate("courseId", "title");

    res.status(200).json({ purchases });
  } catch (error) {
    console.error("Fetch Purchases Error:", error);
    res.status(500).json({ message: "Failed to fetch purchases" });
  }
});

// =======================
// GET USER PURCHASED COURSES (filtered by non-deleted courses)
// =======================
router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const purchases = await Purchase.find({ userId }).populate({
      path: "courseId",
      match: { isDeleted: false }, // 🔹 only non-deleted courses
      select: "title description instructor duration"
    });

    // filter out any purchases where course was deleted
    const validPurchases = purchases.filter(p => p.courseId);

    res.status(200).json({ purchases: validPurchases });
  } catch (error) {
    console.error("Fetch User Purchases Error:", error);
    res.status(500).json({ message: "Failed to fetch user purchases" });
  }
});

module.exports = router;