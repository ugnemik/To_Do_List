//define ui vars

const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");
const buttons = document.querySelectorAll(".btn");

//load all event listeners
loadEventListeners();

function loadEventListeners() {
  //DOM load event
  document.addEventListener("DOMContentLoaded", getTasks);
  //add task event
  form.addEventListener("submit", addTask);
  //remove task event
  taskList.addEventListener("click", removeTask);
  //clear task list
  clearBtn.addEventListener("click", clearTasks);
  //filter tasks
  filter.addEventListener("keyup", filterTasks);
}

//get tasks from ls
function getTasks(e) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task) {
    //create li element
    const li = document.createElement("li");
    li.className = "collection-item";
    //create text node and append to li
    li.appendChild(document.createTextNode(task));
    //create new link element
    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    //add icon html
    link.innerHTML = '<i class="fa fa-trash"></i>';
    //append the lin to li
    li.appendChild(link);

    //append li to the ul
    taskList.appendChild(li);
  });
  getPendingTasks();
}

//add task
function addTask(e) {
  if (taskInput.value === "") {
    alert("Please add a task");
    return;
  }
  //create li element
  const li = document.createElement("li");
  li.className = "collection-item";
  //create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  //create new link element
  const link = document.createElement("a");
  link.className = "delete-item secondary-content";
  // //add icon html
  link.innerHTML = '<i class="fa fa-trash"></i>';
  // //append the lin to li
  li.appendChild(link);

  //append li to the ul
  taskList.appendChild(li);

  //store to ls
  storeTaskInLocalStorage(taskInput.value);

  //clear input
  taskInput.value = "";
  getPendingTasks();
  e.preventDefault();
}

//store task
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//remove task
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure? ")) {
      e.target.parentElement.parentElement.remove();

      //remove from ls
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
      getPendingTasks();
    }
  }
}

//remove from ls
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//clear tasks
function clearTasks() {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  //clear from ls
  clearTasksFromLocalStorage();
  getPendingTasks();
}

function clearTasksFromLocalStorage() {
  localStorage.clear();
}

//filter tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}

// Display Date

const dateEl = document.getElementById("date");
date = new Date();
// get the date as a string
var n = date.toDateString();

dateEl.textContent = n;

// update pending tasks number

function getPendingTasks() {
  document.getElementById(
    "pending-tasks"
  ).textContent = `${taskList.children.length} Pending Tasks`;
}
