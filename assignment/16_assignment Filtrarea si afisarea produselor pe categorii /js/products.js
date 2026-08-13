// PAGINA SHOP - JSON

// Sir JSON cu produse
const productsJson = `[
  {"id":1,"apiId":564,"name":"Șampon auto cu efect ceramic Koch Chemie Ceramic Effect Shampoo, Ces","price":145,"currency":"RON","category":"Exterior","image":"images/1-sampon-auto-cu-efect-ceramic-koch-chemie-ceramic-effect-shampoo-ces-1l-438344-768.jpg","inStock":true},
  {"id":2,"apiId":565,"name":"Șampon auto reactivare ceramică Koch Chemie Reactivation Shampoo, Rs","price":92,"currency":"RON","category":"Exterior","image":"images/2-sampon-auto-reactivare-ceramica-koch-chemie-reactivation-shampoo-1l-767567-768.jpg","inStock":true},
  {"id":3,"apiId":566,"name":"Polish 3 în 1 cu ceară Carnauba Koch Chemie One Cut and Finish, P6.02","price":103,"currency":"RON","category":"Exterior","image":"images/3-Pasta-Polish-3-in-1-Koch-Chemie-One-Cut-Finish-P6.02-250ml-1000x1000-768.jpg","inStock":true},
  {"id":4,"apiId":567,"name":"Spray protecție vopsea Koch Chemie Spray Sealant, S0.02","price":135,"currency":"RON","category":"Exterior","image":"images/4-spray-protectie-vopsea-koch-chemie-spray-sealant-s0-02-500ml-673060-768.jpg","inStock":false},
  {"id":5,"apiId":568,"name":"Soluție curățare auto alcalină Koch Chemie VorreinigerB, Vb","price":59,"currency":"RON","category":"Exterior","image":"images/6-solutie-curatare-auto-alcalina-koch-chemie-vorreinigerb-vb-1l-505138-768.webp","inStock":true},
  {"id":6,"apiId":569,"name":"Soluție curățare generală Koch Chemie Mehrzweckreiniger, Mzr","price":64,"currency":"RON","category":"Interior","image":"images/7-Solutie-Curatare-Generala-Koch-Chemie-MZR-Mehrzweckreiniger-1L-1000x1000h-768.jpg","inStock":true},
  {"id":7,"apiId":570,"name":"Soluție curățare jante reactivă Koch Chemie Magic Wheel Cleaner, Mwc","price":97,"currency":"RON","category":"Exterior","image":"images/8-solutie-curatare-jante-reactiva-koch-chemie-magic-wheel-cleaner-mwc-500ml-573022-768.jpg","inStock":true},
  {"id":8,"apiId":571,"name":"Soluție spălare fără apă Koch Chemie Wash and Finish, Wf","price":79,"currency":"RON","category":"Exterior","image":"images/10-solutie-spalare-fara-apa-koch-chemie-wash-and-finish-wf-1l-977478-768.jpg","inStock":true},
  {"id":9,"apiId":572,"name":"Set pensule interior Koch Chemie Interior Brush Set","price":70,"currency":"RON","category":"Accesorii","image":"images/5-Set-Pensule-Detailing-Interior-Koch-Chemie-3-buc-1000x1000-768.jpg","inStock":true},
  {"id":10,"apiId":573,"name":"Soluție curățare universală Koch Chemie Green Star, Gs","price":42,"currency":"RON","category":"Exterior","image":"images/9-solutie-curatare-universala-koch-chemie-green-star-gs-1l-3229062912-768.jpg","inStock":true},
  {"id":11,"apiId":574,"name":"Soluție spălare fără clătire Koch Chemie Rapid Rinseless Wash, Rrw","price":62,"currency":"RON","category":"Exterior","image":"images/11-solutie-spalare-fara-clatire-koch-chemie-rapid-rinseless-wash-rrw-1l-685449-768.jpg","inStock":true},
  {"id":12,"apiId":575,"name":"Spumă spălare cu pH neutru Koch Chemie Gentle Snow Foam, Gsf","price":81,"currency":"RON","category":"Exterior","image":"images/12-spuma-spalare-cu-ph-neutru-koch-chemie-gentle-snow-foam-gsf-1l-592375-768.jpg","inStock":true},
  {"id":13,"apiId":576,"name":"Șampon auto cu ceară Sonax Xtreme Wash & Wax","price":28,"currency":"RON","category":"Exterior","image":"images/13-sonax-wash-wax.webp","inStock":true},
  {"id":14,"apiId":577,"name":"Soluție curățare jante Sonax Wheel Cleaner Full Effect","price":38,"currency":"RON","category":"Exterior","image":"images/14-sonax-curatare-jante.webp","inStock":true},
  {"id":15,"apiId":578,"name":"Spray ceară lichidă Sonax Xtreme Protect+Shine Spray&Seal","price":65,"currency":"RON","category":"Exterior","image":"images/15-sonax-ceramic-spray.webp","inStock":false},
  {"id":16,"apiId":579,"name":"Soluție curățare interior Sonax Interior Cleaner","price":32,"currency":"RON","category":"Interior","image":"images/16-sonax-curatare-interior.webp","inStock":true},
  {"id":17,"apiId":580,"name":"Șampon auto Meguiar's Gold Class Car Wash Shampoo & Conditioner","price":35,"currency":"RON","category":"Exterior","image":"images/17-meguiars-gold-class.webp","inStock":true},
  {"id":18,"apiId":581,"name":"Ceară lichidă Meguiar's Ultimate Liquid Wax","price":95,"currency":"RON","category":"Exterior","image":"images/18-meguiars-liquid-wax.webp","inStock":true},
  {"id":19,"apiId":582,"name":"Soluție curățare jante Meguiar's Hot Rims Wheel & Tire Cleaner","price":48,"currency":"RON","category":"Exterior","image":"images/19-meguiars-hot-rims.webp","inStock":true},
  {"id":20,"apiId":583,"name":"Șampon auto cu ceară Turtle Wax Ice Car Wash","price":22,"currency":"RON","category":"Exterior","image":"images/20-turtlewax-ice-carwash.jpg","inStock":true},
  {"id":21,"apiId":584,"name":"Ceară spray Turtle Wax Ice Spray Wax","price":35,"currency":"RON","category":"Exterior","image":"images/21-turtlewax-spray-wax.webp","inStock":true},
  {"id":22,"apiId":585,"name":"Set lavete microfibră Turtle Wax Premium Microfiber Cloths","price":45,"currency":"RON","category":"Accesorii","image":"images/22-turtlewax-laveta-microfibra.webp","inStock":false}
]`;

