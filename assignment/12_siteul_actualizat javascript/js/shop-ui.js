/* ===== shop-ui.js ===== */
/* Aici leg clasele OOP de paginile site-ului. */
/* Am folosit doar lucruri simple din curs: DOM, evenimente, array, clase și localStorage. */

const CART_STORAGE_KEY = "adartaCart";
const USER_STORAGE_KEY = "adartaUser";
const ORDERS_STORAGE_KEY = "adartaOrders";
const NEWSLETTER_STORAGE_KEY = "adartaNewsletter";
const SEARCH_STORAGE_KEY = "adartaSearch";
const FOOTER_CATEGORY_STORAGE_KEY = "adartaFooterCategory";
const SHIPPING_COST = 19;

function getPageCart() {
  return createCartFromStorage();
}

function getAvailableStock(product, cart) {
  return product.quantity - cart.getItemQty(product.id);
}

function formatPrice(value) {
  return value + " Ron";
}

function getShortProductName(name) {
  if (name.length > 58) {
    return name.substring(0, 58) + "...";
  }

  return name;
}

function getSearchText(value) {
  if (!value) {
    return "";
  }

  return value.toLowerCase().trim();
}

function getProductIdFromPage() {
  let search = window.location.search;

  if (search.indexOf("?") === 0) {
    search = search.substring(1);
  }

  let parts = search.split("&");

  for (let i = 0; i < parts.length; i++) {
    let pair = parts[i].split("=");

    if (pair[0] === "id") {
      return Number(pair[1]);
    }
  }

  let savedId = Number(localStorage.getItem("adartaSelectedProduct"));

  if (savedId > 0) {
    return savedId;
  }

  return 1;
}

function saveSelectedProduct(productId) {
  localStorage.setItem("adartaSelectedProduct", productId);
}

function setupHeaderSearch() {
  let forms = document.querySelectorAll(".header-search");

  for (let i = 0; i < forms.length; i++) {
    forms[i].addEventListener("submit", function (event) {
      event.preventDefault();

      let input = this.querySelector("input");
      let text = "";

      if (input) {
        text = input.value.trim();
      }

      if (text !== "") {
        localStorage.setItem(SEARCH_STORAGE_KEY, text);
      } else {
        localStorage.removeItem(SEARCH_STORAGE_KEY);
      }

      window.location.href = "catalog.html";
    });

    let input = forms[i].querySelector("input");
    let savedSearch = localStorage.getItem(SEARCH_STORAGE_KEY) || "";

    if (input && savedSearch !== "") {
      input.value = savedSearch;
    }
  }
}

function setupFooterLinks() {
  let categoryLinks = document.querySelectorAll("[data-footer-category]");
  let searchLinks = document.querySelectorAll("[data-footer-search]");

  for (let i = 0; i < categoryLinks.length; i++) {
    categoryLinks[i].addEventListener("click", function () {
      localStorage.setItem(FOOTER_CATEGORY_STORAGE_KEY, this.getAttribute("data-footer-category"));
      localStorage.removeItem(SEARCH_STORAGE_KEY);
    });
  }

  for (let i = 0; i < searchLinks.length; i++) {
    searchLinks[i].addEventListener("click", function () {
      localStorage.setItem(SEARCH_STORAGE_KEY, this.getAttribute("data-footer-search"));
      localStorage.removeItem(FOOTER_CATEGORY_STORAGE_KEY);
    });
  }

  let yearSpans = document.querySelectorAll(".js-current-year");
  let year = new Date().getFullYear();

  for (let i = 0; i < yearSpans.length; i++) {
    yearSpans[i].textContent = year;
  }
}

function getProductCategory(name) {
  let lowerName = name.toLowerCase();

  if (lowerName.indexOf("șampon") !== -1 || lowerName.indexOf("spumă") !== -1 || lowerName.indexOf("spălare") !== -1) {
    return "Spălare";
  }

  if (lowerName.indexOf("polish") !== -1 || lowerName.indexOf("protecție") !== -1 || lowerName.indexOf("ceară") !== -1) {
    return "Protecție";
  }

  if (lowerName.indexOf("pensule") !== -1) {
    return "Accesorii";
  }

  return "Curățare";
}

function getSavedUser() {
  let savedUser = null;

  try {
    savedUser = JSON.parse(localStorage.getItem(USER_STORAGE_KEY));
  } catch (error) {
    savedUser = null;
  }

  return savedUser;
}

function showSmallMessage(parent, message, isSuccess) {
  let box = parent.querySelector(".js-message");

  if (!box) {
    box = document.createElement("p");
    box.className = "js-message small-text mt-2 mb-0";
    parent.appendChild(box);
  }

  box.textContent = message;

  if (isSuccess) {
    box.className = "js-message small-text mt-2 mb-0 text-success";
  } else {
    box.className = "js-message small-text mt-2 mb-0 text-danger";
  }
}

function addProductToStoredCart(productId, qty, variantLabel) {
  let product = findShopProductById(productId);

  if (product === null) {
    return false;
  }

  let cart = getPageCart();
  let added = cart.add(product, qty, variantLabel);

  if (added) {
    saveCartToStorage(cart);
    updateCartNumbers();
  }

  return added;
}

function updateHeaderUser() {
  let savedUser = getSavedUser();
  let loginLinks = document.querySelectorAll('a[href="login.html"] span');

  for (let i = 0; i < loginLinks.length; i++) {
    if (savedUser && savedUser.isLoggedIn) {
      loginLinks[i].textContent = savedUser.username;
    } else {
      loginLinks[i].textContent = "Autentificare";
    }
  }
}

function updateCartNumbers() {
  let cart = getPageCart();
  let count = cart.getItemsCount();
  let cartLinks = document.querySelectorAll('a[href="cart.html"]');

  for (let i = 0; i < cartLinks.length; i++) {
    let text = cartLinks[i].querySelector("span");

    if (text && text.textContent.indexOf("Co") !== -1) {
      if (count > 0) {
        text.textContent = "Coș (" + count + ")";
      } else {
        text.textContent = "Coș";
      }
    }
  }
}

function updateOneProductCard(card, product) {
  let cart = getPageCart();
  let availableStock = getAvailableStock(product, cart);
  let stockText = card.querySelector(".oop-stock");
  let categoryText = card.querySelector(".oop-category");

  if (!stockText) {
    stockText = document.createElement("p");
    stockText.className = "site-muted small mb-2 oop-stock";
    let price = card.querySelector(".product-price");

    if (price) {
      price.insertAdjacentElement("afterend", stockText);
    }
  }

  if (!categoryText) {
    categoryText = document.createElement("p");
    categoryText.className = "oop-category product-badge mb-2";
    let title = card.querySelector(".product-title");

    if (title) {
      title.insertAdjacentElement("beforebegin", categoryText);
    }
  }

  categoryText.textContent = getProductCategory(product.name);
  stockText.textContent = "Stoc: " + availableStock + " buc.";

  let button = card.querySelector(".btn");

  if (button) {
    if (availableStock < 1) {
      button.textContent = "Stoc epuizat";
      button.classList.add("is-disabled");
    } else {
      button.textContent = "Adaugă în coș";
      button.classList.remove("is-disabled");
    }
  }
}

function refreshProductCardsStock() {
  let cards = document.querySelectorAll(".product-card");

  for (let i = 0; i < cards.length; i++) {
    let productId = Number(cards[i].getAttribute("data-product-id"));
    let product = findShopProductById(productId);

    if (product !== null) {
      updateOneProductCard(cards[i], product);
    }
  }
}

