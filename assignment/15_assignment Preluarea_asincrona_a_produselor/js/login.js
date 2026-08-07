// Pagina de autentificare valideaza datele formularului si afiseaza mesajele de stare.

// Aceasta sectiune selecteaza elementele formularului necesare validarii.
let loginForm = document.getElementById("login-form");
let emailField = document.getElementById("email");
let passwordField = document.getElementById("password");
let statusMessage = document.getElementById("login-status");

// Functia afiseaza mesajul de validare in zona de stare a formularului.
function showMessage(text, type) {
  statusMessage.textContent = text;
  statusMessage.classList.remove("status-error", "status-ok");

  if (type === "error") {
    statusMessage.classList.add("status-error");
  } else if (type === "ok") {
    statusMessage.classList.add("status-ok");
  }
}

// Trimiterea formularului verifica prezenta unei adrese de email si a parolei.
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

// Modificarea adresei de email elimina mesajul de eroare afisat.
if (emailField !== null) {
  emailField.addEventListener("input", function () {
    if (statusMessage.classList.contains("status-error")) {
      statusMessage.textContent = "";
      statusMessage.classList.remove("status-error", "status-ok");
    }
  });
}

// Modificarea parolei elimina mesajul de eroare afisat.
if (passwordField !== null) {
  passwordField.addEventListener("input", function () {
    if (statusMessage.classList.contains("status-error")) {
      statusMessage.textContent = "";
      statusMessage.classList.remove("status-error", "status-ok");
    }
  });
}