// Transformare JSON in array JavaScript pentru detaliile locale ale produselor
const localProducts = JSON.parse(productsJson);

// Sir JSON cu variante
const variantsJson = `[
  {"id":1,"brand":"Koch Chemie","colors":["Alb","Negru"],"sizes":["1 L","5 L"],"priceBySize":{"1 L":145,"5 L":549}},
  {"id":2,"brand":"Koch Chemie","colors":["Albastru","Verde"],"sizes":["1 L","5 L"],"priceBySize":{"1 L":92,"5 L":329}},
  {"id":3,"brand":"Koch Chemie","colors":["Roșu","Negru"],"sizes":["250 ml","1 L"],"priceBySize":{"250 ml":103,"1 L":332}},
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
  {"id":14,"brand":"Sonax","colors":["Roșu","Alb"],"sizes":["500 ml"],"priceBySize":{"500 ml":38}},
  {"id":15,"brand":"Sonax","colors":["Argintiu","Negru"],"sizes":["750 ml"],"priceBySize":{"750 ml":65}},
  {"id":16,"brand":"Sonax","colors":["Bleu","Gri"],"sizes":["500 ml"],"priceBySize":{"500 ml":32}},
  {"id":17,"brand":"Meguiar's","colors":["Auriu","Negru"],"sizes":["473 ml","1.4 L"],"priceBySize":{"473 ml":35,"1.4 L":75}},
  {"id":18,"brand":"Meguiar's","colors":["Negru","Gri"],"sizes":["473 ml"],"priceBySize":{"473 ml":95}},
  {"id":19,"brand":"Meguiar's","colors":["Roșu","Gri"],"sizes":["710 ml"],"priceBySize":{"710 ml":48}},
  {"id":20,"brand":"Turtle Wax","colors":["Albastru","Alb"],"sizes":["500 ml","1.4 L"],"priceBySize":{"500 ml":22,"1.4 L":40}},
  {"id":21,"brand":"Turtle Wax","colors":["Verde","Negru"],"sizes":["500 ml"],"priceBySize":{"500 ml":35}},
  {"id":22,"brand":"Turtle Wax","colors":["Alb","Gri"],"sizes":["3 buc"],"priceBySize":{"3 buc":45}}
]`;
const variants = JSON.parse(variantsJson);

// Adaugare variante la produsele locale
for (let i = 0; i < localProducts.length; i++) {
  for (let j = 0; j < variants.length; j++) {
    if (localProducts[i].id === variants[j].id) {
      localProducts[i].brand = variants[j].brand;
      localProducts[i].colors = variants[j].colors;
      localProducts[i].sizes = variants[j].sizes;
      localProducts[i].priceBySize = variants[j].priceBySize;
    }
  }
}

