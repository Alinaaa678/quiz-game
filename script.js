const questions = [
    {
        question: "What is the capital of France?",
        answers: ["London", "Berlin", "Paris", "Madrid"],
        correct: 2
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: ["Venus", "Mars", "Jupiter", "Saturn"],
        correct: 1
    },
    {
        question: "How many days are there in a week?",
        answers: ["Five", "Six", "Eight", "Seven"],
        correct: 3
    },
    {
        question: "What is the largest ocean on Earth?",
        answers: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
        correct: 2
    },
    {
        question: "What is the chemical symbol for gold?",
        answers: ["Go", "Gd", "Au", "Ag"],
        correct: 2
    }
];

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const questionText = document.getElementById("question-text");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const answersContainer = document.getElementById("answers-container");
const progress = document.getElementById("progress");

const finalScore = document.getElementById("final-score");
const maxScore = document.getElementById("max-score");
const resultMessage = document.querySelector(".result-message");

let currentQuestion = 0;
let score = 0;

document.getElementById("start-btn").addEventListener("click", startQuiz);
document.getElementById("restart-btn").addEventListener("click", startQuiz);

function startQuiz() {
    currentQuestion = 0;
    score = 0;
    scoreSpan.textContent = 0;
    totalQuestionsSpan.textContent = questions.length;
    maxScore.textContent = questions.length;

    startScreen.classList.remove("active");
    resultScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestion();
}

function showQuestion() {
    const q = questions[currentQuestion];

    questionText.textContent = q.question;
    currentQuestionSpan.textContent = currentQuestion + 1;
    scoreSpan.textContent = score;
    progress.style.width = (currentQuestion / questions.length) * 100 + "%";

    answersContainer.innerHTML = "";
    q.answers.forEach((answerText, index) => {
        const btn = document.createElement("button");
        btn.className = "answer-btn";
        btn.textContent = answerText;
        btn.addEventListener("click", () => selectAnswer(index, btn));
        answersContainer.appendChild(btn);
    });
}

function selectAnswer(selectedIndex, selectedBtn) {
    const q = questions[currentQuestion];
    const allBtns = answersContainer.querySelectorAll(".answer-btn");

    allBtns.forEach(btn => btn.disabled = true);

    if (selectedIndex === q.correct) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("wrong");
        allBtns[q.correct].classList.add("correct");
    }

    scoreSpan.textContent = score;
    progress.style.width = ((currentQuestion + 1) / questions.length) * 100 + "%";

    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            showQuestion();
        } else {
            showResult();
        }
    }, 1000);
}

function showResult() {
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    finalScore.textContent = score;

    if (score === questions.length) {
        resultMessage.textContent = "Perfect! You're a genius!";
    } else if (score >= questions.length * 0.6) {
        resultMessage.textContent = "Great job! Well done!";
    } else if (score >= questions.length * 0.4) {
        resultMessage.textContent = "Not bad! Try again to improve!";
    } else {
        resultMessage.textContent = "Keep studying! You'll get better!";
    }
}