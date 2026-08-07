// Catalogul gestioneaza datele produselor, filtrele, sortarea, paginarea si cosul de cumparaturi.
// Aceasta sectiune defineste datele produselor in format JSON, utilizat pentru simularea raspunsului de la server.
let productsJson = `[
  {"id":1,"name":"Sampon auto cu efect ceramic Koch Chemie Ceramic Effect Shampoo, Ces","price":145,"currency":"RON","category":"Exterior","image":"images/1-sampon-auto-cu-efect-ceramic-koch-chemie-ceramic-effect-shampoo-ces-1l-438344-768.jpg","inStock":true},
  {"id":2,"name":"Sampon auto reactivare ceramica Koch Chemie Reactivation Shampoo, Rs","price":92,"currency":"RON","category":"Exterior","image":"images/2-sampon-auto-reactivare-ceramica-koch-chemie-reactivation-shampoo-1l-767567-768.jpg","inStock":true},
  {"id":3,"name":"Polish 3 in 1 cu ceara Carnauba Koch Chemie One Cut and Finish, P6.02","price":103,"currency":"RON","category":"Exterior","image":"images/3-Pasta-Polish-3-in-1-Koch-Chemie-One-Cut-Finish-P6.02-250ml-1000x1000-768.jpg","inStock":true},
  {"id":4,"name":"Spray protectie vopsea Koch Chemie Spray Sealant, S0.02","price":135,"currency":"RON","category":"Exterior","image":"images/4-spray-protectie-vopsea-koch-chemie-spray-sealant-s0-02-500ml-673060-768.jpg","inStock":false},
  {"id":5,"name":"Solutie curatare auto alcalina Koch Chemie VorreinigerB, Vb","price":59,"currency":"RON","category":"Exterior","image":"images/6-solutie-curatare-auto-alcalina-koch-chemie-vorreinigerb-vb-1l-505138-768.webp","inStock":true},
  {"id":6,"name":"Solutie curatare generala Koch Chemie Mehrzweckreiniger, Mzr","price":64,"currency":"RON","category":"Exterior","image":"images/7-Solutie-Curatare-Generala-Koch-Chemie-MZR-Mehrzweckreiniger-1L-1000x1000h-768.jpg","inStock":true},
  {"id":7,"name":"Solutie curatare jante reactiva Koch Chemie Magic Wheel Cleaner, Mwc","price":97,"currency":"RON","category":"Exterior","image":"images/8-solutie-curatare-jante-reactiva-koch-chemie-magic-wheel-cleaner-mwc-500ml-573022-768.jpg","inStock":true},
  {"id":8,"name":"Solutie spalare fara apa Koch Chemie Wash and Finish, Wf","price":79,"currency":"RON","category":"Exterior","image":"images/10-solutie-spalare-fara-apa-koch-chemie-wash-and-finish-wf-1l-977478-768.jpg","inStock":true},
  {"id":9,"name":"Set pensule interior Koch Chemie Interior Brush Set","price":70,"currency":"RON","category":"Accesorii","image":"images/5-Set-Pensule-Detailing-Interior-Koch-Chemie-3-buc-1000x1000-768.jpg","inStock":true},
  {"id":10,"name":"Solutie curatare universala Koch Chemie Green Star, Gs","price":42,"currency":"RON","category":"Exterior","image":"images/9-solutie-curatare-universala-koch-chemie-green-star-gs-1l-3229062912-768.jpg","inStock":true},
  {"id":11,"name":"Solutie spalare fara clatire Koch Chemie Rapid Rinseless Wash, Rrw","price":62,"currency":"RON","category":"Exterior","image":"images/11-solutie-spalare-fara-clatire-koch-chemie-rapid-rinseless-wash-rrw-1l-685449-768.jpg","inStock":true},
  {"id":12,"name":"Spuma spalare cu pH neutru Koch Chemie Gentle Snow Foam, Gsf","price":81,"currency":"RON","category":"Exterior","image":"images/12-spuma-spalare-cu-ph-neutru-koch-chemie-gentle-snow-foam-gsf-1l-592375-768.jpg","inStock":true},
  {"id":13,"name":"Sampon auto cu ceara Sonax Xtreme Wash & Wax","price":45,"currency":"RON","category":"Exterior","image":"images/13-sonax-wash-wax.webp","inStock":true},
  {"id":14,"name":"Solutie curatare jante Sonax Wheel Cleaner Full Effect","price":38,"currency":"RON","category":"Exterior","image":"images/14-sonax-curatare-jante.webp","inStock":true},
  {"id":15,"name":"Spray ceara lichida Sonax Xtreme Protect+Shine Spray&Seal","price":65,"currency":"RON","category":"Exterior","image":"images/15-sonax-ceramic-spray.webp","inStock":false},
  {"id":16,"name":"Solutie curatare interior Sonax Interior Cleaner","price":32,"currency":"RON","category":"Interior","image":"images/16-sonax-curatare-interior.webp","inStock":true},
  {"id":17,"name":"Sampon auto Meguiar's Gold Class Car Wash Shampoo & Conditioner","price":75,"currency":"RON","category":"Exterior","image":"images/17-meguiars-gold-class.webp","inStock":true},
  {"id":18,"name":"Ceara lichida Meguiar's Ultimate Liquid Wax","price":95,"currency":"RON","category":"Exterior","image":"images/18-meguiars-liquid-wax.webp","inStock":true},
  {"id":19,"name":"Solutie curatare jante Meguiar's Hot Rims Wheel & Tire Cleaner","price":48,"currency":"RON","category":"Exterior","image":"images/19-meguiars-hot-rims.webp","inStock":true},
  {"id":20,"name":"Sampon auto cu ceara Turtle Wax Ice Car Wash","price":40,"currency":"RON","category":"Exterior","image":"images/20-turtlewax-ice-carwash.jpg","inStock":true},
  {"id":21,"name":"Ceara spray Turtle Wax Ice Spray Wax","price":35,"currency":"RON","category":"Exterior","image":"images/21-turtlewax-spray-wax.webp","inStock":true},
  {"id":22,"name":"Set lavete microfibra Turtle Wax Premium Microfiber Cloths","price":45,"currency":"RON","category":"Accesorii","image":"images/22-turtlewax-laveta-microfibra.webp","inStock":false}
]`;

