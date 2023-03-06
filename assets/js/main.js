const inputTaks = document.querySelector(".input-task");
const btnTask = document.querySelector(".btn-task");
const tasks = document.querySelector(".tasks");

function createLi() {
  const li = document.createElement("li");
  return li;
}

inputTaks.addEventListener("keypress", function (event) {
  if (event.keyCode === 13) {
    if (!inputTaks.value) return;

    createTask(inputTaks.value);
    clearInput();
  }
});

function clearInput() {
  inputTaks.value = "";
  inputTaks.focus();
}

function createEraseButton(li) {
  const buttonErase = document.createElement("button");
  buttonErase.setAttribute("class", "Erase");
  buttonErase.innerHTML = "Erase";
  buttonErase.setAttribute("style", "margin-left: 1rem; --c:#E95A49");
  li.appendChild(buttonErase);
}

function createTask(inputText) {
  const li = createLi();
  li.innerHTML = inputText;
  tasks.appendChild(li);
  createEraseButton(li);
  saveTasks();
}

btnTask.addEventListener("click", function (event) {
  if (!inputTaks.value) return;

  createTask(inputTaks.value);
  clearInput();
});

document.addEventListener("click", function (event) {
  const el = event.target;
  if (el.classList.contains("Erase")) {
    el.parentElement.remove();
    saveTasks();
  }
});

function saveTasks() {
  const liTasks = tasks.querySelectorAll("li");

  const listOfTasks = [];

  for (let task of liTasks) {
    let txtTask = task.innerText;
    txtTask = txtTask.replace("Erase", "").trim();
    listOfTasks.push(txtTask);
  }

  const taskJSON = JSON.stringify(listOfTasks);
  localStorage.setItem("tasks", taskJSON);
}

function addSaveTasks() {
  const tasks = localStorage.getItem("tasks");
  const listOfTasks = JSON.parse(tasks);

  for (let task of listOfTasks) {
    createTask(task);
  }
}

addSaveTasks();
