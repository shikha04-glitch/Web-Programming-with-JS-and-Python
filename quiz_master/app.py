from flask import Flask, render_template, request
import random

app = Flask(__name__)

# Questions
questions_data = [
    {
        "question": "Capital of India?",
        "options": ["Mumbai", "Delhi", "Chennai", "Kolkata"],
        "answer": "Delhi"
    },
    {
        "question": "Which is frontend language?",
        "options": ["Python", "Java", "JavaScript", "C++"],
        "answer": "JavaScript"
    },
    {
        "question": "Flask is written in?",
        "options": ["Python", "Java", "C#", "Go"],
        "answer": "Python"
    },
    {
        "question": "HTML stands for?",
        "options": [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyperlinks Text Mark",
            "None"
        ],
        "answer": "Hyper Text Markup Language"
    },
    {
        "question": "Which is CSS framework?",
        "options": ["Django", "Flask", "Bootstrap", "Node"],
        "answer": "Bootstrap"
    }
]

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/quiz')
def quiz():
    shuffled = questions_data.copy()
    random.shuffle(shuffled)
    return render_template('quiz.html', questions=shuffled)

@app.route('/result', methods=['POST'])
def result():
    score = 0
    total = len(questions_data)

    for i in range(total):
        user_ans = request.form.get(f"q{i}")
        correct_ans = request.form.get(f"correct{i}")

        if user_ans == correct_ans:
            score += 1

    if score == total:
        feedback = "🔥 Perfect Score!"
    elif score >= 3:
        feedback = "👏 Good Job!"
    else:
        feedback = "😅 Try Again!"

    return render_template('result.html', score=score, total=total, feedback=feedback)

if __name__ == '__main__':
    app.run(debug=True)