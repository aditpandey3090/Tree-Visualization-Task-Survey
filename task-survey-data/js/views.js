function createSunburstChart(data, id, classname) {
  // margin = { left: 100, top: 100, right: 100, bottom: 100 };
  format = d3.format(",d");

  var width = document.getElementById(id).clientWidth / 3;

  //var width = 500;
  var height = document.getElementById(id).clientWidth / 4;
  var radius = Math.min(width, height) / 2;
  partition = (data) =>
    d3.partition().size([2 * Math.PI, radius])(
      d3
        .hierarchy(data)
        .sum((d) => d.count)
        .sort((a, b) => b.count - a.count)
    );

  arc = d3
    .arc()
    .startAngle((d) => d.x0)
    .endAngle((d) => d.x1)
    .padAngle((d) => Math.min((d.x1 - d.x0) / 2, 0.005))
    .padRadius(radius / 2)
    .innerRadius((d) => d.y0)
    .outerRadius((d) => d.y1 - 1);

  const root = partition(data);

  let depthArray = root.descendants().map((d) => d.depth);
  let maxDepth = d3.max(depthArray);
  console.log(maxDepth);

  color = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, 10));

  const svg1 = d3
    .select("#" + id)
    .append("svg")
    .attr("class", classname) //ToDo:Add a more descriptive classname
    .attr("viewBox", "0 0 " + width + " " + height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  svg1
    .attr("fill-opacity", 0.6)
    .selectAll("path")
    .data(root.descendants().filter((d) => d.depth))
    .enter()
    .append("path")
    .attr("class", "sunburst")
    .attr("fill", (d) => {
      console.log(d.depth);
      while (maxDepth - d.depth < 1) d = d.parent;
      return color(d.data.name);
    })
    .attr("d", arc)
    // .on("mouseover", function (d) {
    //   let currentSelection = d.data.name;
    //   let paths = d3.selectAll(".sunburst");
    //   let allText = d3.selectAll(".embeddedlabel");
    //   hierarchicalSelection(currentSelection, paths, allText);
    //   //Select only the mouseovered sector
    //   d3.select(this).attr("opacity", 1);
    // })
    // .on("mouseleave", function (d) {
    //   d3.selectAll(".sunburst").attr("opacity", 1);
    //   d3.selectAll(".embeddedlabel").style("opacity", 1);
    // })
    .on("click", function (d) {
      let currentSelection = d.data.name;
      let paths = d3.select("." + classname).selectAll(".sunburst");
      hierarchicalSelection(currentSelection, paths);
      //Select only the mouseovered sector
      d3.select(this).attr("opacity", 1);

      if (classname == "targetChart") {
        filterColumn(
          "#vizDataTable",
          columnLookupTasksTarget[d.depth],
          d.data.name
        );
      }

      if (classname == "actionChart") {
        filterColumn(
          "#vizDataTable",
          columnLookupTasksAction[d.depth],
          d.data.name
        );
      }
    })
    .on("dblclick", function (d) {
      d3.select("." + classname)
        .selectAll(".sunburst")
        .attr("opacity", 1);

      if (classname == "targetChart") {
        filterColumn("#vizDataTable", columnLookupTasksTarget[d.depth], "");
      }

      if (classname == "actionChart") {
        filterColumn("#vizDataTable", columnLookupTasksAction[d.depth], "");
      }
    })
    .append("title")
    .text(
      (d) =>
        `${d
          .ancestors()
          .map((d) => d.data.name)
          .reverse()
          .join("/")}\n${format(d.value)}`
    );

  svg1
    .append("g")
    .attr("pointer-events", "none")
    .attr("text-anchor", "middle")
    .attr("font-size", 7)
    .attr("font-family", "sans-serif")
    .selectAll("text")
    .data(root.descendants())
    .enter()
    .append("text")
    .attr("class", "embeddedlabel")
    .attr("transform", function (d) {
      if (d.depth != 0) {
        const x = (((d.x0 + d.x1) / 2) * 180) / Math.PI;
        const y = (d.y0 + d.y1) / 2;
        return `rotate(${x - 90}) translate(${y},0) rotate(${
          x < 180 ? 0 : 180
        })`;
      }
    })
    .attr("dy", "0.35em")
    .text((d) => {
      if (d.y1 - d.y0 < d.data.name.length * 3) {
        let maxLen = Math.round((d.y1 - d.y0) / 5);
        return d.data.name.substr(0, maxLen) + "...";
      } else {
        return d.data.name;
      }
    })
    .style("display", function (d) {
      if (((d.y0 + d.y1) / 2) * (d.x1 - d.x0) > 10) {
        return "";
      } else {
        return "none";
      }
    });
}

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
