from flask import Flask, render_template, request, jsonify
import sqlite3

app = Flask(__name__, static_folder="static", template_folder="templates")

# Create database & table
def init_db():
    conn = sqlite3.connect("todo.db")
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            text TEXT NOT NULL,
            completed INTEGER DEFAULT 0
        )
    """)
    conn.commit()
    conn.close()

init_db()

# Home route
@app.route("/")
def home():
    return render_template("todolist.html")

# Get all tasks
@app.route("/tasks", methods=["GET"])
def get_tasks():
    conn = sqlite3.connect("todo.db")
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM tasks")
    rows = cursor.fetchall()
    conn.close()

    tasks = []
    for row in rows:
        tasks.append({
            "id": row[0],
            "text": row[1],
            "completed": bool(row[2])
        })
    return jsonify(tasks)

# Add task
@app.route("/tasks", methods=["POST"])
def add_task():
    data = request.json
    conn = sqlite3.connect("todo.db")
    cursor = conn.cursor()
    cursor.execute("INSERT INTO tasks (text) VALUES (?)", (data["text"],))
    conn.commit()
    conn.close()
    return jsonify({"message": "Task added"})

# Update task
@app.route("/tasks/<int:id>", methods=["PUT"])
def update_task(id):
    data = request.json
    conn = sqlite3.connect("todo.db")
    cursor = conn.cursor()
    cursor.execute(
        "UPDATE tasks SET text=?, completed=? WHERE id=?",
        (data["text"], int(data["completed"]), id)
    )
    conn.commit()
    conn.close()
    return jsonify({"message": "Task updated"})

# Delete task
@app.route("/tasks/<int:id>", methods=["DELETE"])
def delete_task(id):
    conn = sqlite3.connect("todo.db")
    cursor = conn.cursor()
    cursor.execute("DELETE FROM tasks WHERE id=?", (id,))
    conn.commit()
    conn.close()
    return jsonify({"message": "Task deleted"})

if __name__ == "__main__":
    app.run(debug=True)
