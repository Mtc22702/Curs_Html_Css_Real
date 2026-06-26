// PAGINA SHOP - Assignment 04

// Lista produse
let products = [
  {
    id: 1,
    name: "Sampon auto cu efect ceramic Koch Chemie Ceramic Effect Shampoo, Ces",
    price: 145,
    brand: "Koch Chemie",
    category: "Exterior",
    image:
      "images/1-sampon-auto-cu-efect-ceramic-koch-chemie-ceramic-effect-shampoo-ces-1l-438344-768.jpg",
    colors: ["Alb", "Negru"],
    sizes: ["1 L", "5 L"],
    priceBySize: { "1 L": 145, "5 L": 549 }
  },
  {
    id: 2,
    name: "Sampon auto reactivare ceramica Koch Chemie Reactivation Shampoo, Rs",
    price: 92,
    brand: "Koch Chemie",
    category: "Exterior",
    image:
      "images/2-sampon-auto-reactivare-ceramica-koch-chemie-reactivation-shampoo-1l-767567-768.jpg",
    colors: ["Albastru", "Verde"],
    sizes: ["1 L", "5 L"],
    priceBySize: { "1 L": 92, "5 L": 329 }
  },
  {
    id: 3,
    name: "Polish 3 in 1 cu ceara Carnauba Koch Chemie One Cut and Finish, P6.02",
    price: 103,
    brand: "Koch Chemie",
    category: "Exterior",
    image:
      "images/3-Pasta-Polish-3-in-1-Koch-Chemie-One-Cut-Finish-P6.02-250ml-1000x1000-768.jpg",
    colors: ["Rosu", "Negru"],
    sizes: ["250 ml", "1 L"],
    priceBySize: { "250 ml": 103, "1 L": 332 }
  },
  {
    id: 4,
    name: "Spray protectie vopsea Koch Chemie Spray Sealant, S0.02",
    price: 135,
    brand: "Koch Chemie",
    category: "Exterior",
    image:
      "images/4-spray-protectie-vopsea-koch-chemie-spray-sealant-s0-02-500ml-673060-768.jpg",
    colors: ["Gri", "Alb"],
    sizes: ["500 ml", "5 L"],
    priceBySize: { "500 ml": 135, "5 L": 549 }
  },
  {
    id: 5,
    name: "Solutie curatare auto alcalina Koch Chemie VorreinigerB, Vb",
    price: 59,
    brand: "Koch Chemie",
    category: "Exterior",
    image:
      "images/6-solutie-curatare-auto-alcalina-koch-chemie-vorreinigerb-vb-1l-505138-768.webp",
    colors: ["Galben", "Negru"],
    sizes: ["1 L", "11 kg"],
    priceBySize: { "1 L": 59, "11 kg": 393 }
  },
  {
    id: 6,
    name: "Solutie curatare generala Koch Chemie Mehrzweckreiniger, Mzr",
    price: 64,
    brand: "Koch Chemie",
    category: "Exterior",
    image:
      "images/7-Solutie-Curatare-Generala-Koch-Chemie-MZR-Mehrzweckreiniger-1L-1000x1000h-768.jpg",
    colors: ["Verde", "Alb"],
    sizes: ["1 L", "5 kg"],
    priceBySize: { "1 L": 64, "5 kg": 194 }
  },
  {
    id: 7,
    name: "Solutie curatare jante reactiva Koch Chemie Magic Wheel Cleaner, Mwc",
    price: 97,
    brand: "Koch Chemie",
    category: "Exterior",
    image:
      "images/8-solutie-curatare-jante-reactiva-koch-chemie-magic-wheel-cleaner-mwc-500ml-573022-768.jpg",
    colors: ["Mov", "Negru"],
    sizes: ["500 ml", "10 L"],
    priceBySize: { "500 ml": 97, "10 L": 879 }
  },
  {
    id: 8,
    name: "Solutie spalare fara apa Koch Chemie Wash and Finish, Wf",
    price: 79,
    brand: "Koch Chemie",
    category: "Exterior",
    image:
      "images/10-solutie-spalare-fara-apa-koch-chemie-wash-and-finish-wf-1l-977478-768.jpg",
    colors: ["Albastru", "Gri"],
    sizes: ["1 L", "10 L"],
    priceBySize: { "1 L": 79, "10 L": 602 }
  },
  {
    id: 9,
    name: "Set pensule interior Koch Chemie Interior Brush Set",
    price: 70,
    brand: "Koch Chemie",
    category: "Accesorii",
    image:
      "images/5-Set-Pensule-Detailing-Interior-Koch-Chemie-3-buc-1000x1000-768.jpg",
    colors: ["Maro", "Negru"],
    sizes: ["3 buc"],
    priceBySize: { "3 buc": 70 }
  },
  {
    id: 10,
    name: "Solutie curatare universala Koch Chemie Green Star, Gs",
    price: 42,
    brand: "Koch Chemie",
    category: "Exterior",
    image:
      "images/9-solutie-curatare-universala-koch-chemie-green-star-gs-1l-3229062912-768.jpg",
    colors: ["Verde", "Galben"],
    sizes: ["1 L", "11 kg"],
    priceBySize: { "1 L": 42, "11 kg": 239 }
  },
  {
    id: 11,
    name: "Solutie spalare fara clatire Koch Chemie Rapid Rinseless Wash, Rrw",
    price: 62,
    brand: "Koch Chemie",
    category: "Exterior",
    image:
      "images/11-solutie-spalare-fara-clatire-koch-chemie-rapid-rinseless-wash-rrw-1l-685449-768.jpg",
    colors: ["Alb", "Albastru"],
    sizes: ["1 L", "5 L"],
    priceBySize: { "1 L": 62, "5 L": 259 }
  },
  {
    id: 12,
    name: "Spuma spalare cu pH neutru Koch Chemie Gentle Snow Foam, Gsf",
    price: 81,
    brand: "Koch Chemie",
    category: "Exterior",
    image:
      "images/12-spuma-spalare-cu-ph-neutru-koch-chemie-gentle-snow-foam-gsf-1l-592375-768.jpg",
    colors: ["Roz", "Alb"],
    sizes: ["1 L", "5 L"],
    priceBySize: { "1 L": 81, "5 L": 299 }
  },
  {
    id: 13,
    name: "Sampon auto cu ceara Sonax Xtreme Wash & Wax",
    price: 45,
    brand: "Sonax",
    category: "Exterior",
    image: "images/13-sonax-wash-wax.webp",
    colors: ["Portocaliu", "Negru"],
    sizes: ["500 ml", "1 L"],
    priceBySize: { "500 ml": 28, "1 L": 45 }
  },
  {
    id: 14,
    name: "Solutie curatare jante Sonax Wheel Cleaner Full Effect",
    price: 38,
    brand: "Sonax",
    category: "Exterior",
    image: "images/14-sonax-curatare-jante.webp",
    colors: ["Rosu", "Alb"],
    sizes: ["500 ml"],
    priceBySize: { "500 ml": 38 }
  },
  {
    id: 15,
    name: "Spray ceara lichida Sonax Xtreme Protect+Shine Spray&Seal",
    price: 65,
    brand: "Sonax",
    category: "Exterior",
    image: "images/15-sonax-ceramic-spray.webp",
    colors: ["Argintiu", "Negru"],
    sizes: ["750 ml"],
    priceBySize: { "750 ml": 65 }
  },
  {
    id: 16,
    name: "Solutie curatare interior Sonax Interior Cleaner",
    price: 32,
    brand: "Sonax",
    category: "Interior",
    image: "images/16-sonax-curatare-interior.webp",
    colors: ["Bleu", "Gri"],
    sizes: ["500 ml"],
    priceBySize: { "500 ml": 32 }
  },
  {
    id: 17,
    name: "Sampon auto Meguiar's Gold Class Car Wash Shampoo & Conditioner",
    price: 75,
    brand: "Meguiar's",
    category: "Exterior",
    image: "images/17-meguiars-gold-class.webp",
    colors: ["Auriu", "Negru"],
    sizes: ["473 ml", "1.4 L"],
    priceBySize: { "473 ml": 35, "1.4 L": 75 }
  },
  {
    id: 18,
    name: "Ceara lichida Meguiar's Ultimate Liquid Wax",
    price: 95,
    brand: "Meguiar's",
    category: "Exterior",
    image: "images/18-meguiars-liquid-wax.webp",
    colors: ["Negru", "Gri"],
    sizes: ["473 ml"],
    priceBySize: { "473 ml": 95 }
  },
  {
    id: 19,
    name: "Solutie curatare jante Meguiar's Hot Rims Wheel & Tire Cleaner",
    price: 48,
    brand: "Meguiar's",
    category: "Exterior",
    image: "images/19-meguiars-hot-rims.webp",
    colors: ["Rosu", "Gri"],
    sizes: ["710 ml"],
    priceBySize: { "710 ml": 48 }
  },
  {
    id: 20,
    name: "Sampon auto cu ceara Turtle Wax Ice Car Wash",
    price: 40,
    brand: "Turtle Wax",
    category: "Exterior",
    image: "images/20-turtlewax-ice-carwash.jpg",
    colors: ["Albastru", "Alb"],
    sizes: ["500 ml", "1.4 L"],
    priceBySize: { "500 ml": 22, "1.4 L": 40 }
  },
  {
    id: 21,
    name: "Ceara spray Turtle Wax Ice Spray Wax",
    price: 35,
    brand: "Turtle Wax",
    category: "Exterior",
    image: "images/21-turtlewax-spray-wax.webp",
    colors: ["Verde", "Negru"],
    sizes: ["500 ml"],
    priceBySize: { "500 ml": 35 }
  },
  {
    id: 22,
    name: "Set lavete microfibra Turtle Wax Premium Microfiber Cloths",
    price: 45,
    brand: "Turtle Wax",
    category: "Accesorii",
    image: "images/22-turtlewax-laveta-microfibra.webp",
    colors: ["Alb", "Gri"],
    sizes: ["3 buc"],
    priceBySize: { "3 buc": 45 }
  }
];

