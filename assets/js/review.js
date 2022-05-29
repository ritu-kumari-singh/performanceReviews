// Click event to add new review
document.getElementById("add_new_review").onclick = function () {
  //Remove other elements and display only new review form
  document.getElementById("review_list").style.display = "none";
  document.getElementById("add_new_review").style.display = "none";
  document.getElementById("new_review_form").style.display = "block";
};
