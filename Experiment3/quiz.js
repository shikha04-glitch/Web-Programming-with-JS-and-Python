const questions = [
    {
        question: "Which language is used for styling web pages?",
        options: ["HTML", "Python", "CSS", "C++"],
        answer: "CSS"
    },
    {
        question: "Which company developed JavaScript?",
        options: ["Microsoft", "Netscape", "Google", "Oracle"],
        answer: "Netscape"
    },
    {
        question: "What does SQL stand for?",
        options: [
            "Structured Query Language",
            "Simple Query Language",
            "System Query Logic",
            "Server Question Language"
        ],
        answer: "Structured Query Language"
    },
    {
        question: "Which HTML tag is used to link JavaScript?",
        options: ["<js>", "<javascript>", "<script>", "<link>"],
        answer: "<script>"
    },
    {
        question: "Which property is used to change text color in CSS?",
        options: ["font-color", "text-color", "color", "background-color"],
        answer: "color"
    }
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 15;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const timeEl = document.getElementById("time");
const progressEl = document.getElementById("progress");
const resultBox = document.getElementById("result-box");
const quizBox = document.getElementById("quiz-box");
const scoreText = document.getElementById("score-text");
const feedback = document.getElementById("feedback");
const restartBtn = document.getElementById("restart-btn");

function startTimer() {
    timeLeft = 15;
    timeEl.textContent = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        timeEl.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);
}

function loadQuestion() {
    clearInterval(timer);
    startTimer();

    const q = questions[currentQuestion];
    questionEl.textContent = q.question;
    optionsEl.innerHTML = "";

    progressEl.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;

    q.options.forEach(option => {
        const label = document.createElement("label");
        const input = document.createElement("input");

        input.type = "radio";
        input.name = "option";
        input.value = option;

        label.appendChild(input);
        label.appendChild(document.createTextNode(" " + option));

        optionsEl.appendChild(label);
    });
}

function nextQuestion() {
    clearInterval(timer);

    const selected = document.querySelector('input[name="option"]:checked');

    if (selected && selected.value === questions[currentQuestion].answer) {
        score++;
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    quizBox.classList.add("hidden");
    resultBox.classList.remove("hidden");

    scoreText.textContent = `You scored ${score} out of ${questions.length}`;

    if (score === questions.length) {
        feedback.textContent = "Outstanding Performance! 🎉";
    } else if (score >= 3) {
        feedback.textContent = "Good Job! Keep Practicing 👍";
    } else {
        feedback.textContent = "Keep Learning! You Can Improve 💪";
    }
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    resultBox.classList.add("hidden");
    quizBox.classList.remove("hidden");
    loadQuestion();
}

nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", restartQuiz);

loadQuestion();
