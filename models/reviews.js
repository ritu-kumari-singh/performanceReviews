const mongoose = require("mongoose");

const reviewsSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "employees",
      required: true,
    },
    feedback: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "feedbacks",
      },
    ],
    assigned: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "employees",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const reviews = mongoose.model("reviews", reviewsSchema);
module.exports = reviews;
