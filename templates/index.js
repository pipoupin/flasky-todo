const taskContainerDiv = document.getElementById("task-container")

// -- REQUESTS --
let xmlHttp = new XMLHttpRequest();

const getTasks = () => {
    xmlHttp.open("GET", "/api", false);
    xmlHttp.send(null);
    return JSON.parse(xmlHttp.responseText);
}

const sendTasks = (tasks) => {
    xmlHttp.open("POST", "/api", false);
    xmlHttp.send(JSON.stringify(tasks));
    return xmlHttp.responseText;
}

// -- TASKS --
const createTask = (task) => {
    // add the modif state
    task.push(false);

    const taskDiv = document.createElement('div');

    const checkbox = document.createElement('input');
    const label = document.createElement('input');
    const cancelButton = document.createElement('input');
    const deleteButton = document.createElement('input');
    const modifButton = document.createElement('input');

    taskDiv.classList.add('task');

    checkbox.type = 'checkbox';
    checkbox.checked = task[1];

    label.type = 'text';
    label.value = task[0];
    label.placeholder = 'remplir';
    label.disabled = task[2];
    label.readOnly = task[3];

    cancelButton.type = 'button';
    cancelButton.value = task[2] ? 'enable' : 'disable';
    cancelButton.classList.add('cancel-button');

    deleteButton.type = 'button';
    deleteButton.value = 'delete';
    deleteButton.classList.add('delete-button');

    modifButton.type = 'button';
    modifButton.value = 'save';

    taskDiv.append(checkbox, label, modifButton, cancelButton, deleteButton);
    taskContainerDiv.appendChild(taskDiv);

    checkbox.addEventListener('change', () => {
        if (checkbox.checked)
        {
            if (label.value=='')
            {
                checkbox.checked = false;
                alert("Can't check an empty task");
            }
            else
            {
                label.disabled = true;
                cancelButton.disabled = true;
            }
        }
        else
        {
            label.disabled = false;
            cancelButton.disabled = false;
        }
    });

    cancelButton.addEventListener('click', () => {
        // freeze all tasks's inputs except this one
        if (task.checked) 
            return;
        if (label.value == '')
        {
            alert("Can't cancel an empty task");
            return;
        }
        const value = !label.disabled;
        label.disabled = value;
        checkbox.disabled = value;

        // swap the "enable" | "disable"
        cancelButton.value = cancelButton.value == 'disable' ? 'enable' : 'disable'
    })

    deleteButton.addEventListener('click', () => {
        if (!checkbox.disabled);
        {
            taskDiv.remove();
            return;
        }
        alert("Can't remove a disabled task");
    }) 

    modifButton.addEventListener('click', () => {
        // swap the modif state
        task[3] = !task[3];
        label.readOnly = !label.readOnly;
        modifButton.value = modifButton.value == 'modify' ? 'save' : 'modify';
    })
}


let tasks = getTasks()
console.log(tasks)

tasks.forEach(task => createTask(task))

// this interval is not necessary anymore
// we need to fetch every time a task has finished to be modified
setInterval(() => {
    sendTasks();
}, 5000)

const createTaskButton = document.getElementById("create-task-button")
createTaskButton.addEventListener("click", () => {
    createTask(['', false, false])
    tasks.push(['', false, false, false])
})


window.addEventListener('beforeunload', function(e) {
    sendTasks();
})