// Textul JSON este convertit intr-un tablou JavaScript pentru prelucrarea produselor.
let products = JSON.parse(productsJson);

// Aceasta sectiune defineste variantele disponibile pentru fiecare produs in format JSON.
let variantsJson = `[
  {"id":1,"brand":"Koch Chemie","colors":["Alb","Negru"],"sizes":["1 L","5 L"],"priceBySize":{"1 L":145,"5 L":549}},
  {"id":2,"brand":"Koch Chemie","colors":["Albastru","Verde"],"sizes":["1 L","5 L"],"priceBySize":{"1 L":92,"5 L":329}},
  {"id":3,"brand":"Koch Chemie","colors":["Rosu","Negru"],"sizes":["250 ml","1 L"],"priceBySize":{"250 ml":103,"1 L":332}},
  {"id":4,"brand":"Koch Chemie","colors":["Gri","Alb"],"sizes":["500 ml","5 L"],"priceBySize":{"500 ml":135,"5 L":549}},
  {"id":5,"brand":"Koch Chemie","colors":["Galben","Negru"],"sizes":["1 L","11 kg"],"priceBySize":{"1 L":59,"11 kg":393}},
  {"id":6,"brand":"Koch Chemie","colors":["Verde","Alb"],"sizes":["1 L","5 kg"],"priceBySize":{"1 L":64,"5 kg":194}},
  {"id":7,"brand":"Koch Chemie","colors":["Mov","Negru"],"sizes":["500 ml","10 L"],"priceBySize":{"500 ml":97,"10 L":879}},
  {"id":8,"brand":"Koch Chemie","colors":["Albastru","Gri"],"sizes":["1 L","10 L"],"priceBySize":{"1 L":79,"10 L":602}},
  {"id":9,"brand":"Koch Chemie","colors":["Maro","Negru"],"sizes":["3 buc"],"priceBySize":{"3 buc":70}},
  {"id":10,"brand":"Koch Chemie","colors":["Verde","Galben"],"sizes":["1 L","11 kg"],"priceBySize":{"1 L":42,"11 kg":239}},
  {"id":11,"brand":"Koch Chemie","colors":["Alb","Albastru"],"sizes":["1 L","5 L"],"priceBySize":{"1 L":62,"5 L":259}},
  {"id":12,"brand":"Koch Chemie","colors":["Roz","Alb"],"sizes":["1 L","5 L"],"priceBySize":{"1 L":81,"5 L":299}},
  {"id":13,"brand":"Sonax","colors":["Portocaliu","Negru"],"sizes":["500 ml","1 L"],"priceBySize":{"500 ml":28,"1 L":45}},
  {"id":14,"brand":"Sonax","colors":["Rosu","Alb"],"sizes":["500 ml"],"priceBySize":{"500 ml":38}},
  {"id":15,"brand":"Sonax","colors":["Argintiu","Negru"],"sizes":["750 ml"],"priceBySize":{"750 ml":65}},
  {"id":16,"brand":"Sonax","colors":["Bleu","Gri"],"sizes":["500 ml"],"priceBySize":{"500 ml":32}},
  {"id":17,"brand":"Meguiar's","colors":["Auriu","Negru"],"sizes":["473 ml","1.4 L"],"priceBySize":{"473 ml":35,"1.4 L":75}},
  {"id":18,"brand":"Meguiar's","colors":["Negru","Gri"],"sizes":["473 ml"],"priceBySize":{"473 ml":95}},
  {"id":19,"brand":"Meguiar's","colors":["Rosu","Gri"],"sizes":["710 ml"],"priceBySize":{"710 ml":48}},
  {"id":20,"brand":"Turtle Wax","colors":["Albastru","Alb"],"sizes":["500 ml","1.4 L"],"priceBySize":{"500 ml":22,"1.4 L":40}},
  {"id":21,"brand":"Turtle Wax","colors":["Verde","Negru"],"sizes":["500 ml"],"priceBySize":{"500 ml":35}},
  {"id":22,"brand":"Turtle Wax","colors":["Alb","Gri"],"sizes":["3 buc"],"priceBySize":{"3 buc":45}}
]`;
let variants = JSON.parse(variantsJson);

