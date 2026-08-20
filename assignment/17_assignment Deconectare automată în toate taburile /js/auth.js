// PAGINI PROTEJATE

// Functie pentru redirectionarea catre pagina de login
function redirectToLogin() {
  window.location.href = "login.html";
}

// Functie pentru stergerea datelor de autentificare
function clearLoginData() {
  localStorage.removeItem("logged");
  localStorage.removeItem("token");
  localStorage.removeItem("tokenExpiresAt");
}

// Functie pentru deconectarea cauzata de expirarea tokenului
function logoutExpiredUser() {
  console.log("Tokenul a expirat. Utilizatorul este deconectat.");
  localStorage.setItem("logoutReason", "expired");
  clearLoginData();
  redirectToLogin();
}

// Functie pentru verificarea tokenului la incarcarea paginii
function checkToken() {
  let logged = localStorage.getItem("logged");
  let token = localStorage.getItem("token");
  let tokenExpiresAtValue = localStorage.getItem("tokenExpiresAt");

  if (
    logged !== "true" ||
    token === null ||
    tokenExpiresAtValue === null ||
    tokenExpiresAtValue === ""
  ) {
    redirectToLogin();
    return;
  }

  let tokenExpiresAt = Number(tokenExpiresAtValue);
  let currentTime = Date.now();
  let remainingTime = tokenExpiresAt - currentTime;

  console.log("Timpul curent:", currentTime);
  console.log("Timpul de expirare:", tokenExpiresAt);
  console.log("Timp ramas:", remainingTime);

  if (isNaN(tokenExpiresAt) || remainingTime <= 0) {
    logoutExpiredUser();
    return;
  }

  setTimeout(function () {
    logoutExpiredUser();
  }, remainingTime);
}

// Eveniment storage pentru sincronizarea intre taburi
window.addEventListener("storage", function (event) {
  if (event.key === "logged" && event.newValue !== "true") {
    redirectToLogin();
  }
});

checkToken();
