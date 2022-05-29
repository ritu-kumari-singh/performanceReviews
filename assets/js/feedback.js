//Add Onclick to all submit feedback buttons using class

var submit_feedback_elems = document.getElementsByClassName("submit_feedback");

var submitFeedback = function (e) {
  //email of employee giving feedback
  let email = e.target.dataset.email;
  //feedback content
  let content = e.target.previousElementSibling.value;
  //id of employee giving feedback
  let empId = e.target.dataset.empid;
  //id of employee receiving feedback
  let candidateId = e.target.dataset.candidateid;
  $.ajax({
    type: "POST",
    url: "/users/employeeDashboard/submit_feedback",
    data: {
      ajax_data: {
        email: email,
        content: content,
        empId: empId,
        candidateId: candidateId,
      },
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

for (var i = 0; i < submit_feedback_elems.length; i++) {
  submit_feedback_elems[i].addEventListener("click", submitFeedback, false);
}
