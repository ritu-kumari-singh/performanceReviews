const employees = require("../models/employees");
const reviews = require("../models/reviews");
const feedback = require("../models/feedback");

//function to make an employee admin
module.exports.update_employee = async function (req, res) {
  const empId = req.body.ajax_data.empId;
  await employees
    .findByIdAndUpdate(
      empId,
      { admin: "true" },
      { new: true },
      function (err, employee) {
        if (err) {
          console.log(err);
        }
        return res.redirect("/users/employees");
      }
    )
    .clone()
    .catch(function (err) {
      console.log(err);
    });
};

//function to remove employee and all of his/her feedback data from database
module.exports.delete_employee = async function (req, res) {
  const empId = req.body.ajax_data.empId;
  await employees
    .findByIdAndDelete(empId, async function (err, employee) {
      if (err) {
        console.log(err);
        return;
      }
      reviews.findOneAndDelete({ employeeId: empId }, function (err, review) {
        if (err) {
          console.log(err);
          return;
        }
        if (review) {
          for (let item of review.feedback) {
            feedback.findByIdAndDelete(item, function (err, doc) {
              if (err) {
                console.log(err);
                return;
              }
            });
          }
        }
      });
      return res.redirect("/users/employees");
    })
    .clone()
    .catch(function (err) {
      console.log(err);
    });
};

//function to add new employee to the database and create his/her account
module.exports.create_employee = function (req, res) {
  employees.findOne({ email: req.body.email }, function (err, employee) {
    if (err) {
      console.log(`Error querying the database : ${err}`);
      return;
    }
    //if employee does not already exits create one
    if (!employee) {
      req.body.admin = false;
      employees.create(req.body, function (err, employee) {
        if (err) {
          console.log(`Error querying the database : ${err}`);
          return;
        } else {
          req.flash("success", "Entry Successful");
          return res.redirect("/users/employees");
        }
      });
    }
    //if employee already exists show error message to user
    else {
      req.flash("error", "Employee already exists");
      return res.redirect("back");
    }
  });
};

//function to handle submission of feedback by an employee for anothe employee
module.exports.submitFeedback = function (req, res) {
  let email = req.body.ajax_data.email;
  let content = req.body.ajax_data.content;
  let empId = req.body.ajax_data.empId;
  let candidateId = req.body.ajax_data.candidateId;
  feedback.create({ email: email, content: content }, function (err, feedback) {
    if (err) {
      console.log(`Error querying the database : ${err}`);
      return;
    }
    let id = feedback._id;
    reviews.findOne({ employeeId: candidateId }, async function (err, review) {
      if (err) {
        console.log(`Error querying the database : ${err}`);
        return;
      }
      review.feedback.push(id);
      await review.save();
      review.assigned.pull(empId);
      await review.save();
      return res.redirect("/users/employeeDashboard");
    });
  });
};
