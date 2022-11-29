
function ControlPanelInput(data, onChange, {
  columns = data.columns ?? Object.keys(data[0]), // array of column names from data to allow selecting
  runOnChange = true, // whether to run onChange when the control panel is first created
  defaultValues = {}, // default values for the control panel
  labels = {}, // labels for the control panel
  wrappingClass = "control-panel-input", // class to apply to the wrapping div
} = {}) {
  const node = document.createElement("div")
  node.classList.add("control-panel")

  // STATIC struct holding the state of the control panel
  const INPUT_VALUES = defaultValues

  // Create each checkbox input for all columns of data
  columns.forEach(column => {
    if (typeof data[0][column] !== 'string') {
      console.warn(`Column ${column} is not a string, so it will not be included in the control panel.`)
      return
    }

    // setup value
    INPUT_VALUES[column] = INPUT_VALUES[column] ?? false

    // create checkbox input elements
    const wrapper = document.createElement("div")
    wrapper.classList.add(wrappingClass)
    node.appendChild(wrapper)
    const input = document.createElement("input")
    input.type = "checkbox"
    input.id = `${column}-checkbox`
    input.checked = INPUT_VALUES[column] ?? true
    wrapper.appendChild(input)
    const label = document.createElement("label")
    label.setAttribute("for", input.id)
    label.textContent = labels[column] ?? column
    wrapper.appendChild(label)

    // add event listener to update INPUT_VALUES
    input.addEventListener("change", (e) => {
      INPUT_VALUES[column] = e.target.checked
      onChange(INPUT_VALUES)
    })
  })

  // run onChange with the initial values
  if (runOnChange) onChange(INPUT_VALUES)
  return { node }
}