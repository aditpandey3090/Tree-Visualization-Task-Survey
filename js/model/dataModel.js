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

columnLookupTasksAction = {
  1: 3,
  2: 4,
};

actionLookup = {
  Lookup: 3,
  Explore: 3,
  Locate: 3,
  Browse: 3,
  Identify: 4,
  Summarize: 4,
  Compare: 4,
  tree_Height: 7,
  tree_Balance: 7,
  tree_Fanout: 7,
  tree_Size: 7,
};

columnLookupTasksTarget = {
  1: 5,
  2: 6,
  3: 7,
};
