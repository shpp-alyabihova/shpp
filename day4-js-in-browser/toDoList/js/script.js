

function readValue(event){
    if (event.keyCode==13) {
        var newTask = document.getElementById('newTask');
        var currentTask = newTask.value;
        if (currentTask == "") {
            return false;
        }
        addTaskToList(currentTask);
        newTask.value = "";
    }
}

function addTaskToList(currentTask){
    var toDoList = document.getElementById('tasksField');
    var singleTaskField = document.createElement('div');
    singleTaskField.className = 'singleTask';
    toDoList.appendChild(singleTaskField);
    var taskState = document.createElement('input');
    taskState.className = 'taskStatus';
    taskState.type = "checkbox";
    singleTaskField.appendChild(taskState);
    var _toDo = document.createElement('span');
    var textTask = document.createTextNode(currentTask);
    _toDo.className = 'toDo';
    _toDo.appendChild(textTask);
    singleTaskField.appendChild(_toDo);
}

