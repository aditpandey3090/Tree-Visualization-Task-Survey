fetchProposedData().then(
  (data) => {
    const target = generateTree(data);
    const action = generateTwoLevelTree(data);
    createSunburstChart(action, "actionChart", "actionChart");
    createSunburstChart(target, "targetChart", "targetChart");
    appendTaskSurveyTable("body");
    createTaskSurveyTable(data);
  },
  (error) => console.log(error)
);

/**
 * Converts the data in a tree structure
 * ├── Target
 * │    └── Specific Target
 * │        └── Target Attribute
 *
 * @param {Object} data JSON data received from the proposed data sheet.
 */
function generateTree(data) {
  function compareValues(a, b) {
    return a.value - b.value;
  }

  var nested_data = d3
    .nest()
    .key(function (d) {
      return d["Target"];
    })
    .sortKeys(d3.descending)
    .key(function (d) {
      return d["Specific Target"];
    })
    .key(function (d) {
      return d["Target Attribute"];
    })
    .rollup(function (leaves) {
      return leaves.length;
    })
    .entries(data);

  let targetVal = { name: "Target", children: nested_data };

  var parsed = JSON.parse(JSON.stringify(targetVal), function (k, v) {
    if (k === "key") this.name = v;
    else if (k === "values") this.children = v;
    else if (k === "value") this.count = v;
    else return v;
  });

  parsed.children[0].children.map((d) => {
    console.log(d);
    return d.children.sort((a, b) => {
      return b.count - a.count;
    });
  });

  console.log(parsed);

  return parsed;
}

function generateTwoLevelTree(data) {
  var nested_data = d3
    .nest()
    .key(function (d) {
      return d["Action(Search)"];
    })
    .key(function (d) {
      return d["Action(Query)"];
    })
    .rollup(function (leaves) {
      return leaves.length;
    })
    .entries(data);

  let targetVal = { name: "Action", children: nested_data };

  var parsed = JSON.parse(JSON.stringify(targetVal), function (k, v) {
    if (k === "key") this.name = v;
    else if (k === "values") this.children = v;
    else if (k === "value") this.count = v;
    else return v;
  });

  console.log(parsed);

  generateOneLevelTree(data);

  return parsed;
}

function generateOneLevelTree(data) {
  //let targetVal = { name: "Action", children: nested_data };

  var nested_search = d3
    .nest()
    .key(function (d) {
      return d["Action(Search)"];
    })
    .rollup(function (leaves) {
      return leaves.length;
    })
    .entries(data);

  var nested_query = d3
    .nest()
    .key(function (d) {
      return d["Action(Query)"];
    })
    .rollup(function (leaves) {
      return leaves.length;
    })
    .entries(data);

  let targetValSearch = {
    name: "Mid-Level(Search)",
    children: nested_search,
  };

  let targetValQuery = {
    name: "Low-Level(Query)",
    children: nested_query,
  };

  var parsed = JSON.parse(JSON.stringify(targetValSearch), function (k, v) {
    if (k === "key") this.name = v;
    else if (k === "values") this.children = v;
    else if (k === "value") this.count = v;
    else return v;
  });

  parsed.children.sort((a, b) => {
    return b.count - a.count;
  });

  console.log(parsed);
}
