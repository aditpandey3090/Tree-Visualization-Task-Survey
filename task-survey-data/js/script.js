fetchProposedData().then(
  data => {
    const target = generateTree(data);
    const action = generateTwoLevelTree(data);
    createSunburstChart(action, "actionChart", "actionChart");
    createSunburstChart(target, "targetChart", "targetChart");
    appendTaskSurveyTable("body");
    createTaskSurveyTable(data);
  },
  error => console.log(error)
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
  // const syntax = {
  //   name: ""
  // };

  // const root = {
  //   name: "Target",
  //   children: []
  // };
  // const attributeName = "Target";
  // recurseNode(root, attributeName, 0);

  // function recurseNode(root, attributeName, level, parentName, parentValue) {
  //   for (let i = 0; i < data.length; i++) {
  //     const currentData = data[i];
  //     const targetName = data[i][attributeName];
  //     if (level > 0 && currentData[parentName] !== parentValue) {
  //       continue;
  //     }
  //     let filteredList = root.children.filter(
  //       element => element.name === targetName
  //     );
  //     if (filteredList.length > 0 && level > 1) {
  //       let targetChild = undefined;
  //       targetChild = root.children.filter(x => x.name === targetName)[0];

  //       if (level === 0) {
  //         recurseNode(
  //           targetChild,
  //           "Specific Target", //Column name
  //           1,
  //           attributeName,
  //           targetName
  //         );
  //       } else if (level === 1) {
  //         recurseNode(
  //           targetChild,
  //           "Target Attribute",
  //           2,
  //           attributeName,
  //           targetName
  //         );
  //       } else if (level === 2) {
  //         targetChild.count = targetChild.count + 1;
  //       }
  //     } else if (filteredList.length === 0) {
  //       const targetNode = JSON.parse(JSON.stringify(syntax));
  //       targetNode.name = targetName;
  //       if (level < 2) {
  //         targetNode.children = [];
  //       } else {
  //         targetNode.count = 1;
  //       }

  //       root.children.push(targetNode);

  //       if (level === 0) {
  //         recurseNode(
  //           targetNode,
  //           "Specific Target",
  //           1,
  //           attributeName,
  //           targetName
  //         );
  //       } else if (level === 1) {
  //         recurseNode(
  //           targetNode,
  //           "Target Attribute",
  //           2,
  //           attributeName,
  //           targetName
  //         );
  //       }
  //     }
  //   }
  // }

  var nested_data = d3
    .nest()
    .key(function(d) {
      return d["Target"];
    })
    .key(function(d) {
      return d["Specific Target"];
    })
    .key(function(d) {
      return d["Target Attribute"];
    })
    .rollup(function(leaves) {
      return leaves.length;
    })
    .entries(data);

  let targetVal = { name: "Target", children: nested_data };

  var parsed = JSON.parse(JSON.stringify(targetVal), function(k, v) {
    if (k === "key") this.name = v;
    else if (k === "values") this.children = v;
    else if (k === "value") this.count = v;
    else return v;
  });
  console.log(parsed);
  return parsed;
}

function generateTwoLevelTree(data) {
  var nested_data = d3
    .nest()
    .key(function(d) {
      return d["Action(Search)"];
    })
    .key(function(d) {
      return d["Action(Query)"];
    })
    .rollup(function(leaves) {
      return leaves.length;
    })
    .entries(data);

  let targetVal = { name: "Action", children: nested_data };

  var parsed = JSON.parse(JSON.stringify(targetVal), function(k, v) {
    if (k === "key") this.name = v;
    else if (k === "values") this.children = v;
    else if (k === "value") this.count = v;
    else return v;
  });

  console.log(parsed);

  return parsed;
}
