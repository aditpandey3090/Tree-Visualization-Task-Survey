// function createSunburstChart(data, id, classname) {
//   // margin = { left: 100, top: 100, right: 100, bottom: 100 };
//   format = d3.format(",d");

//   var width = document.getElementById(id).clientWidth / 3;

//   //var width = 500;
//   var height = document.getElementById(id).clientWidth / 4;
//   var radius = Math.min(width, height) / 2;
//   partition = (data) =>
//     d3.partition().size([2 * Math.PI, radius])(
//       d3
//         .hierarchy(data)
//         .sum((d) => d.count)
//         .sort((a, b) => b.count - a.count)
//     );

//   arc = d3
//     .arc()
//     .startAngle((d) => d.x0)
//     .endAngle((d) => d.x1)
//     .padAngle((d) => Math.min((d.x1 - d.x0) / 2, 0.005))
//     .padRadius(radius / 2)
//     .innerRadius((d) => d.y0)
//     .outerRadius((d) => d.y1 - 1);

//   const root = partition(data);

//   let depthArray = root.descendants().map((d) => d.depth);
//   let maxDepth = d3.max(depthArray);
//   console.log(maxDepth);

//   color = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, 10));

//   const svg1 = d3
//     .select("#" + id)
//     .append("svg")
//     .attr("class", classname) //ToDo:Add a more descriptive classname
//     .attr("viewBox", "0 0 " + width + " " + height)
//     .append("g")
//     .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

//   svg1
//     .attr("fill-opacity", 0.6)
//     .selectAll("path")
//     .data(root.descendants().filter((d) => d.depth))
//     .enter()
//     .append("path")
//     .attr("class", "sunburst")
//     .attr("fill", (d) => {
//       console.log(d.depth);
//       while (maxDepth - d.depth < 1) d = d.parent;
//       return color(d.data.name);
//     })
//     .attr("d", arc)
//     // .on("mouseover", function (d) {
//     //   let currentSelection = d.data.name;
//     //   let paths = d3.selectAll(".sunburst");
//     //   let allText = d3.selectAll(".embeddedlabel");
//     //   hierarchicalSelection(currentSelection, paths, allText);
//     //   //Select only the mouseovered sector
//     //   d3.select(this).attr("opacity", 1);
//     // })
//     // .on("mouseleave", function (d) {
//     //   d3.selectAll(".sunburst").attr("opacity", 1);
//     //   d3.selectAll(".embeddedlabel").style("opacity", 1);
//     // })
//     .on("click", function (d) {
//       let currentSelection = d.data.name;
//       let paths = d3.select("." + classname).selectAll(".sunburst");
//       hierarchicalSelection(currentSelection, paths);
//       //Select only the mouseovered sector
//       d3.select(this).attr("opacity", 1);

//       if (classname == "targetChart") {
//         filterColumn(
//           "#vizDataTable",
//           columnLookupTasksTarget[d.depth],
//           d.data.name
//         );
//       }

//       if (classname == "actionChart") {
//         filterColumn(
//           "#vizDataTable",
//           columnLookupTasksAction[d.depth],
//           d.data.name
//         );
//       }
//     })
//     .on("dblclick", function (d) {
//       d3.select("." + classname)
//         .selectAll(".sunburst")
//         .attr("opacity", 1);

//       if (classname == "targetChart") {
//         filterColumn("#vizDataTable", columnLookupTasksTarget[d.depth], "");
//       }

//       if (classname == "actionChart") {
//         filterColumn("#vizDataTable", columnLookupTasksAction[d.depth], "");
//       }
//     })
//     .append("title")
//     .text(
//       (d) =>
//         `${d
//           .ancestors()
//           .map((d) => d.data.name)
//           .reverse()
//           .join("/")}\n${format(d.value)}`
//     );

