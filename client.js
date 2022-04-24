var defaultAuth = "signup";
var user = new Array();
let modal = document.getElementById("modal");
let def = document.getElementById("def");
let cust = document.getElementById("addColumn");
let span = document.getElementsByClassName("close")[0];
let save = document.getElementById("save");
let start = document.getElementById("start");
let board = {};
var columnTitle = '';
var taskNumber = 0;
var currentTask;
var columns = [];

window.onload = function () {
    document.getElementById("default").onclick = createDefault;
    document.getElementById("custom").onclick = createCustom;
    document.getElementById("task-card-button").onclick = createTask;
    document.getElementById("save-button").onclick = saveTask;
    document.getElementById("cancelTask").onclick = cancelTask;
    document.getElementById("add-button").onclick = addSubtask;
    document.getElementById("delete-button").onclick = deleteTask;
    document.getElementById("addColumnButton").onclick = addColumn;
}

function createDefault() {
    // secretKey = generateSK();
    modal.style.display = "block";
    start.style.display = "none";
    def.style.display = "none";

    span.onclick = function () {
        modal.style.display = "none";
        start.style.display = "block";
    }

    save.onclick = function () {
        def.style.display = "block";
        modal.style.display = "none";
        createDefaultBoard();

    }
}

function createCustom() {
    // secretKey = generateSK();
    modal.style.display = "block";
    start.style.display = "none";

    save.onclick = function () {
        // var enteredCode = document.getElementById("board-code").value;
        // var codes = window.localStorage.getItem("user");
        // codes = JSON.parse(codes);

        // if (codes !== null) {
        //     for (var i = 0; i < codes.length; i++) {
        //         if (codes[i].boardCode === enteredCode) {
        //             alert("Code has been used. Please use another code.");
        //         }
        //     }
        // } else if (enteredCode === "") {
        //     alert("You have missing fields!");
        // } else {
        cust.style.display = "block";
        modal.style.display = "none";
        createCustomBoard();
        // }
    }

    span.onclick = function () {
        modal.style.display = "none";
        start.style.display = "block";
    }
}


function createDefaultBoard() {
    var boardCode = document.getElementById("board-code").value;
    var title = document.getElementById("board-title").value;
    var defColumns = [{ title: "todo", card: [] },
    { title: "inprogress", card: [] },
    { title: "done", card: [] }]

    for (let i = 0; i < defColumns.length; i++) {
        columns.push(defColumns[i]);
    }

    let board = {
        boardCode: boardCode,
        title: title,
        columns: columns
    }

    user.push(board);
    window.localStorage.setItem("user", JSON.stringify(user));
    document.getElementById("title").innerHTML = title;

    // fetch(`/boards/${boardCode}`, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(data) 
    // })
    // .then (res => res.text())
    // .then (txt => alert(txt))
}

function createCustomBoard() {
    var boardCode = document.getElementById("board-code").value;
    title = document.getElementById("board-title").value;
    var card = new Array();

    board = {
        "boardCode": boardCode,
        "title": title,
        "columns": columns
    }

    console.log(board);

    document.getElementById("title").innerHTML = title;
}

function createTask(taskDetails) {
    if (taskDetails && taskDetails.taskName) {
        currentTask = taskDetails;
        document.getElementById("task-name").value = taskDetails.taskName;
        document.getElementById("task-description").value = taskDetails.taskDesc;
        document.getElementById("task-status").value = taskDetails.taskStatus;
    } else {
        resetTask();
        currentTask = {};
    }

    var details = document.getElementById("task-details");
    details.style.display = "flex";
}

function appendTask(taskDetails) {
    var task = document.createElement("div");
    task.innerHTML = `<div class="task-card" id ="task${taskNumber}" >
    <div class="task-desc">${taskDetails.taskName}</div>
        <div class="dropzone"></div>
    </div>`;
    document.getElementById(`${taskDetails.taskStatus}-div`).appendChild(task);
    document.getElementById(`task${taskNumber}`).onclick = clickTask;
}