// Fiecare produs este completat cu marca, culorile, marimile si preturile variantelor sale.
for (let i = 0; i < products.length; i++) {
  for (let j = 0; j < variants.length; j++) {
    if (products[i].id === variants[j].id) {
      products[i].brand = variants[j].brand;
      products[i].colors = variants[j].colors;
      products[i].sizes = variants[j].sizes;
      products[i].priceBySize = variants[j].priceBySize;
    }
  }
}

// Aceasta sectiune pastreaza starea cosului, paginarii si a containerului pentru produse.
let cartCount = 0;
let currentPage = 1;
let productsPerPage = 12;
let productsContainer = document.getElementById("products");

function getColorValue(colorName) {
  let colors = {
    Alb: "#f8fafc",
    Negru: "#111827",
    Albastru: "#2563eb",
    Verde: "#16a34a",
    Rosu: "#dc2626",
    Gri: "#94a3b8",
    Galben: "#facc15",
    Mov: "#7c3aed",
    Maro: "#92400e",
    Roz: "#ec4899",
    Portocaliu: "#f97316",
    Argintiu: "#cbd5e1",
    Bleu: "#38bdf8",
    Auriu: "#d97706"
  };
  return colors[colorName] || "#e5e7eb";
}

// Functia actualizeaza contoarele cosului afisate in antet.
function updateCartCounter() {
  cartCount = cartCount + 1;
  document.getElementById("cart-count").textContent = cartCount;
  document.getElementById("cart-count-sm").textContent = cartCount;
}

// Functia creeaza un buton pentru selectarea unei culori sau a unei marimi.
function createVariantButton(className, text, isFirst) {
  let button = document.createElement("button");
  button.type = "button";
  button.className = className;
  button.textContent = text;
  button.title = text;
  if (isFirst) {
    button.classList.add("is-selected");
  }
  return button;
}