function decorateProductCards() {
  let cards = document.querySelectorAll(".product-card");

  for (let i = 0; i < cards.length; i++) {
    let card = cards[i];
    let product = shopProducts[i];

    if (!product) {
      continue;
    }

    card.setAttribute("data-product-id", product.id);
    card.setAttribute("data-category", getProductCategory(product.name));
    card.setAttribute("data-brand", "Koch Chemie");
    card.setAttribute("data-price", product.getDefaultVariant().price);
    card.setAttribute("data-name", product.name.toLowerCase());
    card.setAttribute("data-search", product.name.toLowerCase() + " " + getProductCategory(product.name).toLowerCase() + " koch chemie");

    let title = card.querySelector(".product-title");
    let price = card.querySelector(".product-price");

    if (title) {
      title.textContent = getShortProductName(product.name);
    }

    if (price) {
      price.textContent = formatPrice(product.getDefaultVariant().price);
    }

    let productLink = card.querySelector(".product-link");

    if (productLink) {
      productLink.setAttribute("href", "product.html?id=" + product.id);
      productLink.addEventListener("click", function () {
        saveSelectedProduct(product.id);
      });
    }

    let oldButton = card.querySelector(".btn");

    if (oldButton) {
      oldButton.removeAttribute("onclick");
      oldButton.setAttribute("href", "cart.html");

      oldButton.addEventListener("click", function (event) {
        let added = addProductToStoredCart(product.id, 1);

        if (!added) {
          event.preventDefault();
          showSmallMessage(card, "Produsul nu mai este disponibil in stoc.", false);
        }

        refreshProductCardsStock();
      });
    }

    updateOneProductCard(card, product);
  }
}

function setupCatalogTools() {
  let grid = document.querySelector(".products-grid");
  let filterBox = document.querySelector(".filter-box");

  if (!grid || !filterBox) {
    return;
  }

  let resultText = document.querySelector(".results-count");
  let sortSelect = document.getElementById("sortBy");
  let applyButton = document.getElementById("applyAsideFilters");
  let clearButton = document.getElementById("clearAsideFilters");
  let pagination = document.querySelector(".pagination");
  let savedSearch = localStorage.getItem(SEARCH_STORAGE_KEY) || "";
  let savedFooterCategory = localStorage.getItem(FOOTER_CATEGORY_STORAGE_KEY) || "";
  let priceInputs = filterBox.querySelectorAll("[data-price-filter]");
  let brandInputs = filterBox.querySelectorAll("[data-brand-filter]");
  let categoryInputs = filterBox.querySelectorAll("[data-category-filter]");
  let originalCards = [];
  let cards = grid.querySelectorAll(".product-card");
  let currentPage = 1;
  let productsPerPage = 9;

  for (let i = 0; i < cards.length; i++) {
    originalCards.push(cards[i]);
  }

  if (savedFooterCategory !== "") {
    for (let i = 0; i < categoryInputs.length; i++) {
      if (categoryInputs[i].getAttribute("data-category-filter") === "all") {
        categoryInputs[i].checked = false;
      } else if (categoryInputs[i].getAttribute("data-category-filter") === savedFooterCategory) {
        categoryInputs[i].checked = true;
      }
    }

    localStorage.removeItem(FOOTER_CATEGORY_STORAGE_KEY);
  }

  function getCheckedValues(inputs, attributeName) {
    let values = [];

    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].checked) {
        values.push(inputs[i].getAttribute(attributeName));
      }
    }

    return values;
  }

  function hasValue(list, value) {
    for (let i = 0; i < list.length; i++) {
      if (list[i] === value) {
        return true;
      }
    }

    return false;
  }

  function priceIsInFilter(price, filterValue) {
    if (filterValue === "0-50" && price <= 50) {
      return true;
    }

    if (filterValue === "50-150" && price > 50 && price <= 150) {
      return true;
    }

    if (filterValue === "150-plus" && price > 150) {
      return true;
    }

    return false;
  }

  function productMatchesPrice(price, selectedPrices) {
    if (selectedPrices.length === 0) {
      return true;
    }

    for (let i = 0; i < selectedPrices.length; i++) {
      if (priceIsInFilter(price, selectedPrices[i])) {
        return true;
      }
    }

    return false;
  }

  function showCatalogSearchInfo(count) {
    let productsSection = document.querySelector(".products-section");

    if (!productsSection) {
      return;
    }

    let oldBox = document.querySelector(".search-info-box");

    if (oldBox) {
      oldBox.remove();
    }

    if (savedSearch === "") {
      return;
    }

    let box = document.createElement("div");
    box.className = "search-info-box mb-3 d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2";
    box.innerHTML = '<span>Ai căutat: <strong>' + savedSearch + '</strong>. Produse găsite: ' + count + '.</span><button class="btn btn-secondary btn-sm" type="button">Șterge căutarea</button>';

    let button = box.querySelector("button");
    button.addEventListener("click", function () {
      localStorage.removeItem(SEARCH_STORAGE_KEY);
      savedSearch = "";
      currentPage = 1;
      applyCatalogFilters();
    });

    productsSection.insertBefore(box, productsSection.firstChild);
  }

  function sortCards(visibleCards) {
    let sortedCards = [];

    for (let i = 0; i < visibleCards.length; i++) {
      sortedCards.push(visibleCards[i]);
    }

    if (!sortSelect || sortSelect.value === "popular" || sortSelect.value === "new") {
      sortedCards = [];

      for (let i = 0; i < originalCards.length; i++) {
        if (hasValue(visibleCards, originalCards[i])) {
          sortedCards.push(originalCards[i]);
        }
      }
    }

    if (sortSelect && sortSelect.value === "priceLow") {
      sortedCards.sort(function (a, b) {
        return Number(a.getAttribute("data-price")) - Number(b.getAttribute("data-price"));
      });
    }

    if (sortSelect && sortSelect.value === "priceHigh") {
      sortedCards.sort(function (a, b) {
        return Number(b.getAttribute("data-price")) - Number(a.getAttribute("data-price"));
      });
    }

    return sortedCards;
  }

  function renderPagination(totalPages) {
    if (!pagination) {
      return;
    }

    pagination.innerHTML = "";

    if (totalPages <= 1) {
      pagination.style.display = "none";
      return;
    }

    pagination.style.display = "flex";

    let backButton = document.createElement("button");
    backButton.className = "btn btn-nav";
    backButton.type = "button";
    backButton.textContent = "Înapoi";
    backButton.disabled = currentPage === 1;
    backButton.addEventListener("click", function () {
      if (currentPage > 1) {
        currentPage = currentPage - 1;
        applyCatalogFilters();
      }
    });
    pagination.appendChild(backButton);

    for (let i = 1; i <= totalPages; i++) {
      let pageButton = document.createElement("button");
      pageButton.className = "page";
      pageButton.type = "button";
      pageButton.textContent = i;

      if (i === currentPage) {
        pageButton.className = "page is-active";
      }

      pageButton.addEventListener("click", function () {
        currentPage = Number(this.textContent);
        applyCatalogFilters();
      });

      pagination.appendChild(pageButton);
    }

    let nextButton = document.createElement("button");
    nextButton.className = "btn btn-nav";
    nextButton.type = "button";
    nextButton.textContent = "Înainte";
    nextButton.disabled = currentPage === totalPages;
    nextButton.addEventListener("click", function () {
      if (currentPage < totalPages) {
        currentPage = currentPage + 1;
        applyCatalogFilters();
      }
    });
    pagination.appendChild(nextButton);
  }

  function applyCatalogFilters() {
    let selectedPrices = getCheckedValues(priceInputs, "data-price-filter");
    let selectedBrands = getCheckedValues(brandInputs, "data-brand-filter");
    let selectedCategories = getCheckedValues(categoryInputs, "data-category-filter");
    let visibleCards = [];

    if (hasValue(selectedCategories, "all")) {
      selectedCategories = [];
    }

    for (let i = 0; i < originalCards.length; i++) {
      let card = originalCards[i];
      let price = Number(card.getAttribute("data-price"));
      let brand = card.getAttribute("data-brand");
      let category = card.getAttribute("data-category");
      let searchText = card.getAttribute("data-search");
      let isVisible = true;

      if (savedSearch !== "" && searchText.indexOf(getSearchText(savedSearch)) === -1) {
        isVisible = false;
      }

      if (!productMatchesPrice(price, selectedPrices)) {
        isVisible = false;
      }

      if (selectedBrands.length > 0 && !hasValue(selectedBrands, brand)) {
        isVisible = false;
      }

      if (selectedCategories.length > 0 && !hasValue(selectedCategories, category)) {
        isVisible = false;
      }

      if (isVisible) {
        visibleCards.push(card);
      }
    }

    let sortedCards = sortCards(visibleCards);
    let totalPages = Math.ceil(sortedCards.length / productsPerPage);

    if (totalPages < 1) {
      totalPages = 1;
    }

    if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    for (let i = 0; i < originalCards.length; i++) {
      originalCards[i].style.display = "none";
    }

    for (let i = 0; i < sortedCards.length; i++) {
      grid.appendChild(sortedCards[i]);

      if (i >= (currentPage - 1) * productsPerPage && i < currentPage * productsPerPage) {
        sortedCards[i].style.display = "flex";
      } else {
        sortedCards[i].style.display = "none";
      }
    }

    if (resultText) {
      if (sortedCards.length === 0) {
        resultText.textContent = "Nu există produse pentru filtrele selectate.";
      } else {
        let firstShown = (currentPage - 1) * productsPerPage + 1;
        let lastShown = currentPage * productsPerPage;

        if (lastShown > sortedCards.length) {
          lastShown = sortedCards.length;
        }

        if (savedSearch !== "") {
          resultText.textContent = "Căutare: " + savedSearch + " - afișare " + firstShown + "-" + lastShown + " din " + sortedCards.length + " produse";
        } else {
          resultText.textContent = "Afișare " + firstShown + "-" + lastShown + " din " + sortedCards.length + " produse";
        }
      }
    }

    renderPagination(totalPages);
    showCatalogSearchInfo(sortedCards.length);
  }

  function resetPageAndFilter() {
    currentPage = 1;
    applyCatalogFilters();
  }

  for (let i = 0; i < categoryInputs.length; i++) {
    categoryInputs[i].addEventListener("change", function () {
      if (this.getAttribute("data-category-filter") === "all" && this.checked) {
        for (let j = 0; j < categoryInputs.length; j++) {
          if (categoryInputs[j] !== this) {
            categoryInputs[j].checked = false;
          }
        }
      }

      if (this.getAttribute("data-category-filter") !== "all" && this.checked) {
        for (let k = 0; k < categoryInputs.length; k++) {
          if (categoryInputs[k].getAttribute("data-category-filter") === "all") {
            categoryInputs[k].checked = false;
          }
        }
      }

      resetPageAndFilter();
    });
  }

  for (let i = 0; i < priceInputs.length; i++) {
    priceInputs[i].addEventListener("change", resetPageAndFilter);
  }

  for (let i = 0; i < brandInputs.length; i++) {
    brandInputs[i].addEventListener("change", resetPageAndFilter);
  }

  if (sortSelect) {
    sortSelect.addEventListener("change", resetPageAndFilter);
  }

  if (applyButton) {
    applyButton.addEventListener("click", resetPageAndFilter);
  }

  if (clearButton) {
    clearButton.addEventListener("click", function () {
      for (let i = 0; i < priceInputs.length; i++) {
        priceInputs[i].checked = false;
      }

      for (let i = 0; i < brandInputs.length; i++) {
        brandInputs[i].checked = false;
      }

      for (let i = 0; i < categoryInputs.length; i++) {
        if (categoryInputs[i].getAttribute("data-category-filter") === "all") {
          categoryInputs[i].checked = true;
        } else {
          categoryInputs[i].checked = false;
        }
      }

      if (sortSelect) {
        sortSelect.value = "popular";
      }

      localStorage.removeItem(SEARCH_STORAGE_KEY);
      savedSearch = "";
      currentPage = 1;

      applyCatalogFilters();
    });
  }

  applyCatalogFilters();
}


