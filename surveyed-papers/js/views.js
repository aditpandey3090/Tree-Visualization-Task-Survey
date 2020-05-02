function createTable(data) {
  let localInstanceofData = getAllFilesData();

  var table1 = d3
    .select("body")
    .append("table")
    .attr("id", "myTable")
    .attr("transform", `translate(${margin.left},0)`);

  // For each column we have to add values
  var theader = table1.append("tr").attr("class", "header");

  theader
    .selectAll("th")
    .data(Object.keys(data[0]))
    .join("th")
    .text(function (d) {
      return d;
    });

  var tr = table1
    .selectAll("tr.data")
    .data(data)
    .join("tr")
    .attr("class", "datarow")
    .attr("id", (d) => {
      return "rowId_" + d["year"]; //ToDo Change the id here
    });

  Object.keys(data[0]).forEach((element) => {
    tr.append("td")
      .attr("class", element)
      .text(function (d) {
        return d[element];
      });
  });
}
//=====================================================================================================//

function drawLineChart(
  data,
  height,
  dimension,
  attribute,
  classname,
  id,
  axisLabel
) {
  margin = { left: 7, top: 10, right: 25, bottom: 50 };
  width = document.getElementById(id).clientWidth / 2;
  height = height / 2;

  var svg1 = d3
    .select("#" + id)
    .append("svg")
    .attr("class", classname) //ToDo:Add a more descriptive classname
    .attr("viewBox", "0 0 " + width + " " + height)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var parseTime = d3.timeParse("%Y");

  data.forEach(function (d) {
    d.dimension = parseTime(d[dimension]);
    d.attribute = +d[attribute];
  });

  let x = d3
    .scaleTime()
    .domain(
      d3.extent(data, function (d) {
        return d[dimension];
      })
    )
    .range([margin.left, width - margin.right]);

  let y = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d[attribute])])
    .nice()
    .range([height - margin.bottom, margin.top]);

  let line = d3
    .line()
    .x(function (d, i) {
      return x(d[dimension]);
    }) // set the x values for the line generator
    .y(function (d) {
      return y(d[attribute]);
    }) // set the y values for the line generator
    .curve(d3.curveMonotoneX); // apply smoothing to the line

  xAxis = (g) =>
    g
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .attr("class", "xaxis")
      .call(d3.axisBottom(x).tickFormat(d3.format("d")).ticks(5));

  yAxis = (g) =>
    g
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(5))
      .attr("class", "yaxis")
      .call((g) => g.select(".domain").remove());

  const gx = svg1.append("g").call(xAxis);
  const gy = svg1.append("g").call(yAxis);

  svg1
    .append("path")
    .datum(data) // 10. Binds data to the line
    .attr("class", "line") // Assign a class for styling
    .attr("transform", `translate(0,0)`)
    .attr("d", line); // 11. Calls the line generator

  let points = svg1
    .selectAll(".dot")
    .data(data)
    .join("circle") // Uses the enter().append() method
    .attr("class", "dot") // Assign a class for styling
    .attr("cx", function (d, i) {
      return x(d[dimension]);
    })
    .attr("cy", function (d) {
      return y(d[attribute]);
    })
    .attr("r", 5)
    .attr("transform", `translate(0,0)`)
    .on("mouseover", function (a, b, c) {
      this.attr("class", "focus");
    })
    .on("mouseout", function () {});

  //Adding a brush for selection
  let brush = d3.brushX().on("start brush", brushed).on("end", brushEnd);

  svg1.call(brush);

  //Creating a brushing function for the visualization code

  var selected = [];

  function brushed() {
    if (!d3.event.sourceEvent) return; // Only transition after input.
    if (!d3.event.selection) return; // Ignore empty selections.

    let [x1, x2] = d3.event.selection;
    points.classed("selected", (d) => {
      if (x1 <= x(d[dimension]) && x(d[dimension]) <= x2) {
        selected.push(parseInt(d[dimension]));
        // filterCol = columnLookup[classname];
        // filterColumn(filterCol, d[dimension]);
        return true;
      } else {
        return false;
      }
    });

    // if (!d3.event.selection) {
    //   return null;
    // }
    // //De Selection COde
    // filterCol = columnLookup[classname];
    // filterColumn(filterCol, "");
    // //The selection removal part
    // let [[x1, y1], [x2, y2]] = d3.event.selection;
    // points.classed("selected", (d) => {
    //   if (
    //     x1 <= x(d[dimension]) &&
    //     x(d[dimension]) <= x2 &&
    //     y1 <= y(d[attribute]) &&
    //     y(d[attribute]) <= y2
    //   ) {
    //     selected.push(d[d[dimension]]);
    //     filterCol = columnLookup[classname];
    //     filterColumn(filterCol, d[dimension]);
    //     return true;
    //   } else {
    //     return false;
    //   }
    // });
  }

  function brushEnd() {
    if (!d3.event.sourceEvent) return; // Only transition after input.
    if (!d3.event.selection) {
      rangeFilterOnYear(MIN_YEAR_DEFAULT, MAX_YEAR_DEFAULT);
      return;
    } // Ignore empty selections.

    rangeFilterOnYear(d3.min(selected), d3.max(selected));

    //Clear Filter Selection
    selected = [];
  }

  svg1
    .append("text")
    .attr("class", "xaxis")
    .attr("y", height - margin.bottom + 3 * margin.top)
    .attr("x", (width - margin.left - margin.right) / 2)
    .attr("dy", ".32em")
    .style("text-anchor", "middle")
    .text(axisLabel)
    .style("fill", "black");
}

