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
  Lookup: 2,
  Explore: 2,
  Locate: 2,
  Browse: 2,
  Identify: 3,
  Summarize: 3,
  Compare: 3,
  tree_Height: 6,
  tree_Balance: 6,
  tree_Fanout: 6,
  tree_Size: 6,
};

columnLookupTasksTarget = {
  1: 5,
  2: 6,
  3: 7,
};
