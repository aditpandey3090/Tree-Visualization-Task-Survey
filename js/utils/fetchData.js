/**
 * Calls Google spreadsheet URL to fetch data in the form of JSON.
 * This data is raw. The data can be found for every cell in the
 * spreadsheet and needs to be parsed.
 *
 * For eg. https://spreadsheets.google.com/feeds/cells/19TCHAcFTNa_Va6UankLiZiHxvwUmfXnJyJA7B5hsuIs/1/public/values?alt=json
 * can be interpretted as
 *
 * https://spreadsheets.google.com/feeds/cells/<docId>/<sheetId>/public/values?alt=jso
 * @param {String} docId The unique identifier of the document
 * @param {String} sheetId Incremental integer for the sheet.
 */
function loadDataFromAPI(docId, sheetId) {
  return new Promise(function (resolve, reject) {
    const Http = new XMLHttpRequest();
    const url = `https://spreadsheets.google.com/feeds/cells/${docId}/${sheetId}/public/values?alt=json`;
    
    // const spreadsheetId = '...'
    // fetch(`https://docs.google.com/spreadsheets/d/https://docs.google.com/spreadsheets/d/19TCHAcFTNa_Va6UankLiZiHxvwUmfXnJyJA7B5hsuIs/gviz/tq?tqx=out:json/gviz/tq?tqx=out:json`)
    // .then(res => res.text())
    // .then(text => {
    //     const json = JSON.parse(text);
    //     console.log(json)
    // })


    Http.open("GET", url);
    Http.send();

    Http.onload = (e) => {
      resolve(JSON.parse(Http.responseText).feed.entry);
    };
  });
}

/***
 * Pulls data from the API and returns it wrapped within a Promise.
 * How to use the data?
 *
 * fetchSurveyData().then(
 *  data => console.log(data),
 *  error => console.log(error)
 * );
 */
