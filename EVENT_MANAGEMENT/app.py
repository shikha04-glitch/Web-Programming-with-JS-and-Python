from flask import Flask, render_template, request, redirect, session, flash

app = Flask(__name__)
app.secret_key = "secret123"

events = [
    {"id": 1, "name": "Tech Conference", "date": "2026-04-10", "venue": "Delhi", "rsvp": 0},
    {"id": 2, "name": "Music Fest", "date": "2026-04-12", "venue": "Mumbai", "rsvp": 0},
]

users = []

# HOME
@app.route('/')
def index():
    return render_template("index.html")

# EVENTS
@app.route('/events')
def events_page():
    return render_template("events.html", events=events)

# REGISTER
@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        event_id = int(request.form.get("event_id"))

        for e in events:
            if e["id"] == event_id:
                e["rsvp"] += 1

        flash("Registered Successfully!")
        return redirect('/events')

    return render_template("register.html", events=events)

# ===== ADMIN LOGIN FLOW =====

@app.route('/admin', methods=['GET', 'POST'])
def admin():
    # agar already login hai → dashboard
    if "admin" in session:
        return render_template("admin.html", events=events)

    # agar login form submit hua
    if request.method == 'POST':
        username = request.form.get("username")
        password = request.form.get("password")

        for u in users:
            if u["username"] == username and u["password"] == password:
                session["admin"] = username
                return redirect('/admin')

        flash("Invalid Credentials")

    # default → login page
    return render_template("login.html")


# SIGNUP
@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        users.append({
            "username": request.form.get("username"),
            "password": request.form.get("password")
        })
        flash("Signup successful! Now login.")
        return redirect('/admin')

    return render_template("signup.html")


# LOGOUT
@app.route('/logout')
def logout():
    session.pop("admin", None)
    return redirect('/')


# ADD EVENT
@app.route('/admin/add', methods=['POST'])
def add_event():
    if "admin" not in session:
        return redirect('/admin')

    events.append({
        "id": len(events) + 1,
        "name": request.form.get("name"),
        "date": request.form.get("date"),
        "venue": request.form.get("venue"),
        "rsvp": 0
    })

    return redirect('/admin')


# DELETE EVENT
@app.route('/admin/delete/<int:id>')
def delete_event(id):
    if "admin" not in session:
        return redirect('/admin')

    global events
    events = [e for e in events if e["id"] != id]

    return redirect('/admin')


if __name__ == "__main__":
    app.run(debug=True)