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
  appendTable();
  createSearchableTable(createdData);
  
}


function appendTable() {
  $("body").append('<table id="vizDataTable" class="display" width="100%"></table>');
}

function createSearchableTable(dataSet) {
  $(document).ready(function() {
    $("#vizDataTable").DataTable({
      data: dataSet,
      order: [[ 1, "desc" ]],
      columns: [
        { title: "Paper", data: "Paper_Title" },
        { title: "Year", data: "Year" },
        { title: "Type (S/E/D)", data: "Type (S/E/D)" },
        {
          title: "Evaluation Type (O/S/M/EX/ET/I/C)",
          data: "Evaluation_Type (O/S/M/EX/ET/I/C)"
        },
        { title: "Stimuli Description", data: "Stimuli_Description" },
        { title: "Layouts Considered", data: "Layouts_Considered" },
        {
          title: "More Information",
          data: "DOI",
          render: function(data, type, row, meta) {
            data = '<a href="' + data + '" target="_blank">' + data + "</a>";
            return data;
          }
        }
      ],
      initComplete: function(settings){
        $('#vizDataTable thead th').each(function () {
           var $td = $(this);
           $td.attr('title', $td.text());
        });

        /* Apply the tooltips */
        $('#vizDataTable thead th[title]').tooltip(
        {
           "container": 'body'
        });          
    } 
    });
  });
}