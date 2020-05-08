//Check for the screen size to choose which version of table to dispaly
console.log(window.innerWidth);

if (window.innerWidth < 1441) {
  d3.select("#noTabWindow").style("display", "none");
} else {
  d3.select("#tabWindow").style("display", "none");
}

// Tabs
function openTab(evt, tabName) {
  var i;
  var x = document.getElementsByClassName("tab");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }

  var activebtn = document.getElementsByClassName("testbtn");
  console.log(activebtn);
  for (i = 0; i < x.length; i++) {
    activebtn[i].className = activebtn[i].className.replace(
      " w3-dark-grey",
      ""
    );
  }
  console.log(tabName);
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " w3-dark-grey";
}

var mybtn = document.getElementsByClassName("testbtn")[0];
mybtn.click();

fetchProposedData().then(
  (data) => {
    appendTaskSurveyTable("body");
    createTaskSurveyTable(data);
  },
  (error) => console.log(error)
);
