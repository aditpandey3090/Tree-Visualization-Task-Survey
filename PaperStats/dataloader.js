const Http = new XMLHttpRequest();
const url =
  "https://spreadsheets.google.com/feeds/cells/19TCHAcFTNa_Va6UankLiZiHxvwUmfXnJyJA7B5hsuIs/1/public/values?alt=json";
Http.open("GET", url);
Http.send();

Http.onload = e => {
  console.log(JSON.parse(Http.responseText));
  //   eval(Http.responseText);
};

function doData(json) {
  console.log(json);
}
