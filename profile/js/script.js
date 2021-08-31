$('[data-toggle="tooltip"]').tooltip();

const LAYOUT_DEF = {
  "Enclosure": "ED",
  "Adjacency": "LD",
  "Node-Link": "NL",
  "Indented List": "IL",
  "Hybrid": "HD",
  "Symbolic": "SD"
}
async function fetchPaperData() {
  const [surveyData, proposedData] = await Promise.all([
    fetchSurveyData(),
    fetchProposedData()
  ]);
  return { survey_data: surveyData, proposed_data: proposedData };
}

fetchPaperData().then(
  data => {
    const urlParams = new URLSearchParams(window.location.search);
    const paperId = parseInt(urlParams.get("id"));

    const surveyData = filterPaperData(data.survey_data, paperId, "Ref_Id");
    const proposedData = filterPaperData(
      data.proposed_data,
      paperId,
      "PaperId"
    );

    if (surveyData === undefined || surveyData.length === 0) {
      window.location.href = "/";
      alert("Invalid Paper. Redirected to Home Page.");
    }
    fillInProfilePage(surveyData[0], proposedData);
  },
  error => console.log(error)
);

function filterPaperData(data, paperId, idField) {
  const filteredData = data.filter(d => d[idField] === paperId);
  return filteredData;
}

/**
 * Fills in the empty fields of the page
 * @param {Array} data
 */
function fillInProfilePage(surveyData, proposedData) {
  setPaperInfo(surveyData);
  if (proposedData !== undefined && proposedData.length > 0) {
    appendTaskSurveyTable("#tableBody");
    createTaskSurveyTable(proposedData, false, false, false, false);
  }
  addVisualEncoding(surveyData.Layouts_Considered);
}

function setPaperInfo(surveyData) {
  const paperName = surveyData.Paper_Title;
  const author = surveyData.Author;
  const year = surveyData.Year;
  const description = surveyData.Abstract;

  document.getElementById("paperName").innerHTML += paperName;
  document.getElementById("hyperlink").href = surveyData.DOI
  document.getElementById("authorName").innerHTML += author;
  document.getElementById("year").innerHTML += year;
  document.getElementById("description").innerHTML += description;
}

function addVisualEncoding(layouts) {
  if (layouts === undefined) {
    console.log("No layouts to be displayed");
    return;
  }
  const layoutHolders = document.getElementsByClassName("visual-encoding");
  const layoutsList = layouts.split(",");
  let counter = 0;
  layoutsList.forEach(layout => {
    if (layout in LAYOUT_DEF) {
      const imageFile = LAYOUT_DEF[layout] + ".png";
      layoutHolders[counter].children[2].src += imageFile;
      layoutHolders[counter].children[1].innerHTML = layout;
      layoutHolders[counter].style.display = "block";
      counter++;
    }
  });
  
}
