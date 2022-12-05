
const onSelectionChanged = (plotNode, data) => (selectedSplits, selectedFilters) => {
  // Update the plot with the selected values
  const filters = Object.keys(selectedFilters).map(key => selectedFilters[key].map(val => [key, val])).flat()
  const filteredData = data.filter(d => filters.every(([key, val]) => d[key] !== val))
  // console.log(filteredData)
  const scpltMatrix = ScatterplotMatrix(filteredData, {
    columns: ["reading score", "writing score", "math score"],
    domain: [[0, 100], [0, 100], [0, 100]],
    z: d => selectedSplits.map(key => d[key]).join(" "),
    width: Math.min(window.innerHeight * 0.9, window.innerWidth * 0.95),
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
      "gender": "Gender Identity:",
      "race/ethnicity": "Race / Ethnicity:",
      "parental level of education": "Parental Level of Education:",
      "lunch": "Free Lunch Program:",
      "test preparation course": "Test Preparation Course:",
    }
  })
  panelNode.appendChild(controlPanel)

  // Set up the userdata input
  const userDataNode = document.getElementById("user-data")
  const dataInputNode = UserDataInput(data, console.log, {
    numericInputs: ["reading score", "writing score", "math score"],
  })
  userDataNode.appendChild(dataInputNode)

}

// if document is ready
document.addEventListener("DOMContentLoaded", main);
