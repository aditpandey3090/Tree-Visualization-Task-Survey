fetchProposedData().then(
    data => {
        console.log(data);
        appendTable();
        createSearchableTable(data);
    },
    error => console.log(error)
  );

  function appendTable() {
    $("body").append(
      '<table id="vizDataTable" class="display" width="100%"></table>'
    );
  }
  
  function createSearchableTable(dataSet) {
    $(document).ready(function() {
      $("#vizDataTable").DataTable({
        data: dataSet,
        order: [[3, "desc"]],
        columns: [
          {
            title: 'Task Description   <span><i class="fa fa-info-circle"></i></span>',
            data: "Task Description"
          },
          {
            title: 'Complex    <span><i class="fa fa-info-circle"></i></span>',
            data: "Complex"
          },
          {
            title:
              'Analyze(Consume)    <span><i class="fa fa-info-circle"></i></span>',
            data: "Analyze(Consume)"
          },
          {
            title:
              'Action(Search)     <i class="fa fa-info-circle"></i>',
            data: "Action(Search)"
          },
          {
            title: 'Action(Query)      <i class="fa fa-info-circle"></i> ',
            data: "Action(Query)"
          },
          {
            title: 'Target       <i class="fa fa-info-circle"></i> ',
            data: "Target"
          },
          {
            title: 'Specific Target    <span><i class="fa fa-info-circle"></i></span>',
            data: "Specific Target"
          },
          {
            title: 'Target Attribute    <span><i class="fa fa-info-circle"></i></span>',
            data: "Target Attribute"
          },
          {
            title: 'Target Attribute Descriptor    <span><i class="fa fa-info-circle"></i></span>',
            data: "Target Attribute Descriptor"
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