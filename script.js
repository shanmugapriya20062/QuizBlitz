let questions = {
    HTML: [
        {
            question: "What does HTML stand for?",
            answers: [
                "Hyper Text Markup Language",
                "High Text Machine Language",
                "Hyper Tool Multi Language",
                "Home Text Markup Language"
            ],
            correct: 0
        },
        {
            question: "Which tag creates a paragraph?",
            answers: ["<h1>", "<p>", "<div>", "<br>"],
            correct: 1
        },
        {
            question: "Which tag is used to insert an image?",
            answers: ["<image>", "<picture>", "<img>", "<src>"],
            correct: 2
        },
        {
            question: "Which tag creates a hyperlink?",
            answers: ["<link>", "<a>", "<href>", "<url>"],
            correct: 1
        },
        {
            question: "Which tag creates the largest heading?",
            answers: ["<h6>", "<head>", "<heading>", "<h1>"],
            correct: 3
        }
    ],

    CSS: [
        {
            question: "What does CSS stand for?",
            answers: [
                "Computer Style Sheets",
                "Cascading Style Sheets",
                "Creative Style System",
                "Colorful Style Sheets"
            ],
            correct: 1
        },
        {
            question: "Which property changes text color?",
            answers: ["font-size", "background", "color", "text-style"],
            correct: 2
        },
        {
            question: "Which symbol selects a class?",
            answers: ["#", ".", "*", "@"],
            correct: 1
        },
        {
            question: "Which property adds space inside an element?",
            answers: ["margin", "padding", "border", "outline"],
            correct: 1
        },
        {
            question: "Which property makes text bold?",
            answers: [
                "font-weight",
                "text-align",
                "font-style",
                "text-decoration"
            ],
            correct: 0
        }
    ],

    JavaScript: [
        {
            question: "Which keyword declares a variable?",
            answers: ["define", "int", "let", "variable"],
            correct: 2
        },
        {
            question: "Which method displays a message in the console?",
            answers: [
                "console.log()",
                "print()",
                "echo()",
                "show()"
            ],
            correct: 0
        },
        {
            question: "Which operator checks strict equality?",
            answers: ["=", "==", "===", "!="],
            correct: 2
        },
        {
            question: "Which symbol starts a single-line comment?",
            answers: ["<!--", "**", "//", "##"],
            correct: 2
        },
        {
            question: "Which method selects an element by its ID?",
            answers: [
                "getElementById()",
                "getClass()",
                "selectId()",
                "findElement()"
            ],
            correct: 0
        }
    ],

    Java: [
        {
            question: "Who led the team that developed Java?",
            answers: [
                "Dennis Ritchie",
                "James Gosling",
                "Guido van Rossum",
                "Bjarne Stroustrup"
            ],
            correct: 1
        },
        {
            question: "Which keyword defines a class in Java?",
            answers: ["function", "define", "class", "object"],
            correct: 2
        },
        {
            question: "Which method is the usual Java program entry point?",
            answers: [
                "start()",
                "run()",
                "main()",
                "execute()"
            ],
            correct: 2
        },
        {
            question: "Which data type stores true or false?",
            answers: ["int", "char", "String", "boolean"],
            correct: 3
        },
        {
            question: "Which keyword creates an object in Java?",
            answers: ["this", "new", "class", "void"],
            correct: 1
        }
    ]
};
async function loadQuestionsFromBackend() {
    try {
        const response = await fetch(
            "https://quizblitz-1.onrender.com/api/questions"
        );

        if (!response.ok) {
            throw new Error("Failed to load questions");
        }

        const data = await response.json();

        Object.keys(data).forEach(category => {
            questions[category] = data[category].map(q => ({
                question: q.question,
                answers: q.options,
                correct: q.options.indexOf(q.answer)
            }));
        });

        console.log("Questions loaded from Java backend!");

    } catch (error) {
        console.error("Could not connect to Java backend:", error);
    }
}

loadQuestionsFromBackend();
let playerName = "";
let currentCategory = "";
let currentQuestion = 0;
let score = 0;
let timeLeft = 15;
let timerId = null;
let answered = false;

