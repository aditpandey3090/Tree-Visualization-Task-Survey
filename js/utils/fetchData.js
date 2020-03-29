/**
 * Calls Google spreadsheet URL to fetch data in the form of JSON.
 * This data is raw. The data can be found for every cell in the
 * spreadsheet and needs to be parsed.
 *
 * For eg. https://spreadsheets.google.com/feeds/cells/19TCHAcFTNa_Va6UankLiZiHxvwUmfXnJyJA7B5hsuIs/1/public/values?alt=json
 * can be interpretted as
 *
 * https://spreadsheets.google.com/feeds/cells/<docId>/<sheetId>/public/values?alt=jso
 * @param {String} docId The unique identifier of the document
 * @param {String} sheetId Incremental integer for the sheet.
 */
function loadDataFromAPI(docId, sheetId) {
  return new Promise(function(resolve, reject) {
    const Http = new XMLHttpRequest();
    const url = `https://spreadsheets.google.com/feeds/cells/${docId}/${sheetId}/public/values?alt=json`;
    Http.open("GET", url);
    Http.send();

    Http.onload = e => {
      resolve(JSON.parse(Http.responseText).feed.entry);
    };
  });
}

/***
 * Pulls data from the API and returns it wrapped within a Promise.
 * How to use the data?
 *
 * fetchSurveyData().then(
 *  data => console.log(data),
 *  error => console.log(error)
 * );
 */
async function fetchSurveyData() {
  const docId = "19TCHAcFTNa_Va6UankLiZiHxvwUmfXnJyJA7B5hsuIs";
  const sheetId = "1";
  let data = await loadDataFromAPI(docId, sheetId);

  //ToDo: We have to dynamically insert the final file list count
  const row = 55;
  const col = 10;

  let createdData = parseRawData(row, col, data);
  console.log("In fetchSurveyData");
  console.log(createdData);
  return createdData;
}

function parseRawData(row, column, data) {
  let inputArray = [];
  let createdData = [];
  let localCreatedData = {};
  for (let i = 0; i < row; i++) {
    if (Object.keys(localCreatedData).length != 0) {
      createdData.push(localCreatedData);
      localCreatedData = {};
    }
    for (let j = 0; j < column; j++) {
      let cell = data[i * column + j]["gs$cell"];
      let row = cell["row"];
      let col = cell["col"];
      if (row == 1) {
        inputArray.push(cell["$t"].trim());
      } else {
        localCreatedData[inputArray[col - 1]] = cell["$t"];
      }
    }
  }
  //Setting all files data in the current session
  createdData.push(localCreatedData);
  return createdData;
}

async function fetchProposedData() {
  const docId = "1J66Qw0Db6Omv6jBecJpZPtQmeRnntpdoZHNfLpCD0Bo";
  const sheetId = "3";
  let data = await loadDataFromAPI(docId, sheetId);

  //ToDo: We have to dynamically insert the final file list count
  const row = 204;
  const col = 11;

  let createdData = parseRawData(row, col, data);
  console.log("In fetchProposedData");
  console.log(createdData);
  return createdData;
}