// Configurare API folosita in cadrul cursului
const PRODUCTS_API_URL = "https://api.advanziaeducation.com/api/products";
const API_KEY =
  "f9229bc8488ed6cb139572c8e5e6367f66bc07f78e9f4ebe33e22bcf0b8dcb91";

let allProducts = [];
let products = [];

// Functie pentru normalizarea textului
function normalizeText(value) {
  return String(value || "")
    .toLowerCase()
    .trim();
}

// Functie pentru citirea categoriei din URL
function getCategoryFromQueryString() {
  const params = new URLSearchParams(window.location.search);
  return params.get("category");
}

// Functie pentru gasirea produsului dupa ID-ul primit de la API
function findLocalProductByApiId(apiId) {
  for (let i = 0; i < localProducts.length; i++) {
    if (localProducts[i].apiId === Number(apiId)) {
      return localProducts[i];
    }
  }

  return null;
}

// Varianta de rezerva pentru cazul in care produsele sunt recreate pe server
function findLocalProductByTitle(title) {
  let normalizedTitle = normalizeText(title);

  for (let i = 0; i < localProducts.length; i++) {
    if (normalizeText(localProducts[i].name) === normalizedTitle) {
      return localProducts[i];
    }
  }

  return null;
}

// Functie pentru combinarea datelor API cu variantele locale
function normalizeApiProduct(apiProduct) {
  let localProduct = findLocalProductByApiId(apiProduct.id);

  if (localProduct === null) {
    localProduct = findLocalProductByTitle(apiProduct.title);
  }

  if (localProduct === null) {
    return null;
  }

  return {
    id: localProduct.id,
    apiId: apiProduct.id,
    name: apiProduct.title,
    price: Number(apiProduct.price),
    currency: localProduct.currency,
    category: apiProduct.category,
    image: localProduct.image,
    description: apiProduct.description || "",
    inStock: localProduct.inStock,
    brand: localProduct.brand,
    colors: localProduct.colors,
    sizes: localProduct.sizes,
    priceBySize: localProduct.priceBySize
  };
}

// Functie pentru filtrarea produselor dupa categorie
function filterProductsByCategory(productsList, selectedCategory) {
  if (selectedCategory === null || selectedCategory.trim() === "") {
    return productsList.slice();
  }

  return productsList.filter(function (product) {
    return product.category
      .toLowerCase()
      .startsWith(selectedCategory.toLowerCase());
  });
}

// Functie pentru selectarea categoriei in filtre
function selectCategoryFromQueryString(selectedCategory) {
  let categoryInputs = document.querySelectorAll(
    'input[name="category-filter"]'
  );

  for (let i = 0; i < categoryInputs.length; i++) {
    categoryInputs[i].checked = false;

    if (
      selectedCategory !== null &&
      normalizeText(categoryInputs[i].value).startsWith(
        normalizeText(selectedCategory)
      )
    ) {
      categoryInputs[i].checked = true;
    }
  }

  if (selectedCategory === null || selectedCategory.trim() === "") {
    document.getElementById("all-categories").checked = true;
  }
}

// Functie pentru afisarea starii catalogului
function showProductsStatus(message, isError) {
  let status = document.getElementById("products-status");

  status.textContent = message;
  status.className = isError ? "products-status is-error" : "products-status";
}

// Functie pentru incarcarea produselor din API
async function loadProducts() {
  let selectedCategory = getCategoryFromQueryString();
  console.log("Categoria selectată:", selectedCategory);
  showProductsStatus("Se încarcă produsele...", false);

  try {
    let response = await fetch(PRODUCTS_API_URL, {
      method: "GET",
      headers: {
        "X-API-Key": API_KEY
      }
    });

    if (!response.ok) {
      throw new Error("Eroare HTTP: " + response.status);
    }

    let apiProducts = await response.json();
    console.log("Produse primite de la server:", apiProducts);
    let adartaProducts = apiProducts
      .map(normalizeApiProduct)
      .filter(function (product) {
        return product !== null;
      });

    if (adartaProducts.length === 0) {
      throw new Error("Serverul nu a returnat produse Adarta.");
    }

    allProducts = adartaProducts;
    products = filterProductsByCategory(allProducts, selectedCategory);
    selectCategoryFromQueryString(selectedCategory);

    if (selectedCategory !== null && selectedCategory.trim() !== "") {
      showProductsStatus(
        "Produse din categoria " + selectedCategory + ".",
        false
      );
    } else {
      showProductsStatus("Toate produsele disponibile.", false);
    }
  } catch (error) {
    allProducts = localProducts.slice();
    products = filterProductsByCategory(allProducts, selectedCategory);
    selectCategoryFromQueryString(selectedCategory);
    showProductsStatus(
      "Produsele nu pot fi actualizate momentan. Se afișează catalogul disponibil.",
      true
    );
    console.error(error);
  }

  currentPage = 1;
  updateCatalog();
}