const PRODUCT_DETAILS = [
  {
    id: 1,
    shortName: "Șampon ceramic CES 1L",
    brand: "Koch Chemie",
    rating: "★★★★★",
    reviewCount: 18,
    packageTitle: "Volum ambalaj",
    packageOptions: ["500 ml", "1 L", "5 L"],
    selectedPackage: "1 L",
    lead: "Șampon auto pentru întreținerea mașinilor protejate cu ceară, sealant său tratament ceramic. Curata vopseaua și lasă un efect hidrofob vizibil după clătire.",
    description: [
      "Ceramic Effect Shampoo este potrivit pentru spălarea manuală atunci când vrei curățare și un plus de protecție intr-un singur pas.",
      "Formula ajuta apă să alunece mai ușor de pe suprafață și poate îmbunătăți luciul după uscare. Este recomandat mai ales pentru mașini deja protejate.",
      "Mod de folosire: se diluează in găleată, se spală mașina pe zone și se clătește bine. Nu se lasă produsul să se usuce pe vopsea."
    ],
    specs: [
      ["Volum", "1 L"],
      ["Categorie", "Șampon auto cu efect de protecție"],
      ["Suprafețe", "Vopsea, plastic exterior, sticlă"],
      ["Dozaj orientativ", "Aprox. 50 ml la 10 L apă"],
      ["Potrivit pentru", "Întreținere după ceară, sealant său protecție ceramică"]
    ],
    reviews: [
      ["Andrei P.", "★★★★★", "L-am folosit după aplicărea unei protecții pe mașina și apă se scurge mult mai ușor. Pentru mine este foarte bun la spălarea de întreținere."],
      ["Mihai C.", "★★★★☆", "Curata bine și lasă luciu frumos. Trebuie doar clatit atent ca să nu rămână urme."],
      ["Radu S.", "★★★★★", "Consumul este mic daca il diluezi corect. Mi se pare potrivit pentru cine spală mașina acasa."]
    ]
  },
  {
    id: 2,
    shortName: "Reactivation Shampoo RS 1L",
    brand: "Koch Chemie",
    rating: "★★★★☆",
    reviewCount: 14,
    packageTitle: "Volum ambalaj",
    packageOptions: ["500 ml", "1 L", "5 L"],
    selectedPackage: "1 L",
    lead: "Șampon pentru reactivarea protecțiilor existente. Este util când mașina este deja tratata și vrei să pastrezi efectul de scurgere a apei.",
    description: [
      "Reactivation Shampoo este gandit pentru întreținerea protecțiilor aplicăte anterior pe vopsea.",
      "Produsul ajuta la curățarea murdăriei ușoare și la menținerea efectului hidrofob, fără să fie nevoie de o aplicăre separată de protecție la fiecare spălare.",
      "Se folosește la spălarea manuală, pe mașina răcită și ferită de soare direct. Dupa spălare se clătește cu multă apă."
    ],
    specs: [
      ["Volum", "1 L"],
      ["Categorie", "Șampon de întreținere"],
      ["Utilizare", "Spălare manuală"],
      ["Recomandat pentru", "Masini cu protecție existenta"],
      ["Efect", "Ajuta la reactivarea protecției și la luciu"]
    ],
    reviews: [
      ["Cristian M.", "★★★★★", "Dupa cateva spalări mașina inca respinge apă bine. Este ușor de folosit."],
      ["Alex V.", "★★★★☆", "Mi-a plăcut pentru întreținere, dar pentru murdărie mare folosesc și o prespălare."],
      ["Stefan L.", "★★★★☆", "Bun pentru mașina protejata. Nu face minuni pe vopsea neprotejata, dar pentru întreținere este ok."]
    ]
  },
  {
    id: 3,
    shortName: "One Cut and Finish P6.02",
    brand: "Koch Chemie",
    rating: "★★★★★",
    reviewCount: 11,
    packageTitle: "Ambalaj disponibil",
    packageOptions: ["250 ml", "1 L"],
    selectedPackage: "1 L",
    lead: "Polish 3 in 1 pentru corectie ușoară, luciu și protecție intr-o singura etapă. Este util pentru împrospătarea rapidă a vopselei.",
    description: [
      "One Cut and Finish P6.02 este potrivit când vrei să imbunatatesti aspectul vopselei fără un proces complicat in mai multe etape.",
      "Produsul poate reduce urmele fine de spălare și poate lasă un strat de protecție cu ceară Carnauba.",
      "Se aplică de obicei cu mașina de polish său manual, pe suprafață curată și uscată. Se șterge reziduul cu lavetă din microfibră."
    ],
    specs: [
      ["Tip produs", "Polish 3 in 1"],
      ["Efect", "Corectie ușoară, luciu, protecție"],
      ["Protecție", "Ceară Carnauba"],
      ["Utilizare", "Vopsea auto curată și uscată"],
      ["Nivel recomandat", "Incepator atent / utilizator mediu"]
    ],
    reviews: [
      ["Florin T.", "★★★★★", "Pentru zgarieturi fine și luciu rapid a fost foarte bun. Nu am avut nevoie de mai multe produse."],
      ["Paul N.", "★★★★☆", "Se lucreaza ușor, dar trebuie pregatita bine suprafață inainte."],
      ["Sorin A.", "★★★★★", "Mi-a plăcut rezultatul pe o mașina inchisă la culoare. Luciul s-a vazut imediat."]
    ]
  },
  {
    id: 4,
    shortName: "Spray Sealant S0.02 500ml",
    brand: "Koch Chemie",
    rating: "★★★★★",
    reviewCount: 21,
    packageTitle: "Volum ambalaj",
    packageOptions: ["500 ml"],
    selectedPackage: "500 ml",
    lead: "Protecție rapidă pentru vopsea, ușor de aplicăt după spălare. Ajuta la luciu și la respingerea apei.",
    description: [
      "Spray Sealant este potrivit pentru utilizatorii care vor o protecție rapidă fără proceduri complicate.",
      "Se pulverizeaza pe suprafață curată și se intinde cu lavetă din microfibră. Poate fi folosit după spălare pentru a împrospăta protecția mașinii.",
      "Este o alegere buna pentru întreținere regulata, mai ales când vrei efect vizibil intr-un timp scurt."
    ],
    specs: [
      ["Volum", "500 ml"],
      ["Categorie", "Protecție vopsea"],
      ["Aplicare", "Pulverizare și ștergere cu microfibră"],
      ["Suprafețe", "Vopsea, elemente exterioare lucioase"],
      ["Efect", "Luciu și hidrofobie"]
    ],
    reviews: [
      ["Ionut B.", "★★★★★", "Foarte simplu de aplicăt. Dupa uscare mașina arată mai lucioasă."],
      ["Vlad D.", "★★★★★", "Imi place ca nu pierd mult timp. Il folosesc după spălare."],
      ["Daniel R.", "★★★★☆", "Efect bun, dar trebuie intins uniform ca să nu rămână pete."]
    ]
  },
  {
    id: 5,
    shortName: "Interior Brush Set 3 buc",
    brand: "Koch Chemie",
    rating: "★★★★☆",
    reviewCount: 9,
    packageTitle: "Set",
    packageOptions: ["3 buc"],
    selectedPackage: "3 buc",
    lead: "Set de pensule pentru curățarea zonelor greu accesibile din interior și exterior. Bun pentru grile, butoane, embleme și spații mici.",
    description: [
      "Setul de pensule ajuta la curățarea detaliilor unde lavetă nu ajunge ușor.",
      "Este util pentru interior, bord, gurile de ventilație, cusături, embleme și zone din jurul butoanelor.",
      "Pentru rezultate mai bune, pensulele se pot folosi impreuna cu o soluție de curățare potrivită pentru suprafață respectiva."
    ],
    specs: [
      ["Continut", "3 pensule"],
      ["Utilizare", "Interior și exterior"],
      ["Zone recomandate", "Bord, grile, embleme, spații inguste"],
      ["Nivel", "Potrivit pentru începători"],
      ["Întreținere", "Clătire după folosire și uscare"]
    ],
    reviews: [
      ["Matei G.", "★★★★☆", "Sunt utile la interior, mai ales la gurile de ventilație."],
      ["Bogdan F.", "★★★★★", "Le folosesc și la embleme. Curata bine fără să fortez."],
      ["Claudiu H.", "★★★★☆", "Un set simplu, dar foarte practic pentru detailing acasa."]
    ]
  },
  {
    id: 6,
    shortName: "VorreinigerB VB 1L",
    brand: "Koch Chemie",
    rating: "★★★★☆",
    reviewCount: 16,
    packageTitle: "Volum ambalaj",
    packageOptions: ["1 L", "5 L"],
    selectedPackage: "1 L",
    lead: "Soluție alcalină pentru prespălare și murdărie dificilă. Este potrivită pentru exterior, praguri și zone cu depuneri mai puternice.",
    description: [
      "VorreinigerB este folosita pentru prespălare, inainte de spălarea de contact, când mașina are noroi, insecte său trafic film.",
      "Fiind o soluție alcalină, trebuie folosita cu atenție și diluată in funcție de murdărie și de suprafață.",
      "Se aplică uniform, se lasă puțin să acționeze și se clătește bine. Nu se lasă să se usuce pe suprafață."
    ],
    specs: [
      ["Volum", "1 L"],
      ["Tip produs", "Prespălare alcalină"],
      ["Utilizare", "Exterior auto"],
      ["Recomandare", "Test pe zonă mică daca suprafață este sensibila"],
      ["Efect", "Îndepărtează murdărie dificilă"]
    ],
    reviews: [
      ["Adrian K.", "★★★★★", "Scoate bine murdăria de pe praguri și partea joasă a mașinii."],
      ["Lucian P.", "★★★★☆", "Foarte eficient, dar trebuie respectata dilutia."],
      ["Robert I.", "★★★★☆", "Bun la prespălare, mai ales iarna când mașina este foarte murdara."]
    ]
  },
  {
    id: 7,
    shortName: "Mehrzweckreiniger MZR 1L",
    brand: "Koch Chemie",
    rating: "★★★★☆",
    reviewCount: 13,
    packageTitle: "Volum ambalaj",
    packageOptions: ["1 L", "10 L"],
    selectedPackage: "1 L",
    lead: "Soluție de curățare generală pentru interior și zone textile. Este utila pentru plastic, tapiterie și murdărie obișnuită.",
    description: [
      "Mehrzweckreiniger este un produs practic pentru curățare generală in interiorul mașinii.",
      "Poate fi folosit pe plastic, textile și alte zone rezistente la curățare umedă, in funcție de diluție.",
      "Se aplică pe lavetă său pe suprafață, se curată ușor și apoi se șterg reziduurile. La textile este bine să nu se ude excesiv materialul."
    ],
    specs: [
      ["Volum", "1 L"],
      ["Categorie", "Curățare generală"],
      ["Suprafețe", "Plastic, textile, zone interioare"],
      ["Aplicare", "Pulverizare / lavetă / perie"],
      ["Atenție", "Se recomanda test pe o zonă ascunsă"]
    ],
    reviews: [
      ["Marian E.", "★★★★☆", "Am curatăt plasticele din interior și a mers bine."],
      ["George U.", "★★★★★", "Foarte util pentru interior. Nu trebuie folosit in exces."],
      ["Alin O.", "★★★★☆", "Bun pentru mizerie normala, mai ales cu o pensula moale."]
    ]
  },
  {
    id: 8,
    shortName: "Magic Wheel Cleaner MWC 500ml",
    brand: "Koch Chemie",
    rating: "★★★★★",
    reviewCount: 24,
    packageTitle: "Volum ambalaj",
    packageOptions: ["500 ml", "1 L"],
    selectedPackage: "500 ml",
    lead: "Soluție pentru curățarea jantelor, potrivită pentru praf de frână și depuneri metalice. Reacția vizuală ajuta să vezi unde acționează produsul.",
    description: [
      "Magic Wheel Cleaner este un produs dedicat jantelor și murdăriei dificile produse de frane.",
      "Formula ajuta la desprinderea particulelor de fier și a murdăriei lipite pe janta. In timpul acțiunii poate apărea o schimbare de culoare caracteristică.",
      "Se aplică pe janta rece, se lasă să acționeze conform instrucțiunilor și se clătește foarte bine. Pentru murdărie veche se poate folosi și o perie potrivită."
    ],
    specs: [
      ["Volum", "500 ml"],
      ["Categorie", "Curățare jante"],
      ["Tip murdărie", "Praf de frână, particule metalice, depuneri"],
      ["Aplicare", "Pulverizare pe janta rece"],
      ["Observatie", "Se clătește bine după folosire"]
    ],
    reviews: [
      ["Catalin V.", "★★★★★", "Pe jantele mele a scos multă murdărie fără să frec prea mult."],
      ["Dorin N.", "★★★★★", "Reacția de culoare te ajuta să vezi unde lucreaza produsul."],
      ["Emanuel C.", "★★★★☆", "Foarte bun, dar are miros puternic ca majoritatea produselor pentru jante."]
    ]
  },
  {
    id: 9,
    shortName: "Green Star GS 1L",
    brand: "Koch Chemie",
    rating: "★★★★★",
    reviewCount: 27,
    packageTitle: "Volum ambalaj",
    packageOptions: ["1 L", "5 L", "11 kg"],
    selectedPackage: "1 L",
    lead: "Curățitor universal concentrat, folosit pentru interior, exterior și zone cu murdărie grasă. Dilutia se alege in funcție de suprafață.",
    description: [
      "Green Star este unul dintre cele mai versatile produse din catalog. Poate fi folosit pentru mai multe zone ale mașinii, daca este diluat corect.",
      "Este potrivit pentru murdărie grasă, plastice, compartiment motor și alte zone rezistente. Pentru suprafețe sensibile se începe cu o diluție mai slabă.",
      "Produsul se aplică uniform, se lasă puțin să acționeze și se șterge său se clătește in funcție de zona curățată."
    ],
    specs: [
      ["Volum", "1 L"],
      ["Tip produs", "Curățitor universal concentrat"],
      ["Caracter", "Alcalin"],
      ["Utilizare", "Interior, exterior, motor, zone tehnice"],
      ["Diluție orientativa", "In funcție de murdărie și suprafață"]
    ],
    reviews: [
      ["Marius D.", "★★★★★", "Il folosesc diluat pentru multe zone. Este foarte economic."],
      ["Tudor A.", "★★★★★", "Bun la plastice și la zone foarte murdare, dar trebuie diluat corect."],
      ["Sebastian R.", "★★★★☆", "Produs puternic. Pentru interior il folosesc mai diluat și merge bine."]
    ]
  },
  {
    id: 10,
    shortName: "Wash and Finish WF 1L",
    brand: "Koch Chemie",
    rating: "★★★★☆",
    reviewCount: 10,
    packageTitle: "Volum ambalaj",
    packageOptions: ["1 L"],
    selectedPackage: "1 L",
    lead: "Soluție pentru spălare fără apă, utila pentru praf și murdărie ușoară. Curata și lasă un finisaj plăcut când mașina nu este foarte murdara.",
    description: [
      "Wash and Finish este potrivit pentru întreținere rapidă intre spalări, mai ales când mașina are praf său urme ușoare.",
      "Nu este recomandat pentru noroi său murdărie grea, pentru ca atunci este mai șigur să faci prespălare și clătire.",
      "Se pulverizeaza pe zonă mică și se șterge cu lavete curate din microfibră, folosind mișcări ușoare."
    ],
    specs: [
      ["Volum", "1 L"],
      ["Categorie", "Spălare fără apă"],
      ["Utilizare", "Praf și murdărie ușoară"],
      ["Necesita", "Lavete curate din microfibră"],
      ["Nu este recomandat pentru", "Noroi său murdărie grea"]
    ],
    reviews: [
      ["Raul M.", "★★★★☆", "Bun pentru întreținere rapidă, când mașina nu este foarte murdara."],
      ["Dan B.", "★★★★★", "Il tin in garaj pentru praf și urme ușoare. Se șterge ușor."],
      ["Ovidiu S.", "★★★★☆", "Merge bine, dar trebuie folosite lavete curate ca să nu zgarii vopseaua."]
    ]
  },
  {
    id: 11,
    shortName: "Rapid Rinseless Wash RRW 1L",
    brand: "Koch Chemie",
    rating: "★★★★☆",
    reviewCount: 12,
    packageTitle: "Volum ambalaj",
    packageOptions: ["1 L"],
    selectedPackage: "1 L",
    lead: "Șampon fără clătire pentru spalări rapide cu consum redus de apă. Este util pentru garaj său pentru șituatii in care nu ai acces ușor la furtun.",
    description: [
      "Rapid Rinseless Wash permite spălarea mașinii fără clătire clasică, folosind solutia diluată și lavete său manuși potrivite.",
      "Este recomandat pentru murdărie ușoară său medie. Daca mașina este foarte murdara, este mai bine să fie clatita inainte.",
      "Se lucreaza pe zone mici și se usucă imediat cu lavetă curată. Astfel reduci riscul de urme."
    ],
    specs: [
      ["Volum", "1 L"],
      ["Categorie", "Spălare fără clătire"],
      ["Utilizare", "Murdarie ușoară / medie"],
      ["Necesita", "Galeata, lavete, manusă de spălare"],
      ["Avantaj", "Consum redus de apă"]
    ],
    reviews: [
      ["Silviu F.", "★★★★★", "Foarte practic in garaj. Nu mai am nevoie de furtun pentru fiecare spălare."],
      ["Razvan T.", "★★★★☆", "Bun daca mașina nu este foarte murdara. Se lucreaza ușor pe panouri."],
      ["Nicu P.", "★★★★☆", "Pentru iarna și spalări rapide mi se pare util."]
    ]
  },
  {
    id: 12,
    shortName: "Gentle Snow Foam GSF 1L",
    brand: "Koch Chemie",
    rating: "★★★★★",
    reviewCount: 19,
    packageTitle: "Volum ambalaj",
    packageOptions: ["1 L", "5 L"],
    selectedPackage: "1 L",
    lead: "Spumă de prespălare cu pH neutru, potrivită pentru mașini ceruite său protejate. Produce o spumă densă și ajuta la inmuierea murdăriei.",
    description: [
      "Gentle Snow Foam este potrivită pentru prespălare cu lance de spumă său pulverizator de spumă.",
      "Formula cu pH neutru este mai blanda cu protecțiile existente, cum ar fi ceară său sealantul.",
      "Se aplică pe mașina rece, se lasă să acționeze și se clătește bine. La murdărie mai grea se poate continua cu spălare manuală."
    ],
    specs: [
      ["Volum", "1 L"],
      ["Tip produs", "Spumă prespălare / șampon"],
      ["pH", "Neutru"],
      ["Utilizare", "Lance de spumă, pompa de spumă, spălare manuală"],
      ["Potrivit pentru", "Masini cu ceară, sealant său protecție"]
    ],
    reviews: [
      ["Victor E.", "★★★★★", "Face spumă multă și sta bine pe mașina. Imi place pentru prespălare."],
      ["Alexandru J.", "★★★★★", "Buna pentru mașina ceruita. Nu pare agresiva cu protecția."],
      ["Ciprian L.", "★★★★☆", "Miros plăcut și spumă buna. Pentru murdărie grea folosesc și Green Star."]
    ]
  }
];

