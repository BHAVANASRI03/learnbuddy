document.addEventListener("DOMContentLoaded", function () {

  const startBtn = document.getElementById("startBtn");

  startBtn.addEventListener("click", function () {

    const name = document.getElementById("username").value.trim();
    const errorMsg = document.getElementById("errorMsg");

    if (name === "") {
      errorMsg.innerText = "Please enter your name";
      errorMsg.style.color = "red";
      return;
    }

    document.getElementById("displayName").innerText = name;
    document.getElementById("welcomePage").classList.add("hidden");
    document.getElementById("dashboard").classList.remove("hidden");
  });

});

function selectSubject(subject) {
  const content = {
    Math: "Math improves logical thinking and problem-solving skills.",
    Science: "Science helps you understand how the world works.",
    Coding: "Coding allows you to build apps, websites, and software."
  };

  document.getElementById("contentArea").innerText = content[subject];
}
