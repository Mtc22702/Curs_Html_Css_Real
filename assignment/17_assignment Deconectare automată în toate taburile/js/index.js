// PAGINA PRINCIPALA

// Elemente din pagina
let exteriorButton = document.getElementById("exteriorButton");
let interiorButton = document.getElementById("interiorButton");
let accessoriesButton = document.getElementById("accessoriesButton");

// Functie pentru navigarea catre categoria selectata
function openCategory(category) {
  window.location.href = "shop.html?category=" + category;
}

// Evenimente butoane categorii
exteriorButton.addEventListener("click", function () {
  openCategory("exterior");
});

interiorButton.addEventListener("click", function () {
  openCategory("interior");
});

accessoriesButton.addEventListener("click", function () {
  openCategory("accesorii");
});

// Eveniment formular newsletter
let newsletterForm = document.querySelector(".newsletter-form");

newsletterForm.addEventListener("submit", function (event) {
  event.preventDefault();
});
