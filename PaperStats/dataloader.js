const Http = new XMLHttpRequest();
const url =
  "https://spreadsheets.google.com/feeds/cells/19TCHAcFTNa_Va6UankLiZiHxvwUmfXnJyJA7B5hsuIs/1/public/values?alt=json";
Http.open("GET", url);
Http.send();

Http.onload = e => {
  let dataStream = JSON.parse(Http.responseText).feed.entry;
  fieldInitializer(dataStream, 55, 8); //ToDo: We have to dynamically insert the final file list count
};

//Initializing the field
//Input consists of the data and the dimensions of the data
//This function organizes data in a usable format.
//The data wrangling will aim to organize information in a map, where each id will store the information related to an object
function fieldInitializer(data, row, col) {
  let inputArray = [];
  let createdData = [];
  let localCreatedData = {};

  for (let i = 0; i < row; i++) {
    if (Object.keys(localCreatedData).length != 0) {
      createdData.push(localCreatedData);
      localCreatedData = {};
    }
    for (let j = 0; j < col; j++) {
      let cell = data[i * 8 + j]["gs$cell"];
      let row = cell["row"];
      let col = cell["col"];
      if (row == 1) {
        inputArray.push(cell["$t"]);
      } else {
        localCreatedData[inputArray[col - 1]] = cell["$t"];
      }
    }
  }
  //Setting all files data in the current session
  createdData.push(localCreatedData);
  setAllFilesData(createdData);
  console.log(createdData);

  //After dataloading create views
  //Creating real
  createLineChart(createdData, "Year");
  createBarChart(createdData, "Evaluation_Type (O/S/M/EX/ET/I/C)");
  // createTable(createdData);

  //Moving the code to views.js
  appendTable();
  createSearchableTable(createdData);
}