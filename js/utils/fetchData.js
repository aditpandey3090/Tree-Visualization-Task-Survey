/***
 * Pulls data from the local file store and returns it wrapped within a Promise.
 * How to use the data?
 *
 * fetchSurveyData().then(
 *  data => console.log(data),
 *  error => console.log(error)
 * );
 */
async function fetchSurveyData() {
  let surveyData = $.getJSON("survey_data.json");
  return surveyData;
}

async function fetchTaskData() {
  let taskData = $.getJSON("./data/task_data.json");
  return taskData;
}
