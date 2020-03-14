function loadDataFromAPI() {
  return new Promise(function(resolve, reject) {
    const Http = new XMLHttpRequest();
    const url =
      "https://spreadsheets.google.com/feeds/cells/19TCHAcFTNa_Va6UankLiZiHxvwUmfXnJyJA7B5hsuIs/1/public/values?alt=json";
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
 * fetchData().then(
 *  data => console.log(data),
 *  error => console.log(error)
 * );
 */
async function fetchData() {
  let data = await loadDataFromAPI();

  //ToDo: We have to dynamically insert the final file list count
  const row = 55;
  const col = 10;

  let inputArray = [];
  let createdData = [];
  let localCreatedData = {};

  for (let i = 0; i < row; i++) {
    if (Object.keys(localCreatedData).length != 0) {
      createdData.push(localCreatedData);
      localCreatedData = {};
    }
    for (let j = 0; j < col; j++) {
      let cell = data[i * 10 + j]["gs$cell"];
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
  return createdData;
}