function getProductDetails(productId) {
  for (let i = 0; i < PRODUCT_DETAILS.length; i++) {
    if (PRODUCT_DETAILS[i].id === productId) {
      return PRODUCT_DETAILS[i];
    }
  }

  return PRODUCT_DETAILS[0];
}

function renderPackageOptions(product, selectedPackage) {
  let html = "";

  for (let i = 0; i < product.variants.length; i++) {
    let option = product.variants[i];
    let className = "volume-option";

    if (option.label === selectedPackage) {
      className = "volume-option is-selected";
    }

    html = html + '<button class="' + className + '" data-package="' + option.label + '" type="button">' + option.label + '</button>';
  }

  return html;
}

function renderDescription(details) {
  let html = '<h2 class="h4 mb-3">Descriere detaliată</h2>';

  for (let i = 0; i < details.description.length; i++) {
    let className = "";

    if (i === details.description.length - 1) {
      className = ' class="mb-0"';
    }

    html = html + '<p' + className + '>' + details.description[i] + '</p>';
  }

  return html;
}

function renderSpecs(details, product, selectedPackage) {
  let selectedVariant = product.getVariant(selectedPackage);
  let html = '<h2 class="h4 mb-3">Specificații</h2><div class="table-responsive"><table class="table align-middle mb-0"><tbody>';

  html = html + '<tr><th scope="row">Brand</th><td>' + details.brand + '</td></tr>';
  html = html + '<tr><th scope="row">Ambalaj selectat</th><td>' + selectedVariant.label + '</td></tr>';
  html = html + '<tr><th scope="row">Preț</th><td>' + formatPrice(selectedVariant.price) + '</td></tr>';

  for (let i = 0; i < details.specs.length; i++) {
    if (details.specs[i][0] !== "Volum") {
      html = html + '<tr><th scope="row">' + details.specs[i][0] + '</th><td>' + details.specs[i][1] + '</td></tr>';
    }
  }

  html = html + '</tbody></table></div>';
  return html;
}

