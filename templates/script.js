document.addEventListener("DOMContentLoaded",function() {
    let taskContainerDiv = document.getElementById("task-container")
    setInterval(() => {
        let data = []
        for (element of taskContainerDiv.children) {
            let content = element.children[0]
            let state = element.children[1]
            let task = {
                content: content.value,
                state: state.value
            }
            data.push(task)
        }
        fetch("/api", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
    }, 1000)

    let createTaskButton = document.getElementById("create-task-button")
    createTaskButton.addEventListener("click", () => {
        let taskInput = document.createElement("input")
        taskInput.type = "text"
        taskInput.value = "task"
        let taskState = document.createElement("input")
        taskState.type = "checkbox"
        let taskDiv = document.createElement("div")
        taskDiv.appendChild(taskState)
        taskDiv.appendChild(taskInput)
        taskContainerDiv.appendChild(taskDiv)
    })
})