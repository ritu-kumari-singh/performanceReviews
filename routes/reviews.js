const express = require("express");
const router = express.Router();
const passport = require("passport");
const reviewController = require("../controllers/reviewController");

//use passport as a middleware to authenticate
router.post(
  "/create_review",
  passport.checkAuthentication,
  reviewController.create_review
);
router.post(
  "/assign_review",
  passport.checkAuthentication,
  reviewController.assign_review
);
module.exports = router;