function renderReviews(details) {
  let html = '<h2 class="h4 mb-3">Recenzii utilizatori</h2>';

  for (let i = 0; i < details.reviews.length; i++) {
    let review = details.reviews[i];
    let className = "review-box";

    if (i < details.reviews.length - 1) {
      className = "review-box mb-3";
    }

    html = html + '<article class="' + className + '">' +
      '<h3 class="visually-hidden">Recenzie ' + review[0] + '</h3>' +
      '<p class="mb-1"><strong>' + review[0] + '</strong> <span class="product-stars">' + review[1] + '</span></p>' +
      '<p class="mb-0 site-muted">"' + review[2] + '"</p>' +
      '</article>';
  }

  return html;
}


function renderSimilarProducts(currentProduct) {
  let similarTitle = document.getElementById("similar-title");

  if (!similarTitle || !similarTitle.parentElement) {
    return;
  }

  let row = similarTitle.parentElement.querySelector(".row");

  if (!row) {
    return;
  }

  let currentCategory = getProductCategory(currentProduct.name);
  let similarProducts = [];

  for (let i = 0; i < shopProducts.length; i++) {
    if (shopProducts[i].id !== currentProduct.id && getProductCategory(shopProducts[i].name) === currentCategory) {
      similarProducts.push(shopProducts[i]);
    }
  }

  if (similarProducts.length < 4) {
    for (let i = 0; i < shopProducts.length; i++) {
      if (shopProducts[i].id !== currentProduct.id && !hasSimilarProduct(similarProducts, shopProducts[i].id)) {
        similarProducts.push(shopProducts[i]);
      }

      if (similarProducts.length === 4) {
        break;
      }
    }
  }

  row.innerHTML = "";

  for (let i = 0; i < similarProducts.length && i < 4; i++) {
    let product = similarProducts[i];
    let article = document.createElement("article");
    article.className = "col-12 col-sm-6 col-lg-3";
    article.innerHTML =
      '<div class="site-card h-100 p-3 similar-product-card">' +
      '<a class="similar-product-link d-block text-decoration-none" href="product.html?id=' + product.id + '" data-similar-id="' + product.id + '">' +
      '<img alt="' + product.name + '" class="similar-product-img mb-3" src="' + product.image + '" />' +
      '<h3 class="h6 text-center">' + getShortProductName(product.name) + '</h3>' +
      '<p class="fw-bold mb-2 text-center">' + formatPrice(product.getDefaultVariant().price) + '</p>' +
      '</a>' +
      '<button class="btn btn-outline w-100 similar-add-btn" data-similar-cart-id="' + product.id + '" type="button">Adaugă în coș</button>' +
      '</div>';

    row.appendChild(article);
  }

  let links = row.querySelectorAll("[data-similar-id]");

  for (let i = 0; i < links.length; i++) {
    links[i].addEventListener("click", function () {
      saveSelectedProduct(Number(this.getAttribute("data-similar-id")));
    });
  }

  let buttons = row.querySelectorAll("[data-similar-cart-id]");

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
      let productId = Number(this.getAttribute("data-similar-cart-id"));
      let added = addProductToStoredCart(productId, 1);

      if (added) {
        this.textContent = "Adăugat în coș";
      } else {
        this.textContent = "Stoc epuizat";
      }
    });
  }
}

