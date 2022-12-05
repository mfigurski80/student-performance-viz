
function UserDataInput(data, onSubmit, {
  columns = data.columns ?? Object.keys(data[0]), // array of column names from data to allow selecting
} = {}) {
  const node = document.createElement("form")
  node.classList.add("user-data-input")

  console.log("columns", columns)
  // Create each checkbox input for all columns of data
  columns.forEach(column => {
    if (typeof data[0][column] !== 'string') {
      console.warn(`Column ${column} is not a string, so it will not be included in the control panel.`)
      return
    }

    // create input elements
    const wrapper = document.createElement("div")
    wrapper.classList.add("user-data-input__wrapper")
    node.appendChild(wrapper)

    const input = document.createElement("input")
    input.type = "text"
    input.id = `${column}-input`
    input.name = `${column}`
    input.placeholder = column
    wrapper.appendChild(input)
  })
  const submit = document.createElement("input")
  submit.type = "submit"
  submit.value = "Submit"
  node.appendChild(submit)

  return node
}