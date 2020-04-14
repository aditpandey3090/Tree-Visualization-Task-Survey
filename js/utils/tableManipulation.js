/**
 * Filter DataTable's given column
 * 
 * @param {string} tableSelector
 * @param {number} columnNumber
 * @param {string} query
 */
function filterColumn(tableSelector, columnNumber, query) {
    $(tableSelector).DataTable().columns(columnNumber).search(query).draw();
  }