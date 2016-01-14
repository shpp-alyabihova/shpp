var output = document.querySelector('.leftTasks');
var toDoList = document.getElementById('tasksField');
var allActiveTasks = 0;
var activeEditableToDo = null;
var storageData = {
    'storageKey' : 'storageData',
    'data' : {
        'activeMod' : 'all',
        'toDoList' : {}
    },
    'add' : function(title){
        var id = new Date().getTime();
        this.data.toDoList[id] = {
            'title' : title,
            'status' : false
        };
        localStorage.setItem(this.storageKey, JSON.stringify(this.data));
        return id;
    },
    'edit' : function(id, title, status){
        if(typeof this.data.toDoList[id] != 'undefined'){
            this.data.toDoList[id] = {
                'title' : title,
                'status' : status
            };
            localStorage.setItem(this.storageKey, JSON.stringify(this.data));
        }
    },
    'del' : function(id) {
        if (typeof this.data.toDoList[id] != 'undefined') {
            delete this.data.toDoList[id];
            localStorage.setItem(this.storageKey, JSON.stringify(this.data));
        }
    },
    'setMode' : function(button){
        this.data.activeMod = button;
        localStorage.setItem(this.storageKey, JSON.stringify(this.data));
    },
    'readStorage' : function(){
        var data = localStorage.getItem(this.storageKey);
        if (data) {
            try {
                data = JSON.parse(data);
                if(data){
                    this.data = data;
                }
            } catch(ex) {
                alert(ex);
            }
        }
    }
};

document.onclick = function(){
    editComplete();
};



function readValue(event){
    if (event.keyCode==13) {
        var newTask = document.getElementById('newTask');
        var currentTask = newTask.value;
        if (currentTask == "") {
            return false;
        }
        var id = storageData.add(currentTask);
        addTaskToList(id, currentTask);
        newTask.value = "";

    }
}

function addTaskToList(id, currentTask, status){
    allActiveTasks++;
    output.setAttribute('value', allActiveTasks);
    var singleTaskField = document.createElement('div');
    singleTaskField.id = id;
    singleTaskField.className = 'singleTask';
    toDoList.appendChild(singleTaskField);
    var taskState = document.createElement('input');
    taskState.className = 'taskStatus';
    taskState.type = "checkbox";
    taskState.checked = status || false;
    singleTaskField.appendChild(taskState);
    var _toDo = document.createElement('span');
    var textTask = document.createTextNode(currentTask);
    _toDo.className = 'toDo';
    _toDo.appendChild(textTask);
    singleTaskField.appendChild(_toDo);

    appendCloseBtn(singleTaskField);

    _toDo.onkeydown = function(e){
        var key = (e.which || e.keyCode);
        if (key == 13 || key == 27) {
            editComplete(key == 27);
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
    };

    singleTaskField.ondblclick = function () {
        _toDo.setAttribute('contenteditable', 'true');
        _toDo.contentBackUp = _toDo.innerHTML;
        activeEditableToDo = _toDo;
    };

    taskState.onchange = function () {
        storageData.edit(id, _toDo.innerHTML, taskState.checked);
        updateActiveTaskCount();
    };
}


function  removeTaskFromList(singleTaskField){
    var id = singleTaskField.id;
    storageData.del(id);
    singleTaskField.remove();

}

function editComplete(restore){
    if (activeEditableToDo){
        if(activeEditableToDo.innerHTML == '' || restore){
            activeEditableToDo.innerHTML = activeEditableToDo.contentBackUp;
        }
        activeEditableToDo.setAttribute('contenteditable', 'false');
        storageData.edit(
            activeEditableToDo.parentNode.id,
            activeEditableToDo.innerHTML,
            activeEditableToDo.parentNode.firstChild.checked
        );
        activeEditableToDo = null;
    }
}



function appendCloseBtn(singleTaskField) {
    var closeTask = document.createElement('div');
    closeTask.className = 'delTask';
    closeTask.appendChild(document.createTextNode(String.fromCharCode(215)));
    closeTask.onclick = function (e) {
        removeTaskFromList(singleTaskField);
    };
    singleTaskField.appendChild(closeTask);
}

//check tasks
//======================================================================================================================
var mainCheck = document.getElementById('checkAll');
mainCheck.addEventListener('click', checkAllPoints);

function checkAllPoints(){
    var allTasks = document.querySelectorAll('.taskStatus');
    var mainCheckStatus = mainCheck.checked;
    for (var i = 0; i < allTasks.length; i++) {
        if (allTasks[i].checked != mainCheckStatus) {
            allTasks[i].checked = mainCheckStatus;
            allTasks[i].onchange();
        }
    }
}

function updateActiveTaskCount() {
    var allTasks = document.querySelectorAll('.taskStatus');
    if (allTasks.length) {
        var counterActiveTasks = 0;
        for (var i = 0; i < allTasks.length; i++) {
            if (allTasks[i].checked == false) {
                counterActiveTasks++;
            }
        }
        allActiveTasks = counterActiveTasks;
        output.setAttribute('value', allActiveTasks);
        if (counterActiveTasks) {
            mainCheck.checked = false;
        } else {
            mainCheck.checked = true;
        }
    } else {
        mainCheck.checked = false;
    }
}


// control menu
//======================================================================================================================
var buttonAll = document.querySelector('.all');
buttonAll.addEventListener('click', function(){
    var allTasksFields = document.querySelectorAll('.singleTask');
    for (var i = 0; i < allTasksFields.length; i++) {
        allTasksFields[i].style.opacity = 1;
        allTasksFields[i].style.position = 'inherit';
    }
    deactivateButtons();
    buttonAll.classList.add('active');
    storageData.setMode('all');
});

var buttonActive = document.querySelector('.current');
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
    deactivateButtons();
    buttonActive.classList.add('active');
    storageData.setMode('current');

});

var buttonDone = document.querySelector('.done');
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
    deactivateButtons();
    buttonDone.classList.add('active');
    storageData.setMode('done');

});

var buttonClear = document.querySelector('.clear');
buttonClear.addEventListener('click', function(){
    var allTasks = document.querySelectorAll('.taskStatus');
    var allTasksFields = document.querySelectorAll('.singleTask');
    for (var i = 0; i < allTasks.length; i++) {
        if(allTasks[i].checked == true) {
            removeTaskFromList(allTasksFields[i]);
        }
    }
    deactivateButtons();
    buttonClear.classList.add('active');
});


function deactivateButtons() {
    var buttons = document.querySelectorAll('.push');
    for(var i = 0; i < buttons.length; i++){
        buttons[i].classList.remove('active');
    }
}

//======================================================================================================================
//lockalStorage.init

    storageData.readStorage();
    for(var id in storageData.data.toDoList){
        addTaskToList(id, storageData.data.toDoList[id].title, storageData.data.toDoList[id].status);
    }
    document.querySelector('.' + storageData.data.activeMod).click();
    updateActiveTaskCount();
