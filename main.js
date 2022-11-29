
const onSelectionChanged = (plotNode, data) => (selected) => {
  // Update the plot with the selected values
  console.log(selected)
  const scpltMatrix = ScatterplotMatrix(data, {
    columns: ["reading score", "writing score", "math score"],
    domain: [[0, 100], [0, 100], [0, 100]],
    z: d => {
      let sum = 0
      for (const key in selected) {
        if (selected[key]) sum += d[key]
      }
      return sum
    },
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
  })
  panelNode.appendChild(controlPanel.node)
}

// if document is ready
document.addEventListener("DOMContentLoaded", main);