// Variabile pentru cos si paginare
let cartCount = 0;
let currentPage = 1;
let productsPerPage = 12;

function getColorValue(colorName) {
  if (colorName === "Alb") {
    return "#f8fafc";
  } else if (colorName === "Negru") {
    return "#111827";
  } else if (colorName === "Albastru") {
    return "#2563eb";
  } else if (colorName === "Verde") {
    return "#16a34a";
  } else if (colorName === "Rosu") {
    return "#dc2626";
  } else if (colorName === "Gri") {
    return "#94a3b8";
  } else if (colorName === "Galben") {
    return "#facc15";
  } else if (colorName === "Mov") {
    return "#7c3aed";
  } else if (colorName === "Maro") {
    return "#92400e";
  } else if (colorName === "Roz") {
    return "#ec4899";
  } else if (colorName === "Portocaliu") {
    return "#f97316";
  } else if (colorName === "Argintiu") {
    return "#cbd5e1";
  } else if (colorName === "Bleu") {
    return "#38bdf8";
  } else if (colorName === "Auriu") {
    return "#d97706";
  } else {
    return "#e5e7eb";
  }
}

function createProductCard(product) {
  let card = document.createElement("article");
  card.className = "product-card";

  let imageLink = document.createElement("a");
  imageLink.className = "product-link";
  imageLink.href = "product.html?id=" + product.id;
  imageLink.setAttribute("aria-label", product.name);

  let img = document.createElement("img");
  img.src = product.image;
  img.alt = product.name;

  imageLink.appendChild(img);
  card.appendChild(imageLink);

  let title = document.createElement("h3");
  title.className = "product-title";
  title.textContent = product.name;
  card.appendChild(title);

  let priceEl = document.createElement("p");
  priceEl.className = "product-price";
  priceEl.textContent = product.priceBySize[product.sizes[0]] + " RON";
  card.appendChild(priceEl);

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

  for (let t = 0; t < product.colors.length; t++) {
    let colorBtn = document.createElement("button");
    colorBtn.type = "button";
    colorBtn.className = "color-option";
    colorBtn.title = product.colors[t];

    let colorDot = document.createElement("span");
    colorDot.className = "color-dot";
    colorDot.style.backgroundColor = getColorValue(product.colors[t]);
    colorBtn.appendChild(colorDot);
    colorBtn.appendChild(document.createTextNode(product.colors[t]));

    if (t === 0) {
      colorBtn.classList.add("is-selected");
    }
    colorBtn.addEventListener("click", function () {
      let allColorBtns = this.parentNode.querySelectorAll(".color-option");
      for (let j = 0; j < allColorBtns.length; j++) {
        allColorBtns[j].classList.remove("is-selected");
      }
      this.classList.add("is-selected");
    });
    colorContainer.appendChild(colorBtn);
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

  for (let v = 0; v < product.sizes.length; v++) {
    let sizeBtn = document.createElement("button");
    sizeBtn.type = "button";
    sizeBtn.className = "size-option";
    sizeBtn.textContent = product.sizes[v];
    sizeBtn.title = product.sizes[v];
    if (v === 0) {
      sizeBtn.classList.add("is-selected");
    }
    sizeBtn.addEventListener("click", function () {
      let allSizeBtns = this.parentNode.querySelectorAll(".size-option");
      for (let l = 0; l < allSizeBtns.length; l++) {
        allSizeBtns[l].classList.remove("is-selected");
      }
      this.classList.add("is-selected");
      priceEl.textContent = product.priceBySize[this.textContent] + " RON";
    });
    sizeContainer.appendChild(sizeBtn);
  }
  sizeRow.appendChild(sizeContainer);
  variantsWrapper.appendChild(sizeRow);

  card.appendChild(variantsWrapper);

  let addToCartBtn = document.createElement("button");
  addToCartBtn.type = "button";
  addToCartBtn.className = "btn btn-outline";
  addToCartBtn.textContent = "Adauga in cos";

  addToCartBtn.addEventListener("click", function () {
    updateCartCounter();
  });

  card.appendChild(addToCartBtn);

  return card;
}

// Functie pentru actualizarea cosului
function updateCartCounter() {
  cartCount = cartCount + 1;

  let cartCounterEl = document.getElementById("cart-count");
  if (cartCounterEl !== null) {
    cartCounterEl.textContent = cartCount;
  }

  let cartCountSm = document.getElementById("cart-count-sm");
  if (cartCountSm !== null) {
    cartCountSm.textContent = cartCount;
  }
}

// Functie pentru afisarea produselor
function renderProducts(productsToRender, totalVisibleProducts) {
  let grid = document.getElementById("products-grid");

  if (grid === null) {
    return;
  }

  let visibleProducts = productsToRender || products;
  grid.innerHTML = "";

  if (visibleProducts.length === 0) {
    let emptyMessage = document.createElement("p");
    emptyMessage.className = "empty-products-message";
    emptyMessage.textContent = "Nu am gasit produse pentru filtrele selectate.";
    grid.appendChild(emptyMessage);
  }

  for (let i = 0; i < visibleProducts.length; i++) {
    let card = createProductCard(visibleProducts[i]);
    grid.appendChild(card);
  }

  updateResultsCount(visibleProducts.length, totalVisibleProducts);
}

function updateResultsCount(visibleCount, totalVisibleProducts) {
  let resultsCountEl = document.getElementById("results-count");

  if (resultsCountEl !== null) {
    if (totalVisibleProducts === 0) {
      resultsCountEl.textContent =
        "Afișare 0 din " + products.length + " produse";
      return;
    }

    let firstShown = (currentPage - 1) * productsPerPage + 1;
    let lastShown = firstShown + visibleCount - 1;

    resultsCountEl.textContent =
      "Afișare " +
      firstShown +
      "-" +
      lastShown +
      " din " +
      totalVisibleProducts +
      " produse";
  }
}

function sortProducts(productsToSort, sortType) {
  let sortedProducts = productsToSort.slice();

  if (sortType === "new") {
    sortedProducts.sort(function (a, b) {
      return b.id - a.id;
    });
  }

  if (sortType === "priceLow") {
    sortedProducts.sort(function (a, b) {
      return a.price - b.price;
    });
  }

  if (sortType === "priceHigh") {
    sortedProducts.sort(function (a, b) {
      return b.price - a.price;
    });
  }

  return sortedProducts;
}

function getCheckedValues(inputName) {
  let checkedValues = [];
  let inputs = document.querySelectorAll('input[name="' + inputName + '"]');

  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].checked) {
      checkedValues.push(inputs[i].value);
    }
  }

  return checkedValues;
}

