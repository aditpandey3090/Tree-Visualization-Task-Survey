function appendTaskSurveyTable(element) {
    $(element).append(
      '<div class="w3-container"><table id="vizDataTable" class="table table-bordered" width="100%"></table></div>'
      );
  }

function createTaskSurveyTable(dataSet, paginate = true, info = true, searching = true, showLink = true) {
    $(document).ready(function() {
      $("#vizDataTable").DataTable({
        data: dataSet,
        order: [[3, "desc"]],
        info: info,
        searching: searching,
        columns: [
          {
            title:
              'Task Description   <span data-toggle="tooltip" title="Task Description"></span>',
            data: "Task Description",
            width: "30%",
            render: function (data, type, row, meta) {
              if (showLink) {
                data =
                '<a href="../profile?id=' +
                row.PaperId +
                '" target="_blank">' +
                data +
                "</a>";
              }
              return data;
            }
          },
          {
            title:
              'Analyze(Consume)    <span data-toggle="tooltip" title="Analyze(Consume)"></span>',
            data: "Analyze(Consume)"
          },
          {
            title: 'Action(Search)     <span data-toggle="tooltip" title="Action(Search)"></span>',
            data: "Action(Search)"
          },
          {
            title: 'Action(Query)      <span data-toggle="tooltip" title="Action(Query)"></span>',
            data: "Action(Query)"
          },
          {
            title: 'Target       <span data-toggle="tooltip" title="Target"></span> ',
            data: "Target"
          },
          {
            title:
              'Specific Target   <span data-toggle="tooltip" title="Specific Target"></span>',
            data: "Specific Target"
          },
          {
            title:
              'Target Attribute    <span data-toggle="tooltip" title="Task Description"></span>',
            data: "Target Attribute"
          },
          {
            title:
              'Target Attribute Descriptor    <span data-toggle="tooltip" title="Task Description"></span>',
            data: "Target Attribute Descriptor"
          },
          {
            title:
              'Special Task    <span data-toggle="tooltip" title="Special Task"></span>',
            data: "Special Task Marker"
          }
        ],
        "bPaginate": paginate,
        initComplete: function(settings) {
          $('#vizDataTable').tooltip({selector: '[data-toggle="tooltip"]'});
        }
      });
    });
  }