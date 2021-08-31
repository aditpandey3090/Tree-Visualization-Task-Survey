fetchSurveyData().then(
  (data) => fieldInitializer(data),
  (error) => console.log(error)
);

//Initializing the field
//Input consists of the data and the dimensions of the data
//This function organizes data in a usable format.
//The data wrangling will aim to organize information in a map, where each id will store the information related to an object
function fieldInitializer(createdData) {
  // setAllFilesData(createdData);
  console.log(createdData);

  //After dataloading create views
  //Creating real
  //let visualizationData = createFrequencyData(createdData, "Year");
  //drawLineChart(visualizationData, 500, "Id", "count", "Year", "Year", "Year");

  // //
  // let visualizationDataBC3 = createFrequencyData(createdData, "Type");
  // console.log(visualizationDataBC3);

  // drawBarChart(
  //   visualizationDataBC3,
  //   500,
  //   "Id",
  //   "count",
  //   "PaperType",
  //   "PaperType",
  //   "# of Papers"
  // );

  // // //Bar chart data wrangling and visualization creation
  // let visualizationDataBC1 = createFrequencyData(
  //   createdData,
  //   "Evaluation_Type"
  // );
  // drawBarChart(
  //   visualizationDataBC1,
  //   500,
  //   "Id",
  //   "count",
  //   "EvaluationType",
  //   "EvaluationType",
  //   "# of Papers"
  // );
  // console.log(visualizationDataBC1);

  // // //Bar chart data wrangling and visualization creation
  // let visualizationDataBC2 = createMultiValueFreqData(
  //   createdData,
  //   "Layouts_Considered"
  // );

  // drawBarChart(
  //   visualizationDataBC2,
  //   500,
  //   "Id",
  //   "count",
  //   "VisType",
  //   "VisType",
  //   "# of Techniques"
  // );
  // console.log(visualizationDataBC2);

  //Moving the code to views.js
  appendTable();
  createSearchableTable(createdData);
}