//   svg1
//     .append("g")
//     .attr("pointer-events", "none")
//     .attr("text-anchor", "middle")
//     .attr("font-size", 7)
//     .attr("font-family", "sans-serif")
//     .selectAll("text")
//     .data(root.descendants())
//     .enter()
//     .append("text")
//     .attr("class", "embeddedlabel")
//     .attr("transform", function (d) {
//       if (d.depth != 0) {
//         const x = (((d.x0 + d.x1) / 2) * 180) / Math.PI;
//         const y = (d.y0 + d.y1) / 2;
//         return `rotate(${x - 90}) translate(${y},0) rotate(${
//           x < 180 ? 0 : 180
//         })`;
//       }
//     })
//     .attr("dy", "0.35em")
//     .text((d) => {
//       if (d.y1 - d.y0 < d.data.name.length * 3) {
//         let maxLen = Math.round((d.y1 - d.y0) / 5);
//         return d.data.name.substr(0, maxLen) + "...";
//       } else {
//         return d.data.name;
//       }
//     })
//     .style("display", function (d) {
//       if (((d.y0 + d.y1) / 2) * (d.x1 - d.x0) > 10) {
//         return "";
//       } else {
//         return "none";
//       }
//     });
// }

// @param: Current Selection
// @param: All the paths in the DOM form
function hierarchicalSelection(currentSelection, paths) {
  paths.attr("opacity", function (pathData) {
    if (
      pathData.parent.data.name == currentSelection ||
      (pathData.parent.parent != null &&
        pathData.parent.parent.data.name == currentSelection)
    ) {
      return 1;
    } else {
      return 0.2;
    }
  });

  // texttest.style("opacity", function (textData) {
  //   if (textData.parent != null) {
  //     if (
  //       (textData.parent != null &&
  //         textData.parent.data.name == currentSelection) ||
  //       (textData.parent.parent != null &&
  //         textData.parent.parent.data.name == currentSelection) ||
  //       textData.data.name == currentSelection
  //     ) {
  //       return 1;
  //     } else {
  //       return 0.3;
  //     }
  //   }
  // });
}

/* 
desc: called to select an element in the table and perform a consistent action
args: id of the div to select, column to filter
*/
function selectCharts(id, column, filterText, filterTagID, filterTagText) {
  d3.selectAll("#" + id).classed("selected", true);
  filterColumn("#vizDataTable", column, filterText);
  scrollToTable();
  addFilterTags(filterTagID, filterTagText);
}

function deselectCharts(id, column, filterTagID) {
  d3.selectAll("#" + id).classed("selected", false);
  filterColumn("#vizDataTable", column, "");
  removeFilterTags(filterTagID);
}

function scrollToTable() {
  var elmntToView = document.getElementById("selectionFilter");
  elmntToView.scrollIntoView();
}

function addFilterTags(id, data) {
  d3.select("#" + id + "Button")
    .style("display", "")
    .html(id + ": " + data);
}

function removeFilterTags(id) {
  d3.select("#" + id + "Button").style("display", "none");
}

midLevelLock = false;
lowLevelLock = false;
target = false;

d3.selectAll("td")
  .on("mouseover", function (d) {
    let selectedItem = d3.select(this).attr("class").includes("selected");
    if (!selectedItem) {
      console.log("reaching");
      d3.select(this).classed("hovered", true);
    } else {
      console.log(selectedItem);
    }
  })
  .on("mouseout", function (d) {
    let selectedItem = d3.select(this).attr("class").includes("selected");
    if (!selectedItem) {
      d3.select(this).classed("hovered", false);
    }
  })
  .on("click", function (d) {
    let id = d3.select(this).attr("id");

    if (actionLookup[id] == 2 && !midLevelLock) {
      selectCharts(id, actionLookup[id], id, "MidLevel", id);
      midLevelLock = true;
    }

    if (actionLookup[id] == 3 && !lowLevelLock) {
      selectCharts(id, actionLookup[id], id, "LowLevel", id);
      lowLevelLock = true;
    }

    if (actionLookup[id] == 6 && !target) {
      selectCharts(
        id,
        actionLookup[id],
        id.split("_")[1],
        "Target",
        id.split("_")[1]
      );
      target = true;
    }
  });

d3.selectAll("td").on("dblclick", function (d) {
  let id = d3.select(this).attr("id");

  if (actionLookup[id] == 2 && midLevelLock) {
    deselectCharts(id, actionLookup[id], "MidLevel");
    midLevelLock = false;
  }
  if (actionLookup[id] == 3 && lowLevelLock) {
    deselectCharts(id, actionLookup[id], "LowLevel");
    lowLevelLock = false;
  }
  if (actionLookup[id] == 6 && target) {
    deselectCharts(id, actionLookup[id], "Target");
    target = false;
  }
});
