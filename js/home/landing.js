let surveyDataLocalCache = undefined;
fetchSurveyData().then(
    data => {
        surveyDataLocalCache = data;
        randomizeSurveyPaper();
    },
    error => console.log(error)
)

function getRandomPaper() {
    min = Math.ceil(0);
    max = Math.floor(surveyDataLocalCache.length);
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    return surveyDataLocalCache[randomNumber];
}

function randomizeSurveyPaper() {
    const FIELD_ID = {
        random_title: "randomPaperTitle",
        random_author: "randomPaperAuthor",
        random_abstract: "randomPaperAbstract"
    }

    const randomlySelectedPaperId = getRandomPaper();

    // document.getElementById(FIELD_ID.random_title).innerHTML = '<a href="./profile?id=' + randomlySelectedPaperId.Ref_Id + '" target="_blank">' + randomlySelectedPaperId.Paper_Title + "</a>" || ''
    // document.getElementById(FIELD_ID.random_author).innerHTML = randomlySelectedPaperId.Author || ''
    // document.getElementById(FIELD_ID.random_abstract).innerHTML = randomlySelectedPaperId.Abstract || ''
}

function myAccFunc(id) {
    var x = document.getElementById(id);
    if (x.className.indexOf("w3-show") == -1) {
      x.className += " w3-show";
    } else { 
      x.className = x.className.replace(" w3-show", "");
    }
  }