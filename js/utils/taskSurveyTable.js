function appendTaskSurveyTable(element) {
    $(element).append(
      '<table id="vizDataTable" class="table table-bordered" width="100%"></table>'
    );
  }

function createTaskSurveyTable(dataSet, paginate = true, info = true, searching = true) {
    $(document).ready(function() {
      $("#vizDataTable").DataTable({
        data: dataSet,
        order: [[3, "desc"]],
        info: info,
        searching: searching,
        columns: [
          {
            title:
              'Task Description   <span data-toggle="tooltip" title="Task Description"><i class="fa fa-info-circle"></i></span>',
            data: "Task Description",
            width: "30%"
          },
          {
            title: 'Complex    <span data-toggle="tooltip" title="Complex"><i class="fa fa-info-circle"></i></span>',
            data: "Complex"
          },
          {
            title:
              'Analyze(Consume)    <span data-toggle="tooltip" title="Analyze(Consume)"><i class="fa fa-info-circle"></i></span>',
            data: "Analyze(Consume)"
          },
          {
            title: 'Action(Search)     <span data-toggle="tooltip" title="Action(Search)"><i class="fa fa-info-circle"></i></span>',
            data: "Action(Search)"
          },
          {
            title: 'Action(Query)      <span data-toggle="tooltip" title="Action(Query)"><i class="fa fa-info-circle"></i></span>',
            data: "Action(Query)"
          },
          {
            title: 'Target       <span data-toggle="tooltip" title="Target"><i class="fa fa-info-circle"></i></span> ',
            data: "Target"
          },
          {
            title:
              'Specific Target   <span data-toggle="tooltip" title="Specific Target"><i class="fa fa-info-circle"></i></span>',
            data: "Specific Target"
          },
          {
            title:
              'Target Attribute    <span data-toggle="tooltip" title="Task Description"><i class="fa fa-info-circle"></i></span>',
            data: "Target Attribute"
          },
          {
            title:
              'Target Attribute Descriptor    <span data-toggle="tooltip" title="Task Description"><i class="fa fa-info-circle"></i></span>',
            data: "Target Attribute Descriptor"
          }
        ],
        "bPaginate": paginate,
        initComplete: function(settings) {
          $('#vizDataTable').tooltip({selector: '[data-toggle="tooltip"]'});
        }
      });
    });
  }