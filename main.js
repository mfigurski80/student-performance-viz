
// if document is ready
document.addEventListener("DOMContentLoaded", main);

async function main() {
  // get the canvas element
  const canvas = document.getElementById("student-performance-viz-canvas");

  data = await d3.csv("data/StudentsPerformance.csv")
  console.log(data)
}