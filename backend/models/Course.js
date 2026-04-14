const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  instructor: {
    type: String,
    required: true
  },

  duration: {
    type: String,
    required: true
  },

  isDeleted: {            // 🔹 soft delete flag
    type: Boolean,
    default: false
  }

}, { timestamps: true });

module.exports = mongoose.model("Course", courseSchema);