//=====================================================================================================//

let clickedClass = []; // This variable keeps track of the currently selected charts

function drawBarChart(
  data,
  height,
  dimension,
  attribute,
  classname,
  id,
  axisLabel
) {
  margin = { left: 35, top: 10, right: 40, bottom: 50 };
  width = document.getElementById(id).clientWidth / 2;
  height = height / 2;

  data.sort(function (a, b) {
    return a[attribute] - b[attribute];
  });

  data = data.filter((d) => d[dimension] != "-");

  console.log(data);

  //Setup the svg for chart drawing
  var svg = d3
    .select("#" + id)
    .append("svg")
    .attr("class", classname) //ToDo:Add a more descriptive classname
    .attr("viewBox", "0 0 " + width + " " + height)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var x = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d[attribute])])
    .range([margin.left, width - margin.right]);

  var y = d3
    .scaleBand()
    .domain(data.map((d) => d[dimension]))
    .range([height - margin.bottom, margin.top])
    .padding(0.1);

  xAxis = (g) =>
    g
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .attr("class", "xaxis")
      .call(d3.axisBottom(x).tickSizeOuter(0));

  yAxis = (g) =>
    g
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y))
      .attr("class", "yaxis")
      .call((g) => g.select(".domain").remove());

  var click = false;

  var barGroup = svg.append("g");

  const bar = barGroup
    .selectAll("rect")
    .data(data)
    .join("rect")
    .attr("class", "bar")
    .attr("x", (d) => margin.left)
    .attr("y", (d) => y(d[dimension]))
    .attr("width", (d) => x(d[attribute]) - margin.left)
    .attr("height", y.bandwidth())
    .on("click", function (d) {
      if (!clickedClass.includes(classname)) {
        d3.select(this).attr("class", "selected");
        filterCol = columnLookup[classname];
        filterColumn("#vizDataTable", filterCol, d[dimension]);
        clickedClass.push(classname);
      }
      console.log(clickedClass);
    })
    .on("dblclick", function (d) {
      d3.selectAll(".selected").classed("selected", false);
      filterCol = columnLookup[classname];
      filterColumn("#vizDataTable", filterCol, "");
      clickedClass = [];
    });

  barGroup
    .selectAll("text")
    .data(data)
    .enter()
    .append("text")
    .attr("x", function (d) {
      return x(d[attribute]) - margin.left / 2;
    })
    .attr("y", (d) => y(d[dimension]) + y.bandwidth() / 2)
    .attr("dy", ".35em")
    .text(function (d) {
      return d[attribute];
    })
    .style("fill", "white");

  const gx = svg.append("g").call(xAxis);
  const gy = svg.append("g").call(yAxis);

  // text label for the y axis
  svg
    .append("text")
    .attr("class", "xaxis")
    .attr("y", height - margin.bottom + 3 * margin.top)
    .attr("x", (width - margin.left - margin.right) / 2)
    .attr("dy", ".32em")
    .style("text-anchor", "middle")
    .text(axisLabel)
    .style("fill", "black");
}