function hasSimilarProduct(list, productId) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].id === productId) {
      return true;
    }
  }

  return false;
}

function setupProductDetailPage() {
  let productPage = document.querySelector(".product-info-card");

  if (!productPage) {
    return;
  }

  let productId = getProductIdFromPage();
  let product = findShopProductById(productId);

  if (product === null) {
    product = findShopProductById(1);
  }

  if (product === null) {
    return;
  }

  let details = getProductDetails(product.id);
  let selectedPackage = product.getDefaultVariant().label;
  saveSelectedProduct(product.id);

  let cart = getPageCart();
  let availableStock = getAvailableStock(product, cart);
  let addButton = productPage.querySelector(".btn");
  let qtySpan = productPage.querySelector(".quantity-box span");
  let qtyButtons = productPage.querySelectorAll(".quantity-box button");
  let stockLabel = productPage.querySelector(".text-success, .text-danger");
  let title = productPage.querySelector("h1");
  let productPrice = productPage.querySelector(".product-detail-price");
  let mainImage = document.querySelector(".product-main-img");
  let productImageBox = null;
  let galleryImages = [];

  if (mainImage) {
    productImageBox = mainImage.parentElement;
    galleryImages = productImageBox.querySelectorAll(".product-gallery-img");
  }
  let breadcrumbCurrent = document.querySelector(".breadcrumb li[aria-current='page']");
  let description = productPage.querySelector(".lead");
  let brandText = productPage.querySelector(".text-uppercase.site-muted");
  let ratingStars = productPage.querySelector(".product-stars");
  let ratingCount = productPage.querySelector(".product-stars + .site-muted");
  let packageTitle = productPage.querySelector(".volume-options");
  let packageTitleText = null;
  let descTab = document.getElementById("desc");
  let specTab = document.getElementById("spec");
  let reviewsTab = document.getElementById("reviews");
  let qty = 1;

  if (packageTitle) {
    packageTitleText = packageTitle.parentElement.querySelector(".fw-bold");
  }

  if (availableStock < 1) {
    qty = 0;
  }

  if (brandText) {
    brandText.textContent = details.brand;
  }

  if (title) {
    title.textContent = product.name;
  }

  if (!productPrice) {
    let priceElements = productPage.querySelectorAll("p");

    for (let i = 0; i < priceElements.length; i++) {
      if (priceElements[i].textContent.indexOf("Ron") !== -1) {
        productPrice = priceElements[i];
        productPrice.classList.add("product-detail-price");
        break;
      }
    }
  }

  if (productPrice) {
    productPrice.textContent = formatPrice(product.getVariantPrice(selectedPackage));
  }

  if (mainImage) {
    mainImage.src = product.image;
    mainImage.alt = product.name;
  }

  for (let i = 0; i < galleryImages.length; i++) {
    galleryImages[i].src = product.image;
    galleryImages[i].alt = product.name + " - imagine produs " + (i + 1);
    galleryImages[i].style.cursor = "pointer";

    galleryImages[i].addEventListener("click", function () {
      if (mainImage) {
        mainImage.src = this.src;
        mainImage.alt = this.alt;
      }

      for (let j = 0; j < galleryImages.length; j++) {
        galleryImages[j].classList.remove("is-selected");
      }

      this.classList.add("is-selected");
    });
  }

  if (galleryImages.length > 0) {
    galleryImages[0].classList.add("is-selected");
  }

  if (breadcrumbCurrent) {
    breadcrumbCurrent.textContent = details.shortName;
  }

  if (description) {
    description.textContent = details.lead;
  }

  if (ratingStars) {
    ratingStars.textContent = details.rating;
  }

  if (ratingCount) {
    ratingCount.textContent = "(" + details.reviewCount + " recenzii)";
  }

  if (packageTitleText) {
    packageTitleText.textContent = details.packageTitle;
  }

  if (packageTitle) {
    packageTitle.innerHTML = renderPackageOptions(product, selectedPackage);
  }

  if (descTab) {
    descTab.innerHTML = renderDescription(details);
  }

  if (specTab) {
    specTab.innerHTML = renderSpecs(details, product, selectedPackage);
  }

  if (reviewsTab) {
    reviewsTab.innerHTML = renderReviews(details);
  }

  function updateSelectedPackage(newPackage) {
    selectedPackage = newPackage;

    if (productPrice) {
      productPrice.textContent = formatPrice(product.getVariantPrice(selectedPackage));
    }

    if (specTab) {
      specTab.innerHTML = renderSpecs(details, product, selectedPackage);
    }

    let packageButtons = productPage.querySelectorAll(".volume-option");

    for (let i = 0; i < packageButtons.length; i++) {
      if (packageButtons[i].getAttribute("data-package") === selectedPackage) {
        packageButtons[i].className = "volume-option is-selected";
      } else {
        packageButtons[i].className = "volume-option";
      }
    }
  }

  let packageButtons = productPage.querySelectorAll(".volume-option");

  for (let i = 0; i < packageButtons.length; i++) {
    packageButtons[i].addEventListener("click", function () {
      updateSelectedPackage(this.getAttribute("data-package"));
    });
  }

  renderSimilarProducts(product);

  document.title = "Produs - " + details.shortName;

  if (qtySpan) {
    qtySpan.textContent = qty;
  }

  if (stockLabel) {
    if (availableStock < 1) {
      stockLabel.textContent = "Stoc epuizat";
      stockLabel.className = "text-danger fw-bold mb-3";
    } else {
      stockLabel.textContent = "În stoc: " + availableStock + " buc.";
      stockLabel.className = "text-success fw-bold mb-3";
    }
  }

  if (qtyButtons.length === 2) {
    qtyButtons[0].addEventListener("click", function () {
      if (qty > 1) {
        qty = qty - 1;
        qtySpan.textContent = qty;
      }
    });

    qtyButtons[1].addEventListener("click", function () {
      if (qty < availableStock) {
        qty = qty + 1;
        qtySpan.textContent = qty;
      }
    });
  }

  if (addButton) {
    addButton.setAttribute("href", "cart.html");

    if (availableStock < 1) {
      addButton.textContent = "Stoc epuizat";
      addButton.classList.add("is-disabled");
    } else {
      addButton.textContent = "Adaugă în coș";
      addButton.classList.remove("is-disabled");
    }

    addButton.addEventListener("click", function (event) {
      if (qty < 1) {
        event.preventDefault();
        showSmallMessage(productPage, "Produsul nu mai este disponibil in stoc.", false);
        return;
      }

      let added = addProductToStoredCart(product.id, qty, selectedPackage);

      if (!added) {
        event.preventDefault();
        showSmallMessage(productPage, "Cantitatea aleasă este mai mare decat stocul disponibil.", false);
        return;
      }

      updateCartNumbers();
    });
  }
}
function setupUserForms() {
  let loginForm = document.getElementById("login-form");

  if (loginForm) {
    let savedUser = getSavedUser();
    let messageBox = document.getElementById("login-message");

    if (savedUser && messageBox) {
      messageBox.textContent = "Ești autentificat ca " + savedUser.username + ".";
      messageBox.className = "small-text mt-3 mb-0 text-center text-success";
    }
  }

  let registerForm = document.querySelector(".register-card form");

  if (registerForm) {
    let message = document.createElement("p");
    message.className = "small-text mt-3 mb-0 text-center";
    registerForm.appendChild(message);

    registerForm.addEventListener("submit", function (event) {
      event.preventDefault();

      let firstName = document.getElementById("firstName").value.trim();
      let lastName = document.getElementById("lastName").value.trim();
      let email = document.getElementById("registerEmail").value.trim();
      let password = document.getElementById("registerPassword").value.trim();
      let confirmPassword = document.getElementById("confirmPassword").value.trim();

      if (firstName === "" || lastName === "" || email === "" || password === "") {
        message.textContent = "Completează toate câmpurile obligatorii.";
        message.className = "small-text mt-3 mb-0 text-center text-danger";
        return;
      }

      if (password !== confirmPassword) {
        message.textContent = "Parolele nu sunt la fel.";
        message.className = "small-text mt-3 mb-0 text-center text-danger";
        return;
      }

      let user = new User(firstName + " " + lastName, email);
      user.login();
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify({ username: user.username, email: user.email, isLoggedIn: user.isLoggedIn, discount: user.getDiscount() }));
      message.textContent = "Contul a fost creat și utilizatorul a fost sălvat local.";
      message.className = "small-text mt-3 mb-0 text-center text-success";
      updateHeaderUser();
    });
  }
}