const screens = [
    "home-screen",
    "category-screen",
    "quiz-screen",
    "result-screen"
];

function showScreen(screenId) {
    screens.forEach(id => {
        document.getElementById(id).classList.add("hidden");
    });

    document.getElementById(screenId).classList.remove("hidden");
}

function startApp() {
    const nameInput = document.getElementById("username");
    const message = document.getElementById("message");

    playerName = nameInput.value.trim();

    if (playerName === "") {
        message.textContent = "Please enter your name first!";
        nameInput.focus();
        return;
    }

    message.textContent = "";
    document.getElementById("welcome-message").textContent =
        `Hi ${playerName}! Choose a Category`;

    showScreen("category-screen");
}

function selectCategory(category) {
    currentCategory = category;
    currentQuestion = 0;
    score = 0;

    showScreen("quiz-screen");
    loadQuestion();
}

function loadQuestion() {
    clearInterval(timerId);
    answered = false;
    timeLeft = 15;

    const questionData = questions[currentCategory][currentQuestion];

    document.getElementById("category-name").textContent = currentCategory;
    document.getElementById("question-count").textContent =
        `Question ${currentQuestion + 1} of 5`;

    document.getElementById("question").textContent = questionData.question;
    document.getElementById("time").textContent = timeLeft;
    document.getElementById("feedback").textContent = "";
    document.getElementById("next-btn").classList.add("hidden");

    document.getElementById("progress-bar").style.width =
        `${(currentQuestion / questions[currentCategory].length) * 100}%`;

    const answerButtons = document.getElementById("answer-buttons");
    answerButtons.innerHTML = "";

    questionData.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.className = "answer-btn";
        button.textContent = `${String.fromCharCode(65 + index)}. ${answer}`;

        button.addEventListener("click", () => checkAnswer(index));

        answerButtons.appendChild(button);
    });

    startTimer();
}

function startTimer() {
    clearInterval(timerId);

    timerId = setInterval(() => {
        timeLeft--;
        document.getElementById("time").textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerId);
            checkAnswer(-1);
        }
    }, 1000);
}

function checkAnswer(selectedIndex) {
    if (answered) return;

    answered = true;
    clearInterval(timerId);

    const questionData = questions[currentCategory][currentQuestion];
    const buttons = document.querySelectorAll(".answer-btn");
    const feedback = document.getElementById("feedback");

    buttons.forEach(button => {
        button.disabled = true;
    });

    if (selectedIndex === questionData.correct) {
        score++;
        buttons[selectedIndex].classList.add("correct");
        feedback.textContent = "🎉 Correct Answer!";
        feedback.style.color = "#16834c";
    } else {
        if (selectedIndex !== -1) {
            buttons[selectedIndex].classList.add("wrong");
        }

        buttons[questionData.correct].classList.add("correct");

        feedback.textContent = selectedIndex === -1
            ? "⏰ Time's up!"
            : "❌ Incorrect Answer!";

        feedback.style.color = "#d94359";
    }

    document.getElementById("progress-bar").style.width =
        `${((currentQuestion + 1) / questions[currentCategory].length) * 100}%`;

    const nextButton = document.getElementById("next-btn");
    nextButton.textContent =
        currentQuestion === questions[currentCategory].length - 1
            ? "View Results 🏆"
            : "Next Question →";

    nextButton.classList.remove("hidden");
}

function nextQuestion() {
    if (currentQuestion < questions[currentCategory].length - 1) {
        currentQuestion++;
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    clearInterval(timerId);

    const total = questions[currentCategory].length;
    const percentage = Math.round((score / total) * 100);

    document.getElementById("result-message").textContent =
        `Well done, ${playerName}! You completed the ${currentCategory} quiz.`;

    document.getElementById("score").textContent = `${score} / ${total}`;
    document.getElementById("percentage").textContent =
        `Your accuracy: ${percentage}%`;

    showScreen("result-screen");
}

function chooseAgain() {
    clearInterval(timerId);
    showScreen("category-screen");
}

function playAgain() {
    selectCategory(currentCategory);
}