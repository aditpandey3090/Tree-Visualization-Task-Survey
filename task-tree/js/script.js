// Tabs
function openTab(evt, tabName) {
  var i;
  var x = document.getElementsByClassName("tab");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  var activebtn = document.getElementsByClassName("testbtn");
  for (i = 0; i < x.length; i++) {
    activebtn[i].className = activebtn[i].className.replace(
      " w3-dark-grey",
      ""
    );
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " w3-dark-grey";
}

// var mybtn = document.getElementsByClassName("testbtn")[0];
// mybtn.click();

$('[data-toggle="tooltip"]').tooltip();

const finalActionSearchData = [
  {
    row_header: "Browse",
    Enclosure: 0,
    "Indented List": 0,
    Layered: 0,
    "Node-Link": 0,
    Symbolic: 0,
    Hybrid: 0,
  },
  {
    row_header: "Explore",
    Enclosure: 0,
    "Indented List": 0,
    Layered: 0,
    "Node-Link": 0,
    Symbolic: 0,
    Hybrid: 0,
  },
  {
    row_header: "Locate",
    Enclosure: 0,
    "Indented List": 0,
    Layered: 0,
    "Node-Link": 0,
    Symbolic: 0,
    Hybrid: 0,
  },
  {
    row_header: "Lookup",
    Enclosure: 0,
    "Indented List": 0,
    Layered: 0,
    "Node-Link": 0,
    Symbolic: 0,
    Hybrid: 0,
  },
];

const finalActionQueryData = [
  {
    row_header: "Identify",
    Enclosure: 0,
    "Indented List": 0,
    Layered: 0,
    "Node-Link": 0,
    Symbolic: 0,
    Hybrid: 0,
  },
  {
    row_header: "Compare",
    Enclosure: 0,
    "Indented List": 0,
    Layered: 0,
    "Node-Link": 0,
    Symbolic: 0,
    Hybrid: 0,
  },
  {
    row_header: "Summarize",
    Enclosure: 0,
    "Indented List": 0,
    Layered: 0,
    "Node-Link": 0,
    Symbolic: 0,
    Hybrid: 0,
  }
];

const finalTargetData = [
  {
    row_header: "Ancestor/Descendant",
    Enclosure: 0,
    "Indented List": 0,
    Layered: 0,
    "Node-Link": 0,
    Symbolic: 0,
    Hybrid: 0,
  },
  {
    row_header: "Ancestors",
    Enclosure: 0,
    "Indented List": 0,
    Layered: 0,
    "Node-Link": 0,
    Symbolic: 0,
    Hybrid: 0,
  },
  {
    row_header: "Balance",
    Enclosure: 0,
    "Indented List": 0,
    Layered: 0,
    "Node-Link": 0,
    Symbolic: 0,
    Hybrid: 0,
  },
  {
    row_header: "Categorical Value",
    Enclosure: 0,
    "Indented List": 0,
    Layered: 0,
    "Node-Link": 0,
    Symbolic: 0,
    Hybrid: 0,
  },
  {
    row_header: "Degree",
    Enclosure: 0,
    "Indented List": 0,
    Layered: 0,
    "Node-Link": 0,
    Symbolic: 0,
    Hybrid: 0,
  },
  {
    row_header: "Depth",
    Enclosure: 0,
    "Indented List": 0,
    Layered: 0,
    "Node-Link": 0,
    Symbolic: 0,
    Hybrid: 0,
  },
  {
    row_header: "Descendants",
    Enclosure: 0,
    "Indented List": 0,
    Layered: 0,
    "Node-Link": 0,
    Symbolic: 0,
    Hybrid: 0,
  },
  {
    row_header: "Fanout",
    Enclosure: 0,
    "Indented List": 0,
    Layered: 0,
    "Node-Link": 0,
    Symbolic: 0,
    Hybrid: 0,
  },
  {
    row_header: "Height",
    Enclosure: 0,
    "Indented List": 0,
    Layered: 0,
    "Node-Link": 0,
    Symbolic: 0,
    Hybrid: 0,
  },
  {
    row_header: "Length",
    Enclosure: 0,
    "Indented List": 0,
    Layered: 0,
    "Node-Link": 0,
    Symbolic: 0,
    Hybrid: 0,
  },
  {
    row_header: "Multi-Dimensional Value",
    Enclosure: 0,
    "Indented List": 0,
    Layered: 0,
    "Node-Link": 0,
    Symbolic: 0,
    Hybrid: 0,
  },
  {
    row_header: "Neighbours",
    Enclosure: 0,
    "Indented List": 0,
    Layered: 0,
    "Node-Link": 0,
    Symbolic: 0,
    Hybrid: 0,
  },
  {
    row_header: "Order",
    Enclosure: 0,
    "Indented List": 0,
    Layered: 0,
    "Node-Link": 0,
    Symbolic: 0,
    Hybrid: 0,
  },
  {
    row_header: "Quantitative Value",
    Enclosure: 0,
    "Indented List": 0,
    Layered: 0,
    "Node-Link": 0,
    Symbolic: 0,
    Hybrid: 0,
  },
  {
    row_header: "Siblings",
    Enclosure: 0,
    "Indented List": 0,
    Layered: 0,
    "Node-Link": 0,
    Symbolic: 0,
    Hybrid: 0,
  },
  {
    row_header: "Size",
    Enclosure: 0,
    "Indented List": 0,
    Layered: 0,
    "Node-Link": 0,
    Symbolic: 0,
    Hybrid: 0,
  },
];

const images = {
  "Enclosure": "ED.png",
  "Hybrid": "HD.png",
  "Indented List": "IL.png",
  "Layered": "LD.png",
  "Node-Link": "NL.png",
  "Symbolic": "SD.png"
}

async function fetchPaperData() {
  const [surveyData, proposedData] = await Promise.all([
    fetchSurveyData(),
    fetchProposedData(),
  ]);
  return { survey_data: surveyData, proposed_data: proposedData };
}
const VALID_LAYOUTS = Object.keys(finalActionSearchData[0]).slice(1);

fetchPaperData()
  .then((data) => {
    // const proposedData = data.proposed_data;
    // data.survey_data.forEach((sd) => {
    //   const pageId = sd.Ref_Id;
    //   const layouts = extractLayouts(sd.Layouts_Considered);
    //   const filteredProposedData = proposedData.filter(
    //     (pd) => pd.PaperId === pageId
    //   );
    //   filteredProposedData.forEach((pd) => {
    //     addTofinalActionSearchData(pd["Action(Search)"], layouts);
    //     addTofinalTargetData(pd["Target Attribute"], layouts);
    //     addTofinalActionQueryData(pd["Action(Query)"], layouts);
    //   });
    // });
  })
  .then((result) => {
    // createTable("#actionMatrix", finalActionSearchData);
    // createTable("#targetMatrix", finalTargetData);
    // createTable("#actionQueryMatrix", finalActionQueryData);
  });

function createTable(selector, data, metadata) {
  var op = [];
  data.forEach((d) => {
      VALID_LAYOUTS.forEach(l => {
          op.push(d[l]["number"]);
      });
  });
  op.sort((a,b)=>a-b)
  $(document).ready(function() {
    const table = $(selector).DataTable({
      data: data,
      order: [[0, "desc"]],
      ordering: false,
      searching: false,
      columns: [
        {
          data: "row_header",
          width: "20%",
          className: "bold"
        },
        {
          title: "Enclosure",
          data: "Enclosure.number",
          className: "w3-center",
          fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
            updateTableCell(nTd, sData, op, oData, iRow, iCol, metadata);
          }
        },
        {
          title: "Indented List",
          data: "Indented List.number",
          className: "w3-center",
          fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
            updateTableCell(nTd, sData, op, oData, iRow, iCol, metadata);
          }
        },
        {
          title: "Layered",
          data: "Layered.number",
          className: "w3-center",
          fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
            updateTableCell(nTd, sData, op, oData, iRow, iCol, metadata);
          }
        },
        {
          title: "Node-Link",
          data: "Node-Link.number",
          className: "w3-center",
          fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
            updateTableCell(nTd, sData, op, oData, iRow, iCol, metadata);
          }
        },
        {
          title: "Symbolic",
          data: "Symbolic.number",
          className: "w3-center",
          fnCreatedCell: function (nTd, sData, oData, iRow, iCol) {
            updateTableCell(nTd, sData, op, oData, iRow, iCol, metadata);
          }
        }
      ],
      bPaginate: false,
      info: false,
      headerCallback: function headerCallback(thead, data, start, end, display) {
        for (let i = 0; i < 5; i++) {
          $(thead).find('th')[i+1].innerHTML = '<img data-toggle="tooltip" data-placement="top" title="' + VALID_LAYOUTS[i] + '" style="width:20%" src="./img/' + images[VALID_LAYOUTS[i]] + '" alt="' + VALID_LAYOUTS[i] + '" />'
        }
      }
    });
  });
}

