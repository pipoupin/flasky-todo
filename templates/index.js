const taskContainerDiv = document.getElementById("task-container")
// apply the interaction to the already existing tasks
for (element of taskContainerDiv.children) {
    const checkbox = element.children[0]
    const label = element.children[1]
    const cancelButton = element.children[2]
    const deleteButton = element.children[3]
    deleteButton.addEventListener("click", () => {
        deleteButton.parentNode.remove()
    })
    cancelButton.addEventListener("click", () => {
        if (checkbox.checked) 
            return
        if (label.value == "") {
            alert("Can't cancel an empty task")
            return
        }
        // freeze all taks's inputs except this one
        const value = label.disabled ? false : true
        label.disabled = value
        checkbox.disabled = value

        // swap the "enable" | "disable"
        if (cancelButton.value =="disable"){
            cancelButton.value ="enable"
        } else {
            cancelButton.value ="disable"
        }
    })
    checkbox.addEventListener("change", () => {
        // if task is checked (done) you can't change its content neither its availability (enable | disable)
        
        if (checkbox.checked) {
            if (label.value == "") {
                alert("Can't check an empty task")
                return
            }
            label.disabled = true
            cancelButton.disabled = true
        }
        else {
            label.disabled = false
            cancelButton.disabled = false
        }
    })
}

setInterval(() => {
    let tasks = []
    for (element of taskContainerDiv.children) {
        const checkbox = element.children[0]
        const label = element.children[1]
        const task = [label.value, checkbox.checked, checkbox.disabled]
        if (task[0])
            tasks.push(task)
    }
    console.log(tasks)
    fetch("/api", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(tasks)
    })
}, 1000)


window.addEventListener('beforeunload', function(e) {})

const createTaskButton = document.getElementById("create-task-button")
createTaskButton.addEventListener("click", () => {
    const label = document.createElement("input")
    label.type = "text"
    label.value = ""
    const checkbox = document.createElement("input")
    checkbox.type = "checkbox"
    const cancelButton = document.createElement("input")
    cancelButton.type = "button"
    cancelButton.value = "disable"
    cancelButton.classList.add("cancel-button")
    const deleteButton = document.createElement("input")
    deleteButton.type = "button"
    deleteButton.value = "delete"
    deleteButton.classList.add("delete-button")
    const taskDiv = document.createElement("div")
    taskDiv.classList.add("task")
    taskDiv.appendChild(checkbox)
    taskDiv.appendChild(label)
    taskDiv.appendChild(cancelButton)
    taskDiv.appendChild(deleteButton)
    taskContainerDiv.appendChild(taskDiv)

    deleteButton.addEventListener("click", () => {
        if (!checkbox.disabled) {
            taskDiv.remove()
            return
        }
        alert("Can't remove a disabled task")
    })

    cancelButton.addEventListener("click", () => {
        // freeze all task's inputs except this one
        if (checkbox.checked) 
            return
        if (label.value == "") {
            alert("Can't cancel an empty task")
            return
        }
        const value = label.disabled ? false: true
        label.disabled = value
        checkbox.disabled = value

        // swap the "enable" | "disable"
        if (cancelButton.value =="disable"){
            cancelButton.value ="enable"
        } else {
            cancelButton.value ="disable"
        }
    })

    checkbox.addEventListener("change", () => {
        
        // if task is checked (done) you can't change its content neither its availability (enable | disable)
        if (checkbox.checked) {
            // as the label is empty, the task can't be checked
            if (label.value=="") {
                checkbox.checked = false 
                alert("Can't check an empty task")
                return
            }    
            // if not empty, it can
            label.disabled = true
            cancelButton.disabled = true

        }
        else {
            label.disabled = false
            cancelButton.disabled = false
        }
    })
})

