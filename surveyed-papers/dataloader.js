fetchData().then(
  data => fieldInitializer(data),
  error => console.log(error)
);

//Initializing the field
//Input consists of the data and the dimensions of the data
//This function organizes data in a usable format.
//The data wrangling will aim to organize information in a map, where each id will store the information related to an object
function fieldInitializer(createdData) {
  setAllFilesData(createdData);
  console.log(createdData);

  //After dataloading create views
  //Creating real
  let visualizationData = createFrequencyData(createdData, "Year");
  drawLineChart(
    visualizationData,
    500,
    "Id",
    "count",
    "yearofpub",
    "YearofPub"
  );

  // //Bar chart data wrangling and visualization creation
  let visualizationDataBC1 = createFrequencyData(
    createdData,
    "Evaluation_Type (O/S/M/EX/ET/I/C)"
  );
  drawBarChart(
    visualizationDataBC1,
    500,
    "Id",
    "count",
    "EvaluationType",
    "EvaluationType"
  );

  // //Bar chart data wrangling and visualization creation
  let visualizationDataBC2 = createMultiValueFreqData(
    createdData,
    "Layouts_Considered"
  );
  drawBarChart(visualizationDataBC2, 500, "Id", "count", "VisType", "VisType");

  //Moving the code to views.js
  appendTable();
  createSearchableTable(createdData);
}
