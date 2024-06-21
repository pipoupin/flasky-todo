const taskContainerDiv = document.getElementById('task-container');

// -- REQUESTS --
let xmlHttp = new XMLHttpRequest();

const getTasksRequest = () => {
    xmlHttp.open('GET', '/api', false);
    xmlHttp.send(null);
    return JSON.parse(xmlHttp.responseText);
}

const sendTasksRequest = (tasks) => {
    xmlHttp.open('POST', '/api', true);
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.send(JSON.stringify(tasks));
}

const deleteTasksRequest = (tasks) => {
    xmlHttp.open('DELETE', '/api', true);
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.send(JSON.stringify(tasks));
}

const updateTasksRequest = (tasks) => {
    xmlHttp.open('PUT', '/api', true);
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.send(JSON.stringify(tasks));
}

const createTasksRequest = async (tasks) => {
    // the return is a list of ids
    xmlHttp.open('POST', '/api', true);
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    try {
        xmlHttp.send(JSON.stringify(tasks));
    }
    catch (e) {
        console.log(e)
    }
        return xmlHttp.responseText;
}

// -- TASKS --
//  task : list [id, content, checked, canceled]
const createTask = (task) => {
    console.log(task);
    // add the modif state
    task.push(true);
    // task stored in the tasks variable : list [id, content, checked, canceled, modified]

    const taskDiv = document.createElement('div');

    const checkbox = document.createElement('input');
    const label = document.createElement('input');
    const cancelButton = document.createElement('input');
    const deleteButton = document.createElement('input');
    const modifButton = document.createElement('input');

    taskDiv.classList.add('task');

    checkbox.type = 'checkbox';
    checkbox.checked = task[2];

    label.type = 'text';
    label.value = task[1];
    label.placeholder = 'fill';
    label.disabled = task[3];
    label.readOnly = !task[4];

    cancelButton.type = 'button';
    cancelButton.value = task[3] ? 'enable' : 'disable';
    cancelButton.classList.add('cancel-button');

    deleteButton.type = 'button';
    deleteButton.value = 'delete';
    deleteButton.classList.add('delete-button');

    modifButton.type = 'button';
    modifButton.value = 'save';

    taskDiv.append(checkbox, label, modifButton, cancelButton, deleteButton);
    taskContainerDiv.appendChild(taskDiv);

    console.log(task);

    checkbox.addEventListener('change', () => {
        if (task[2]) // canceled
        {
            alert("Can't check a canceled task")
            return;
        }

        if (label.value == '')
        {
            checkbox.checked = false;
            alert("Can't check an empty task");
            return;
        }
        else
        {
            label.disabled = true;
            cancelButton.disabled = true;
            task[2] = true;
        }

        if (task[0])
            updateTasksRequest([ task ]);
    });

    cancelButton.addEventListener('click', () => {
        // freeze all task's inputs except this one
        if (task[2]) // checked
        {
            alert("Can't cancel a checked task");
            return;
        }
        if (label.value == '')
        {
            alert("Can't cancel an empty task");
            return;
        }
        // invert value of canceled ~ task[3]
        // TODO verify this
        task[3] = !task[3];
        label.disabled = task[3];
        checkbox.disabled = task[3];

        if (task[0]) // if task is in db (non-null id)
            updateTasksRequest([ task ]);

        // swap the "enable" | "disable"
        cancelButton.value = cancelButton.value == 'disable' ? 'enable' : 'disable'
    });

    deleteButton.addEventListener('click', () => {
        if (!task[3]) // canceled
        {
            taskDiv.remove();
            if (task[0]) // if task is in db (non-null id)
                task[1] = label.value;
                deleteTasksRequest([ task ]);
            return;
        }
        else
        {
            alert("Can't remove a disabled task");
        }
    });

    modifButton.addEventListener('click', () => {
        if (label.value == '')
        {
            return;
        }
        // swap the modif state
        task[4] = !task[4];
        label.readOnly = !task[4];
        modifButton.value = modifButton.value == 'modify' ? 'save' : 'modify';
        if (!task[4]) // if is no more modified -> it was saved
        {
            if (task[0])
            {
                task[1] = label.value;
                updateTasksRequest([ task ]);
            }
            else
            {
                task[1] = label.value;
                createTasksRequest([ task ])
                .then((response) => {
                    task[0] = response[0];
                    console.log(task);
                });
            }
        }
    });
}


let tasks = getTasksRequest();

tasks.forEach(task => createTask(task));

const createTaskButton = document.getElementById('create-task-button')
createTaskButton.addEventListener('click', () => {
    createTask( [0, '', false, false] );
    tasks.push( [0,'', false, false, false] );
});


window.addEventListener('beforeunload', function(e) {

});
