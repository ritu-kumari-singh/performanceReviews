//Add Onclick event to all Update employee details button
var update_employee_elems = document.getElementsByClassName("update_employee");

var makeAdmin = function (e) {
  let empId = e.target.dataset.empid;
  $.ajax({
    type: "POST",
    url: "/users/employees/update_employee",
    data: {
      ajax_data: { empId: empId },
    },
    success: function (data) {
      location.reload();
    },
    error: function (e) {
      //Display error if ajax fails
      console.log(e);
    },
  });
};

for (var i = 0; i < update_employee_elems.length; i++) {
  update_employee_elems[i].addEventListener("click", makeAdmin, false);
}

//Add onclick to all delete employee buttons
var delete_employee_elems = document.getElementsByClassName("delete_employee");

var deleteEmp = function (e) {
  let empId = e.target.dataset.empid;
  $.ajax({
    type: "POST",
    url: "/users/employees/delete_employee",
    data: {
      ajax_data: { empId: empId },
    },
    success: function (data) {
      location.reload();
    },
    error: function (e) {
      //Display error if ajax fails
      console.log(e);
    },
  });
};

for (var i = 0; i < delete_employee_elems.length; i++) {
  delete_employee_elems[i].addEventListener("click", deleteEmp, false);
}

//Onclick to display new employee form
document.getElementById("add_new_employee").onclick = function () {
  document.getElementById("employee_list").style.display = "none";
  document.getElementById("add_new_employee").style.display = "none";
  document.getElementById("new_employee_form").style.display = "block";
};

//Add onclick to all assign for review button
var assign_review_elems = document.getElementsByClassName("assign_review");

var assignReview = function (e) {
  let id = e.target.previousElementSibling.value;
  let empId = e.target.dataset.empid;
  $.ajax({
    type: "POST",
    url: "/users/employees/assign_review",
    data: {
      ajax_data: { id: id, empId: empId },
    },
    success: function (data) {
      location.reload();
    },
    error: function (e) {
      //Display error if ajax fails
      console.log(e);
    },
  });
};

for (var i = 0; i < assign_review_elems.length; i++) {
  assign_review_elems[i].addEventListener("click", assignReview, false);
}
