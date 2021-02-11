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
}

/* 
desc: called to select an element in the table and perform a consistent action
args: id of the div to select, column to filter
*/
function selectCharts(
  id,
  column,
  filterText,
  filterBolean,
  filterTagID,
  filterTagText
) {
  d3.selectAll("#" + id).classed("selected", true);
  filterColumn("#vizDataTable", column, filterText, filterBolean);
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

highLevelLock = false;
midLevelLock = false;
lowLevelLock = false;
targetTopology = false;

d3.selectAll("td")
  .on("mouseover", function (d) {
    let selectedItem = d3.select(this).attr("class").includes("selected");
    if (!selectedItem) {
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


    if (actionLookup[id] == 1 && !highLevelLock) {
      selectCharts(id, actionLookup[id], id, false, "HighLevel", id);
      highLevelLock = true;
    }

    if (actionLookup[id] == 2 && !midLevelLock) {
      selectCharts(id, actionLookup[id], id, false, "MidLevel", id);
      midLevelLock = true;
    }

    if (actionLookup[id] == 3 && !lowLevelLock) {
      selectCharts(id, actionLookup[id], id, false, "LowLevel", id);
      lowLevelLock = true;
    }

    if (actionLookup[id] == 6 && !targetTopology) {
      if (id.split("_")[0] != "Attribute") {
        filterColumn("#vizDataTable", 5, "^" + id.split("_")[0] + "$", true);
      }
      selectCharts(id, actionLookup[id], id.split("_")[1], false, "Target", id);
      targetTopology = true;
    }

    // if (actionLookup[id] == 6 && !targetAttribute) {
    //   filterColumn("#vizDataTable", 6, "^Categorical Value$", true);

    //   //selectCharts(id, actionLookup[id], "Categorical", false, "Target", id);
    //   targetAttribute = true;
    // }
  });

d3.selectAll("td").on("dblclick", function (d) {
  let id = d3.select(this).attr("id");

  if (actionLookup[id] == 1 && highLevelLock) {
    deselectCharts(id, actionLookup[id], "HighLevel");
    highLevelLock = false;
  }
  if (actionLookup[id] == 2 && midLevelLock) {
    deselectCharts(id, actionLookup[id], "MidLevel");
    midLevelLock = false;
  }
  if (actionLookup[id] == 3 && lowLevelLock) {
    deselectCharts(id, actionLookup[id], "LowLevel");
    lowLevelLock = false;
  }
  if (actionLookup[id] == 6 && targetTopology) {
    filterColumn("#vizDataTable", 5, "", false);
    deselectCharts(id, actionLookup[id], "Target");
    targetTopology = false;
  }
});

// =========================================================================================================

function clearSelection() {
  filterColumn("#vizDataTable", 2, "");
  filterColumn("#vizDataTable", 3, "");
  filterColumn("#vizDataTable", 6, "");

  midLevelLock = false;
  lowLevelLock = false;
  targetTopology = false;

  d3.selectAll(".selected").attr("class", "w3-center");

  ["MidLevel", "LowLevel", "Target"].map((d) => {
    removeFilterTags(d);
  });
}
