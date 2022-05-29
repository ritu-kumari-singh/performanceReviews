const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const employeeController = require("../controllers/employeeController");
const passport = require("passport");

router.get("/signIn", userController.signIn);
router.get("/signUp", userController.signUp);
//use passport as a middleware to authenticate
router.get(
  "/adminDashboard",
  passport.checkAuthentication,
  userController.adminDashboard
);
router.get(
  "/employeeDashboard",
  passport.checkAuthentication,
  userController.employeeDashboard
);
router.post(
  "/employeeDashboard/submit_feedback",
  passport.checkAuthentication,
  employeeController.submitFeedback
);
router.get("/signOut", userController.destroySession);
router.get(
  "/employees",
  passport.checkAuthentication,
  userController.employees
);
router.get(
  "/performanceReviews",
  passport.checkAuthentication,
  userController.reviews
);
router.post("/create", userController.create);

router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/users/signIn" }),
  userController.create_session
);
router.use("/employees", require("./employees"));
router.use("/reviews", require("./reviews"));
module.exports = router;
