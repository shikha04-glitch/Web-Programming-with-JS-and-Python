from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

posts = []
post_id_counter = 1


@app.route('/')
def index():
    return render_template('index.html', posts=posts)


@app.route('/create', methods=['GET', 'POST'])
def create():
    global post_id_counter

    if request.method == 'POST':
        title = request.form.get('title')
        content = request.form.get('content')

        if title and content:
            posts.append({
                'id': post_id_counter,
                'title': title,
                'content': content
            })
            post_id_counter += 1

        return redirect(url_for('index'))

    return render_template('create.html')


@app.route('/edit/<int:id>', methods=['GET', 'POST'])
def edit(id):
    post = next((p for p in posts if p['id'] == id), None)

    if not post:
        return redirect(url_for('index'))

    if request.method == 'POST':
        post['title'] = request.form.get('title')
        post['content'] = request.form.get('content')
        return redirect(url_for('index'))

    return render_template('edit.html', post=post)


@app.route('/delete/<int:id>')
def delete(id):
    global posts
    posts = [p for p in posts if p['id'] != id]
    return redirect(url_for('index'))


if __name__ == '__main__':
    app.run(debug=True)