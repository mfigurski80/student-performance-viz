
// if document is ready
document.addEventListener("DOMContentLoaded", main);

async function main() {
  const plotNode = document.getElementById("plot");
  const data = await d3.csv("data/StudentsPerformance.csv")
  // console.log(data)

  const scplt_matrix = ScatterplotMatrix(data, {
    columns: ["reading score", "writing score", "math score"],
    domain: [[0,100], [0,100], [0,100]],
    z: d => d.gender,
  })
  plotNode.appendChild(scplt_matrix)
}
