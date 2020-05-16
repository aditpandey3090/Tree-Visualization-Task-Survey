async function fetchPaperData() {
  const [surveyData, proposedData] = await Promise.all([
    fetchSurveyData(),
    fetchProposedData(),
  ]);

  const generatedSurveyData = {}
  surveyData.forEach(d => {
    generatedSurveyData[d["Ref_Id"]] = d;
  })
  return { survey_data: generatedSurveyData, proposed_data: proposedData };
}

const internalStruct = {
    number: 0,
    data: []
}
const dataStruct = {
    Enclosure: internalStruct,
    "Indented List": internalStruct,
    Layered: internalStruct,
    "Node-Link": internalStruct,
    Symbolic: internalStruct,
    Hybrid: internalStruct,
}

const finalData = {
    "action": {
        "search": {},
        "query": {}
    },
    "target": {
        "Topology": {
            "Tree": {},
            "Subtree": {},
            "Path": {},
            "Node": {},

        },
        "Attribute": {
            "Link": {},
            "Leaf Node": {},
            "Internal Node": {}
        }
    }
}

fetchPaperData()
  .then((data) => {
    const surveyData = data.survey_data;
    const proposedData = data.proposed_data;
    
    // proposedData.filter((pd) => Object.keys(surveyData)pd.PaperId)
    proposedData.forEach((pd) => {
        const id = pd.PaperId;
        addActionData(pd, surveyData[id]);
        addTargetData(pd, surveyData[id]);
    });
    console.log("Buffer")
}).then((result) => {
    createTable("#actionMatrix", Object.values(finalData.action.search), {heading: "Action", type: "Search"});
    createTable("#actionQueryMatrix", Object.values(finalData.action.query), {heading: "Action", type: "Query"});
    createTable("#targetTopoTree", Object.values(finalData.target.Topology["Tree"]), {heading: "Target", type: "Topology", subtype: "Tree"});
    createTable("#targetTopoSubtree", Object.values(finalData.target.Topology["Subtree"]), {heading: "Target", type: "Topology", subtype: "Subtree"});
    createTable("#targetTopoNode", Object.values(finalData.target.Topology["Node"]), {heading: "Target", type: "Topology", subtype: "Node"});
    createTable("#targetTopoPath", Object.values(finalData.target.Topology["Path"]), {heading: "Target", type: "Topology", subtype: "Path"});
    createTable("#targetAttInternalNode", Object.values(finalData.target.Attribute["Internal Node"]), {heading: "Target", type: "Attribute", subtype: "Internal Node"});
    createTable("#targetAttLeafNode", Object.values(finalData.target.Attribute["Leaf Node"]), {heading: "Target", type: "Attribute", subtype: "Leaf Node"});
    createTable("#targetAttLink", Object.values(finalData.target.Attribute["Link"]), {heading: "Target", type: "Attribute", subtype: "Link"});
});;

function addActionData(pd, sd) {
    const actionSearch = pd["Action(Search)"];
    const actionQuery = pd["Action(Query)"];

    const layouts = extractLayouts(sd.Layouts_Considered);

    addArrayEntry(pd["Action(Search)"], finalData.action.search);
    addArrayEntry(pd["Action(Query)"], finalData.action.query);
    layouts.forEach((layout) => {
        finalData.action.search[pd["Action(Search)"]][layout]["data"].push(pd)
        finalData.action.search[pd["Action(Search)"]][layout]["number"] += 1;
        finalData.action.query[pd["Action(Query)"]][layout]["data"].push(pd)
        finalData.action.query[pd["Action(Query)"]][layout]["number"] += 1;
    });
}

function addTargetData(pd, sd) {

    const data = finalData.target[pd["Target"]][pd["Specific Target"]];
    const layouts = extractLayouts(sd.Layouts_Considered);
    addArrayEntry(pd["Target Attribute"], data);
    layouts.forEach((layout) => {
        finalData.target[pd["Target"]][pd["Specific Target"]][pd["Target Attribute"]][layout]["data"].push(pd)
        finalData.target[pd["Target"]][pd["Specific Target"]][pd["Target Attribute"]][layout]["number"] += 1;
    });
}

function addArrayEntry(key, data) {
    const item = JSON.parse(JSON.stringify(dataStruct));
    item.row_header = key;
    !Object.keys(data).includes(key) && (data[key] = item);
}

function displayModal(e) {
    const jElement = $(e);
    if (jElement.data("data").length === 0) {
        return;
    }
    $("#modalHeading").html(jElement.data("metadata").heading);
    $("#modalType").html(jElement.data("metadata").type);
    const subtype = jElement.data("metadata").subtype
    if (subtype === undefined) {
        $("#modalSubtype").hide();
    } else {
        $("#modalSubtype").html(subtype).show();
    }
    $("#modalColumn").html(jElement.data("column"));
    $("#modalRow").html(jElement.data("row"));
    
    appendTaskSurveyTable("#tableContainer");
    createTaskSurveyTable(jElement.data("data"));
    document.getElementById('id01').style.display='block'
}

function closeModal(e) {
    var table = $('#vizDataTable').DataTable().destroy();
    document.getElementById('id01').style.display='none'
}

