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
    .text(function(d) {
      return d;
    });

  var tr = table1
    .selectAll("tr.data")
    .data(data)
    .join("tr")
    .attr("class", "datarow")
    .attr("id", d => {
      return "rowId_" + d["year"]; //ToDo Change the id here
    });

  Object.keys(data[0]).forEach(element => {
    tr.append("td")
      .attr("class", element)
      .text(function(d) {
        return d[element];
      });
  });
}
//=====================================================================================================//

function drawLineChart(data, width, height, dimension, attribute, classname) {
  var svg1 = d3
    .select("body")
    .append("svg")
    .attr("class", classname) //ToDo:Add a more descriptive classname
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var parseTime = d3.timeParse("%Y");

  data.forEach(function(d) {
    d.dimension = parseTime(d[dimension]);
    d.attribute = +d[attribute];
  });

  let x = d3
    .scaleTime()
    .domain(
      d3.extent(data, function(d) {
        return d[dimension];
      })
    )
    .range([margin.left, width - margin.right]);

  let y = d3
    .scaleLinear()
    .domain([0, d3.max(data, d => d[attribute])])
    .nice()
    .range([height - margin.bottom, margin.top]);

  let line = d3
    .line()
    .x(function(d, i) {
      return x(d[dimension]);
    }) // set the x values for the line generator
    .y(function(d) {
      return y(d[attribute]);
    }) // set the y values for the line generator
    .curve(d3.curveMonotoneX); // apply smoothing to the line

  xAxis = g =>
    g
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .attr("class", "xaxis")
      .call(d3.axisBottom(x).tickFormat(d3.format("d")));

  yAxis = g =>
    g
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y))
      .attr("class", "yaxis")
      .call(g => g.select(".domain").remove());

  const gx = svg1.append("g").call(xAxis);
  const gy = svg1.append("g").call(yAxis);

  svg1
    .append("path")
    .datum(data) // 10. Binds data to the line
    .attr("class", "line") // Assign a class for styling
    .attr("transform", `translate(0,0)`)
    .attr("d", line); // 11. Calls the line generator

  svg1
    .selectAll(".dot")
    .data(data)
    .join("circle") // Uses the enter().append() method
    .attr("class", "dot") // Assign a class for styling
    .attr("cx", function(d, i) {
      return x(d[dimension]);
    })
    .attr("cy", function(d) {
      return y(d[attribute]);
    })
    .attr("r", 5)
    .attr("transform", `translate(0,0)`)
    .on("mouseover", function(a, b, c) {
      this.attr("class", "focus");
    })
    .on("mouseout", function() {});
}

//=====================================================================================================//

function drawBarChart(data, width, height, dimension, attribute, classname) {
  //Setup the svg for chart drawing
  var svg = d3
    .select("body")
    .append("svg")
    .attr("class", classname) //ToDo:Add a more descriptive classname
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  const t = svg.transition().duration(750);

  // var data = [
  //   { year: 2010, val: 3 },
  //   { year: 2011, val: 4 },
  //   { year: 2012, val: 5 }
  // ];

  var x = d3
    .scaleBand()
    .domain(data.map(d => d[dimension]))
    .range([margin.left, width - margin.right])
    .padding(0.1);

  var y = d3
    .scaleLinear()
    .domain([0, d3.max(data, d => d[attribute])])
    .nice()
    .range([height - margin.bottom, margin.top]);

  xAxis = g =>
    g
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .attr("class", "xaxis")
      .call(d3.axisBottom(x).tickSizeOuter(0));

  yAxis = g =>
    g
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y))
      .attr("class", "yaxis")
      .call(g => g.select(".domain").remove());

  const bar = svg
    .selectAll("rect")
    .data(data)
    .join("rect")
    .transition(t)
    .attr("x", d => x(d[dimension]))
    .attr("y", d => y(d[attribute]))
    .attr("height", d => y(0) - y(d[attribute]))
    .attr("width", x.bandwidth());

  const gx = svg.append("g").call(xAxis);
  const gy = svg.append("g").call(yAxis);
}

//=====================================================================================================//

// Code to draw a pie chart

// var svg2 = d3
//   .select("body")
//   .append("svg")
//   .attr("class", "chart3") //ToDo:Add a more descriptive classname
//   .attr("width", width + margin.left + margin.right)
//   .attr("height", height + margin.top + margin.bottom)
//   .append("g");

function drawPieChart(data) {
  let pie = d3
    .pie()
    .padAngle(0.005)
    .sort(null)
    .value(d => d.val);

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
  $(document).ready(function() {
    $("#vizDataTable").DataTable({
      data: dataSet,
      order: [[1, "desc"]],
      columns: [
        { title: "Paper", data: "Paper_Title" },
        { title: "Year", data: "Year" },
        { title: "Type (S/E/D)", data: "Type (S/E/D)" },
        {
          title: "Evaluation Type (O/S/M/EX/ET/I/C)",
          data: "Evaluation_Type (O/S/M/EX/ET/I/C)"
        },
        { title: "Stimuli Description", data: "Stimuli_Description" },
        { title: "Layouts Considered", data: "Layouts_Considered" },
        {
          title: "More Information",
          data: "DOI",
          render: function(data, type, row, meta) {
            data = '<a href="' + data + '" target="_blank">' + data + "</a>";
            return data;
          }
        }
      ],
      initComplete: function(settings) {
        $("#vizDataTable thead th").each(function() {
          var $td = $(this);
          $td.attr("title", $td.text());
        });

        /* Apply the tooltips */
        $("#vizDataTable thead th[title]").tooltip({
          container: "body"
        });
      }
    });
  });
}
//================================================================================================================//