// Variabile pentru cos si paginare
let cartCount = 0;
let currentPage = 1;
let productsPerPage = 12;
const productsContainer = document.getElementById("productsContainer");

function getColorValue(colorName) {
  let colors = {
    Alb: "#f8fafc",
    Negru: "#111827",
    Albastru: "#2563eb",
    Verde: "#16a34a",
    Roșu: "#dc2626",
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

// Functie pentru actualizarea cosului
function updateCartCounter() {
  document.getElementById("cart-count").textContent = cartCount;
  document.getElementById("cart-count-sm").textContent = cartCount;
}

// Eveniment buton adauga in cos
function addToCart() {
  let productId = parseInt(this.getAttribute("data-id"));
  cartCount = cartCount + 1;
  updateCartCounter();
  console.log("Produs adaugat in cos, id:", productId);
}

// Functie pentru butoanele de variante
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

// Functie pentru crearea cardului
function createProductCard(product) {
  let card = document.createElement("article");
  card.className = "product-card site-card";
  card.setAttribute("data-id", product.id);

  let productLink = document.createElement("a");
  productLink.className = "product-link";
  productLink.href = "product.html?id=" + product.id;
  productLink.setAttribute("aria-label", product.name);
  let image = document.createElement("img");
  image.className = "product-image product-img";
  image.src = product.image;
  image.alt = product.name;
  productLink.appendChild(image);
  card.appendChild(productLink);

  let title = document.createElement("h3");
  title.className = "product-title";
  title.textContent = product.name;
  card.appendChild(title);

  let price = document.createElement("p");
  price.className = "product-price price";
  price.textContent = product.price + " " + product.currency;
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
  sizeLabel.textContent = "Mărime";
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
  button.addEventListener("click", addToCart);
  card.appendChild(button);
  return card;
}

// Functii pentru filtre
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

// Filtrarea produselor disponibile
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

// Functie pentru numarul de rezultate
function updateResultsCount(shown, total) {
  let result = document.getElementById("results-count");
  if (total === 0) result.textContent = "Afișare 0 din 0 produse";
  else
    result.textContent =
      "Afișare " +
      ((currentPage - 1) * productsPerPage + 1) +
      "-" +
      ((currentPage - 1) * productsPerPage + shown) +
      " din " +
      total +
      " produse";
}

// Functie pentru paginare
function renderPagination(total) {
  let pagination = document.getElementById("pagination");
  pagination.innerHTML = "";
  let totalPages = Math.ceil(total / productsPerPage);
  if (totalPages <= 1) return;
  let previousButton = document.createElement("button");
  previousButton.className = "btn btn-nav";
  previousButton.type = "button";
  previousButton.textContent = "Înapoi";
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
  nextButton.textContent = "Înainte";
  nextButton.disabled = currentPage === totalPages;
  nextButton.addEventListener("click", function () {
    if (currentPage < totalPages) {
      currentPage = currentPage + 1;
      updateCatalog();
    }
  });
  pagination.appendChild(nextButton);
}

// Functie pentru afisarea produselor
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
  if (pageProducts.length === 0) {
    let emptyMessage = document.createElement("p");
    emptyMessage.className = "empty-products-message";
    emptyMessage.textContent =
      "Nu există produse disponibile pentru categoria selectată.";
    productsContainer.appendChild(emptyMessage);
  }
  for (let i = 0; i < pageProducts.length; i++)
    productsContainer.appendChild(createProductCard(pageProducts[i]));
  updateResultsCount(pageProducts.length, list.length);
  renderPagination(list.length);
}

// Evenimente pentru sortare si filtre
const sortSelect = document.getElementById("sortBy");
const applyFiltersButton = document.getElementById("apply-filters");
const allCategoriesCheckbox = document.getElementById("all-categories");
sortSelect.addEventListener("change", function () {
  currentPage = 1;
  updateCatalog();
});
applyFiltersButton.addEventListener("click", function () {
  products = allProducts.slice();
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
const categoryCheckboxes = document.querySelectorAll(
  'input[name="category-filter"]'
);
for (let i = 0; i < categoryCheckboxes.length; i++) {
  categoryCheckboxes[i].addEventListener("change", function () {
    if (this.value !== "Toate" && this.checked)
      allCategoriesCheckbox.checked = false;
  });
}

loadProducts();
