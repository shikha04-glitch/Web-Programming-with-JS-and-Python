let tasks = [];

// ➕ ADD TASK
function addTask() {
    const input = document.getElementById("taskInput");
    const text = input.value.trim();

    if (text === "") {
        alert("Task cannot be empty!");
        return;
    }

    tasks.push({
        text: text,
        completed: false
    });

    input.value = "";
    renderTasks();
}

// 🔄 RENDER TASKS
function renderTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    let completedCount = 0;

    tasks.forEach((task, index) => {
        if (task.completed) completedCount++;

        const li = document.createElement("li");
        li.className = task.completed ? "completed" : "";

        li.innerHTML = `
            <div class="task-left">
                <input type="checkbox" 
                    ${task.completed ? "checked" : ""} 
                    onchange="toggleComplete(${index})">
                    
                <span>${task.text}</span>
            </div>

            <div class="task-buttons">
                <button onclick="editTask(${index})">Edit</button>
                <button class="delete" onclick="deleteTask(${index})">Delete</button>
            </div>
        `;

        list.appendChild(li);
    });

    document.getElementById("stats").innerText =
        `Completed: ${completedCount} | Pending: ${tasks.length - completedCount}`;
}

// ❌ DELETE TASK
function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

// ✏️ EDIT TASK
function editTask(index) {
    let newText = prompt("Edit your task:", tasks[index].text);

    if (newText !== null && newText.trim() !== "") {
        tasks[index].text = newText.trim();
        renderTasks();
    }
}

// ✅ TOGGLE COMPLETE (checkbox)
function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}