// Functia construieste cardul unui produs, inclusiv imaginea, variantele si actiunea de adaugare in cos.
function createProductCard(product) {
  let card = document.createElement("article");
  card.className = "product-card site-card";
  card.setAttribute("data-id", product.id);

  let productLink = document.createElement("a");
  productLink.className = "product-link";
  productLink.href = "product.html?id=" + product.id;
  productLink.setAttribute("aria-label", product.name);
  let image = document.createElement("img");
  image.className = "product-image";
  image.src = product.image;
  image.alt = product.name;
  productLink.appendChild(image);
  card.appendChild(productLink);

  let title = document.createElement("h3");
  title.className = "product-title";
  title.textContent = product.name;
  card.appendChild(title);

  let price = document.createElement("p");
  price.className = "product-price";
  price.textContent =
    product.priceBySize[product.sizes[0]] + " " + product.currency;
  card.appendChild(price);

  let variantsWrapper = document.createElement("div");
  variantsWrapper.className = "card-variants";
  let colorRow = document.createElement("div");
  colorRow.className = "card-variant-row";
  let colorLabel = document.createElement("span");
  colorLabel.className = "card-variant-label";
  colorLabel.textContent = "Culoare";
  colorRow.appendChild(colorLabel);
  let colorContainer = document.createElement("div");
  colorContainer.className = "color-options";
  for (let i = 0; i < product.colors.length; i++) {
    let colorButton = createVariantButton(
      "color-option",
      product.colors[i],
      i === 0
    );
    let colorDot = document.createElement("span");
    colorDot.className = "color-dot";
    colorDot.style.backgroundColor = getColorValue(product.colors[i]);
    colorButton.textContent = "";
    colorButton.appendChild(colorDot);
    colorButton.appendChild(document.createTextNode(product.colors[i]));
    colorButton.addEventListener("click", function () {
      let buttons = colorContainer.querySelectorAll(".color-option");
      for (let j = 0; j < buttons.length; j++)
        buttons[j].classList.remove("is-selected");
      colorButton.classList.add("is-selected");
    });
    colorContainer.appendChild(colorButton);
  }
  colorRow.appendChild(colorContainer);
  variantsWrapper.appendChild(colorRow);

  let sizeRow = document.createElement("div");
  sizeRow.className = "card-variant-row";
  let sizeLabel = document.createElement("span");
  sizeLabel.className = "card-variant-label";
  sizeLabel.textContent = "Marime";
  sizeRow.appendChild(sizeLabel);
  let sizeContainer = document.createElement("div");
  sizeContainer.className = "size-options";
  for (let i = 0; i < product.sizes.length; i++) {
    let sizeButton = createVariantButton(
      "size-option",
      product.sizes[i],
      i === 0
    );
    sizeButton.addEventListener("click", function () {
      let buttons = sizeContainer.querySelectorAll(".size-option");
      for (let j = 0; j < buttons.length; j++)
        buttons[j].classList.remove("is-selected");
      sizeButton.classList.add("is-selected");
      price.textContent =
        product.priceBySize[sizeButton.textContent] + " " + product.currency;
    });
    sizeContainer.appendChild(sizeButton);
  }
  sizeRow.appendChild(sizeContainer);
  variantsWrapper.appendChild(sizeRow);
  card.appendChild(variantsWrapper);

  let button = document.createElement("button");
  button.className = "btn add-to-cart";
  button.type = "button";
  button.textContent = "Add to Cart";
  button.setAttribute("data-id", product.id);
  button.addEventListener("click", updateCartCounter);
  card.appendChild(button);
  return card;
}

// Functiile urmatoare citesc valorile bifate si verifica potrivirea lor cu datele produsului.
function getCheckedValues(name) {
  let values = [];
  let inputs = document.querySelectorAll('input[name="' + name + '"]');
  for (let i = 0; i < inputs.length; i++)
    if (inputs[i].checked) values.push(inputs[i].value);
  return values;
}

function matchesFilter(value, selectedValues) {
  return (
    selectedValues.length === 0 ||
    selectedValues.indexOf(value) !== -1 ||
    selectedValues.indexOf("Toate") !== -1
  );
}

// Functia pastreaza produsele disponibile si aplica filtrele de pret, marca si categorie.
function getFilteredProducts() {
  let prices = getCheckedValues("price-filter");
  let brands = getCheckedValues("brand-filter");
  let categories = getCheckedValues("category-filter");
  let result = [];
  for (let i = 0; i < products.length; i++) {
    let product = products[i];
    let priceMatches =
      prices.length === 0 ||
      (prices.indexOf("0-50") !== -1 && product.price <= 50) ||
      (prices.indexOf("50-150") !== -1 &&
        product.price > 50 &&
        product.price <= 150) ||
      (prices.indexOf("150+") !== -1 && product.price > 150);
    if (
      product.inStock === true &&
      priceMatches &&
      matchesFilter(product.brand, brands) &&
      matchesFilter(product.category, categories)
    )
      result.push(product);
  }
  return result;
}

