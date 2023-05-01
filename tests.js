let tasks = [];

function addTask() {
  let taskTitleInput = document.getElementById("taskTitle");
  let taskDueDateInput = document.getElementById("taskDueDate");
  let taskTitle = taskTitleInput.value;
  let taskDueDate = taskDueDateInput.value;
  let taskAddedDate = new Date().toLocaleDateString();
  let taskDescription = prompt("Ievadi uzdevuma aprakstu:");

  if (taskTitle.length < 15) {
    alert("Nosaukumā jābūt vismaz 15 simboli");
    return;
  }
  if (taskDueDate.length < 1) {
    alert("Nav norādīts beigu datums");
    return;
  }

  let task = {
    title: taskTitle,
    dueDate: taskDueDate,
    addedDate: taskAddedDate,
    description: taskDescription
  };
  tasks.push(task);

  taskTitleInput.value = "";
  taskDueDateInput.value = "";

  updateTaskList();
}

function removeTask(index) {
  tasks.splice(index, 1);
  updateTaskList();
}
function doneTask(index) {
    tasks.splice(index, 1);
    updateTaskList();
  }

function editTask(index) {
  let task = tasks[index];
  let newTitle = prompt("Ievadi jauno nosaukumu:", task.title);
  let newDueDate = prompt("Ievadi jaunu beigu datumu:", task.dueDate);
  let newDescription = prompt("Ievadi jaunu aprakstu:", task.description);

  if (newTitle.length < 15) {
    alert("Nosaukumā jābūt vismaz 15 simboli");
    return;
  }
  if (newDueDate.length < 1) {
    alert("Nav norādīts beigu datums");
    return;
  }else if(newDueDate.length < 10) {
    alert("Nav norādīts atbilstošs beigu datums");
    return;
  }

  task.title = newTitle;
  task.dueDate = newDueDate;
  task.description = newDescription;
  updateTaskList();
}

function updateTaskList() {
  let taskList = document.getElementById("taskList");
  taskList.innerHTML = `
  <tr>
        <th>Nosaukums</th>
        <th>Izpildes laiks</th>
        <th>Pievienošanas datums</th>
        <th>Apraksts</th>
        <th>Rediģēt</th>
        <th>Dzēst</th>
        <th>Pabeigt</th>
    </tr>
    <tr><td colspan="7">Nav izveidots neviens uzdevums</td></tr>`;

  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];
    let dueDate = new Date(task.dueDate);
    let addedDate = new Date(task.addedDate);
    let currentDate = new Date();

    if (currentDate > dueDate) {
      tasks.splice(i, 1);
      i--;
      continue;
    }

    let taskList = document.getElementById("taskList");
    taskList.innerHTML = `
    <tr>
          <th>Nosaukums</th>
          <th>Izpildes laiks</th>
          <th>Pievienošanas datums</th>
          <th>Apraksts</th>
          <th>Rediģēt</th>
          <th>Dzēst</th>
          <th>Pabeigt</th>
      </tr>`;
      
    let taskItem = document.createElement("tr");
    taskItem.innerHTML = `
      <td class="mala"><strong>${task.title}<strong></td>
      <td class="mala">${task.dueDate}</td>
      <td class="mala">${task.addedDate}</td>
      <td class="mala">${task.description}</td>
      <td class="mala"><span onclick="editTask(${i})" class="material-symbols-outlined">stylus</span></td>
      <td class="mala"><span onclick="removeTask(${i})" class="material-symbols-outlined">delete</span></td>
      <td class="mala"><span onclick="doneTask(${i})" class="material-symbols-outlined">done</span></td>
    `;
    taskList.appendChild(taskItem);
  }
}
  updateTaskList();