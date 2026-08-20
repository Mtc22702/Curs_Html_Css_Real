// PAGINA LOGIN

// Configurare API folosita in cadrul cursului
const LOGIN_API_URL = "https://api.advanziaeducation.com/api/auth/login";
const LOGIN_API_KEY =
  "d7534cbd9ee8a1d277508f05318830010270e1c3699cacf82f8ec53f79b486a2";

// Elemente din pagina
let loginForm = document.getElementById("login-form");
let usernameField = document.getElementById("username");
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

// Functie pentru stergerea datelor vechi dupa un login nereusit
function saveFailedLogin() {
  localStorage.removeItem("token");
  localStorage.removeItem("tokenExpiresAt");
  localStorage.setItem("logged", "false");
}

// Functie pentru autentificarea utilizatorului
function loginUser(username, password) {
  let xhr = new XMLHttpRequest();

  xhr.open("POST", LOGIN_API_URL);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("X-API-Key", LOGIN_API_KEY);

  xhr.onload = function () {
    let data = JSON.parse(xhr.responseText);

    if (xhr.status === 200) {
      let tokenExpiresAt = new Date(data.expiresAt).getTime();

      localStorage.setItem("logged", "true");
      localStorage.setItem("token", data.token);
      localStorage.setItem("tokenExpiresAt", tokenExpiresAt);
      showMessage("Login successful. Welcome!", "ok");
    } else {
      saveFailedLogin();
      showMessage(data.error || "Login failed.", "error");
    }
  };

  xhr.onerror = function () {
    showMessage("The login service is not available.", "error");
  };

  let body = JSON.stringify({
    username: username,
    password: password
  });

  xhr.send(body);
}

// Eveniment formular login
if (loginForm !== null) {
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    let usernameValue = usernameField.value.trim();
    let passwordValue = passwordField.value.trim();

    if (usernameValue === "" && passwordValue === "") {
      showMessage("Please, enter username and password.", "error");
      return;
    }

    if (usernameValue === "") {
      showMessage("Please, enter username.", "error");
      return;
    }

    if (passwordValue.length < 6) {
      showMessage("Password must be at least 6 characters.", "error");
      return;
    }

    loginUser(usernameValue, passwordValue);
  });
}

// Mesaj optional afisat dupa expirarea tokenului
if (localStorage.getItem("logoutReason") === "expired") {
  showMessage("Session expired. Please log in again.", "error");
  localStorage.removeItem("logoutReason");
}

// Stergerea mesajului de eroare cand utilizatorul modifica formularul
function clearErrorMessage() {
  if (statusMessage.classList.contains("status-error")) {
    statusMessage.textContent = "";
    statusMessage.classList.remove("status-error", "status-ok");
  }
}

if (usernameField !== null) {
  usernameField.addEventListener("input", clearErrorMessage);
}

if (passwordField !== null) {
  passwordField.addEventListener("input", clearErrorMessage);
}
