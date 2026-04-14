const Purchase = require("../models/Purchase");

// PURCHASE COURSE
exports.purchaseCourse = async (req, res) => {

  try {

    const { userId, courseId } = req.body;

    const purchase = new Purchase({
      userId,
      courseId
    });

    await purchase.save();

    res.status(201).json({
      message: "Course purchased successfully",
      purchase
    });

  } catch (error) {

    res.status(500).json({
      message: "Purchase failed",
      error: error.message
    });

  }

};