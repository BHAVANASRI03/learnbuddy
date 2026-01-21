document.addEventListener("DOMContentLoaded", function () {

  const startBtn = document.getElementById("startBtn");

  startBtn.addEventListener("click", function () {

    const name = document.getElementById("username").value.trim();
    const errorMsg = document.getElementById("errorMsg");

    if (name === "") {
      errorMsg.innerText = "Please enter your name";
      return;
    }

    errorMsg.innerText = "";

    document.getElementById("hero").classList.add("d-none");
    document.getElementById("dashboard").classList.remove("d-none");
    document.getElementById("displayName").innerText = name;

  });

});
