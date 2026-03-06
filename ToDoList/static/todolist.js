document.addEventListener("DOMContentLoaded", () => {

    const input = document.getElementById("taskInput");
    const addBtn = document.getElementById("addBtn");
    const taskList = document.getElementById("taskList");
    const totalCount = document.getElementById("totalCount");
    const completedCount = document.getElementById("completedCount");

    function loadTasks() {
        fetch("/tasks")
            .then(res => res.json())
            .then(data => {
                taskList.innerHTML = "";
                data.forEach(task => createTask(task));
                updateStats(data);
            });
    }

    function updateStats(tasks) {
        totalCount.textContent = tasks.length;
        const completed = tasks.filter(task => task.completed).length;
        completedCount.textContent = completed;
    }

    function createTask(task) {
        const li = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        const span = document.createElement("span");
        span.textContent = task.text;
        if (task.completed) span.classList.add("completed");

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);

        checkbox.addEventListener("change", () => {
            fetch(`/tasks/${task.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    text: span.textContent,
                    completed: checkbox.checked
                })
            }).then(loadTasks);
        });

        editBtn.addEventListener("click", () => {
            const newText = prompt("Edit task:", span.textContent);
            if (newText && newText.trim() !== "") {
                fetch(`/tasks/${task.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        text: newText,
                        completed: checkbox.checked
                    })
                }).then(loadTasks);
            }
        });

        deleteBtn.addEventListener("click", () => {
            fetch(`/tasks/${task.id}`, {
                method: "DELETE"
            }).then(loadTasks);
        });
    }

    addBtn.addEventListener("click", async () => {
    const text = input.value.trim();

    if (text === "") {
        alert("Task cannot be empty!");
        return;
    }

    await fetch("/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: text })
    });

    input.value = "";
    loadTasks();   // force reload after database update
});

    document.addEventListener("DOMContentLoaded", function () {
    loadTasks();
});