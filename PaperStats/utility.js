//Create a function that can take entire data, and indexing variable to create a frequency chart
function createFrequencyData(data, dimension) {
  var result = [];
  data.reduce(function(res, value) {
    if (!res[value[dimension]]) {
      res[value[dimension]] = {
        Id: value[dimension],
        count: 0,
        entireData: value
      };
      result.push(res[value[dimension]]);
    }
    res[value[dimension]].count += 1;
    return res;
  }, {});
  return result.sort((data1, data2) => {
    return parseInt(data1.Id) - parseInt(data2.Id);
  });
}

//Special version of frequency Chart for columns with commma-seperated value
function createMultiValueFreqData(data, dimension) {
  var result = [];
  // var res = {};
  data.reduce(function(res, value) {
    let vizTypes = value[dimension].split(",");
    vizTypes.forEach(element => {
      if (!res[element]) {
        res[element] = {
          Id: element,
          count: 0,
          entireData: value
        };
        result.push(res[element]);
      }
      res[element].count += 1;
    });
    return res;
  }, {});

  return result;
}

/**
 * Filter DataTable's given column
 *
 * @param {number} columnNumber
 * @param {String} query
 */
function filterColumn(columnNumber, query) {
  $("#vizDataTable")
    .DataTable()
    .columns(columnNumber)
    .search(query)
    .draw();
}
