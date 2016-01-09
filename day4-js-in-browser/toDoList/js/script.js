var allActiveTasks = 0;


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


var toDoList = document.getElementById('tasksField');


function addTaskToList(currentTask){
    allActiveTasks++;
    output.setAttribute('value', allActiveTasks);
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
    var closeTask = document.createElement('div');
    closeTask.className = 'delTask';
    var closeMark = document.createTextNode(String.fromCharCode(215));
    closeTask.appendChild(closeMark);
    singleTaskField.appendChild(closeTask);
}


var output = document.querySelector('.leftTasks');

var delMark = document.querySelector('.delTask');
if(delMark){
    alert('Catch');
    delMark.addEventListener('click', function() {
        delMark.parentNode.removeChild(delMark);
    });
}

//check tasks
//======================================================================================================================
var mainCheck = document.getElementById('checkAll');
mainCheck.addEventListener('click', checkAllPoints);

function checkAllPoints(){
    var allTasks = document.querySelectorAll('.taskStatus');
    if(mainCheck.checked == true) {
        for (var i = 0; i < allTasks.length; i++) {
            allTasks[i].checked = true;
        }
        allActiveTasks = 0;
        output.setAttribute('value', allActiveTasks);
    }
    else{
        for (var i = 0; i < allTasks.length; i++) {
            allTasks[i].checked = false;
        }
        allActiveTasks = allTasks.length;
        output.setAttribute('value', allActiveTasks);
    }
}


toDoList.addEventListener('click', function() {
    var allTasks = document.querySelectorAll('.taskStatus');
    var counterActiveTasks = 0;
    for (var i = 0; i < allTasks.length; i++) {
        if (allTasks[i].checked == false) {
            counterActiveTasks++;
        }
    }
    if (counterActiveTasks == 0){
        mainCheck.checked = true;
    }
    else {
        mainCheck.checked = false;
    }
    allActiveTasks = counterActiveTasks;
    output.setAttribute('value', allActiveTasks);
});


// control menu
//======================================================================================================================
var buttonAll = document.querySelector('.allTasks');
buttonAll.addEventListener('click', function(){
    var allTasksFields = document.querySelectorAll('.singleTask');
    for (var i = 0; i < allTasksFields.length; i++) {
        allTasksFields[i].style.opacity = 1;
        allTasksFields[i].style.position = 'inherit';
    }
});

var buttonActive = document.querySelector('.activeTasks');
buttonActive.addEventListener('click', function(){
    var allTasks = document.querySelectorAll('.taskStatus');
    var allTasksFields = document.querySelectorAll('.singleTask');
    for (var i = 0; i < allTasks.length; i++) {
        if(allTasks[i].checked == true) {
            allTasksFields[i].style.opacity = 0;
            allTasksFields[i].style.position = 'absolute';
        }
        else{
            allTasksFields[i].style.opacity = 1;
            allTasksFields[i].style.position = 'inherit';
        }
    }
});

var buttonDone = document.querySelector('.doneTasks');
buttonDone.addEventListener('click', function(){
    var allTasks = document.querySelectorAll('.taskStatus');
    var allTasksFields = document.querySelectorAll('.singleTask');
    for (var i = 0; i < allTasks.length; i++) {
        if(allTasks[i].checked == false){
            allTasksFields[i].style.opacity = 0;
            allTasksFields[i].style.position = 'absolute';
        }
        else{
            allTasksFields[i].style.opacity = 1;
            allTasksFields[i].style.position = 'inherit';
        }
    }
});

var buttonClear = document.querySelector('.clearTasks');
buttonClear.addEventListener('click', function(){
    var allTasks = document.querySelectorAll('.taskStatus');
    var allTasksFields = document.querySelectorAll('.singleTask');
    for (var i = 0; i < allTasks.length; i++) {
        if(allTasks[i].checked == true) allTasksFields[i].remove();
    }
});



//======================================================================================================================