//=====================================================================================================//

// Code to draw a pie chart

function drawPieChart(data) {
  let pie = d3
    .pie()
    .padAngle(0.005)
    .sort(null)
    .value((d) => d.val);

  const radius = Math.min(width, height) / 2;
  let arcGenerator = d3
    .arc()
    .innerRadius(radius * 0.67)
    .outerRadius(radius - 1)
    .padAngle(0.02)
    .padRadius(100)
    .cornerRadius(4);

  let arcs = pie(data);

  console.log(arcs);
  svg2
    .selectAll("path")
    .data(arcs)
    .join("path")
    .attr("d", arcGenerator)
    .attr("transform", `translate(${width / 2},${height / 2})`);
}

//drawPieChart(data);

//================================================================================================================//
// Latest Table Code
function appendTable() {
  $("body").append(
    '<table id="vizDataTable" class="display" width="100%"></table>'
  );
}

function createSearchableTable(dataSet) {
  $(document).ready(function () {
    $("#vizDataTable").DataTable({
      data: dataSet,
      order: [[1, "desc"]],
      columns: [
        {
          title: 'Paper   <span><i class="fa fa-info-circle"></i></span>',
          data: "Paper_Title",
          render: function (data, type, row, meta) {
            data =
              '<a href="../profile?id=' +
              row.Ref_Id +
              '" target="_blank">' +
              data +
              "</a>";
            return data;
          },
        },
        {
          title: 'Year    <span><i class="fa fa-info-circle"></i></span>',
          data: "Year",
        },
        {
          title:
            'Type (S/E/D)    <span><i class="fa fa-info-circle"></i></span>',
          data: "Type (S/E/D)",
        },
        {
          title:
            'Evaluation Type (O/S/M/EX/ET/I/C)     <i class="fa fa-info-circle"></i>',
          data: "Evaluation_Type (O/S/M/EX/ET/I/C)",
        },
        {
          title: 'Stimuli Description      <i class="fa fa-info-circle"></i> ',
          data: "Stimuli_Description",
        },
        {
          title: 'Layouts Considered       <i class="fa fa-info-circle"></i> ',
          data: "Layouts_Considered",
        },
        {
          title: 'More Information       <i class="fa fa-info-circle"></i>',
          data: "DOI",
          render: function (data, type, row, meta) {
            data = '<a href="' + data + '" target="_blank">' + data + "</a>";
            return data;
          },
        },
      ],
      initComplete: function (settings) {
        $("#vizDataTable thead th").each(function () {
          var $td = $(this);
          $td.attr("title", $td.text());
        });

        /* Apply the tooltips */
        $("#vizDataTable thead th[title]").tooltip({
          container: "body",
        });
      },
    });
  });

  const rangeFilterFunc = function (settings, data, dataIndex) {
    var min = minYear;
    var max = maxYear;
    var year = parseFloat(data[1]) || 0;

    if (
      (isNaN(min) && isNaN(max)) ||
      (isNaN(min) && year <= max) ||
      (min <= year && isNaN(max)) ||
      (min <= year && year <= max)
    ) {
      return true;
    }
    return false;
  };
  $.fn.dataTable.ext.search.push(rangeFilterFunc);
}
//================================================================================================================//
