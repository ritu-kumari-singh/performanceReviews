const employees = require("../models/employees");
const reviews = require("../models/reviews");

//function to create a review for any employee
module.exports.create_review = function (req, res) {
  employees.find({ email: req.body.email }, function (err, employee) {
    if (err) {
      console.log("Error connecting to database");
      return;
    }
    if (employee.length != 0) {
      let data = {
        employeeId: employee[0]._id,
        feedback: [],
        assigned: [],
      };
      reviews.findOne({ employeeId: employee[0]._id }, function (err, review) {
        if (err) {
          console.log(`Error querying the database : ${err}`);
          return;
        }
        if (!review) {
          reviews.create(data, function (err, review) {
            if (err) {
              console.log(`Error querying the database : ${err}`);
              return;
            } else {
              req.flash("success", "Entry Successful");
              return res.redirect("/users/performanceReviews");
            }
          });
        } else {
          req.flash("error", "Entry already exists");
          return res.redirect("back");
        }
      });
    } else {
      req.flash("error", "Email does not exist for any employee");
      return res.redirect("back");
    }
  });
};

//Function to assign an employee to another employee's review
module.exports.assign_review = function (req, res) {
  const id = req.body.ajax_data.id;
  const empId = req.body.ajax_data.empId;
  if (id == "") {
    req.flash("error", "Please select a valid option");
    return res.redirect("back");
  }
  reviews.findById(id, async function (err, review) {
    if (err) {
      console.log("Error connecting to database");
      return;
    }
    if (review) {
      review.assigned.push(empId);
      await review.save();
      req.flash("success", "Review assigned Successfully");
      return res.redirect("/users/employees");
    } else {
      req.flash("error", "Review data not found");
      console.log("Review data not found");
      return res.redirect("back");
    }
  });
};
