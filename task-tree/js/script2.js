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

const dataStruct = {
    Enclosure: 0,
    "Indented List": 0,
    Layered: 0,
    "Node-Link": 0,
    Symbolic: 0,
    Hybrid: 0,
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
    createTable("#actionMatrix", Object.values(finalData.action.search));
    createTable("#actionQueryMatrix", Object.values(finalData.action.query));
    createTable("#targetTopoTree", Object.values(finalData.target.Topology["Tree"]));
    createTable("#targetTopoSubtree", Object.values(finalData.target.Topology["Subtree"]));
    createTable("#targetTopoNode", Object.values(finalData.target.Topology["Node"]));
    createTable("#targetTopoPath", Object.values(finalData.target.Topology["Path"]));
    createTable("#targetAttInternalNode", Object.values(finalData.target.Attribute["Internal Node"]));
    createTable("#targetAttLeafNode", Object.values(finalData.target.Attribute["Leaf Node"]));
    createTable("#targetAttLink", Object.values(finalData.target.Attribute["Link"]));
});;

function addActionData(pd, sd) {
    const actionSearch = pd["Action(Search)"];
    const actionQuery = pd["Action(Query)"];

    const layouts = extractLayouts(sd.Layouts_Considered);

    addArrayEntry(pd["Action(Search)"], finalData.action.search);
    addArrayEntry(pd["Action(Query)"], finalData.action.query);
    layouts.forEach((layout) => {
        finalData.action.search[pd["Action(Search)"]][layout] += 1;
        finalData.action.query[pd["Action(Query)"]][layout] += 1;
    });
}

function addTargetData(pd, sd) {

    const data = finalData.target[pd["Target"]][pd["Specific Target"]];
    const layouts = extractLayouts(sd.Layouts_Considered);
    addArrayEntry(pd["Target Attribute"], data);
    layouts.forEach((layout) => {
        finalData.target[pd["Target"]][pd["Specific Target"]][pd["Target Attribute"]][layout] += 1;
    });
}

function addArrayEntry(key, data) {
    const item = JSON.parse(JSON.stringify(dataStruct));
    item.row_header = key;
    !Object.keys(data).includes(key) && (data[key] = item);
}