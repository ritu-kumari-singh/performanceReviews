const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");
const reviewController = require("../controllers/reviewController");
const passport = require("passport");

//use passport as a middleware to authenticate
router.post(
  "/update_employee",
  passport.checkAuthentication,
  employeeController.update_employee
);
router.post(
  "/delete_employee",
  passport.checkAuthentication,
  employeeController.delete_employee
);
router.post(
  "/create_employee",
  passport.checkAuthentication,
  employeeController.create_employee
);
router.post(
  "/assign_review",
  passport.checkAuthentication,
  reviewController.assign_review
);
module.exports = router;
