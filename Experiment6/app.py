"""
Project: Contact Management System
Name: Shikha
Date: 2026
Description: A simple Flask CRUD app to manage contacts
"""

from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

# In-memory storage (no DB)
contacts = []
contact_id_counter = 1


# 🏠 Home Route (Read)
@app.route('/')
def index():
    search_query = request.args.get('search', '').lower()

    if search_query:
        filtered_contacts = [
            c for c in contacts
            if search_query in c['name'].lower() or search_query in c['phone']
        ]
    else:
        filtered_contacts = contacts

    return render_template('index.html', contacts=filtered_contacts)


# ➕ Add Contact (Create)
@app.route('/add', methods=['GET', 'POST'])
def add_contact():
    global contact_id_counter

    if request.method == 'POST':
        name = request.form['name']
        phone = request.form['phone']
        email = request.form['email']

        # Validation
        if not name or not phone or not email:
            return "All fields are required!"

        contact = {
            'id': contact_id_counter,
            'name': name,
            'phone': phone,
            'email': email
        }

        contacts.append(contact)
        contact_id_counter += 1

        return redirect(url_for('index'))

    return render_template('add_contact.html')


# ✏️ Edit Contact (Update)
@app.route('/edit/<int:id>', methods=['GET', 'POST'])
def edit_contact(id):
    contact = next((c for c in contacts if c['id'] == id), None)

    if not contact:
        return "Contact not found!"

    if request.method == 'POST':
        contact['name'] = request.form['name']
        contact['phone'] = request.form['phone']
        contact['email'] = request.form['email']

        return redirect(url_for('index'))

    return render_template('edit_contact.html', contact=contact)


# ❌ Delete Contact
@app.route('/delete/<int:id>')
def delete_contact(id):
    global contacts
    contacts = [c for c in contacts if c['id'] != id]

    return redirect(url_for('index'))


if __name__ == '__main__':
    app.run(debug=True)