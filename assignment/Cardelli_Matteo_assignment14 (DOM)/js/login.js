// PAGINA LOGIN - Assignment 04

// Elemente din pagina
let loginForm = document.getElementById("login-form");
let emailField = document.getElementById("email");
let passwordField = document.getElementById("password");
let statusMessage = document.getElementById("login-status");

// Functie pentru mesajul de login
function showMessage(text, type) {
  statusMessage.textContent = text;
  statusMessage.classList.remove("status-error", "status-ok");

  if (type === "error") {
    statusMessage.classList.add("status-error");
  } else if (type === "ok") {
    statusMessage.classList.add("status-ok");
  }
}

// Eveniment formular login
if (loginForm !== null) {
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    let emailValue = emailField.value.trim();
    let passwordValue = passwordField.value.trim();

    if (emailValue === "" && passwordValue === "") {
      showMessage("Please, enter email and password.", "error");
      return;
    }

    if (emailValue === "") {
      showMessage("Please, enter email.", "error");
      return;
    }

    if (passwordValue.length < 6) {
      showMessage("Password must be at least 6 characters.", "error");
      return;
    }

    showMessage("Login successful. Welcome!", "ok");
  });
}

// Eveniment input email
if (emailField !== null) {
  emailField.addEventListener("input", function () {
    if (statusMessage.classList.contains("status-error")) {
      statusMessage.textContent = "";
      statusMessage.classList.remove("status-error", "status-ok");
    }
  });
}

// Eveniment input parola
if (passwordField !== null) {
  passwordField.addEventListener("input", function () {
    if (statusMessage.classList.contains("status-error")) {
      statusMessage.textContent = "";
      statusMessage.classList.remove("status-error", "status-ok");
    }
  });
}
