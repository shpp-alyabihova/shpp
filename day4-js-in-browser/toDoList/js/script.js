var newTask = document.getElementByClassName("taskField");
var toDoList = document.getElementByClassName("list");

function readValue(event){
    if (event.keyCode==13) {
        var currentTask = newTask.value;
        if (currentTask == "") {
            return false;
        }
        var taskLabel = document.createElement('label');
        var textTask = document.createTextNode(currentTask);
        taskLabel.appendChild(textTask);
        var taskState = document.createElement('input');
        taskState.className = 'taskStatus';
        taskState.type = "checkbox";
        toDoList.appendChild(taskLabel);
        taskLabel.appendChild(taskState);
    }
}
