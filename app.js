let profile = {}, currentQuestion = 0, points = 0, studentName = "";

/* ---------------- WELCOME SCREEN ---------------- */
document.getElementById("startBtn").addEventListener("click", () => {
  studentName = document.getElementById("userNameInput").value.trim();
  if (studentName === "") return alert("Please enter your name");
  document.getElementById("welcomePageContainer").style.display = "none";
  document.getElementById("mainContent").style.display = "block";
});

/* ---------------- PLANNER ---------------- */
document.getElementById("addPlannerBtn").addEventListener("click", () => {
  const subject = document.querySelector(".plannerSubject").value.trim();
  const time = parseInt(document.querySelector(".plannerTime").value);
  if (!subject || time <= 0) return alert("Enter valid subject & time");

  const tbody = document.querySelector("#plannerTable tbody");
  const row = document.createElement("tr");
  row.innerHTML = `<td>${subject}</td><td>${time}</td><td><button onclick="this.closest('tr').remove();updateTotalTime()">❌</button></td>`;
  tbody.appendChild(row);

  document.querySelector(".plannerSubject").value = "";
  document.querySelector(".plannerTime").value = "";
  updateTotalTime();
});

function updateTotalTime() {
  let total = 0;
  document.querySelectorAll("#plannerTable tbody tr").forEach(r => total += parseInt(r.cells[1].innerText));
  document.getElementById("totalTime").innerText = total;
}

document.getElementById("savePlannerBtn").addEventListener("click", () => {
  const rows = document.querySelectorAll("#plannerTable tbody tr");
  if (rows.length === 0) return alert("Add subjects first");

  const data = [];
  rows.forEach(r => data.push({ subject: r.cells[0].innerText, time: r.cells[1].innerText }));
  localStorage.setItem("studyPlanner", JSON.stringify(data));
  document.getElementById("plannerStatus").innerText = "✅ Planner Saved!";
});

window.onload = () => {
  const stored = localStorage.getItem("studyPlanner");
  if (stored) {
    const data = JSON.parse(stored);
    const tbody = document.querySelector("#plannerTable tbody");
    data.forEach(item => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${item.subject}</td><td>${item.time}</td><td><button onclick="this.closest('tr').remove();updateTotalTime()">❌</button></td>`;
      tbody.appendChild(row);
    });
    updateTotalTime();
  }
};

/* ---------------- PROFILE → DASHBOARD ---------------- */
document.getElementById("profileForm").addEventListener("submit", e => {
  e.preventDefault();
  profile = {
    style: learningStyle.value,
    subject: subject.value,
    speed: learningSpeed.value
  };
  document.getElementById("profilePlannerSection").style.display = "none";
  document.getElementById("dashboard").style.display = "block";
  showMaterials();
});

/* ---------------- MATERIALS ---------------- */
const referenceMaterial = {
  math:{slow:[{title:"Basic Addition",summary:"Learn simple addition.",concept:"Adding numbers gives a sum.",link:"https://www.youtube.com/watch?v=igcoDFokKzU"}]},
  science:{slow:[{title:"Photosynthesis",summary:"Plants make food using sunlight.",concept:"Sunlight → energy",link:"https://www.youtube.com/watch?v=220rujnXj7I"}]},
  language:{slow:[{title:"Grammar Basics",summary:"Learn nouns and verbs.",concept:"Noun = name, Verb = action",link:"https://www.youtube.com/watch?v=7HUW_aukApo"}]},
  coding:{slow:[{title:"Programming Basics",summary:"Intro to coding.",concept:"Code instructs computers.",link:"https://www.youtube.com/watch?v=_j4Lj-BT00g"}]}
};

function showMaterials() {
  const mat = referenceMaterial[profile.subject][profile.speed] || [];
  let conceptHTML = "<h3>Key Concepts</h3>";
  mat.forEach(m => conceptHTML += `<div class="concept">${m.concept}</div>`);
  conceptContainer.innerHTML = conceptHTML;

  let lessonHTML = "<div class='card'><ul>";
  mat.forEach(m => lessonHTML += `<li><b>${m.title}</b> <a href="${m.link}" target="_blank">▶ Watch</a><p>${m.summary}</p></li>`);
  lessonHTML += "</ul></div>";
  lessonContainer.innerHTML = lessonHTML;

  if (profile.style === "auditory") {
    let text = mat.map(m => m.title + ". " + m.summary).join(" ");
    speechSynthesis.speak(new SpeechSynthesisUtterance(text));
  }
}

/* ---------------- DASHBOARD → QUIZ ---------------- */
document.getElementById("proceedQuizBtn").addEventListener("click", () => {
  dashboard.style.display = "none";
  quizSection.style.display = "block";
  showQuestion();
});

/* ---------------- QUIZ ---------------- */
const challenges = {
  math:[{q:"2+3=?",a:"5"}],
  science:[{q:"H2O is?",a:"water"}],
  language:[{q:"Synonym of happy?",a:"joyful"}],
  coding:[{q:"Web scripting language?",a:"javascript"}]
};

function showQuestion() {
  const q = challenges[profile.subject][currentQuestion];
  if (!q) return challengeContainer.innerHTML = "<h3>🎉 Quiz Completed!</h3>";

  challengeContainer.innerHTML = `
    <div class="card">
      <p>${q.q}</p>
      <input id="answerInput">
      <button onclick="checkAnswer()">Submit</button>
      <p id="result"></p>
    </div>`;
}

function checkAnswer() {
  const ans = answerInput.value.trim().toLowerCase();
  const correct = challenges[profile.subject][currentQuestion].a;
  result.innerHTML = ans === correct ? "✅ Correct" : "❌ Wrong";
  if (ans === correct) points += 10;
  currentQuestion++;
  updateProgress();
  setTimeout(showQuestion, 1500);
}

function updateProgress() {
  const total = challenges[profile.subject].length;
  const percent = Math.floor((currentQuestion / total) * 100);
  progressFill.style.width = percent + "%";
  progressFill.innerText = points + " pts";
}

/* ---------------- GAME ---------------- */
document.getElementById("gameBtn").addEventListener("click", () => {
  const a = Math.floor(Math.random() * 10);
  const b = Math.floor(Math.random() * 10);
  const ans = prompt(`Solve: ${a} + ${b}`);
  if (parseInt(ans) === a + b) {
    points += 5;
    alert("Correct! +5");
    updateProgress();
  } else alert("Wrong!");
});
