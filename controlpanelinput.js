
function ControlPanelInput(data, onChange, {
  columns = data.columns ?? Object.keys(data[0]), // array of column names from data to allow selecting
  runOnChange = true, // whether to run onChange when the control panel is first created
  defaultSplitValues = [], // default values for the control panel splits
  defaultFilterValues = {}, // default values for the control panel filters
  labels = {}, // labels for the control panel
  groupWrappingClass = "control-panel-input", // class to apply to wrap each group of controls
  filterWrappingClass = "control-panel-input__filter", // class to apply to wrap each filter control
} = {}) {
  const node = document.createElement("div")
  node.classList.add("control-panel")

  // STATIC structs holding the state of the control panel
  const SPLIT_INPUT_VALUES = defaultSplitValues
  const FILTER_INPUT_VALUES = defaultFilterValues

  // Create each checkbox input for all columns of data
  columns.forEach(column => {
    if (typeof data[0][column] !== 'string') {
      console.warn(`Column ${column} is not a string, so it will not be included in the control panel.`)
      return
    }

    // create checkbox input elements
    const wrapper = document.createElement("div")
    wrapper.classList.add(groupWrappingClass)
    node.appendChild(wrapper)

    const h4 = document.createElement("h4") //added title
    h4.id = `${column}-title` 
    h4.style.textAlign='center' //center aligned
    h4.textContent = labels[column] ?? (" " +  column) 
    wrapper.appendChild(h4)

    const input = document.createElement("input")
    input.type = "checkbox"
    input.id = `${column}-checkbox`
    input.checked = SPLIT_INPUT_VALUES.includes(column)
    wrapper.appendChild(input)
    const label = document.createElement("label")
    label.setAttribute("for", input.id)
    label.textContent = labels[column] ?? column
    label.textContent = " " + label.textContent //added space
    wrapper.appendChild(label)

    // add event listener to update SPLIT_INPUT_VALUES
    input.addEventListener("change", (e) => {
      if (e.target.checked) SPLIT_INPUT_VALUES.push(column)
      else SPLIT_INPUT_VALUES.splice(SPLIT_INPUT_VALUES.indexOf(column), 1)
      onChange(SPLIT_INPUT_VALUES, FILTER_INPUT_VALUES)
    })

    // init filter inputs -- note inversed, ie if checked, doesn't appear in filter
    const values = [...new Set(data.map(d => d[column]))]
    if (!column in FILTER_INPUT_VALUES || typeof FILTER_INPUT_VALUES[column] !== 'object') {
      FILTER_INPUT_VALUES[column] = []
    }

    // create filter input elements for each value in the column
    values.forEach(value => {
      // create checkbox input elements
      const subwrapper = document.createElement("div")
      subwrapper.classList.add(filterWrappingClass)
      wrapper.appendChild(subwrapper)
      const input = document.createElement("input")
      input.type = "checkbox"
      input.id = `${value}-checkbox`
      input.checked = !FILTER_INPUT_VALUES[column].includes(value)
      subwrapper.appendChild(input)
      const label = document.createElement("label")
      label.setAttribute("for", input.id)
      label.textContent = " "+ value //added space
      subwrapper.appendChild(label)

      // add event listener to update FILTER_INPUT_VALUES
      input.addEventListener("change", (e) => {
        if (e.target.checked) FILTER_INPUT_VALUES[column].splice(FILTER_INPUT_VALUES[column].indexOf(value), 1)
        else FILTER_INPUT_VALUES[column].push(value)
        onChange(SPLIT_INPUT_VALUES, FILTER_INPUT_VALUES)
      })
    })
  })

  // run onChange with the initial values
  if (runOnChange) onChange(SPLIT_INPUT_VALUES, FILTER_INPUT_VALUES)
  return { node }
}