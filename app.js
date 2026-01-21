function startLearning() {
  const name = document.getElementById("username").value.trim();
  const errorMsg = document.getElementById("errorMsg");

  if (name === "") {
    errorMsg.innerText = "Please enter your name";
    return;
  }

  // Clear error
  errorMsg.innerText = "";

  // Hide hero section
  document.getElementById("hero").classList.add("d-none");

  // Show dashboard
  document.getElementById("dashboard").classList.remove("d-none");

  // Display name
  document.getElementById("displayName").innerText = name;
}
