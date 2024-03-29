const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    admin: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const employees = mongoose.model("employees", employeeSchema);
module.exports = employees;
