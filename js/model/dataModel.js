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
  Tree_Height: 6,
  Tree_Balance: 6,
  Tree_Fanout: 6,
  Tree_Size: 6,
  Tree_Misc: 6,
  Subtree_Height: 6,
  Subtree_Size: 6,
  Subtree_Depth: 6,
  Subtree_Ancestor: 6,
  Node_Depth: 6,
  Node_Degree: 6,
  Node_Ancestor: 6,
  Node_Descendant: 6,
  Node_Sibling: 6,
  Path_Length: 6,
  Attribute_Categorical: 6,
  Attribute_Ordinal: 6,
  Attribute_Quantitative: 6,
  Attribute_MultiDimensional: 6,
};

columnLookupTasksTarget = {
  1: 5,
  2: 6,
  3: 7,
};
