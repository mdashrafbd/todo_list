 // Select elements
 const taskInput = document.getElementById("taskInput");
 const addTaskButton = document.getElementById("addTaskButton");
 const taskList = document.getElementById("taskList");

 // Load tasks from localStorage
 function loadTasks() {
     taskList.innerHTML = "";
     const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
     tasks.forEach(task => addTaskToDOM(task));
 }

 // Save tasks to localStorage
 function saveTasks() {
     const tasks = Array.from(taskList.children).map(li => li.firstChild.textContent);
     localStorage.setItem("tasks", JSON.stringify(tasks));
 }

 // Add task to DOM
 function addTaskToDOM(taskText) {
     const li = document.createElement("li");
     li.className = "list-group-item d-flex justify-content-between align-items-center";
     li.innerHTML = `
         <span>${taskText}</span>
         <div>
             <button class="btn btn-sm btn-warning" onclick="editTask(this)">Edit</button>
             <button class="btn btn-sm btn-danger" onclick="deleteTask(this)">Delete</button>
         </div>
     `;
     taskList.appendChild(li);
     saveTasks();
 }

 // Add task event
 addTaskButton.onclick = () => {
     const taskText = taskInput.value.trim();
     if (taskText) {
         addTaskToDOM(taskText);
         taskInput.value = "";
     } else {
         alert("Task cannot be empty!");
     }
 };

 // Edit task function
 function editTask(button) {
     const li = button.closest("li");
     const newTaskText = prompt("Edit your task:");
     if (newTaskText && newTaskText.trim()) {
         //li.firstChild.textContent = newTaskText.trim();
         li.textContent = newTaskText.trim();
         saveTasks();
     }
 }

 // Delete task function
 function deleteTask(button) {
     button.closest("li").remove();
     saveTasks();
 }

 // Load tasks on page load
 loadTasks();