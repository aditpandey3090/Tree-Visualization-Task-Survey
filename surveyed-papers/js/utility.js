//Create a function that can take entire data, and indexing variable to create a frequency chart
function createFrequencyData(data, dimension) {
  var result = [];
  data.reduce(function (res, value) {
    if (!res[value[dimension]]) {
      res[value[dimension]] = {
        Id: value[dimension],
        count: 0,
        entireData: value,
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
  data.reduce(function (res, value) {
    let vizTypes = value[dimension].split(",");
    vizTypes.forEach((element) => {
      if (!res[element]) {
        res[element] = {
          Id: element,
          count: 0,
          entireData: value,
        };
        result.push(res[element]);
      }
      res[element].count += 1;
    });
    return res;
  }, {});

  return result;
}

// GLOBAL vars
const MIN_YEAR_DEFAULT = 0;
const MAX_YEAR_DEFAULT = 1000000;
let minYear = MIN_YEAR_DEFAULT;
let maxYear = MAX_YEAR_DEFAULT;

function setYearToDefault() {
  minYear = MIN_YEAR_DEFAULT;
  maxYear = MAX_YEAR_DEFAULT;
}

function setRange(min, max) {
  minYear = min;
  maxYear = max;
}

/**
 * Filters datatable on year column for the provided range.
 * Could be used to clear the range filter on year column.
 *
 * Usages:
 *  - rangeFilterOnYear(2015, 2020)
 *  - rangeFilterOnYear(clear = true)
 *
 * @param {number} min
 * @param {number} max
 * @param {boolean} clear :[OPTIONAL] false by default. If set to true, filter would be removed
 */
function rangeFilterOnYear(min, max, clear = false) {
  if (clear) {
    setYearToDefault();
  } else {
    setRange(min, max);
  }
  $("#vizDataTable").DataTable().draw();
}