async function fetchSurveyData() {
  const docId = "19TCHAcFTNa_Va6UankLiZiHxvwUmfXnJyJA7B5hsuIs";
  const sheetId = "1";
  //let data = await loadDataFromAPI(docId, sheetId);

  //ToDo: We have to dynamically insert the final file list count
  const row = 55;
  const col = 10;

  //let createdData = parseRawData(row, col, data);
  let test = [
    {
      "Ref_Id": 2,
      "Paper_Title": "Treemaps: Visualizing Hierarchical\nand Categorical Data",
      "Year": 1993,
      "Type": "Empirical",
      "Evaluation_Type": "Mixed",
      "Stimuli_Description": "Static",
      "Layouts_Considered": "Indented List,Enclosure",
      "DOI": "https://doi.org/10.13016/M28G8FJ9W",
      "Abstract": "Treemaps are a graphical method for the visualization of hierarchical and categorical data sets. Treemap presentations of data shift mental workload from the cognitive to the perceptual systems, taking advantage of the human visual processing system to increase the bandwidth of the human-computer interface. Efficient use of display space allows for the simultaneous presentation of thousands of data records, as well as facilitating the presentation of semantic information. Treemaps let users see the forest and the trees by providing local detail in the context of a global overview, providing a visually engaging environment in which to analyze, search, explore and manipulate large data sets. The treemap method of hierarchical visualization, at its core, is based on the property of containment. This property of containment is a fundamental idea which powerfully encapsulates many of our reasons for constructing information hierarchies. All members of the treemap family of algorithms partition multi-dimensional display spaces based on weighted hierarchical data sets. In addition to generating treemaps and standard traditional hierarchical diagrams, the treemap algorithms extend non-hierarchical techniques such as bar and pie charts into the domain of hierarchical presentation. Treemap algorithms can be used to generate bar charts, outlines, traditional 2-D node and link diagrams, pie charts, cone trees, cam trees, drum trees, etc. Generating existing diagrams via treemap transformations is an exercise meant to show the power, ease, and generality with which alternative presentations can be generated from the basic treemap algorithms. Two controlled experiments with novice treemap users and real data highlight the strengths of treemaps. The first experiment with 12 subjects compares the Macintosh TreeVizTM implementation of treemaps with the UNIX command line for questions dealing with a 530 node file hierarchy. Treemaps are shown to significantly reduce user performance times for global file comparison tasks. A second experiment with 40 subjects compares treemaps with dynamic outlines for questions dealing with the allocation funds in the 1992 US Budget (357 node budget hierarchy). Treemap users are 50% faster overall and as much as 8 times faster for specific questions.",
      "Author": "Brian Scott Johnson"
    },
    {
      "Ref_Id": 3,
      "Paper_Title": "A Comparison of 2-D Visualizations of Hierarchies",
      "Year": 2001,
      "Type": "Empirical",
      "Evaluation_Type": "Quantitative",
      "Stimuli_Description": "Static",
      "Layouts_Considered": "Node-Link,Enclosure,Adjacency",
      "DOI": "https://doi.org/10.1109/INFVIS.2001.963290",
      "Abstract": "This paper describes two experiments that compare four\ntwo-dimensional visualizations of hierarchies: organization\nchart, icicle plot, treemap, and tree ring. The\nvisualizations are evaluated in the context of decision tree\nanalyses prevalent in data mining applications. The\nresults suggest that either the tree ring or icicle plot is\nequivalent to the organization chart.",
      "Author": "Todd Barlow, Padraic Neville"
    },
    {
      "Ref_Id": 4,
      "Paper_Title": "User Experiments with Tree Visualization Systems",
      "Year": 2004,
      "Type": "Empirical",
      "Evaluation_Type": "Mixed",
      "Stimuli_Description": "Interactive",
      "Layouts_Considered": "Node-Link,Enclosure,Adjacency,Symbolic",
      "DOI": "https://doi.org/10.1109/INFVIS.2004.70",
      "Abstract": "This paper describes a comparative experiment with five well- known tree visualization systems, and Windows Explorer as a baseline system. Subjects performed tasks relating to the structure of a directory hierarchy, and to attributes of files and directories. Task completion times, correctness and user satisfaction were measured, and video recordings of subjects’ interaction with the systems were made. Significant system and task type effects and an interaction between system and task type were found. Qualitative analyses of the video recordings were thereupon conducted to determine reasons for the observed differences, resulting in several findings and design recommendations as well as implications for future experiments with tree visualization systems.",
      "Author": "Alfred Kobsa"
    },
    {
      "Ref_Id": 8,
      "Paper_Title": "An evaluation of space-filling information visualizations for depicting hierarchical structures",
      "Year": 2000,
      "Type": "Empirical",
      "Evaluation_Type": "Mixed",
      "Stimuli_Description": "Static",
      "Layouts_Considered": "Enclosure,Adjacency",
      "DOI": "https://doi.org/10.1006/ijhc.2000.0420",
      "Abstract": "A variety of information visualization tools have been developed recently, but relatively little e!ort has been made to evaluate the e!ectiveness and utility of the tools. This article describes results from two empirical studies of two visualization tools for depicting hierarchies, in particular, computer \"le and directory structures. The two tools examined implement space-\"lling methodologies, one rectangular, the Treemap method, and one circular, the Sunburst method. Participants performed typical \"le/directory search and analysis tasks using the two tools. In general, performance trends favored the Sunburst tool with respect to correct task performance, particularly on initial use. Performance with Treemap tended to improve over time and use, suggesting a greater learning cost that was partially recouped over time. Each tool a!orded somewhat di!erent search strategies, which also appeared to in#uence performance. Finally, partici- pants strongly preferred the Sunburst tool, citing better ability to convey structure and hierarchy.",
      "Author": "John Stasko, Richard Catrambone, Mark Guzdial, Kevin McDonald"
    },
    {
      "Ref_Id": 9,
      "Paper_Title": "Evaluation of Traditional, Orthogonal, and Radial Tree Diagrams by an Eye Tracking Study",
      "Year": 2011,
      "Type": "Empirical",
      "Evaluation_Type": "Eye-Tracking",
      "Stimuli_Description": "Static",
      "Layouts_Considered": "Node-Link",
      "DOI": "https://doi.org/10.1109/TVCG.2011.193",
      "Abstract": "Node-link diagrams are an effective and popular visualization approach for depicting hierarchical structures and for show- ing parent-child relationships. In this paper, we present the results of an eye tracking experiment investigating traditional, orthogonal, and radial node-link tree layouts as a piece of empirical basis for choosing between those layouts. Eye tracking was used to identify visual exploration behaviors of participants that were asked to solve a typical hierarchy exploration task by inspecting a static tree diagram: finding the least common ancestor of a given set of marked leaf nodes. To uncover exploration strategies, we examined fixation points, duration, and saccades of participants’ gaze trajectories. For the non-radial diagrams, we additionally investigated the effect of diagram orientation by switching the position of the root node to each of the four main orientations. We also recorded and analyzed correctness of answers as well as completion times in addition to the eye movement data. We found out that traditional and orthogonal tree layouts significantly outperform radial tree layouts for the given task. Furthermore, by applying trajectory analysis techniques we uncovered that participants cross-checked their task solution more often in the radial than in the non-radial layouts.",
      "Author": "Michael Burch, Julian Heinrich, Natalia Konevtsova, Markus H ̈oferlin, Daniel Weiskopf"
    },
    {
      "Ref_Id": 10,
      "Paper_Title": "Elastic Hierarchies: Combining Treemaps and Node-Link Diagrams",
      "Year": 2005,
      "Type": "Technique",
      "Evaluation_Type": "-",
      "Stimuli_Description": "Interactive",
      "Layouts_Considered": "Hybrid",
      "DOI": "https://doi.org/10.1109/INFVIS.2005.1532129",
      "Abstract": "Elastic Hierarchies: Combining Treemaps and Node-Link Diagrams",
      "Author": "Shengdong Zhao, Michael J. McGuffin, Mark H. Chignell"
    },
    {
      "Ref_Id": 11,
      "Paper_Title": "SpaceTree: Supporting Exploration in Large Node Link Tree, Design Evolution and Empirical Evaluation",
      "Year": 2005,
      "Type": "Technique",
      "Evaluation_Type": "Mixed",
      "Stimuli_Description": "Interactive",
      "Layouts_Considered": "Indented List,Node-Link",
      "DOI": "https://doi.org/10.1109/INFVIS.2002.1173148",
      "Abstract": "We present a novel tree browser that builds on the conventional node link tree diagrams. It adds dynamic rescaling of branches of the tree to best fit the available screen space, optimized camera movement, and the use of preview icons summarizing the topology of the branches that cannot be expanded. In addition, it includes integrated search and filter functions. This paper reflects on the evolution of the design and highlights the principles that emerged from it. A controlled experiment showed benefits for navigation to already previously visited nodes and estimation of overall tree topology.",
      "Author": "Catherine Plaisant, Jesse Grosjean, Benjamin B. Bederson"
    },
    {
      "Ref_Id": 12,
      "Paper_Title": "An Evaluation of Cone Trees",
      "Year": 2000,
      "Type": "Empirical",
      "Evaluation_Type": "Mixed",
      "Stimuli_Description": "Interactive",
      "Layouts_Considered": "Node-Link,Indented List",
      "DOI": "https://doi.org/10.1007/978-1-4471-0515-2_28",
      "Abstract": "Cone Trees are an appealing interactive 3D visualization technique for hierarchical data structures. They were originally intended to maximise effective use of available screen space and to better exploit the abilities of the human perceptual system. Prior work has focused on the fidelity of the visualization rather than providing empirical user studies. This paper describes the design, implementation and evaluation of a low- fidelity animated and rapidly interactive 3D cone tree system. Results of the evaluation show that our subjects were slower at locating data using cone trees than when using a ‘normal’ tree browser, and that their performance deteriorated rapidly as the branching factor of the data- structure increased. Qualitative results, however, indicate that the subjects were enthusiastic about the cone tree visualization and that they felt it provided a better ‘feel’ for the structure of the information space.",
      "Author": "Andy Cockburn, Bruce McKenzie"
    },
    {
      "Ref_Id": 13,
      "Paper_Title": "Evaluating the Effectiveness of Tree Visualization Systems for Knowledge Discovery",
      "Year": 2006,
      "Type": "Empirical",
      "Evaluation_Type": "Insight",
      "Stimuli_Description": "Interactive",
      "Layouts_Considered": "Node-Link,Enclosure",
      "DOI": "http://dx.doi.org/10.2312/VisSym/EuroVis06/067-074",
      "Abstract": "User studies, evaluations, and comparisons of tree visualization systems have so far focused on questions that can readily be answered by simple, automated queries without needing visualization. Studies are lacking on the actual use of tree visualization in discovering intrinsic, hidden, non-trivial and potentially valuable knowledge. We have thus formulated a set of tree exploration tasks not previously considered and have performed user studies and analysis to determine how visualization helps users to perform these tasks. In our study, we evaluated three systems: RINGS (a node-link representation), Treemap (a containment representation), and Windows Explorer. Our findings suggest a few ways that tree visualization helps users to perceive different aspects of hierarchical structured information. We then explain how these visual representations are able to trigger human perception to make these discoveries.",
      "Author": "Yue Wang, Soon Tee Teoh, Kwan-Liu Ma"
    },
    {
      "Ref_Id": 14,
      "Paper_Title": "Hierarchy Visualization Designs and their Impact on Perception and Problem Solving Strategies",
      "Year": 2017,
      "Type": "Empirical",
      "Evaluation_Type": "Eye-Tracking",
      "Stimuli_Description": "Interactive",
      "Layouts_Considered": "Node-Link,Enclosure,Adjacency",
      "DOI": "https://www.semanticscholar.org/paper/Hierarchy-Visualization-Designs-and-their-Impact-on-M%C3%BCller-Liebold/66d17dfdd93cf3e90d4049e21e726827c5df24ad",
      "Abstract": "Visualizing hierarchical structures is of great impor- tance in many economic and scientific applications. Many dif- ferent approaches have been developed and enhanced in the last decades. Each of them claims specific advantages over competing methods, usually referring to visual or structural properties. Although several user studies investigated the usefulness of specific approaches, for practitioners it often remains unclear what the practical advantages of the approaches are and in which contexts they are useful. In our user study, we systematically investigated the value of three frequently used visualization types for the intuitive understanding of hierarchical data: treemap, icicle plot, and nodelink. We measured user performance in terms of correctness and time and tracked eye movements for each participant. The results regarding the user performance revealed that nodelink and icicle plot yield expected and comparable results, whereas treemap is only exceeding chance level for one easy task. Still, the analysis of eye-tracking measures suggests that treemaps draw visual attention better to relevant elements. Finally, implications for facilitating human intuition and problem solving strategies are discussed.",
      "Author": "Nicholas H. Muller, Benny Liebold, Daniel Pietschmann, Peter Ohler, Paul Rosenthal"
    },
    {
      "Ref_Id": 15,
      "Paper_Title": "A Comparative Study of Four Hierarchy Browsers using the Hierarchical Visualisation Testing Environment",
      "Year": 2007,
      "Type": "Empirical",
      "Evaluation_Type": "Mixed",
      "Stimuli_Description": "Interactive",
      "Layouts_Considered": "Indented List,Enclosure,Node-Link",
      "DOI": "https://doi.org/10.1109/IV.2007.8",
      "Abstract": "Four hierarchy browsers were compared in a counter- balanced repeated measures study with 32 test users. The four browsers tested were in-house implementations of 1) a windows explorer style tree view, 2) an information pyra- mids browser, 3) a treemap browser, and 4 ) a hyper- bolic browser. Each user performed eight tasks with each browser. Task completion time, subjective ratings, and over- all preference data were collected. Almost no significant differences in performance were found, but users signifi- cantly preferred the tree view browser. The four browsers are implemented as part of the Hi- erarchical Visualisation System (HVS), a Java framework for visualising hierarchies. The Hierarchical Visualisation Testing Environment (HVTE) is a semi-automated testing environment built on top of HVS, which presents a sequence of tasks from a test case database to the user, together with an associated browser and test hierarchy, and automates the collection of timing data.",
      "Author": "Keith Andrews, Janka Kasanicka"
    },
    {
      "Ref_Id": 16,
      "Paper_Title": "Beamtrees : Compact Visualization of Large Hierarchies",
      "Year": 2002,
      "Type": "Technique",
      "Evaluation_Type": "Mixed",
      "Stimuli_Description": "Interactive",
      "Layouts_Considered": "Adjacency,Enclosure",
      "DOI": "https://doi.org/10.1109/INFVIS.2002.1173153",
      "Abstract": "Beamtrees are a new method for the visualization of large hierarchical data sets. Nodes are shown as stacked circular beams, such that both the hierarchical structure as well as the size of nodes are depicted. The dimensions of beams are calculated using a variation of the treemap algorithm. A small user study indicated that beamtrees are significantly more effective than nested treemaps and cushion treemaps for the extraction of global hierarchical information.",
      "Author": "Frank van Ham, Jarke J. van Wijk"
    },
    {
      "Ref_Id": 17,
      "Paper_Title": "The Shaping of Information by Visual Metaphors",
      "Year": 2008,
      "Type": "Empirical",
      "Evaluation_Type": "Quantitative",
      "Stimuli_Description": "Static",
      "Layouts_Considered": "Node-Link,Enclosure",
      "DOI": "https://doi.org/10.1109/TVCG.2008.171",
      "Abstract": "The nature of an information visualization can be considered to lie in the visual metaphors it uses to structure information. The process of understanding a visualization therefore involves an interaction between these external visual metaphors and the user's internal knowledge representations. To investigate this claim, we conducted an experiment to test the effects of visual metaphor and verbal metaphor on the understanding of tree visualizations. Participants answered simple data comprehension questions while viewing either a treemap or a node-link diagram. Questions were worded to reflect a verbal metaphor that was either compatible or incompatible with the visualization a participant was using. The results suggest that the visual metaphor indeed affects how a user derives information from a visualization. Additionally, we found that the degree to which a user is affected by the metaphor is strongly correlated with the user's ability to answer task questions correctly. These findings are a first step towards illuminating how visual metaphors shape user understanding, and have significant implications for the evaluation, application, and theory of visualization.",
      "Author": "Caroline Ziemkiewicz, Robert Kosara"
    },
    {
      "Ref_Id": 22,
      "Paper_Title": "Extending tree-maps to three dimensions: A comparative study",
      "Year": 2004,
      "Type": "Empirical",
      "Evaluation_Type": "Quantitative",
      "Stimuli_Description": "Interactive",
      "Layouts_Considered": "Enclosure,Adjacency",
      "DOI": "https://doi.org/10.1007/978-3-540-27795-8_6",
      "Abstract": "This paper presents StepTree, an information visualization tool de- signed for depicting hierarchies, such as directory structures. StepTree is simi- lar to the hierarchy-visualization tool, Treemap, in that it uses a rectangular, space-filling methodology, but differs from Treemap in that it employs three- dimensional space, which is used to more clearly convey the structural relation- ships of the hierarchy. The paper includes an empirical study comparing typical search and analysis tasks using StepTree and Treemap. The study shows that users perform significantly better on tasks related to interpreting structural rela- tionships when using StepTree. In addition, users achieved the same perform- ance with StepTree and Treemap when doing a range of other common inter- pretative and navigational tasks.",
      "Author": "Thomas Bladh, David A. Carr, Jeremiah Scholl"
    },
    {
      "Ref_Id": 27,
      "Paper_Title": "Hierarchical Edge Bundles:\nVisualization of Adjacency Relations in Hierarchical Data",
      "Year": 2006,
      "Type": "Technique",
      "Evaluation_Type": "Insight",
      "Stimuli_Description": "Interactive",
      "Layouts_Considered": "Node-Link,Enclosure",
      "DOI": "https://doi.org/10.1109/TVCG.2006.147",
      "Abstract": "A compound graph is a frequently encountered type of data set. Relations are given between items, and a hierarchy is defined on the items as well. We present a new method for visualizing such compound graphs. Our approach is based on visually bundling the adjacency edges, i.e., non-hierarchical edges, together. We realize this as follows. We assume that the hierarchy is shown via a standard tree visualization method. Next, we bend each adjacency edge, modeled as a B-spline curve, toward the polyline defined by the path via the inclusion edges from one node to another. This hierarchical bundling reduces visual clutter and also visualizes implicit adjacency edges between parent nodes that are the result of explicit adjacency edges between their respective child nodes. Furthermore, hierarchical edge bundling is a generic method which can be used in conjunction with existing tree visualization techniques. We illustrate our technique by providing example visualizations and discuss the results based on an informal evaluation provided by potential users of such visualizations.",
      "Author": "Danny Holten"
    },
    {
      "Ref_Id": 28,
      "Paper_Title": "Reading Phylogenetic Trees: The Effects of Tree Orientation and Text Processing on Comprehension",
      "Year": 2012,
      "Type": "Empirical",
      "Evaluation_Type": "Eye-Tracking",
      "Stimuli_Description": "Static",
      "Layouts_Considered": "Node-Link",
      "DOI": "https://doi.org/10.1525/bio.2012.62.8.8",
      "Abstract": "Although differently formatted cladograms (hierarchical diagrams depicting evolutionary relationships among taxa) depict the same informa- tion, they may not be equally easy to comprehend. Undergraduate biology students attempted to translate cladograms from the diagonal to the rectangular format. The “backbone” line of each diagonal cladogram was slanted either up or down to the right. Eye movement analyses indicated that the students had a general bias to scan from left to right. Their scanning direction also depended on the orientation of the “backbone” line, resulting in upward or downward scanning, following the directional slant of the line. Because scanning down facilitates correct interpretation of the nested relationships, translation accuracy was higher for the down than for the up cladograms. Unfortunately, most diagonal cladograms in textbooks are in the upward orientation. This probably impairs students’ success at tree thinking (i.e., interpreting and reasoning about evolution- ary relationships depicted in cladograms), an important twenty-first century skill.",
      "Author": "Laura R. Novick, Andrew T. Stull, Kefyn Catley"
    },
    {
      "Ref_Id": 29,
      "Paper_Title": "CropCircles: Topology Sensitive Visualization of OWL Class Hierarchies",
      "Year": 2006,
      "Type": "Application",
      "Evaluation_Type": "Quantitative",
      "Stimuli_Description": "Interactive",
      "Layouts_Considered": "Enclosure,Node-Link",
      "DOI": "https://doi.org/10.1007/11926078_50",
      "Abstract": "OWL ontologies present many interesting visualization challenges.\nHere we present CropCircles, a technique designed to view the class hierarchies\nin ontologies as trees. We place special emphasis on topology understanding\nwhen designing the tool. We drew inspiration from treemaps, but made substantial\nchanges in the representation and layout. Most notably, the spacefillingness\nof treemap is relaxed in exchange for visual clarity.We outline the problem scape\nof visualizing ontology hierarchies, note the requirements that go into the design\nof the tool, and discuss the interface and implementation. Finally, through a\ncontrolled experiment involving tasks common to understanding ontologies, we\nshow the benefits of our design",
      "Author": "Taowei David Wang, Bijan Parsia"
    },
    {
      "Ref_Id": 33,
      "Paper_Title": "Bubble Treemaps for Uncertainty Visualization",
      "Year": 2018,
      "Type": "Technique",
      "Evaluation_Type": "Case-Study",
      "Stimuli_Description": "Static",
      "Layouts_Considered": "Enclosure",
      "DOI": "https://doi.org/10.1109/TVCG.2017.2743959",
      "Abstract": "We present a novel type of circular treemap, where we intentionally allocate extra space for additional visual variables. With this extended visual design space, we encode hierarchically structured data along with their uncertainties in a combined diagram. We introduce a hierarchical and force-based circle-packing algorithm to compute Bubble Treemaps, where each node is visualized using nested contour arcs. Bubble Treemaps do not require any color or shading, which offers additional design choices. We explore uncertainty visualization as an application of our treemaps using standard error and Monte Carlo-based statistical models. To this end, we discuss how uncertainty propagates within hierarchies. Furthermore, we show the effectiveness of our visualization using three different examples: the package structure of Flare, the S&P 500 index, and the US consumer expenditure survey.",
      "Author": "Jochen Gortler, Christoph Schulz, Daniel Weiskopf, Oliver Deussen"
    },
    {
      "Ref_Id": 34,
      "Paper_Title": "CactusTree: A tree drawing approach for hierarchical edge bundling",
      "Year": 2017,
      "Type": "Technique",
      "Evaluation_Type": "Case-Study",
      "Stimuli_Description": "Interactive",
      "Layouts_Considered": "Node-Link",
      "DOI": "https://doi.org/10.1109/PACIFICVIS.2017.8031596",
      "Abstract": "This paper introduces CactusTree, a novel visualization technique for representing hierarchical datasets. We introduce details about the construction of CactusTrees and describe how they can be used to represent nested data and relationships between elements in the data. We explain how our design decisions were informed by tasks common to a range of scientific domains. A key contribution of this article is the introduction of descriptive features that can be used to characterize trees in terms of their structural and connective qualities.",
      "Author": "Angus Forbes, Tommy Dang"
    },
    {
      "Ref_Id": 35,
      "Paper_Title": "Dendrogramix: a Hybrid Tree-Matrix Visualization Technique\nto Support Interactive Exploration of Dendrograms",
      "Year": 2015,
      "Type": "Technique",
      "Evaluation_Type": "Insight",
      "Stimuli_Description": "Static",
      "Layouts_Considered": "Node-Link",
      "DOI": "https://doi.org/10.1109/PACIFICVIS.2015.7156353",
      "Abstract": "Clustering is often a first step when trying to make sense of a large data set. A wide family of cluster analysis algorithms, namely hi- erarchical clustering algorithms, does not provide a partition of the data set but a hierarchy of clusters organized in a binary tree, known as a dendrogram. The dendrogram has a classical node- link representation used by experts for various tasks like: to decide which subtrees are actual clusters (e.g., by cutting the dendrogram at a given depth); to give those clusters a name by inspecting their content; etc. We present Dendrogramix, a hybrid tree-matrix in- teractive visualization of dendrograms that superimposes the rela- tionship between individual objects on to the hierarchy of clusters. Dendrogramix enables users to do tasks which involve both clus- ters and individual objects that are impracticable with the classical representation, like: to explain why a particular objects belongs to a particular cluster; to elicit and understand uncommon patterns (e.g., objects that could have been classified in a totally different cluster); etc. Those sensemaking tasks are supported by a consistent set of interaction techniques that facilitates the exploration of large clus- tering results.",
      "Author": "Renaud Blanch, Rémy Dautriche, Gilles Bisson"
    },
    {
      "Ref_Id": 36,
      "Paper_Title": "GosperMap: Using a Gosper Curve for Laying Out Hierarchical Data",
      "Year": 2013,
      "Type": "Application",
      "Evaluation_Type": "Qualitative",
      "Stimuli_Description": "Static",
      "Layouts_Considered": "Enclosure,Adjacency",
      "DOI": "https://doi.org/10.1109/TVCG.2013.91",
      "Abstract": "The emergence of very large hierarchies that result from the increase in available data raises many problems of visualization and navigation. On data sets of such scale, classical graph drawing methods do not take advantage of certain human cognitive skills such as shape recognition. These cognitive skills could make it easier to remember the global structure of the data. In this paper, we propose a method that is based on the use of nested irregular shapes. We name it GosperMap as we rely on the use of a Gosper Curve to generate these shapes. By employing human perception mechanisms that were developed by handling, for example, cartographic maps, this technique facilitates the visualization and navigation of a hierarchy. An algorithm has been designed to preserve region containment according to the hierarchy and to set the leaves’ sizes proportionally to a property, in such a way that the size of nonleaf regions corresponds to the sum of their children’s sizes. Moreover, the input ordering of the hierarchy’s nodes is preserved, i.e., the areas that represent two consecutive children of a node in the hierarchy are adjacent to one another. This property is especially useful because it guarantees some stability in our algorithm. We illustrate our technique by providing visualization examples of the repartition of tax money in the US over time. Furthermore, we validate the use of the GosperMap in a professional documentation context and show the stability and ease of memorization for this type of map.",
      "Author": "David Auber, Charles Huet, Antoine Lambert, Benjamin Renoust, Arnaud Sallaberry, Agnes Saulnier"
    },
    {
      "Ref_Id": 37,
      "Paper_Title": "The deeptree exhibit: Visualizing the tree of life to facilitate informal learning",
      "Year": 2012,
      "Type": "Application",
      "Evaluation_Type": "Insight",
      "Stimuli_Description": "Interactive",
      "Layouts_Considered": "Node-Link",
      "DOI": "https://doi.org/10.1109/TVCG.2012.272",
      "Abstract": "In this paper, we present the DeepTree exhibit, a multi-user, multi-touch interactive visualization of the Tree of Life. We developed DeepTree to facilitate collaborative learning of evolutionary concepts. We will describe an iterative process in which a team of computer scientists, learning scientists, biologists, and museum curators worked together throughout design, development, and evaluation. We present the importance of designing the interactions and the visualization hand-in-hand in order to facilitate active learning. The outcome of this process is a fractal-based tree layout that reduces visual complexity while being able to capture all life on earth; a custom rendering and navigation engine that prioritizes visual appeal and smooth fly-through; and a multi-user interface that encourages collaborative exploration while offering guided discovery. We present an evaluation showing that the large dataset encouraged free exploration, triggers emotional responses, and facilitates visitor engagement and informal learning.",
      "Author": "Florian Block, Michael S. Horn, Brenda Caldwell Phillips, Judy Diamond, E. Margaret Evans, Chia Shen"
    },
    {
      "Ref_Id": 38,
      "Paper_Title": "Linked treemap: a 3D treemap-nodelink layout\nfor visualizing hierarchical structures",
      "Year": 2011,
      "Type": "Technique",
      "Evaluation_Type": "Quantitative",
      "Stimuli_Description": "Interactive",
      "Layouts_Considered": "Hybrid",
      "DOI": "https://doi.org/10.1007/s00180-011-0272-2",
      "Abstract": "Hierarchical structures are present in many different areas of our daily life as well as in sciences. Visualization methods are quite commonly applied to support comprehension of the more complex structures. Nodelinks and treemaps are two widely spread directions of such visualization methods. Visualizations using node- links have the advantage of explicitly displaying the hierarchical relations between entities. Visualizations using treemaps, on the other hand, allow for a good global understanding of the present entities and some of their properties. We present a visu- alization tool for hierarchical structures that combines the advantages of treemaps and nodelinks by naturally incorporating them into a 3D layout. The nodelink is built upon the treemap in a direction orthogonal to the treemap plane. Our visualization tool supports various navigation techniques suitable for different analysis tasks. First, the user interaction allows users to render subtrees of the nodelink transparently. Second, the various levels can be explored separately in an intuitive fashion by sliding its plane through the orthogonal nodelink layout and, thus, moving the treemap to the respective level of the hierarchy. Third, zooming into regions of interest is supported by using a focus+context technique that operates on the combined 3D layout. We demonstrate the efficacy and efficiency of our system for visual exploration purposes in a case study that uses our system as a file explorer. In this context, we perform a user study that evaluates our approach and allows for a comparison to other existing approaches.",
      "Author": "Lars Linsen, Sabine Behrendt"
    },
    {
      "Ref_Id": 41,
      "Paper_Title": "PedVis: A Structured, Space-Efficient Technique for Pedigree Visualization",
      "Year": 2010,
      "Type": "Technique",
      "Evaluation_Type": "Qualitative",
      "Stimuli_Description": "Static",
      "Layouts_Considered": "Node-Link,Adjacency",
      "DOI": "https://doi.org/10.1109/TVCG.2010.185",
      "Abstract": "Public genealogical databases are becoming increasingly populated with historical data and records of the current popu- lation’s ancestors. As this increasing amount of available information is used to link individuals to their ancestors, the resulting trees become deeper and more dense, which justifies the need for using organized, space-efficient layouts to display the data. Existing layouts are often only able to show a small subset of the data at a time. As a result, it is easy to become lost when navigating through the data or to lose sight of the overall tree structure. On the contrary, leaving space for unknown ancestors allows one to better understand the tree’s structure, but leaving this space becomes expensive and allows fewer generations to be displayed at a time. In this work, we propose that the H-tree based layout be used in genealogical software to display ancestral trees. We will show that this layout presents an increase in the number of displayable generations, provides a nicely arranged, symmetrical, intuitive and organized fractal structure, increases the user’s ability to understand and navigate through the data, and accounts for the visualization requirements necessary for displaying such trees. Finally, user-study results indicate potential for user acceptance of the new layout.",
      "Author": "Claurissa Tuttle, Luis Gustavo Nonato, Claudio T. Silva"
    },
    {
      "Ref_Id": 42,
      "Paper_Title": "A Comparative Evaluation on Tree Visualization Methods for Hierarchical Structures with Large Fan-outs",
      "Year": 2010,
      "Type": "Empirical",
      "Evaluation_Type": "Mixed",
      "Stimuli_Description": "Interactive",
      "Layouts_Considered": "Node-Link,Hybrid",
      "DOI": "https://doi.org/10.1145/1753326.1753359",
      "Abstract": "Hierarchical structures with large fan-outs are hard to browse and understand. In the conventional node-link tree visualization, the screen quickly becomes overcrowded as users open nodes that have too many child nodes to fit in one screen. To address this problem, we propose two extensions to the conventional node-link tree visualization: a list view with a scrollbar and a multi-column interface. We compared them against the conventional tree visualization interface in a user study. Results show that users are able to browse and understand the tree structure faster with the multi-column interface than the other two interfaces. Overall, they also liked the multi-column better than others.",
      "Author": "Hyunjoo Song, Bohyoung Kim, Bongshin Lee, Jinwook Seo"
    },
    {
      "Ref_Id": 43,
      "Paper_Title": "Visualizing Change over Time Using Dynamic Hierarchies: TreeVersity2 and the StemView",
      "Year": 2013,
      "Type": "Application",
      "Evaluation_Type": "Case-Study",
      "Stimuli_Description": "Interactive",
      "Layouts_Considered": "Adjacency",
      "DOI": "https://doi.org/10.1109/TVCG.2013.231",
      "Abstract": "To analyze data such as the US Federal Budget or characteristics of the student population of a University it is common to look for changes over time. This task can be made easier and more fruitful if the analysis is performed by grouping by attributes, such as by Agencies, Bureaus and Accounts for the Budget, or Ethnicity, Gender and Major in a University. We present TreeVersity2, a web based interactive data visualization tool that allows users to analyze change in datasets by creating dynamic hierarchies based on the data attributes. TreeVersity2 introduces a novel space filling visualization (StemView) to represent change in trees at multiple levels - not just at the leaf level. With this visualization users can explore absolute and relative changes, created and removed nodes, and each node’s actual values, while maintaining the context of the tree. In addition, TreeVersity2 provides overviews of change over the entire time period, and a reporting tool that lists outliers in textual form, which helps users identify the major changes in the data without having to manually setup filters. We validated TreeVersity2 with 12 case studies with organizations as diverse as the National Cancer Institute, Federal Drug Administration, Department of Transportation, Office of the Bursar of the University of Maryland, or eBay. Our case studies demonstrated that TreeVersity2 is flexible enough to be used in different domains and provide useful insights for the data owners. A TreeVersity2 demo can be found at https://treeversity.cattlab.umd.edu",
      "Author": "John Alexis Guerra-Gómez, Michael L. Pack, Catherine Plaisant, Ben Shneiderman"
    },
    {
      "Ref_Id": 44,
      "Paper_Title": "Hierarchical-Temporal Data Visualization Using a Tree-Ring Metaphor",
      "Year": 2006,
      "Type": "Application",
      "Evaluation_Type": "Case-Study",
      "Stimuli_Description": "Interactive",
      "Layouts_Considered": "Node-Link",
      "DOI": "https://doi.org/10.1007/11795018_7",
      "Abstract": "This paper describes a novel and efficient visualization technique intended for hierarchical-temporal data using a tree-ring like layout. Temporal hierarchies appear in numerous fields such as genealogy, evolution taxonomies or time lines. In many cases, state-of-the-art static diagrams are produced in these fields. By using several information visualization strategies, such as focus + context, the tree-ring approach has the ability to visualize and navigate these, potentially complex, hierarchies trough time. Thus, a deeper insight into the problem at hand can be gained.",
      "Author": "Roberto Theron"
    },
    {
      "Ref_Id": 52,
      "Paper_Title": "AdaptiviTree: Adaptive Tree Visualization for\nTournament-Style Brackets",
      "Year": 2007,
      "Type": "Application",
      "Evaluation_Type": "Mixed",
      "Stimuli_Description": "Static",
      "Layouts_Considered": "Node-Link",
      "DOI": "https://doi.org/10.1109/TVCG.2007.70537",
      "Abstract": "Online pick'em games, such as the recent NCAA college basketball March Madness tournament, form a large and rapidly growing industry. In these games, players make predictions on a tournament bracket that defines which competitors play each other and how they proceed toward a single champion. Throughout the course of the tournament, players monitor the brackets to track progress and to compare predictions made by multiple players. This is often a complex sense making task. The classic bracket visualization was designed for use on paper and utilizes an incrementally additive system in which the winner of each match-up is rewritten in the next round as the tournament progresses. Unfortunately, this representation requires a significant amount of space and makes it relatively difficult to get a quick overview of the tournament state since competitors take arbitrary paths through the static bracket. In this paper, we present AdaptiviTree, a novel visualization that adaptively deforms the representation of the tree and uses its shape to convey outcome information. AdaptiviTree not only provides a more compact and understandable representation, but also allows overlays that display predictions as well as other statistics. We describe results from a lab study we conducted to explore the efficacy of AdaptiviTree, as well as from a deployment of the system in a recent real-world sports tournament.",
      "Author": "Desney S. Tan, Greg Smith, Bongshin Lee, George G. Robertson"
    },
    {
      "Ref_Id": 54,
      "Paper_Title": "ArcTrees: Visualizing Relations in Hierarchical Data",
      "Year": 2005,
      "Type": "Technique",
      "Evaluation_Type": "-",
      "Stimuli_Description": "Interactive",
      "Layouts_Considered": "Enclosure",
      "DOI": "https://doi.org/10.2312/VisSym%2FEuroVis05%2F053-060",
      "Abstract": "In this paper we present, ARCTREES, a novel way of visualizing hierarchical and non-hierarchical relations within one interactive visualization. Such a visualization is challenging because it must display hierarchical information in a way that the user can keep his or her mental map of the data set and include relational information without causing misinterpretation. We propose a hierarchical view derived from traditional Treemaps and augment this view with an arc diagram to depict relations. In addition, we present interaction methods that allow the exploration of the data set using Focus+Context techniques for navigation. The development was motivated by a need for understanding relations in structured documents but it is also useful in many other application domains such as project management and calendars.",
      "Author": "Petra Neumann, Dr. Stefan Schlechtweg, Sheelagh Carpendale"
    },
    {
      "Ref_Id": 56,
      "Paper_Title": "Evaluating Three-Dimensional Information Visualization Designs: a Case Study of Three Designs",
      "Year": 1998,
      "Type": "Empirical",
      "Evaluation_Type": "-",
      "Stimuli_Description": "Interactive",
      "Layouts_Considered": "Node-Link,Adjacency,Enclosure",
      "DOI": "https://doi.org/10.1109/IV.1998.694211",
      "Abstract": "A number of three-dimensional information visualization designs have been invented during the last years. However, comparisons of such designs have been scarce, making it difficult for application developers to select a suitable design. This paper reports on a case study where three existing visualization designs have been implemented and evaluated. We found that the three information visualization designs have inherent problems when used for visualizing different data sets, and that certain tasks can not be supported by the designs. A general methodology for evaluation is presented, which comprises evaluation of suitability for different data sets as well as evaluation of support for user tasks.",
      "Author": "Ulrika Wiss, David Carr, Hakan Jonsson"
    },
    {
      "Ref_Id": 59,
      "Paper_Title": "Visualizing Multidimensional Data in Treemaps with Adaptive Glyphs",
      "Year": 2018,
      "Type": "Technique",
      "Evaluation_Type": "-",
      "Stimuli_Description": "Static",
      "Layouts_Considered": "Enclosure",
      "DOI": "https://doi.org/10.1109/iV.2018.00021",
      "Abstract": "Treemap is one of the most well-known and used techniques for data analysis in InfoVis. However, it still presents some challenges concerning data representation, such as small items, a large number of hierarchies limiting the visual space, few options for visual data representation (restricted to size, color, label), and others. Thus, this paper presents an InfoVis tool that allows the analysis of multidimensional data using treemaps with glyphs, once they represent more data visually combined visual variables. Besides that, considering treemap scenarios with small area items, an algorithm was developed to analyze which part of the glyph the application should draw since parts of the glyph can still provide useful information. In this way, the glyphs become adaptative to available space. The application has a multilabel decision tree technique that decides which part of the glyph should appear. Visualization specialists supplied the training data through a system that showed a diverse range of glyphs' representations. The system varied the glyph's size, the number and the value of the visible visual variables and registered the response of specialists in the training data. Finally, this paper presents images using the treemap with adaptive glyphs approach versos treemap+glyphs and showed that the adaptive approach clears information clutter when treemap items are small.",
      "Author": "Anderson Gregorio Marques Soares, Diego Hortencio dos Santos, Cleyton Luiz Ramos Barbosa, Aruanda Simoes Gonçalves, Carlos Gustavo Resque dos Santos, Bianchi Serique Meiguins, Elvis Thermo Carvalho Miranda"
    },
    {
      "Ref_Id": 62,
      "Paper_Title": "Sunburst with ordered nodes based on hierarchical clustering: a visual analyzing method for associated hierarchical pesticide residue data",
      "Year": 2014,
      "Type": "Application",
      "Evaluation_Type": "Mixed",
      "Stimuli_Description": "Interactive",
      "Layouts_Considered": "Adjacency",
      "DOI": "https://doi.org/10.1007/s12650-014-0269-3",
      "Abstract": "According to the characteristics of pesticide residue data and analyzing requirements in food safety fields, we presented a visual analyzing method for associated hierarchical data, called sunburst with ordered nodes based on hierarchical clustering (SONHC). SONHC arranged the leaf nodes in sunburst in order using hierarchical clustering algorithm, put the associated dataset as a node in center of the sunburst, and connected it with the associated leaf nodes in sunburst using colored lines. So, it can present not only two hierarchical structures but also the relationships between them. Based on SONHC and some interaction techniques (clicking, contraction and expansion, etc) we developed an associated visual analyzing system (AVAS) for pesticide residues detection results data, which can help users to inspect the hierarchical structure of pesticide and agricultural products and to explore the associations between pesticides and agricultural products, and associations between different pesticides. The results of user experience test showed that SONHC algorithm overperforms than SA and SR algorithm in ULE and ULE’s variance. AVAS system is effective in helping users to analyze the pesticide residues data. Furthermore, SONHC algorithm can also be adopted to analyze associated hierarchical data in other fields, such as finance, insurance and e-commerce.",
      "Author": "Yi Chen, Xinyue Zhang, Yuchao Feng, Jie Liang, Hongqian Chen"
    },
    {
      "Ref_Id": 64,
      "Paper_Title": "BaobabView: Interactive Construction and Analysis of Decision Trees",
      "Year": 2011,
      "Type": "Application",
      "Evaluation_Type": "Case-Study",
      "Stimuli_Description": "Interactive",
      "Layouts_Considered": "Node-Link",
      "DOI": "https://doi.org/10.1109/VAST.2011.6102453",
      "Abstract": "We present a system for the interactive construction and analysis of decision trees that enables domain experts to bring in domain spe- cific knowledge. We identify different user tasks and correspond- ing requirements, and develop a system incorporating a tight inte- gration of visualization, interaction and algorithmic support. Do- main experts are supported in growing, pruning, optimizing and analysing decision trees. Furthermore, we present a scalable de- cision tree visualization optimized for exploration. We show the effectiveness of our approach by applying the methods to two use cases. The first case illustrates the advantages of interactive con- struction, the second case demonstrates the effectiveness of analysis of decision trees and exploration of the structure of the data.",
      "Author": "Stef van den Elzen, Jarke J. van Wijk"
    },
    {
      "Ref_Id": 68,
      "Paper_Title": "The Word Tree, an Interactive Visual Concordance",
      "Year": 2008,
      "Type": "Application",
      "Evaluation_Type": "-",
      "Stimuli_Description": "Interactive",
      "Layouts_Considered": "Node-Link",
      "DOI": "https://doi.org/10.1109/TVCG.2008.172",
      "Abstract": "We introduce the Word Tree, a new visualization and information-retrieval technique aimed at text documents. A word tree is a graphical version of the traditional \"keyword-in-context\" method, and enables rapid querying and exploration of bodies of text. In this paper we describe the design of the technique, along with some of the technical issues that arise in its implementation. In addition, we discuss the results of several months of public deployment of word trees on Many Eyes, which provides a window onto the ways in which users obtain value from the visualization.",
      "Author": "Martin Wattenberg, Fernanda B. Viégas"
    },
    {
      "Ref_Id": 70,
      "Paper_Title": "Indented Pixel Tree Plots",
      "Year": 2010,
      "Type": "Technique",
      "Evaluation_Type": "Mixed",
      "Stimuli_Description": "Interactive",
      "Layouts_Considered": "Node-Link,Adjacency",
      "DOI": "https://dl.acm.org/citation.cfm?id=1939960",
      "Abstract": "We introduce Indented Pixel Tree Plots (IPTPs): a novel pixel-based visualization technique for depicting large hierarchies. It is inspired by the visual metaphor of indented outlines, omnipresent in graphical file browsers and pretty printing of source code. Inner vertices are represented as vertically arranged lines and leaf groups as horizontally arranged lines. A recursive layout algorithm places parent nodes to the left side of their underlying tree structure and leaves of each subtree grouped to the rightmost position. Edges are represented only implicitly by the vertically and horizontally aligned structure of the plot, leading to a sparse and redundant-free visual representation. We conducted a user study with 30 subjects in that we compared IPTPs and node-link diagrams as a within-subjects variable. The study indicates that working with IPTPs can be learned in less than 10 minutes. Moreover, IPTPs are as effective as node-link diagrams for accuracy and completion time for three typical tasks; participants generally preferred IPTPs. We demonstrate the usefulness of IPTPs by understanding hierarchical features of huge trees such as the NCBI taxonomy with more than 300,000 nodes.",
      "Author": "Michael Burch, Michael Raschke, Daniel  Weiskopf"
    },
    {
      "Ref_Id": 71,
      "Paper_Title": "Contact Trees: Network Visualization beyond\nNodes and Edges",
      "Year": 2015,
      "Type": "Application",
      "Evaluation_Type": "Case-Study",
      "Stimuli_Description": "Static",
      "Layouts_Considered": "Symbolic",
      "DOI": "https://doi.org/10.1371/journal.pone.0149324",
      "Abstract": "Node-Link diagrams make it possible to take a quick glance at how nodes (or actors) in a network are connected by edges (or ties). A conventional network diagram of a “contact tree” maps out a root and branches that represent the structure of nodes and edges, often without further specifying leaves or fruits that would have grown from small branches. By furnishing such a network structure with leaves and fruits, we reveal details about “contacts” in our ContactTrees upon which ties and relationships are constructed. Our elegant design employs a bottom-up approach that resembles a recent attempt to understand subjective well-being by means of a series of emotions. Such a bottom-up approach to social-network studies decomposes each tie into a series of interactions or contacts, which can help deepen our understanding of the complexity embedded in a network structure. Unlike previ- ous network visualizations, ContactTrees highlight how relationships form and change based upon interactions among actors, as well as how relationships and networks vary by contact attributes. Based on a botanical tree metaphor, the design is easy to construct and the resulting tree-like visualization can display many properties at both tie and contact lev- els, thus recapturing a key ingredient missing from conventional techniques of network visu- alization. We demonstrate ContactTrees using data sets consisting of up to three waves of 3-month contact diaries over the 2004-2012 period, and discuss how this design can be applied to other types of datasets.",
      "Author": "Arnaud Sallaberry, Yang-chih Fu, Hwai-Chung Ho, Kwan-Liu Ma"
    },
    {
      "Ref_Id": 73,
      "Paper_Title": "Interactive Visualisation of Hierarchical Quantitative Data: an Evaluation",
      "Year": 2019,
      "Type": "Empirical",
      "Evaluation_Type": "Mixed",
      "Stimuli_Description": "Interactive",
      "Layouts_Considered": "Adjacency,Enclosure",
      "DOI": "https://arxiv.org/pdf/1908.01277.pdf",
      "Abstract": "We have compared three common visualisations for hierarchical quantitative data, treemaps, icicle plots and sunburst charts as well as a semicircular variant of sunburst charts we call the sundown chart. In a pilot study, we found that the sunburst chart was least preferred. In a controlled study with 12 participants, we compared treemaps, icicle plots and sundown charts. Treemap was the least preferred and had a slower performance on a basic navigation task and slower performance and accuracy in hierarchy understanding tasks. The icicle plot and sundown chart had similar performance with slight user preference for the icicle plot.",
      "Author": "Linda Woodburn, Yalong Yang, Kim Marriott"
    },
    {
      "Ref_Id": 75,
      "Paper_Title": "A Comparison of a Conventional Taxonomy with a 3D Visualization for use by Children",
      "Year": 2010,
      "Type": "Empirical",
      "Evaluation_Type": "Mixed",
      "Stimuli_Description": "Interactive",
      "Layouts_Considered": "Indented List,Node-Link",
      "DOI": "https://dl.acm.org/doi/abs/10.5555/1920331.1920385",
      "Abstract": "The paper presents the results of a comparison of two interfaces, one a conventional taxonomy of terms relating to Canadian history, and the other a 3D information visualization of the same terms. Both interfaces were used by volunteer students from grades five and six of an elementary school to locate terms within the taxonomy. The interfaces were evaluated according to whether the task was successfully completed, and if so, how quickly. The students’ affective reactions to both interfaces were also collected through a questionnaire. Neither interface performed significantly better than the other in terms of task completion or task time; a majority of students found the conventional interface easier to use but the 3D interface more fun.",
      "Author": "Jamshid Beheshti, Andrew Large, Charles-Antoine Julien, Marni Tam"
    },
    {
      "Ref_Id": 77,
      "Paper_Title": "Investigating TreeMap Visualization in Inverted Scale",
      "Year": 2015,
      "Type": "Empirical",
      "Evaluation_Type": "Eye-Tracking",
      "Stimuli_Description": "Interactive",
      "Layouts_Considered": "Enclosure",
      "DOI": "https://doi.org/10.1145/3148456.3148490",
      "Abstract": "Identifying maximum/minimum values in different charts is a common goal when users are interacting with visualizations. Moreover, this can be a challenging task when the user is interacting with space-filling visualizations. Space-filling methods consider a 2D area to represent values, however, low values that might be interesting for decision makers are commonly obfuscated by such approach. In this context, we conducted an eye tracking study with 12 target users to analyze how scale inversion (area proportional to 1/value) can support the identification of elements with small values represented in treemaps. Results show that when the inverted scale supports the task, users are able to identify elements individually and in a less ambiguous way, but took more time to interpret the inverted scale treemap. With the presented results, we expect that Human-Computer Interaction practitioners working on space-filling visualizations to include interactive scales to invert the visualizations scale when the task at hand involves evaluating minimum and/or maximum values.",
      "Author": "Vagner Figueredo de Santana, Fabiano Marcon de Moraes, Beatriz Sonzzini Ribeiro de Souza"
    },
    {
      "Ref_Id": 81,
      "Paper_Title": "The Effect of Animated Transitions on User Navigation in 3D Tree-Maps",
      "Year": 2005,
      "Type": "Empirical",
      "Evaluation_Type": "Mixed",
      "Stimuli_Description": "Interactive",
      "Layouts_Considered": "Enclosure",
      "DOI": "https://doi.org/10.1109/IV.2005.122",
      "Abstract": "This paper describes a user study conducted to evaluate the use of smooth animated transitions between directories in a three-dimensional, tree-map visualization. We looked specifically at the task of returning to a previously visited directory after either an animated or instantaneous return to the root location. The results of the study show that animation is a double-edged sword. Even though users take more shortcuts, they also make more severe navigational errors. It seems as though the promise of a more direct route to the target directory, which animation provides, somehow precludes users who navigate incorrectly from applying a successful recovery strategy.",
      "Author": "T. Bladh, D.A. Carr, M. Kljun"
    },
    {
      "Ref_Id": 82,
      "Paper_Title": "An Empirical Study of Task Support in 3D Information Visualizations",
      "Year": 1999,
      "Type": "Empirical",
      "Evaluation_Type": "Mixed",
      "Stimuli_Description": "Interactive",
      "Layouts_Considered": "Node-Link,Enclosure",
      "DOI": "https://doi.org/10.1109/IV.1999.781587",
      "Abstract": "There is still little knowledge about what factors important for the usability of a 3D user interface. We have performed a comparative study of three 3D information visualizations as a step towards a better understanding of this. The study involved 25 volunteer subjects, performing three different tasks with the Information Landscape, Cam Tree, and Information Cube. The results of the study indicate that the subjects were significantly faster with the Information Landscape when compared with both other visualizations. The Cam Tree was significantly faster than the Information Cube. Our observations during the study indicate that local and global overview are extremely important factors. We also observed that custom navigation is crucial in 3D user interfaces. Finally, the study raises the question: \"for what types of tasks is a 3D user interface best suited?\".",
      "Author": "U. Wiss, D.A. Carr"
    },
    {
      "Ref_Id": 83,
      "Paper_Title": "Extending the H-Tree Layout Pedigree: An Evaluation",
      "Year": 2013,
      "Type": "Empirical",
      "Evaluation_Type": "Mixed",
      "Stimuli_Description": "Interactive",
      "Layouts_Considered": "Node-Link",
      "DOI": "https://doi.org/10.1109/IV.2013.56",
      "Abstract": "Visualizing large family structures is becoming increasingly important, as more genealogical data becomes available. A space-filling h-tree layout pedigree has been recently proposed to make better use of the available space than traditional representations. In a previous paper we applauded the technique's usage of available space but remarked that it makes generation identification difficult and does not allow navigating to descendants of represented individuals. A set of extensions was proposed to help overcome these limitations and a preliminary evaluation suggested that those extensions enhance the original technique. This paper presents a more thorough evaluation carried out to assess if and how the proposed extensions improve the original h-tree layout pedigree technique. Results suggest that these extensions improve user performance on some tasks, effectively provide new functionality, and generally enhance user experience.",
      "Author": "João Miguel Santos, Beatriz Sousa Santos, Paulo Dias, Samuel Silva, Carlos Ferreira"
    },
    {
      "Ref_Id": 84,
      "Paper_Title": "Map-like Visualisations vs. Treemaps — An Experimental Comparison",
      "Year": 2017,
      "Type": "Empirical",
      "Evaluation_Type": "Mixed",
      "Stimuli_Description": "Interactive",
      "Layouts_Considered": "Enclosure",
      "DOI": "https://dl.acm.org/doi/10.1145/3105971.3105976",
      "Abstract": "Treemaps have been used in information visualisation for over two decades. They make use of nested filled areas to represent information hierarchies such as file systems, library catalogues, etc. Recent years have witnessed the emergence of visualisations that resemble geographic maps. In this paper we present a study that compares the performance of one such map-like visualisation with the original two forms of the treemap, namely nested and non-nested treemaps. Our study focused on a quantitative evaluation of accuracy and speed. We found that accuracy was highest for the map-like visualisations, followed by nested treemaps and lastly non-nested treemaps. Task performance was fastest for nested treemaps, followed by non-nested treemaps, and then map-like visualisations. We conclude that the results regarding accuracy are promising for the use of map-like visualisations in tasks involving the visualisation of hierarchical information, even at the expense of somewhat longer performance times.",
      "Author": "Robert P. Biuk-Aghai, Patrick Cheong-Iao Pang, Bin Pang"
    },
    {
      "Ref_Id": 85,
      "Paper_Title": "Angular Treemaps – A New Technique for Visualizing and Emphasizing Hierarchical Structured Data",
      "Year": 2012,
      "Type": "Technique",
      "Evaluation_Type": "Quantitative",
      "Stimuli_Description": "Interactive",
      "Layouts_Considered": "Enclosure",
      "DOI": "https://doi.org/10.1109/IV.2012.23",
      "Abstract": "Space-filling visualization techniques have proved their capability in visualizing large hierarchical structured data. However, most existing techniques restrict their partitioning process in vertical and horizontal direction only, which cause problem with identifying hierarchical structures. This paper presents a new space-filling method named Angular Treemaps that relax the constraint of the rectangular subdivision. The approach of Angular Treemaps utilizes divide and conquer paradigm to visualize and emphasize large hierarchical structures within a compact and limited display area with better interpretability. Angular Treemaps generate various layouts to highlight hierarchical sub-structure based on user's preferences or system recommendations. It offers flexibility to be adopted into a wider range of applications, regarding different enclosing shapes. Preliminary usability results suggest user's performance by using this technique is improved in locating and identifying categorized analysis tasks.",
      "Author": "Jie Liang, Quang Vinh Nguyen, Simeon Simoff, Mao Lin Huang"
    },
    {
      "Ref_Id": 86,
      "Paper_Title": "Space-Reclaiming Icicle Plots",
      "Year": 2020,
      "Type": "Technique",
      "Evaluation_Type": "Mixed",
      "Stimuli_Description": "Interactive",
      "Layouts_Considered": "Adjacency",
      "DOI": "https://www.researchgate.net/publication/339326343_Space-Reclaiming_Icicle_Plots",
      "Abstract": "This paper describes the space-reclaiming icicle plots, hierarchy visualizations based on the visual metaphor of icicles. As a novelty, our approach tries to reclaim empty space in all hierarchy levels. This reclaiming results in an improved visibility of the hierarchy elements especially those in deeper levels. We implemented an algorithm that is capable of producing more space-reclaiming icicle plot variants. Several visual parameters can be tweaked to change the visual appearance and readability of the plots: among others, a space-reclaiming parameter, an empty space shrinking parameter, and a gap size. To illustrate the usefulness of the novel visualization technique we applied it, among others, to an NCBI taxonomy dataset consisting of more than 300,000 elements and with maximum depth 42. Moreover, we explore the parameter and design space by applying several values for the visual parameters. We also conducted a controlled user study with 17 participants and received qualitative feedback from 112 students from a visualization course.",
      "Author": "Huub Van De Wetering, Nico Klaassen, Michael Burch"
    },
    {
      "Ref_Id": 89,
      "Paper_Title": "A hierarchical data visualization algorithm: Self-adapting Sunburst algorithm",
      "Year": 2013,
      "Type": "Technique",
      "Evaluation_Type": "Quantitative",
      "Stimuli_Description": "Static",
      "Layouts_Considered": "Adjacency",
      "DOI": "https://doi.org/10.1109/ICVRV.2013.36",
      "Abstract": "Sunburst is a hierarchical data visualization method which is filled by radial sectors, for the problem that sectors of Sunburst are placed in disorder and space utilization rate is low, Self-Adapting Sunburst Algorithm (SASA) has been proposed. Nodes are allocated their areas according to their attribute value, and siblings of same parents are made in ascending order according to the size of areas, adjusting the position of sectors. Meanwhile, based on total number of nodes in each layer, SASA dynamically determines width of this circular ring, following the principle \"more nodes wider circular ring and fewer nodes thinner circular ring\", and in this way, it can optimize the size of nested ring in Sunburst and improve space utilization rate. Finally, User Locating Efficiency (ULE) and Arc Ratio (AR) is put forward to examine SASA, Experimental results show that this algorithm can indeed optimize sector's arrangement, as well as make space utilization better.",
      "Author": "Gong Li-Wei, Chen Yi, Zhang Xin-Yue, Sun Yue-Hong"
    },
    {
      "Ref_Id": 93,
      "Paper_Title": "Tablorer - An Interactive Tree Visualization System for Tablet PCs",
      "Year": 2011,
      "Type": "Technique",
      "Evaluation_Type": "Mixed",
      "Stimuli_Description": "Interactive",
      "Layouts_Considered": "Node-Link,Indented List",
      "DOI": "https://doi.org/10.1111/j.1467-8659.2011.01962.x",
      "Abstract": "A variety of mobile devices are available today, but there is no dominant tree visualization system in the devices. This paper proposes Tablorer, a novel interactive tree visualization system for medium-sized mobile devices, especially for tablet PCs. The system shows the hierarchical information with a compact way using an expandable table format. For efficient navigation, the system provides an integrated view of context and focus information. The experimental results show that Tablorer can reduce the search time by about 22%.",
      "Author": "HyunJu Shin, GwangHyun Park, JungHyun Han"
    },
    {
      "Ref_Id": 94,
      "Paper_Title": "PygmyBrowse: A small screen tree browser",
      "Year": 2006,
      "Type": "Application",
      "Evaluation_Type": "Mixed",
      "Stimuli_Description": "Interactive",
      "Layouts_Considered": "Indented List",
      "DOI": "https://dl.acm.org/doi/10.1145/1125451.1125562",
      "Abstract": "We present PygmyBrowse, a browser that allows users to navigate a tree data structure in a limited amount of display space. A pilot evaluation of PygmyBrowse was conducted, and results suggest that it reduces task completion times and increases user satisfaction over two alternative node-link tree browsers.",
      "Author": "Zvi Band, Ryen W. White"
    },
    {
      "Ref_Id": 95,
      "Paper_Title": "The InfoSky visual explorer: exploiting hierarchical structure and document similarities",
      "Year": 2002,
      "Type": "Application",
      "Evaluation_Type": "Quantitative",
      "Stimuli_Description": "Interactive",
      "Layouts_Considered": "Indented List,Enclosure",
      "DOI": "https://doi.org/10.1057%2FPALGRAVE.IVS.9500023",
      "Abstract": "InfoSky is a system enabling users to explore large, hierarchically structured document collections. Similar to a real-world telescope, InfoSky employs a planar graphical representation with variable magnification. Documents of similar content are placed close to each other and are visualised as stars, forming clusters with distinct shapes. For greater performance, the hierarchical structure is exploited and force-directed placement is applied recursively at each level on much fewer objects, rather than on the whole corpus. Collections of documents at a particular level in the hierarchy are visualised with bounding polygons using a modified weighted Voronoi diagram. Their area is related to the number of documents contained. Textual labels are displayed dynamically during navigation, adjusting to the visualisation content. Navigation is animated and provides a seamless zooming transition between summary and detail view. Users can map metadata such as document size or age to attributes of the visualisation such as colour and luminance. Queries can be made and matching documents or collections are highlighted. Formative usability testing is ongoing; a small baseline experiment comparing the telescope browser to a tree browser is discussed.",
      "Author": "Keith Andrews, Dr, Wolfgang Kienreich, Vedran Sabol, Jutta Becker, Georg Droschl, Frank Kappe, Michael Granitzer, Peter Auer, Klaus Tochtermann"
    },
    {
      "Ref_Id": 107,
      "Paper_Title": "A User Study of Techniques for Visualizing Structure and Connectivity in Hierarchical Datasets",
      "Year": 2017,
      "Type": "Empirical",
      "Evaluation_Type": "Mixed",
      "Stimuli_Description": "Static",
      "Layouts_Considered": "Node-Link,Enclosure,Symbolic,Adjacency",
      "DOI": "http://ceur-ws.org/Vol-1947/paper05.pdf",
      "Abstract": "Many tree layouts have been created for presenting hierarchical data. However, layouts optimized for some tasks are not adequate for others. In this paper, we focus on identifying tree structures and cross-links generated by hierarchical edge bundling. Our key contribution is the introduction of descriptive features that can be used to characterize trees in terms of their structural and connective qualities. We present a user study with 14 subjects that provides an evaluation of our approach in comparison to other popular tree visualization techniques. The results of the study indicate which techniques are more effective for visual analysis tasks that involve identifying and comparing tree and subtree structures and/or visualizing connections using hierarchical edge bundling.",
      "Author": "Tommy Dang, Paul Murray, Ronak Etemadpour, Angus G. Forbes"
    },
    {
      "Ref_Id": 108,
      "Paper_Title": "RADIAL VS. RECTANGULAR: EVALUATING VISUALIZATION LAYOUT IMPACT ON USER TASK PERFORMANCE OF HIERARCHICAL DATA",
      "Year": 2017,
      "Type": "Empirical",
      "Evaluation_Type": "Mixed",
      "Stimuli_Description": "Static",
      "Layouts_Considered": "Adjacency",
      "DOI": "http://www.iadisportal.org/ijcsis/papers/2017210202.pdf",
      "Abstract": "Space-filling techniques have been used in the information visualization field as an alternative to the\nconventional node-link layouts for intuitively showing large hierarchies in less space. Different space\nfilling layouts have been designed, developed and evaluated; however, much less effort have been made\nto look into how layout can impact user task performance on hierarchical data structures. In this paper,\nwe focus on the impact of layout on user task performance by conducting evaluation studies for two\ncommon space-filling layout structures, the Sunburst (radial) layout and the Icicle (rectangular) layout.\nIn our studies, users performed eight search-based tasks on files and directories in the resulting\nvisualizations, first in a controlled environment and subsequently in an online environment. We focused\non deriving user performance metrics with regard to effectiveness, efficiency, and user acceptance.\nResults demonstrate a mixed view of task performance and preference with both layouts, e.g., users\nperformed better with the Icicle layout while they preferred the Sunburst layout for visual aesthetics. We\nfurther analyzed the impact of layout on the performance dynamics in terms of response times and\naccuracy using event history analysis (EHA) in the control study setting. The EHA results revealed clear\ndifferences in response tendencies even though no differences existed in mean response times for most of\nthe tasks. It also clearly showed that participants performed more efficiently with the directory\ncomparison tasks than the file comparison tasks. Overall, through these studies we were able to derive\ncausal relationships between the layout and the user’s task performance while interacting with\nhierarchical data structures",
      "Author": "Sujay Muramalla, Ragaad AlTarawneh, Shah Rukh Humayoun, Ricarda Moses, Sven Panis, Achim Ebert"
    },
    {
      "Ref_Id": 109,
      "Paper_Title": "Evaluating the Significance of the Windows Explorer Visualization in Personal Information Management Browsing tasks",
      "Year": 2007,
      "Type": "Empirical",
      "Evaluation_Type": "Quantitative",
      "Stimuli_Description": "Interactive",
      "Layouts_Considered": "Indented List",
      "DOI": "https://doi.org/10.1109/IV.2007.46",
      "Abstract": "The visualization of hierarchies is very important for digital information management and presentation systems. Especially in the context of personal information management, file browsers play a very important role. Currently the most common file browser visualizations are windows explorer and the simple zoomable visualization offered by Microsoft windows. This work explores the issue of file browser visualization through a user study based on interviews and an experiment.",
      "Author": "Maria Golemati, Akrivi Katifori, Eugenia G Giannopoulou, Ilias Daradimos"
    },
    {
      "Ref_Id": 116,
      "Paper_Title": "A Study on the Effectiveness of Tree-Maps as Tree Visualization\nTechniques",
      "Year": 2017,
      "Type": "Empirical",
      "Evaluation_Type": "Mixed",
      "Stimuli_Description": "Interactive",
      "Layouts_Considered": "Enclosure",
      "DOI": "https://doi.org/10.1016/j.procs.2017.12.136",
      "Abstract": "Tree Structure visualization techniques are one of the important techniques to support the analysis of large hierarchical structure data. They are typically used as tree structure node-link diagram. However, it is difficult to visualize the content of directories when there are too many child nodes. In this paper, a study on the effectiveness of the tree-maps as tree structure visualization will be presented. Tree-maps are always considered as one of the interesting topic of research in HCI. Therefore, in this paper we will discuss about applying various types of Tree-maps as one of the visualization techniques. First, we will look into current problem faced by Tree structured node-link diagram. We will also look into four main types of tree-maps such as original tree-maps, Circular Tree-maps, Cushion Tree-maps and 3D Tree-maps. Finally, the effectiveness of these tree-maps to visualize the hierarchy of the directory will be investigated by conducting a simple user experiments.",
      "Author": "Lim Kian Long, Lim Chien Hui, Gim Yeong Fook, Wan Mohd Nazmee Wan Zainon"
    },
    {
      "Ref_Id": 117,
      "Paper_Title": "User Centered Evaluation of Interactive Data Visualization forms for Document Management Systems",
      "Year": 2015,
      "Type": "Empirical",
      "Evaluation_Type": "Mixed",
      "Stimuli_Description": "Interactive",
      "Layouts_Considered": "Node-Link,Adjacency,Enclosure",
      "DOI": "https://doi.org/10.1016/j.promfg.2015.07.669",
      "Abstract": "In order to manage the overload of digital information in the SMEs document management is becoming increasingly important. With a DMS documents can be searched, checked, edited and forwarded, which simplifies the handling of documents for the employees. Compared to the inciting and joyful designed user interfaces used for private matters, the interfaces of the up-to-date DMS are lagging far behind regarding usability since DMS are usually designed according to functional aspects. When solving the tasks, positive user experiences and joy of use are rather rare although this can help to encourage the acceptance and positive attitude towards software. In order to improve the usability aspects of DMS, in a first step, interactive visualizations were developed for the DMS data analysis and were tested for usability and attractiveness. Results of the study show that zoomable tree map is the most appropriate visualization type for DMS data and thus is recommended for interactive presentation of data structures.",
      "Author": "Antje Heinicke, Chen Liao, Katrin Walbaum, Jennifer Bützler, Christopher M.Schlick"
    }
  ]
  return test;
}

function parseRawData(row, column, data) {
  let inputArray = [];
  let createdData = [];
  let localCreatedData = {};
  for (let i = 0; i < row; i++) {
    if (Object.keys(localCreatedData).length != 0) {
      createdData.push(localCreatedData);
      localCreatedData = {};
    }
    for (let j = 0; j < column; j++) {
      let cell = data[i * column + j]["gs$cell"];
      let row = cell["row"];
      let col = cell["col"];
      if (row == 1) {
        inputArray.push(cell["$t"].trim());
      } else {
        localCreatedData[inputArray[col - 1]] = cell["$t"];
      }
    }
  }
  //Setting all files data in the current session
  createdData.push(localCreatedData);
  return createdData;
}

async function fetchProposedData() {
  const docId = "1J66Qw0Db6Omv6jBecJpZPtQmeRnntpdoZHNfLpCD0Bo";
  const sheetId = "4";
  let data = await loadDataFromAPI(docId, sheetId);

  //ToDo: We have to dynamically insert the final file list count
  const row = 214;
  const col = 11;

  let createdData = parseRawData(row, col, data);
 // console.log("In fetchProposedData");
  console.log(createdData);
  return createdData;
}
