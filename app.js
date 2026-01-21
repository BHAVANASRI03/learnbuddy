let profile = {};
let qIndex = 0;
let score = 0;

// CONTENT
const learningData = {
  math: {
    slow: ["Number Systems", "Basic Arithmetic", "Intro to Algebra"],
    average: ["Algebra", "Linear Equations", "Geometry"]
  },
  science: {
    slow: ["Photosynthesis", "States of Matter", "Human Biology"],
    average: ["Electricity", "Force & Motion"]
  },
  coding: {
    slow: ["What is Programming?", "Variables", "Conditions"],
    average: ["Loops", "Functions"]
  }
};

const quizData = {
  math: [{ q: "5 + 5 = ?", a: "10" }],
  science: [{ q: "Plants prepare food by?", a: "photosynthesis" }],
  coding: [{ q: "Language used for web?", a: "javascript" }]
};

// START APP (🔥 FIXED)
function startApp() {
  const nameInput = document.getElementById("userNameInput").value.trim();

  if (nameInput === "") {
    alert("Please enter your name");
    return;
  }

  document.getElementById("welcomeSection").classList.add("d-none");
  document.getElementById("mainApp").classList.remove("d-none");
}

// PROFILE FORM
document.getElementById("profileForm").addEventListener("submit", function(e){
  e.preventDefault();

  profile.subject = document.getElementById("subject").value;
  profile.speed = document.getElementById("speed").value;

  const dashboard = document.getElementById("dashboard");
  const concepts = document.getElementById("concepts");

  concepts.innerHTML = "";
  learningData[profile.subject][profile.speed].forEach(item => {
    concepts.innerHTML += `<div class="concept">${item}</div>`;
  });

  dashboard.classList.remove("d-none");
});

// QUIZ
function startQuiz() {
  document.getElementById("dashboard").classList.add("d-none");
  document.getElementById("quizSection").classList.remove("d-none");
  showQuestion();
}

function showQuestion() {
  const questionBox = document.getElementById("questionBox");

  if (!quizData[profile.subject][qIndex]) {
    questionBox.innerHTML = "<h5>🎉 Quiz Completed!</h5>";
    return;
  }

  questionBox.innerHTML = `
    <p>${quizData[profile.subject][qIndex].q}</p>
    <input id="answerInput" class="form-control mb-2">
    <button class="btn btn-primary" onclick="checkAnswer()">Submit</button>
  `;
}

function checkAnswer() {
  const userAns = document.getElementById("answerInput").value.toLowerCase();

  if (userAns === quizData[profile.subject][qIndex].a) {
    score += 10;
  }

  qIndex++;
  const progress = document.getElementById("progressFill");
  progress.style.width = (qIndex / quizData[profile.subject].length) * 100 + "%";
  progress.innerText = score + " pts";

  showQuestion();
}