function saveTask() {
    var taskName = document.getElementById("task-name").value;
    var taskDesc = document.getElementById("task-description").value;
    var taskStatus = document.getElementById("task-status").value;
    // var subTasks = new Array();

    var saved = document.getElementById("task-details");
    saved.style.display = "none";

    let taskDetails = {
        "taskNumber": currentTask ? currentTask.taskNumber : taskNumber,
        "taskName": taskName,
        "taskDesc": taskDesc,
        // "subTasks": subTasks,
        "taskStatus": taskStatus
    }

    resetTask();

    window.localStorage.setItem("user", JSON.stringify(user));

    for (var i = 0; i < columns.length; i++) {
        if (columns[i].title === taskDetails.taskStatus) {
            var taskExists = columns[i].card.filter(item => item.taskNumber === currentTask.taskNumber)[0];
            if (taskExists) {
                var newColumnTasks = [];
                for (const task of columns[i].card) {
                    if (task.taskNumber == currentTask.taskNumber) {
                        newColumnTasks.push({
                            "taskNumber": currentTask.taskNumber,
                            "taskName": taskName,
                            "taskDesc": taskDesc,
                            "taskStatus": taskStatus,
                            "subTasks": subTasks
                        });
                    }
                    else {
                        newColumnTasks.push(task);
                    }
                }
                columns[i].card = newColumnTasks;
                document.getElementById(`task${currentTask.taskNumber}`).innerHTML = `
                    <div class="task-desc">${taskName}</div>
                    <div class="dropzone"></div>
                    </div>`;


            } else {
                taskNumber++;
                console.log(taskDetails);
                columns[i].card.push({
                    "taskNumber": taskNumber,
                    "taskName": taskName,
                    "taskDesc": taskDesc,
                    "taskStatus": taskStatus,
                    // "subTasks": subTasks
                });
                appendTask(taskDetails);
            }
        }

        for (var i = 0; i < columns.length; i++) {
            if (columns[i].title === currentTask.taskStatus) {
                for (const task of columns[i].card) {
                    var myobj = document.getElementById(`task${currentTask.taskNumber}`);
                    myobj.remove();
                    appendTask(taskDetails);
                }
            }
        }
    } if (currentTask) {
        if (taskDetails.taskStatus == "inprogress") {
            document.getElementById("task-status").options[0].disabled = true;

        } else if (taskDetails.taskStatus == "done") {
            document.getElementById("task-status").options[0].disabled = true;
            document.getElementById("task-status").options[1].disabled = true;
        }
    }
}

function clickTask() {
    var taskId = this.id;
    var currTaskNum = taskId.split('task')[1];
    for (const column of columns) {
        var taskDetails = column.card.filter(item => item.taskNumber == currTaskNum)[0];
        if (taskDetails) {
            createTask(taskDetails);
        }
    }
}

function addSubtask() {
    var subtask = document.createElement("div");
    subtask.innerHTML = `<input type="checkbox" contenteditable="true" id="subtask1">
    <label> list1 </label><br>`;
    document.getElementById("myUL").appendChild(subtask);
    document.getElementById(`task${taskNumber}`).onclick = clickTask;
}

function deleteTask() {
    if (confirm("Are you sure you want to delete this task?")) {
        txt = "You pressed OK!";
        var myobj = document.getElementById(`task${currentTask.taskNumber}`);
        myobj.remove();
        var saved = document.getElementById("task-details");
        saved.style.display = "none";
        resetTask();
    } else {
        txt = "You pressed Cancel!";
        var saved = document.getElementById("task-details");
        saved.style.display = "none";
    }
}

function cancelTask() {
    var saved = document.getElementById("task-details");
    saved.style.display = "none";
}

function resetTask() {
    document.getElementById("task-name").value = "";
    document.getElementById("task-description").value = "";
    document.getElementById("task-status").value = "todo";
}

function addColumn() {
    var col = document.createElement("div");
    var card = [];
    columnTitle = document.getElementById("column-title").value;
    var position = document.getElementById("column-position").value;
    col.innerHTML = `<div class="kanban-block" id="todo">
    <h2>${columnTitle}</h2>
    <div class="${position}" id="${columnTitle}">
    </div>
    <div class="task-card-button-block">
        <button id="task-card-button">Create New Task</button>
        <br>
        <button id="task-card-button-remove">Remove Column</button>
    </div>
    </div>`;
    columnTitle = columnTitle.replace(/\s/g, '');
    document.getElementById("kanban-board").appendChild(col);
    resetAddColumn();

    var column = [
        {
            "title": columnTitle,
            "position": position,
            "card": card
        }];

    board.columns.push(column);
    console.log(board);
}

function resetAddColumn() {
    document.getElementById("column-title").value = "";
}

function deleteColumn() {
    var myobj = document.getElementById(`${columnTitle}`);
    myobj.remove();
}