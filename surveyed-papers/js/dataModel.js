//This is where we create the setter and getter functions for our global variables
//Global Dataset storage
let allFilesData;

function setAllFilesData(data) {
  allFilesData = data;
}
function getAllFilesData() {
  return allFilesData;
}

columnLookup = {
  yearofpub: 1,
  PaperType: 2,
  EvaluationType: 3,
  VisType: 5,
};
