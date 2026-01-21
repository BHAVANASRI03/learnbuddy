let profile = {};
let qIndex = 0;
let points = 0;

const materialsData = {
  math: {
    slow: ["Basic Addition", "Basic Subtraction"],
    average: ["Fractions", "Algebra Basics"]
  },
  science: {
    slow: ["Photosynthesis", "Newton Laws"],
    average: ["Electricity", "Human Biology"]
  },
  coding: {
    slow: ["What is Programming?", "Variables"],
    average: ["Loops", "Functions"]
  }
};

const quizData = {
  math: [{q:"2 + 2 = ?", a:"4"}],
  science: [{q:"Plants use ___ for food?", a:"sunlight"}],
  coding: [{q:"Language for web?", a:"javascript"}]
};

function startApp() {
  if (!userName.value.trim()) {
    alert("Enter your name");
    return;
  }
  welcome.classList.add("d-none");
  mainApp.classList.remove("d-none");
}

profileForm.addEventListener("submit", e => {
  e.preventDefault();
  profile.subject = subject.value;
  profile.speed = speed.value;
  showMaterials();
});

function showMaterials() {
  materials.classList.remove("d-none");
  concepts.innerHTML = "";
  materialsData[profile.subject][profile.speed].forEach(c => {
    concepts.innerHTML += `<div class="concept">${c}</div>`;
  });
}

function startQuiz() {
  materials.classList.add("d-none");
  quiz.classList.remove("d-none");
  showQuestion();
}

function showQuestion() {
  if (!quizData[profile.subject][qIndex]) {
    questionBox.innerHTML = "<h5>🎉 Quiz Completed!</h5>";
    return;
  }

  questionBox.innerHTML = `
    <p>${quizData[profile.subject][qIndex].q}</p>
    <input id="answer" class="form-control mb-2">
    <button class="btn btn-primary" onclick="checkAnswer()">Submit</button>
  `;
}

function checkAnswer() {
  if (answer.value.toLowerCase() === quizData[profile.subject][qIndex].a) {
    points += 10;
  }
  qIndex++;
  progressFill.style.width = (qIndex / quizData[profile.subject].length) * 100 + "%";
  progressFill.innerText = points + " pts";
  showQuestion();
}