function getCartSummary(cart) {
  let subtotal = cart.getTotal();
  let shipping = SHIPPING_COST;

  if (subtotal === 0) {
    shipping = 0;
  }

  let discount = 0;
  let promo = localStorage.getItem("adartaPromo") || "";

  if (promo === "SAVE10") {
    discount = Math.round(subtotal * 10 / 100);
  } else if (promo === "SAVE15") {
    discount = Math.round(subtotal * 15 / 100);
  } else if (promo === "FREESHIP") {
    shipping = 0;
  }

  return { subtotal: subtotal, shipping: shipping, discount: discount, total: subtotal + shipping - discount, promo: promo };
}

function setupPromoForm() {
  let promoForm = document.querySelector(".promo-form");

  if (!promoForm) {
    return;
  }

  promoForm.addEventListener("submit", function (event) {
    event.preventDefault();

    let input = document.getElementById("promo-input");
    let code = normalizeCoupon(input.value);

    if (isValidCoupon(code)) {
      localStorage.setItem("adartaPromo", code);
      showSmallMessage(promoForm, "Cupon aplicăt: " + code, true);
    } else {
      localStorage.removeItem("adartaPromo");
      showSmallMessage(promoForm, "Codul introdus nu este valid.", false);
    }

    if (typeof refreshCartPage === "function") {
      refreshCartPage();
    }

    renderCheckoutSummary();
  });
}

