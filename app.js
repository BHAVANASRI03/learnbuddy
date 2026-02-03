document.addEventListener("DOMContentLoaded", () => {

let profile={},currentQuestion=0,points=0;

/* START */
startBtn.onclick=()=>{
  const name=userNameInput.value.trim();
  if(!name) return alert("Enter name");
  welcomePageContainer.style.display="none";
  mainContent.style.display="block";
};

/* PLANNER */
addPlannerBtn.onclick=()=>{
  const sub=plannerSubject.value.trim();
  const time=parseInt(plannerTime.value);
  if(!sub||time<=0) return alert("Invalid input");

  const row=plannerTable.querySelector("tbody").insertRow();
  row.innerHTML=`<td>${sub}</td><td>${time}</td><td><button>❌</button></td>`;
  row.querySelector("button").onclick=()=>{row.remove();updateTotal();};

  plannerSubject.value=""; plannerTime.value="";
  updateTotal();
};

function updateTotal(){
  let total=0;
  document.querySelectorAll("#plannerTable tbody tr").forEach(r=>total+=parseInt(r.cells[1].innerText));
  totalTime.innerText=total;
}

/* PROFILE */
profileForm.onsubmit=e=>{
  e.preventDefault();
  profile.subject=subject.value;
  profile.speed=learningSpeed.value;
  profilePlannerSection.style.display="none";
  dashboard.style.display="block";
  showMaterials();
};

/* MATERIALS */
const referenceMaterial={
  math:{slow:[{title:"Addition",concept:"Adding numbers",summary:"Learn addition",link:"https://youtube.com"}]},
  science:{slow:[{title:"Plants",concept:"Photosynthesis",summary:"Plant food",link:"https://youtube.com"}]},
  language:{slow:[{title:"Grammar",concept:"Nouns & Verbs",summary:"Language basics",link:"https://youtube.com"}]},
  coding:{slow:[{title:"Coding Intro",concept:"What is code?",summary:"Basics",link:"https://youtube.com"}]}
};

function showMaterials(){
  const mat=referenceMaterial[profile.subject][profile.speed];
  conceptContainer.innerHTML=mat.map(m=>`<p>${m.concept}</p>`).join("");
  lessonContainer.innerHTML=mat.map(m=>`<p><b>${m.title}</b> <a href="${m.link}" target="_blank">Watch</a></p>`).join("");
}

/* QUIZ */
proceedQuizBtn.onclick=()=>{
  dashboard.style.display="none";
  quizSection.style.display="block";
  showQuestion();
};

const challenges={math:[{q:"2+2?",a:"4"}],science:[{q:"H2O?",a:"water"}],language:[{q:"Happy synonym?",a:"joyful"}],coding:[{q:"Web language?",a:"javascript"}]};

function showQuestion(){
  const q=challenges[profile.subject][currentQuestion];
  if(!q) return challengeContainer.innerHTML="Done!";
  challengeContainer.innerHTML=`<p>${q.q}</p><input id="ans"><button id="sub">Submit</button><p id="res"></p>`;
  sub.onclick=checkAnswer;
}

function checkAnswer(){
  if(ans.value.toLowerCase()==challenges[profile.subject][currentQuestion].a){points+=10;res.innerText="Correct";}
  else res.innerText="Wrong";
  currentQuestion++;updateProgress();setTimeout(showQuestion,1000);
}

function updateProgress(){
  const total=challenges[profile.subject].length;
  progressFill.style.width=(currentQuestion/total)*100+"%";
  progressFill.innerText=points+" pts";
}

/* GAME */
gameBtn.onclick=()=>{
  const a=Math.floor(Math.random()*10),b=Math.floor(Math.random()*10);
  if(parseInt(prompt(`${a}+${b}?`))===a+b){points+=5;updateProgress();}
};

});