function priceMatches(product, selectedPrices) {
  if (selectedPrices.length === 0) {
    return true;
  }

  for (let i = 0; i < selectedPrices.length; i++) {
    if (selectedPrices[i] === "0-50" && product.price <= 50) {
      return true;
    }

    if (
      selectedPrices[i] === "50-150" &&
      product.price > 50 &&
      product.price <= 150
    ) {
      return true;
    }

    if (selectedPrices[i] === "150+" && product.price > 150) {
      return true;
    }
  }

  return false;
}

function textMatches(productValue, selectedValues) {
  if (selectedValues.length === 0) {
    return true;
  }

  for (let i = 0; i < selectedValues.length; i++) {
    if (selectedValues[i] === productValue || selectedValues[i] === "Toate") {
      return true;
    }
  }

  return false;
}

function getFilteredProducts() {
  let selectedPrices = getCheckedValues("price-filter");
  let selectedBrands = getCheckedValues("brand-filter");
  let selectedCategories = getCheckedValues("category-filter");
  let filteredProducts = [];

  for (let i = 0; i < products.length; i++) {
    let product = products[i];
    let isPriceOk = priceMatches(product, selectedPrices);
    let isBrandOk = textMatches(product.brand, selectedBrands);
    let isCategoryOk = textMatches(product.category, selectedCategories);

    if (isPriceOk && isBrandOk && isCategoryOk) {
      filteredProducts.push(product);
    }
  }

  return filteredProducts;
}

