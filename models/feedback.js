const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const feedbacks = mongoose.model("feedbacks", feedbackSchema);
module.exports = feedbacks;
