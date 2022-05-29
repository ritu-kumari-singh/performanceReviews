const employees = require("../models/employees");
const reviews = require("../models/reviews");

module.exports.signIn = function (req, res) {
  //if user is already signed in redirect to dashboard
  if (req.isAuthenticated()) {
    if (res.locals.employee && res.locals.employee.admin) {
      return res.redirect("/users/adminDashboard");
    } else {
      return res.redirect("/users/employeeDashboard");
    }
  }
  return res.render("signIn", {
    title: "Sign In : ABC Company",
  });
};

module.exports.signUp = function (req, res) {
  //if user is already signed in redirect to dashboard
  if (req.isAuthenticated()) {
    if (res.locals.employee && res.locals.employee.admin) {
      return res.redirect("/users/adminDashboard");
    } else {
      return res.redirect("/users/employeeDashboard");
    }
  }
  return res.render("signUp", {
    title: "Sign Up : ABC Company",
  });
};

//Handle new user signup
module.exports.create = function (req, res) {
  if (req.body.confirm_password != req.body.password) {
    req.flash("error", "Passwords do not match.");
    return res.redirect("back");
  }
  employees.findOne({ email: req.body.email }, function (err, employee) {
    if (err) {
      console.log(`Error querying the database : ${err}`);
      return;
    }
    if (!employee) {
      req.body.admin = false;
      employees.create(req.body, function (err, employee) {
        if (err) {
          console.log(`Error creating entry in the database : ${err}`);
          return;
        } else {
          req.flash("success", "Registration Successful");
          return res.redirect("/users/signIn");
        }
      });
    } else {
      console.log(employee);
      req.flash(
        "error",
        "Email already exists! Try signing in or use another email"
      );
      return res.redirect("back");
    }
  });
};

//Open admin page if user is an admin else employee page if user is an employee
module.exports.create_session = function (req, res) {
  if (req.user.admin == "true") {
    return res.redirect("/users/adminDashboard");
  } else {
    return res.redirect("/users/employeeDashboard");
  }
};

module.exports.adminDashboard = function (req, res) {
  return res.render("adminDashboard", {
    title: "Admin Page | ABC Company",
    employee: res.locals.employee,
  });
};
module.exports.employeeDashboard = function (req, res) {
  reviews
    .find({ assigned: res.locals.employee._id })
    .populate("employeeId")
    .exec(function (err, reviewList) {
      if (err) {
        console.log("Error connecting to database");
        return;
      }
      return res.render("employeeDashboard", {
        title: "Employee Page | ABC Company",
        employee: res.locals.employee,
        reviewList: reviewList,
      });
    });
};
//handle sign out
module.exports.destroySession = function (req, res) {
  req.logout();
  return res.redirect("/");
};

module.exports.employees = function (req, res) {
  employees.find({}, function (err, employeeList) {
    if (err) {
      console.log("Error connecting to database");
      return;
    }
    reviews
      .find({})
      .populate("employeeId")
      .exec(function (err, reviewList) {
        if (err) {
          console.log("Error connecting to database");
          return;
        }
        return res.render("employees", {
          title: "Admin Page | ABC Company",
          employeeList: employeeList,
          reviewList: reviewList,
          userId: req.user._id,
        });
      });
  });
};
module.exports.reviews = function (req, res) {
  reviews
    .find({})
    .populate("employeeId")
    .populate("feedback")
    .populate("assigned")
    .exec(function (err, reviewList) {
      if (err) {
        console.log("Error connecting to database");
        return;
      }
      return res.render("reviews", {
        title: "Admin Page | ABC Company",
        reviewList: reviewList,
      });
    });
};
