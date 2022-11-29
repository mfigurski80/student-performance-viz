
const onSelectionChanged = (plotNode, data) => (selected) => {
  // Update the plot with the selected values
  const selectedColumns = Object.keys(selected).filter(key => selected[key])
  const scpltMatrix = ScatterplotMatrix(data, {
    columns: ["reading score", "writing score", "math score"],
    domain: [[0, 100], [0, 100], [0, 100]],
    z: d => selectedColumns.map(key => d[key]).join(" "),
    width: Math.min(window.innerHeight, window.innerWidth) * 0.9,
  })
  plotNode.innerHTML = ""
  plotNode.appendChild(scpltMatrix)
}

async function main() {
  const data = await d3.csv("data/StudentsPerformance.csv")

  // Set up the plot
  const plotNode = document.getElementById("plot")

  // Set up the control panel
  const panelNode = document.getElementById("plot-input")
  const controlPanel = ControlPanelInput(data, onSelectionChanged(plotNode, data), {
    columns: ["gender", "race/ethnicity", "parental level of education", "lunch", "test preparation course"],
    defaultValues: { "gender": true },
    labels: {
      "gender": "Gender Identity",
      "race/ethnicity": "Race / Ethnicity",
      "parental level of education": "Parental Level of Education",
      "lunch": "Whether Participating in Free Lunch Program",
      "test preparation course": "Whether Participating in Test Preparation Course",
    }
  })
  panelNode.appendChild(controlPanel.node)
}

// if document is ready
document.addEventListener("DOMContentLoaded", main);