// Functia afiseaza intervalul de produse vizibil si numarul total de rezultate.
function updateResultsCount(shown, total) {
  let result = document.getElementById("results-count");
  if (total === 0) result.textContent = "Afisare 0 din 0 produse";
  else
    result.textContent =
      "Afisare " +
      ((currentPage - 1) * productsPerPage + 1) +
      "-" +
      ((currentPage - 1) * productsPerPage + shown) +
      " din " +
      total +
      " produse";
}

// Functia construieste butoanele pentru navigarea intre paginile catalogului.
function renderPagination(total) {
  let pagination = document.getElementById("pagination");
  pagination.innerHTML = "";
  let totalPages = Math.ceil(total / productsPerPage);
  if (totalPages <= 1) return;
  let previousButton = document.createElement("button");
  previousButton.className = "btn btn-nav";
  previousButton.type = "button";
  previousButton.textContent = "Inapoi";
  previousButton.disabled = currentPage === 1;
  previousButton.addEventListener("click", function () {
    if (currentPage > 1) {
      currentPage = currentPage - 1;
      updateCatalog();
    }
  });
  pagination.appendChild(previousButton);
  for (let i = 1; i <= totalPages; i++) {
    let button = document.createElement("button");
    button.className = "page";
    button.type = "button";
    button.textContent = i;
    if (i === currentPage) button.classList.add("is-active");
    button.addEventListener("click", function () {
      currentPage = i;
      updateCatalog();
    });
    pagination.appendChild(button);
  }
  let nextButton = document.createElement("button");
  nextButton.className = "btn btn-nav";
  nextButton.type = "button";
  nextButton.textContent = "Inainte";
  nextButton.disabled = currentPage === totalPages;
  nextButton.addEventListener("click", function () {
    if (currentPage < totalPages) {
      currentPage = currentPage + 1;
      updateCatalog();
    }
  });
  pagination.appendChild(nextButton);
}

// Functia actualizeaza catalogul dupa filtrare, sortare si selectarea paginii curente.
function updateCatalog() {
  let list = getFilteredProducts();
  let sortBy = document.getElementById("sortBy").value;
  if (sortBy === "new")
    list.sort(function (a, b) {
      return b.id - a.id;
    });
  if (sortBy === "priceLow")
    list.sort(function (a, b) {
      return a.price - b.price;
    });
  if (sortBy === "priceHigh")
    list.sort(function (a, b) {
      return b.price - a.price;
    });
  let totalPages = Math.max(1, Math.ceil(list.length / productsPerPage));
  if (currentPage > totalPages) currentPage = totalPages;
  let pageProducts = list.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );
  productsContainer.innerHTML = "";
  for (let i = 0; i < pageProducts.length; i++)
    productsContainer.appendChild(createProductCard(pageProducts[i]));
  updateResultsCount(pageProducts.length, list.length);
  renderPagination(list.length);
}

// Aceasta sectiune asociaza controalele de filtrare si sortare cu actualizarea catalogului.
let sortSelect = document.getElementById("sortBy");
let applyFiltersButton = document.getElementById("apply-filters");
let allCategoriesCheckbox = document.getElementById("all-categories");
sortSelect.addEventListener("change", function () {
  currentPage = 1;
  updateCatalog();
});
applyFiltersButton.addEventListener("click", function () {
  currentPage = 1;
  updateCatalog();
});
allCategoriesCheckbox.addEventListener("change", function () {
  if (allCategoriesCheckbox.checked) {
    let inputs = document.querySelectorAll('input[name="category-filter"]');
    for (let i = 0; i < inputs.length; i++)
      if (inputs[i].value !== "Toate") inputs[i].checked = false;
  }
});
let categoryCheckboxes = document.querySelectorAll(
  'input[name="category-filter"]'
);
for (let i = 0; i < categoryCheckboxes.length; i++) {
  categoryCheckboxes[i].addEventListener("change", function () {
    if (this.value !== "Toate" && this.checked)
      allCategoriesCheckbox.checked = false;
  });
}
updateCatalog();