var columnOrder = ["Enclosure", "Indented List", "Layered", "Node-Link", "Symbolic"];

function updateTableCell(nTd, sData, op, oData, iRow, iCol, metadata) {

  // Uncomment this line to hide the data in the table cell.
  // Numbers won't be shown.
  // $(nTd).empty();
  const color = find_color(sData, op);
  $(nTd).css('background-color', color);
  $(nTd).css('font-weight', "bold");
  $(nTd).attr("onclick", "displayModal(this)");
  
  const columnName = columnOrder[iCol - 1];
  $(nTd).data("column", columnName);
  $(nTd).data("row", oData["row_header"]);
  $(nTd).data("metadata", metadata);
  $(nTd).data("data", oData[columnName]["data"]);
}

function addTofinalTargetData(action, layouts) {
  const data = finalTargetData.filter((d) => d.row_header === action);
  data.length > 0 &&
    layouts.forEach((layout) => {
      data[0][layout] += 1;
    });
}

function addTofinalActionQueryData(action, layouts) {
  const data = finalActionQueryData.filter((d) => d.row_header === action);
  data.length > 0 &&
    layouts.forEach((layout) => {
      data[0][layout] += 1;
    });
}

function addTofinalActionSearchData(action, layouts) {
  const data = finalActionSearchData.filter((d) => d.row_header === action);
  data.length > 0 &&
    layouts.forEach((layout) => {
      data[0][layout] += 1;
    });
}
function extractLayouts(layouts) {
  return layouts.split(",").filter(l => VALID_LAYOUTS.includes(l));
}

function find_color (n, op) {
  if (n === 0) {
    n = 1;
  }
  return increase_brightness(((op[op.length - 1] - n) / op[op.length - 1]) * 100);
}

function increase_brightness(percent){
  // strip the leading # if it's there
  var hex = "#4a9091";
  hex = hex.replace(/^\s*#|\s*$/g, '');

  // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
  if(hex.length == 3){
      hex = hex.replace(/(.)/g, '$1$1');
  }

  var r = parseInt(hex.substr(0, 2), 16),
      g = parseInt(hex.substr(2, 2), 16),
      b = parseInt(hex.substr(4, 2), 16);

  return '#' +
     ((0|(1<<8) + r + (256 - r) * percent / 100).toString(16)).substr(1) +
     ((0|(1<<8) + g + (256 - g) * percent / 100).toString(16)).substr(1) +
     ((0|(1<<8) + b + (256 - b) * percent / 100).toString(16)).substr(1);
}
