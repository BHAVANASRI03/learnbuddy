let profile={}, q=0, score=0;

const learningContent={
  math:{
    slow:["Number Systems","Basic Arithmetic","Introduction to Algebra"],
    average:["Algebra","Linear Equations","Geometry"]
  },
  science:{
    slow:["Photosynthesis","States of Matter","Human Biology"],
    average:["Electricity","Force & Motion","Chemical Reactions"]
  },
  coding:{
    slow:["What is Programming?","Variables","Conditions"],
    average:["Loops","Functions","Arrays"]
  }
};

const quizData={
  math:[{q:"5 + 3 = ?",a:"8"}],
  science:[{q:"Plants prepare food using?",a:"photosynthesis"}],
  coding:[{q:"Language used for web?",a:"javascript"}]
};

function startApp(){
  if(!userName.value.trim()){
    alert("Enter your name");
    return;
  }
  hero.style.display="none";
  app.classList.remove("d-none");
}

profileForm.onsubmit=e=>{
  e.preventDefault();
  profile.subject=subject.value;
  profile.speed=speed.value;
  dashboard.classList.remove("d-none");
  concepts.innerHTML="";
  learningContent[profile.subject][profile.speed].forEach(c=>{
    concepts.innerHTML+=`<div class="concept">${c}</div>`;
  });
};

function startQuiz(){
  dashboard.classList.add("d-none");
  quiz.classList.remove("d-none");
  showQuestion();
}

function showQuestion(){
  if(!quizData[profile.subject][q]){
    questionBox.innerHTML="<h5>🎉 Assessment Completed!</h5>";
    return;
  }
  questionBox.innerHTML=`
    <p>${quizData[profile.subject][q].q}</p>
    <input id="ans" class="form-control mb-2">
    <button class="btn btn-primary" onclick="check()">Submit</button>
  `;
}

function check(){
  if(ans.value.toLowerCase()==quizData[profile.subject][q].a){
    score+=10;
  }
  q++;
  progressFill.style.width=(q/quizData[profile.subject].length)*100+"%";
  progressFill.innerText=score+" pts";
  showQuestion();
}