function getProductsForCurrentPage(productsList) {
  let startIndex = (currentPage - 1) * productsPerPage;
  let endIndex = startIndex + productsPerPage;
  return productsList.slice(startIndex, endIndex);
}

function createPaginationButton(text, pageNumber, isActive) {
  let button = document.createElement("button");
  button.type = "button";
  button.className = "page";
  button.textContent = text;

  if (isActive) {
    button.classList.add("is-active");
    button.setAttribute("aria-current", "page");
  }

  button.addEventListener("click", function () {
    currentPage = pageNumber;
    updateCatalog();
  });

  return button;
}

function renderPagination(totalProducts) {
  let pagination = document.getElementById("pagination");

  if (pagination === null) {
    return;
  }

  pagination.innerHTML = "";

  let totalPages = Math.ceil(totalProducts / productsPerPage);

  if (totalPages <= 1) {
    pagination.style.display = "none";
    return;
  }

  pagination.style.display = "";

  let prevButton = document.createElement("button");
  prevButton.type = "button";
  prevButton.className = "btn btn-nav";
  prevButton.textContent = "Înapoi";
  prevButton.disabled = currentPage === 1;
  prevButton.addEventListener("click", function () {
    if (currentPage > 1) {
      currentPage = currentPage - 1;
      updateCatalog();
    }
  });
  pagination.appendChild(prevButton);

  for (let page = 1; page <= totalPages; page++) {
    let pageButton = createPaginationButton(
      String(page),
      page,
      page === currentPage
    );
    pagination.appendChild(pageButton);
  }

  let nextButton = document.createElement("button");
  nextButton.type = "button";
  nextButton.className = "btn btn-nav";
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

function updateCatalog() {
  let sortType = "popular";

  if (sortSelect !== null) {
    sortType = sortSelect.value;
  }

  let filteredProducts = getFilteredProducts();
  let sortedProducts = sortProducts(filteredProducts, sortType);
  let totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  if (totalPages < 1) {
    totalPages = 1;
  }

  if (currentPage > totalPages) {
    currentPage = totalPages;
  }

  let pageProducts = getProductsForCurrentPage(sortedProducts);

  renderProducts(pageProducts, sortedProducts.length);
  renderPagination(sortedProducts.length);
}

let sortSelect = document.getElementById("sortBy");
let applyFiltersBtn = document.getElementById("apply-filters");
let allCategoriesCheckbox = document.getElementById("all-categories");
let categoryCheckboxes = document.querySelectorAll(
  'input[name="category-filter"]'
);

if (sortSelect !== null) {
  sortSelect.addEventListener("change", function () {
    currentPage = 1;
    updateCatalog();
  });
}

if (applyFiltersBtn !== null) {
  applyFiltersBtn.addEventListener("click", function () {
    currentPage = 1;
    updateCatalog();
  });
}

if (allCategoriesCheckbox !== null) {
  allCategoriesCheckbox.addEventListener("change", function () {
    if (this.checked) {
      let categoryInputs = document.querySelectorAll(
        'input[name="category-filter"]'
      );

      for (let i = 0; i < categoryInputs.length; i++) {
        if (categoryInputs[i].value !== "Toate") {
          categoryInputs[i].checked = false;
        }
      }
    }
  });
}

for (let i = 0; i < categoryCheckboxes.length; i++) {
  categoryCheckboxes[i].addEventListener("change", function () {
    if (
      this.value !== "Toate" &&
      this.checked &&
      allCategoriesCheckbox !== null
    ) {
      allCategoriesCheckbox.checked = false;
    }
  });
}

updateCatalog();