function renderCheckoutSummary() {
  let checkoutList = document.querySelector(".checkout-page .cart-items");
  let checkoutTotal = document.querySelector(".checkout-page .total-price");

  if (!checkoutList || !checkoutTotal) {
    return;
  }

  let cart = getPageCart();
  checkoutList.innerHTML = "";

  if (cart.items.length === 0) {
    checkoutList.innerHTML = '<li class="list-group-item px-0 py-3">Coșul este gol. Alege produse din catalog.</li>';
    checkoutTotal.textContent = "0 Ron";
    return;
  }

  for (let i = 0; i < cart.items.length; i++) {
    let item = cart.items[i];
    let li = document.createElement("li");
    li.className = "cart-item list-group-item px-0 py-3";

    li.innerHTML =
      '<div class="cart-item-thumb">' +
      '<img alt="' + item.name + '" class="img-fluid rounded-3" src="' + item.image + '" />' +
      '</div>' +
      '<div class="cart-item-info d-flex flex-column justify-content-start gap-2">' +
      '<div class="d-flex justify-content-between align-items-center gap-3 mb-1">' +
      '<p class="cart-item-title mb-0 fw-semibold">' + item.name + '</p>' +
      '<p class="cart-item-price mb-0 fw-bold text-start">' + formatPrice(item.price * item.qty) + '</p>' +
      '</div>' +
      '<p class="cart-item-meta">Ambalaj: ' + item.package + ' - Cantitate: ' + item.qty + '</p>' +
      '</div>';

    checkoutList.appendChild(li);
  }

  let summary = getCartSummary(cart);
  checkoutTotal.textContent = formatPrice(summary.total);

  let totalParent = checkoutTotal.parentElement;

  if (totalParent && !totalParent.querySelector(".checkout-extra")) {
    let extra = document.createElement("div");
    extra.className = "checkout-extra small-text mt-2";
    totalParent.appendChild(extra);
  }

  let extraBox = totalParent.querySelector(".checkout-extra");

  if (extraBox) {
    extraBox.innerHTML = "Subtotal: " + formatPrice(summary.subtotal) + "<br>Livrare: " + formatPrice(summary.shipping) + "<br>Reducere: " + formatPrice(summary.discount);
  }
}

function setupCheckoutForm() {
  let form = document.querySelector(".checkout-form");

  if (!form) {
    return;
  }

  let savedUser = getSavedUser();
  let emailInput = document.getElementById("email");
  let prenumeInput = document.getElementById("prenume");

  if (savedUser && emailInput) {
    emailInput.value = savedUser.email;
  }

  if (savedUser && prenumeInput) {
    prenumeInput.value = savedUser.username;
  }

  let message = document.createElement("p");
  message.className = "small-text mt-3 mb-0 text-center";
  form.appendChild(message);

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    let cart = getPageCart();

    if (cart.items.length === 0) {
      message.textContent = "Coșul este gol. Nu se poate trimite comanda.";
      message.className = "small-text mt-3 mb-0 text-center text-danger";
      return;
    }

    let requiredFields = form.querySelectorAll("[required]");
    let isValid = true;

    for (let i = 0; i < requiredFields.length; i++) {
      if (requiredFields[i].value.trim() === "") {
        isValid = false;
      }
    }

    if (!isValid) {
      message.textContent = "Completează câmpurile obligatorii.";
      message.className = "small-text mt-3 mb-0 text-center text-danger";
      return;
    }

    let orders = [];

    try {
      orders = JSON.parse(localStorage.getItem(ORDERS_STORAGE_KEY)) || [];
    } catch (error) {
      orders = [];
    }

    let summary = getCartSummary(cart);
    orders.push({ id: orders.length + 1, total: summary.total, items: cart.items, date: new Date().toLocaleDateString("ro-RO") });
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    localStorage.removeItem(CART_STORAGE_KEY);
    localStorage.removeItem("adartaPromo");
    updateCartNumbers();
    renderCheckoutSummary();

    message.textContent = "Comanda a fost sălvată local. O poti vedea in pagina Comenzi.";
    message.className = "small-text mt-3 mb-0 text-center text-success";
  });
}

function setupNewsletterForms() {
  let forms = document.querySelectorAll(".newsletter-form");

  for (let i = 0; i < forms.length; i++) {
    forms[i].addEventListener("submit", function (event) {
      event.preventDefault();
      let input = this.querySelector("input");

      if (input && input.value.trim() !== "") {
        localStorage.setItem(NEWSLETTER_STORAGE_KEY, input.value.trim());
        showSmallMessage(this, "Email sălvat pentru newsletter.", true);
      } else {
        showSmallMessage(this, "Introdu o adresă de email.", false);
      }
    });
  }
}

function renderOrdersPage() {
  let ordersBox = document.querySelector(".orders-box");

  if (!ordersBox) {
    return;
  }

  let orders = [];

  try {
    orders = JSON.parse(localStorage.getItem(ORDERS_STORAGE_KEY)) || [];
  } catch (error) {
    orders = [];
  }

  ordersBox.innerHTML = '<h2 class="cart-title mb-3 fw-bold">Comenzile mele</h2>';

  if (orders.length === 0) {
    ordersBox.innerHTML += '<p class="site-muted mb-0">Nu există comenzi sălvate momentan.</p>';
    return;
  }

  for (let i = 0; i < orders.length; i++) {
    let order = orders[i];
    let itemCount = 0;

    for (let j = 0; j < order.items.length; j++) {
      itemCount = itemCount + order.items[j].qty;
    }

    let div = document.createElement("div");
    div.className = "order-row";
    div.innerHTML = '<strong>Comanda #' + order.id + '</strong><br><span>' + order.date + ' - ' + itemCount + ' produse - ' + formatPrice(order.total) + '</span>';
    ordersBox.appendChild(div);
  }
}

setupHeaderSearch();
setupFooterLinks();
updateCartNumbers();
updateHeaderUser();
decorateProductCards();
setupCatalogTools();
setupProductDetailPage();
setupUserForms();
setupPromoForm();
renderCheckoutSummary();
setupCheckoutForm();
setupNewsletterForms();
renderOrdersPage();
