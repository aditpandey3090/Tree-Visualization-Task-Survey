//We need to store all the paper information indexed by their id
// Final DS: {id:paperInformation}
class PaperInformation {
  paperInformation = {};
  constructor(papers) {
    console.log(papers);
    for (let i = 0; i < papers.length; i++) {
      this.paperInformation[papers[i]["Ref_Index"]] = {};
      this.paperInformation[papers[i]["Ref_Index"]] = papers[i];
    }
  }
  showData(ref_Index) {
    return this.paperInformation[ref_Index];
  }
}
