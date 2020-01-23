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
