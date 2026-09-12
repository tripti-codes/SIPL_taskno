const dateInput = document.getElementById("dateInput");
const taskInput = document.getElementById("taskInput");
const durationInput = document.getElementById("durationInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

let editingTask = null;


// ADD OR UPDATE TASK

function addTask() {

    const date = dateInput.value;
    const task = taskInput.value.trim();
    const duration = durationInput.value.trim();


    // CHECK EMPTY INPUTS

    if (date === "" || task === "" || duration === "") {

        alert("Please fill in all fields!");

        return;
    }


    // UPDATE TASK

    if (editingTask !== null) {

        editingTask.querySelector(".task-date").textContent =
            "📅 " + date;

        editingTask.querySelector(".task-name").textContent =
            task;

        editingTask.querySelector(".task-duration").textContent =
            "⏱️ Duration: " + duration;


        editingTask = null;

        addTaskBtn.textContent = "Add Task";


    } else {


        // CREATE TASK CARD

        const taskCard = document.createElement("div");

        taskCard.classList.add("task-card");


        // TASK INFORMATION

        const taskInfo = document.createElement("div");

        taskInfo.classList.add("task-info");


        const taskDate = document.createElement("div");

        taskDate.classList.add("task-date");

        taskDate.textContent = "📅 " + date;


        const taskName = document.createElement("div");

        taskName.classList.add("task-name");

        taskName.textContent = task;


        const taskDuration = document.createElement("div");

        taskDuration.classList.add("task-duration");

        taskDuration.textContent =
            "⏱️ Duration: " + duration;


        taskInfo.appendChild(taskDate);

        taskInfo.appendChild(taskName);

        taskInfo.appendChild(taskDuration);


        // ACTION BUTTONS

        const taskActions = document.createElement("div");

        taskActions.classList.add("task-actions");


        // COMPLETE BUTTON

        const completeButton = document.createElement("button");

        completeButton.textContent = "Complete";

        completeButton.classList.add("complete-btn");


        completeButton.addEventListener("click", () => {

            taskCard.classList.toggle("completed");


            if (taskCard.classList.contains("completed")) {

                completeButton.textContent = "Completed";

            } else {

                completeButton.textContent = "Complete";

            }

        });


        // EDIT BUTTON

        const editButton = document.createElement("button");

        editButton.textContent = "Edit";

        editButton.classList.add("edit-btn");


        editButton.addEventListener("click", () => {

            const currentDate =
                taskCard.querySelector(".task-date")
                .textContent.replace("📅 ", "");

            const currentTask =
                taskCard.querySelector(".task-name")
                .textContent;

            const currentDuration =
                taskCard.querySelector(".task-duration")
                .textContent.replace("⏱️ Duration: ", "");


            dateInput.value = currentDate;

            taskInput.value = currentTask;

            durationInput.value = currentDuration;


            editingTask = taskCard;

            addTaskBtn.textContent = "Update Task";


            taskInput.focus();

        });


        // DELETE BUTTON

        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";

        deleteButton.classList.add("delete-btn");


        deleteButton.addEventListener("click", () => {

            if (editingTask === taskCard) {

                editingTask = null;

                addTaskBtn.textContent = "Add Task";

            }

            taskCard.remove();

        });


        // ADD BUTTONS

        taskActions.appendChild(completeButton);

        taskActions.appendChild(editButton);

        taskActions.appendChild(deleteButton);


        // ADD EVERYTHING TO CARD

        taskCard.appendChild(taskInfo);

        taskCard.appendChild(taskActions);


        // ADD CARD TO LIST

        taskList.appendChild(taskCard);

    }


    // CLEAR INPUTS

    dateInput.value = "";

    taskInput.value = "";

    durationInput.value = "";

    taskInput.focus();

}


// ADD TASK BUTTON

addTaskBtn.addEventListener("click", addTask);