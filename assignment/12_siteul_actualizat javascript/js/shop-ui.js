/* ===== shop-ui.js ===== */
/* Conecteaza clasele din shop-oop.js cu elementele din pagina. */
/* Foloseste doar instrumente simple, predate la curs: getElementById, addEventListener
   si proprietati de baza (value, innerText, style, checked, disabled, href, src),
   plus alert, localStorage si JSON. Elementele care se repeta pe pagina (carduri de
   produs, recenzii, sloturi de cos etc.) sunt deja create static in HTML, cu id-uri
   fixe, iar aici sunt doar completate cu date, prin index. */

const CART_STORAGE_KEY = "adartaCart";
const USER_STORAGE_KEY = "adartaUser";
const ORDERS_STORAGE_KEY = "adartaOrders";
const NEWSLETTER_STORAGE_KEY = "adartaNewsletter";
const SEARCH_STORAGE_KEY = "adartaSearch";
const FOOTER_CATEGORY_STORAGE_KEY = "adartaFooterCategory";
const SHIPPING_COST = 19;

const GREEN_MAIN = "#15803d";
const GREEN_RING = "0 0 0 3px rgba(34, 197, 94, 0.18)";
const TEXT_SUCCESS = "#15803d";
const TEXT_DANGER = "#dc2626";

function getPageCart() {
  return createCartFromStorage();
}

function getAvailableStock(product, cart) {
  return product.quantity - cart.getItemQty(product.id);
}

function formatPrice(value) {
  return value + " Ron";
}

function countFullStars(starsText) {
  let count = 0;

  for (let i = 0; i < starsText.length; i++) {
    if (starsText[i] === "★") {
      count = count + 1;
    }
  }

  return count;
}

function getStarsRatingLabel(starsText) {
  return countFullStars(starsText) + " din 5 stele";
}

function fillPriceWithDiscount(priceNowEl, priceOldEl, priceBadgeEl, product, basePrice) {
  let finalPrice = product.getDiscountedPrice(basePrice);

  if (priceNowEl) {
    priceNowEl.innerText = formatPrice(finalPrice);
  }

  if (product.discountPercent > 0) {
    if (priceOldEl) {
      priceOldEl.innerText = formatPrice(basePrice);
      priceOldEl.style.display = "";
    }

    if (priceBadgeEl) {
      priceBadgeEl.innerText = "-" + product.discountPercent + "%";
      priceBadgeEl.style.display = "";
    }
  } else {
    if (priceOldEl) {
      priceOldEl.style.display = "none";
    }

    if (priceBadgeEl) {
      priceBadgeEl.style.display = "none";
    }
  }

  return finalPrice;
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

function showMessage(elementId, message, isSuccess) {
  let box = document.getElementById(elementId);

  if (!box) {
    return;
  }

  box.innerText = message;
  box.style.color = isSuccess ? TEXT_SUCCESS : TEXT_DANGER;
}

/* ===== Header / Footer (comune pe toate paginile) ===== */

function setupHeaderSearch() {
  let form = document.getElementById("header-search-form");
  let input = document.getElementById("header-search-input");

  if (!form || !input) {
    return;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    let text = input.value.trim();

    if (text !== "") {
      localStorage.setItem(SEARCH_STORAGE_KEY, text);
    } else {
      localStorage.removeItem(SEARCH_STORAGE_KEY);
    }

    window.location.href = "catalog.html";
  });

  let savedSearch = localStorage.getItem(SEARCH_STORAGE_KEY) || "";

  if (savedSearch !== "") {
    input.value = savedSearch;
  }
}

function setupFooterLinks() {
  let footerSearchLinks = [{ id: "footer-link-sampoane", search: "șampon" }];
  let footerCategoryLinks = [
    { id: "footer-link-protectie", category: "Protecție" },
    { id: "footer-link-curatare", category: "Curățare" },
    { id: "footer-link-accesorii", category: "Accesorii" },
    { id: "footer-link-spalare", category: "Spălare" }
  ];

  for (let i = 0; i < footerSearchLinks.length; i++) {
    let link = document.getElementById(footerSearchLinks[i].id);
    let searchValue = footerSearchLinks[i].search;

    if (link) {
      link.addEventListener("click", function () {
        localStorage.setItem(SEARCH_STORAGE_KEY, searchValue);
        localStorage.removeItem(FOOTER_CATEGORY_STORAGE_KEY);
      });
    }
  }

  for (let i = 0; i < footerCategoryLinks.length; i++) {
    let link = document.getElementById(footerCategoryLinks[i].id);
    let categoryValue = footerCategoryLinks[i].category;

    if (link) {
      link.addEventListener("click", function () {
        localStorage.setItem(FOOTER_CATEGORY_STORAGE_KEY, categoryValue);
        localStorage.removeItem(SEARCH_STORAGE_KEY);
      });
    }
  }

  let yearSpan = document.getElementById("footer-year");

  if (yearSpan) {
    yearSpan.innerText = new Date().getFullYear();
  }
}

function getProductCategory(name) {
  let lowerName = name.toLowerCase();

  if (
    lowerName.indexOf("șampon") !== -1 ||
    lowerName.indexOf("spumă") !== -1 ||
    lowerName.indexOf("spălare") !== -1
  ) {
    return "Spălare";
  }

  if (
    lowerName.indexOf("polish") !== -1 ||
    lowerName.indexOf("protecție") !== -1 ||
    lowerName.indexOf("ceară") !== -1
  ) {
    return "Protecție";
  }

  if (lowerName.indexOf("pensule") !== -1 || lowerName.indexOf("lavete") !== -1) {
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
  let loginText = document.getElementById("header-login-text");

  if (!loginText) {
    return;
  }

  if (savedUser && savedUser.isLoggedIn) {
    loginText.innerText = savedUser.username;
  } else {
    loginText.innerText = "Autentificare";
  }
}

function updateCartNumbers() {
  let cart = getPageCart();
  let count = cart.getItemsCount();
  let cartCount = document.getElementById("header-cart-count");

  if (!cartCount) {
    return;
  }

  if (count > 0) {
    cartCount.innerText = "Coș (" + count + ")";
  } else {
    cartCount.innerText = "Coș";
  }
}

/* ===== Carduri de produs (acasa, catalog, reduceri) ===== */

function updateOneProductCard(n, product) {
  let cart = getPageCart();
  let availableStock = getAvailableStock(product, cart);
  let stockText = document.getElementById("product-" + n + "-stock");
  let categoryText = document.getElementById("product-" + n + "-category");
  let button = document.getElementById("product-" + n + "-btn");

  if (categoryText) {
    categoryText.innerText = getProductCategory(product.name);
  }

  if (stockText) {
    stockText.innerText = "Stoc: " + availableStock + " buc.";
  }

  if (button) {
    if (availableStock < 1) {
      button.innerText = "Stoc epuizat";
      button.style.opacity = "0.65";
      button.style.cursor = "not-allowed";
      button.style.pointerEvents = "none";
    } else {
      button.innerText = "Adaugă în coș";
      button.style.opacity = "";
      button.style.cursor = "";
      button.style.pointerEvents = "";
    }
  }
}

function decorateProductCards() {
  for (let i = 1; i <= shopProducts.length; i++) {
    let card = document.getElementById("product-card-" + i);
    let product = shopProducts[i - 1];

    if (!card || !product) {
      continue;
    }

    let title = document.getElementById("product-" + i + "-title");
    let priceNow = document.getElementById("product-" + i + "-price-now");
    let priceOld = document.getElementById("product-" + i + "-price-old");
    let priceBadge = document.getElementById("product-" + i + "-price-badge");
    let link = document.getElementById("product-" + i + "-link");
    let button = document.getElementById("product-" + i + "-btn");

    if (title) {
      title.innerText = getShortProductName(product.name);
    }

    fillPriceWithDiscount(priceNow, priceOld, priceBadge, product, product.getDefaultVariant().price);

    if (link) {
      link.href = "product.html?id=" + product.id;
      link.addEventListener("click", function () {
        saveSelectedProduct(product.id);
      });
    }

    if (button) {
      button.href = "cart.html";
      button.addEventListener("click", function (event) {
        let added = addProductToStoredCart(product.id, 1);

        if (!added) {
          event.preventDefault();
          alert("Produsul nu mai este disponibil in stoc.");
        }

        refreshProductCardsStock();
      });
    }

    updateOneProductCard(i, product);
  }
}

function refreshProductCardsStock() {
  for (let i = 1; i <= shopProducts.length; i++) {
    let card = document.getElementById("product-card-" + i);
    let product = shopProducts[i - 1];

    if (card && product) {
      updateOneProductCard(i, product);
    }
  }
}

/* ===== Filtre: acordeon deschide/inchide o sectiune ===== */

const FILTER_ACCORDION_KEYS = ["prices", "brand", "categories"];

function setupFilterAccordion() {
  for (let i = 0; i < FILTER_ACCORDION_KEYS.length; i++) {
    let key = FILTER_ACCORDION_KEYS[i];
    let toggle = document.getElementById("filter-toggle-" + key);
    let list = document.getElementById("filter-list-" + key);
    let arrow = document.getElementById("filter-arrow-" + key);

    if (!toggle || !list) {
      continue;
    }

    toggle.addEventListener("click", function () {
      let isClosed = list.style.display === "none";

      if (isClosed) {
        list.style.display = "";

        if (arrow) {
          arrow.style.transform = "";
        }
      } else {
        list.style.display = "none";

        if (arrow) {
          arrow.style.transform = "rotate(-90deg)";
        }
      }
    });
  }
}

/* ===== Reduceri: paginarea apare doar daca este nevoie ===== */

const SALE_PAGE_SIZE = 12;

function setupSalePagination() {
  let pagination = document.getElementById("sale-pagination");

  if (!pagination) {
    return;
  }

  let visibleCount = 0;

  for (let i = 1; i <= 12; i++) {
    let card = document.getElementById("product-card-" + i);

    if (card && card.style.display !== "none") {
      visibleCount = visibleCount + 1;
    }
  }

  if (visibleCount > SALE_PAGE_SIZE) {
    pagination.style.display = "";
  } else {
    pagination.style.display = "none";
  }
}

/* ===== Catalog: filtre, sortare, paginare, cautare ===== */

function setupCatalogTools() {
  let sortSelect = document.getElementById("sortBy");

  if (!sortSelect) {
    return;
  }

  let resultText = document.getElementById("results-count");
  let applyButton = document.getElementById("applyAsideFilters");
  let clearButton = document.getElementById("clearAsideFilters");
  let pagination = document.getElementById("pagination");
  let pagePrevBtn = document.getElementById("page-prev-btn");
  let page1Btn = document.getElementById("page-1-btn");
  let page2Btn = document.getElementById("page-2-btn");
  let pageNextBtn = document.getElementById("page-next-btn");
  let searchInfoBox = document.getElementById("search-info-box");
  let searchInfoText = document.getElementById("search-info-text");
  let searchInfoClearBtn = document.getElementById("search-info-clear-btn");

  let priceCheckboxIds = [
    "filter-price-0-50",
    "filter-price-50-150",
    "filter-price-150-plus"
  ];
  let priceFilterValues = ["0-50", "50-150", "150-plus"];
  let brandCheckboxIds = [
    "filter-brand-koch",
    "filter-brand-sonax",
    "filter-brand-meguiars",
    "filter-brand-turtlewax"
  ];
  let brandFilterValues = ["Koch Chemie", "Sonax", "Meguiars", "Turtle Wax"];
  let categoryCheckboxIds = [
    "filter-category-spalare",
    "filter-category-curatare",
    "filter-category-accesorii",
    "filter-category-protectie"
  ];
  let categoryFilterValues = ["Spălare", "Curățare", "Accesorii", "Protecție"];
  let categoryAllId = "filter-category-all";

  let savedSearch = localStorage.getItem(SEARCH_STORAGE_KEY) || "";
  let savedFooterCategory =
    localStorage.getItem(FOOTER_CATEGORY_STORAGE_KEY) || "";
  let currentPage = 1;
  let productsPerPage = 12;

  if (savedFooterCategory !== "") {
    let allCheckbox = document.getElementById(categoryAllId);

    if (allCheckbox) {
      allCheckbox.checked = false;
    }

    for (let i = 0; i < categoryCheckboxIds.length; i++) {
      let checkbox = document.getElementById(categoryCheckboxIds[i]);

      if (checkbox) {
        checkbox.checked = categoryFilterValues[i] === savedFooterCategory;
      }
    }

    localStorage.removeItem(FOOTER_CATEGORY_STORAGE_KEY);
  }

  function getCheckedValues(idList, valueList) {
    let values = [];

    for (let i = 0; i < idList.length; i++) {
      let checkbox = document.getElementById(idList[i]);

      if (checkbox && checkbox.checked) {
        values.push(valueList[i]);
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
    if (!searchInfoBox || !searchInfoText) {
      return;
    }

    if (savedSearch === "") {
      searchInfoBox.style.display = "none";
      return;
    }

    searchInfoText.innerText =
      "Ai căutat: " + savedSearch + ". Produse găsite: " + count + ".";
    searchInfoBox.style.display = "";
  }

  function setPageButtonActive(btn, isActive) {
    if (!btn) {
      return;
    }

    if (isActive) {
      btn.style.background = "#111827";
      btn.style.color = "#ffffff";
      btn.style.borderColor = "#111827";
    } else {
      btn.style.background = "";
      btn.style.color = "";
      btn.style.borderColor = "";
    }
  }

  function renderPagination(totalPages) {
    if (!pagination) {
      return;
    }

    if (totalPages <= 1) {
      pagination.style.display = "none";
      return;
    }

    pagination.style.display = "";

    if (pagePrevBtn) {
      pagePrevBtn.disabled = currentPage === 1;
    }

    if (pageNextBtn) {
      pageNextBtn.disabled = currentPage === totalPages;
    }

    if (page1Btn) {
      setPageButtonActive(page1Btn, currentPage === 1);
    }

    if (page2Btn) {
      if (totalPages >= 2) {
        page2Btn.style.display = "";
        setPageButtonActive(page2Btn, currentPage === 2);
      } else {
        page2Btn.style.display = "none";
      }
    }
  }

  function applyCatalogFilters() {
    let selectedPrices = getCheckedValues(priceCheckboxIds, priceFilterValues);
    let selectedBrands = getCheckedValues(brandCheckboxIds, brandFilterValues);
    let selectedCategories = getCheckedValues(
      categoryCheckboxIds,
      categoryFilterValues
    );
    let allCheckbox = document.getElementById(categoryAllId);

    if (allCheckbox && allCheckbox.checked) {
      selectedCategories = [];
    }

    let visibleList = [];

    for (let i = 1; i <= shopProducts.length; i++) {
      let card = document.getElementById("product-card-" + i);
      let product = shopProducts[i - 1];

      if (!card || !product) {
        continue;
      }

      let price = product.getDiscountedPrice(product.getDefaultVariant().price);
      let brand = product.brand;
      let category = getProductCategory(product.name);
      let searchText = (
        product.name +
        " " +
        category +
        " " +
        brand
      ).toLowerCase();
      let isVisible = true;

      if (
        savedSearch !== "" &&
        searchText.indexOf(getSearchText(savedSearch)) === -1
      ) {
        isVisible = false;
      }

      if (!productMatchesPrice(price, selectedPrices)) {
        isVisible = false;
      }

      if (selectedBrands.length > 0 && !hasValue(selectedBrands, brand)) {
        isVisible = false;
      }

      if (
        selectedCategories.length > 0 &&
        !hasValue(selectedCategories, category)
      ) {
        isVisible = false;
      }

      if (isVisible) {
        visibleList.push({ n: i, card: card, price: price });
      } else {
        card.style.display = "none";
      }
    }

    if (sortSelect.value === "priceLow") {
      visibleList.sort(function (a, b) {
        return a.price - b.price;
      });
    } else if (sortSelect.value === "priceHigh") {
      visibleList.sort(function (a, b) {
        return b.price - a.price;
      });
    }

    let totalPages = Math.ceil(visibleList.length / productsPerPage);

    if (totalPages < 1) {
      totalPages = 1;
    }

    if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    for (let i = 0; i < visibleList.length; i++) {
      let entry = visibleList[i];
      entry.card.style.order = i;

      if (
        i >= (currentPage - 1) * productsPerPage &&
        i < currentPage * productsPerPage
      ) {
        entry.card.style.display = "";
      } else {
        entry.card.style.display = "none";
      }
    }

    if (resultText) {
      if (visibleList.length === 0) {
        resultText.innerText = "Nu există produse pentru filtrele selectate.";
      } else {
        let firstShown = (currentPage - 1) * productsPerPage + 1;
        let lastShown = currentPage * productsPerPage;

        if (lastShown > visibleList.length) {
          lastShown = visibleList.length;
        }

        if (savedSearch !== "") {
          resultText.innerText =
            "Căutare: " +
            savedSearch +
            " - afișare " +
            firstShown +
            "-" +
            lastShown +
            " din " +
            visibleList.length +
            " produse";
        } else {
          resultText.innerText =
            "Afișare " +
            firstShown +
            "-" +
            lastShown +
            " din " +
            visibleList.length +
            " produse";
        }
      }
    }

    renderPagination(totalPages);
    showCatalogSearchInfo(visibleList.length);
  }

  function resetPageAndFilter() {
    currentPage = 1;
    applyCatalogFilters();
  }

  for (let i = 0; i < categoryCheckboxIds.length; i++) {
    let checkbox = document.getElementById(categoryCheckboxIds[i]);

    if (checkbox) {
      checkbox.addEventListener("change", function () {
        if (this.checked) {
          let allCb = document.getElementById(categoryAllId);

          if (allCb) {
            allCb.checked = false;
          }
        }

        resetPageAndFilter();
      });
    }
  }

  let allCheckboxEl = document.getElementById(categoryAllId);

  if (allCheckboxEl) {
    allCheckboxEl.addEventListener("change", function () {
      if (this.checked) {
        for (let i = 0; i < categoryCheckboxIds.length; i++) {
          let cb = document.getElementById(categoryCheckboxIds[i]);

          if (cb) {
            cb.checked = false;
          }
        }
      }

      resetPageAndFilter();
    });
  }

  for (let i = 0; i < priceCheckboxIds.length; i++) {
    let cb = document.getElementById(priceCheckboxIds[i]);

    if (cb) {
      cb.addEventListener("change", resetPageAndFilter);
    }
  }

  for (let i = 0; i < brandCheckboxIds.length; i++) {
    let cb = document.getElementById(brandCheckboxIds[i]);

    if (cb) {
      cb.addEventListener("change", resetPageAndFilter);
    }
  }

  sortSelect.addEventListener("change", resetPageAndFilter);

  if (applyButton) {
    applyButton.addEventListener("click", resetPageAndFilter);
  }

  if (clearButton) {
    clearButton.addEventListener("click", function () {
      for (let i = 0; i < priceCheckboxIds.length; i++) {
        let cb = document.getElementById(priceCheckboxIds[i]);

        if (cb) {
          cb.checked = false;
        }
      }

      for (let i = 0; i < brandCheckboxIds.length; i++) {
        let cb = document.getElementById(brandCheckboxIds[i]);

        if (cb) {
          cb.checked = false;
        }
      }

      for (let i = 0; i < categoryCheckboxIds.length; i++) {
        let cb = document.getElementById(categoryCheckboxIds[i]);

        if (cb) {
          cb.checked = false;
        }
      }

      let allCb = document.getElementById(categoryAllId);

      if (allCb) {
        allCb.checked = true;
      }

      sortSelect.value = "popular";
      localStorage.removeItem(SEARCH_STORAGE_KEY);
      savedSearch = "";
      currentPage = 1;
      applyCatalogFilters();
    });
  }

  if (searchInfoClearBtn) {
    searchInfoClearBtn.addEventListener("click", function () {
      localStorage.removeItem(SEARCH_STORAGE_KEY);
      savedSearch = "";
      currentPage = 1;
      applyCatalogFilters();
    });
  }

  if (pagePrevBtn) {
    pagePrevBtn.addEventListener("click", function () {
      if (currentPage > 1) {
        currentPage = currentPage - 1;
        applyCatalogFilters();
      }
    });
  }

  if (pageNextBtn) {
    pageNextBtn.addEventListener("click", function () {
      currentPage = currentPage + 1;
      applyCatalogFilters();
    });
  }

  if (page1Btn) {
    page1Btn.addEventListener("click", function () {
      currentPage = 1;
      applyCatalogFilters();
    });
  }

  if (page2Btn) {
    page2Btn.addEventListener("click", function () {
      currentPage = 2;
      applyCatalogFilters();
    });
  }

  applyCatalogFilters();
}

/* ===== Date statice pentru pagina de produs ===== */

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
      [
        "Potrivit pentru",
        "Întreținere după ceară, sealant său protecție ceramică"
      ]
    ],
    reviews: [
      [
        "Andrei P.",
        "★★★★★",
        "L-am folosit după aplicărea unei protecții pe mașina și apă se scurge mult mai ușor. Pentru mine este foarte bun la spălarea de întreținere."
      ],
      [
        "Mihai C.",
        "★★★★☆",
        "Curata bine și lasă luciu frumos. Trebuie doar clatit atent ca să nu rămână urme."
      ],
      [
        "Radu S.",
        "★★★★★",
        "Consumul este mic daca il diluezi corect. Mi se pare potrivit pentru cine spală mașina acasa."
      ]
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
      [
        "Cristian M.",
        "★★★★★",
        "Dupa cateva spalări mașina inca respinge apă bine. Este ușor de folosit."
      ],
      [
        "Alex V.",
        "★★★★☆",
        "Mi-a plăcut pentru întreținere, dar pentru murdărie mare folosesc și o prespălare."
      ],
      [
        "Stefan L.",
        "★★★★☆",
        "Bun pentru mașina protejata. Nu face minuni pe vopsea neprotejata, dar pentru întreținere este ok."
      ]
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
      [
        "Florin T.",
        "★★★★★",
        "Pentru zgarieturi fine și luciu rapid a fost foarte bun. Nu am avut nevoie de mai multe produse."
      ],
      [
        "Paul N.",
        "★★★★☆",
        "Se lucreaza ușor, dar trebuie pregatita bine suprafață inainte."
      ],
      [
        "Sorin A.",
        "★★★★★",
        "Mi-a plăcut rezultatul pe o mașina inchisă la culoare. Luciul s-a vazut imediat."
      ]
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
      [
        "Ionut B.",
        "★★★★★",
        "Foarte simplu de aplicăt. Dupa uscare mașina arată mai lucioasă."
      ],
      [
        "Vlad D.",
        "★★★★★",
        "Imi place ca nu pierd mult timp. Il folosesc după spălare."
      ],
      [
        "Daniel R.",
        "★★★★☆",
        "Efect bun, dar trebuie intins uniform ca să nu rămână pete."
      ]
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
    showPackageSection: false,
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
      [
        "Matei G.",
        "★★★★☆",
        "Sunt utile la interior, mai ales la gurile de ventilație."
      ],
      [
        "Bogdan F.",
        "★★★★★",
        "Le folosesc și la embleme. Curata bine fără să fortez."
      ],
      [
        "Claudiu H.",
        "★★★★☆",
        "Un set simplu, dar foarte practic pentru detailing acasa."
      ]
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
      [
        "Adrian K.",
        "★★★★★",
        "Scoate bine murdăria de pe praguri și partea joasă a mașinii."
      ],
      [
        "Lucian P.",
        "★★★★☆",
        "Foarte eficient, dar trebuie respectata dilutia."
      ],
      [
        "Robert I.",
        "★★★★☆",
        "Bun la prespălare, mai ales iarna când mașina este foarte murdara."
      ]
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
      [
        "Marian E.",
        "★★★★☆",
        "Am curatăt plasticele din interior și a mers bine."
      ],
      [
        "George U.",
        "★★★★★",
        "Foarte util pentru interior. Nu trebuie folosit in exces."
      ],
      [
        "Alin O.",
        "★★★★☆",
        "Bun pentru mizerie normala, mai ales cu o pensula moale."
      ]
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
      [
        "Catalin V.",
        "★★★★★",
        "Pe jantele mele a scos multă murdărie fără să frec prea mult."
      ],
      [
        "Dorin N.",
        "★★★★★",
        "Reacția de culoare te ajuta să vezi unde lucreaza produsul."
      ],
      [
        "Emanuel C.",
        "★★★★☆",
        "Foarte bun, dar are miros puternic ca majoritatea produselor pentru jante."
      ]
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
      [
        "Marius D.",
        "★★★★★",
        "Il folosesc diluat pentru multe zone. Este foarte economic."
      ],
      [
        "Tudor A.",
        "★★★★★",
        "Bun la plastice și la zone foarte murdare, dar trebuie diluat corect."
      ],
      [
        "Sebastian R.",
        "★★★★☆",
        "Produs puternic. Pentru interior il folosesc mai diluat și merge bine."
      ]
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
      [
        "Raul M.",
        "★★★★☆",
        "Bun pentru întreținere rapidă, când mașina nu este foarte murdara."
      ],
      [
        "Dan B.",
        "★★★★★",
        "Il tin in garaj pentru praf și urme ușoare. Se șterge ușor."
      ],
      [
        "Ovidiu S.",
        "★★★★☆",
        "Merge bine, dar trebuie folosite lavete curate ca să nu zgarii vopseaua."
      ]
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
      [
        "Silviu F.",
        "★★★★★",
        "Foarte practic in garaj. Nu mai am nevoie de furtun pentru fiecare spălare."
      ],
      [
        "Razvan T.",
        "★★★★☆",
        "Bun daca mașina nu este foarte murdara. Se lucreaza ușor pe panouri."
      ],
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
      [
        "Victor E.",
        "★★★★★",
        "Face spumă multă și sta bine pe mașina. Imi place pentru prespălare."
      ],
      [
        "Alexandru J.",
        "★★★★★",
        "Buna pentru mașina ceruita. Nu pare agresiva cu protecția."
      ],
      [
        "Ciprian L.",
        "★★★★☆",
        "Miros plăcut și spumă buna. Pentru murdărie grea folosesc și Green Star."
      ]
    ]
  },
  {
    id: 13,
    shortName: "Xtreme Wash & Wax 1L",
    brand: "Sonax",
    rating: "★★★★☆",
    reviewCount: 14,
    packageTitle: "Volum ambalaj",
    packageOptions: ["500 ml", "1 L"],
    selectedPackage: "1 L",
    lead: "Șampon auto cu ceară carnauba, pentru spălare și protecție intr-un singur pas. Lasa o pelicula hidrofoba vizibila după clătire.",
    description: [
      "Xtreme Wash & Wax curată mașina și lasă in același timp un strat fin de ceară, fără pași suplimentari.",
      "Este potrivit pentru intretinerea regulata, mai ales pe mașini care au deja o protecție de baza.",
      "Se diluează in găleată, se spală mașina pe zone și se clătește bine inainte ca produsul să se usuce pe vopsea."
    ],
    specs: [
      ["Volum", "1 L"],
      ["Brand", "Sonax"],
      ["Tip produs", "Șampon auto cu ceară"],
      ["Suprafețe", "Vopsea, plastic exterior"],
      ["Dozaj orientativ", "Aprox. 30 ml la 10 L apă"]
    ],
    reviews: [
      [
        "Bogdan T.",
        "★★★★★",
        "Spumă bine și lasă mașina lucioasă din prima spălare."
      ],
      [
        "Diana M.",
        "★★★★☆",
        "Bun la întreținere, dar pe murdărie mai grea fac și o prespălare."
      ],
      [
        "Cosmin V.",
        "★★★★☆",
        "Miros plăcut și clătire ușoară, nu lasă urme pe vopsea."
      ]
    ]
  },
  {
    id: 14,
    shortName: "Wheel Cleaner Full Effect 500ml",
    brand: "Sonax",
    rating: "★★★★★",
    reviewCount: 21,
    packageTitle: "Volum ambalaj",
    packageOptions: ["500 ml"],
    selectedPackage: "500 ml",
    lead: "Soluție de curățare jante cu efect de schimbare a culorii, pentru a vedea exact unde acționează produsul pe praful de frana.",
    description: [
      "Wheel Cleaner Full Effect este conceput pentru jante din aluminiu vopsite, lăcuite său din otel.",
      "Produsul își schimba culoarea pe zonele cu praf de frana, astfel incat sa observi vizual progresul curățării.",
      "Se pulverizează pe janta rece, se lasă să acționeze, apoi se freaca ușor cu o perie și se clătește cu apă."
    ],
    specs: [
      ["Volum", "500 ml"],
      ["Brand", "Sonax"],
      ["Tip produs", "Soluție curățare jante"],
      ["Suprafețe", "Aluminiu, jante lăcuite, otel"],
      ["Aplicare", "Pulverizare + perie pentru jante"]
    ],
    reviews: [
      [
        "Florentina A.",
        "★★★★★",
        "Se vede clar pe culoare unde a curatăt, foarte util."
      ],
      [
        "Andrei B.",
        "★★★★★",
        "Scoate bine praful de frana, jantele rămân curate mult timp."
      ],
      [
        "Iulian R.",
        "★★★★☆",
        "Funcționeaza bine, dar trebuie folosita perie pentru zonele dificile."
      ]
    ]
  },
  {
    id: 15,
    shortName: "Xtreme Spray & Seal 750ml",
    brand: "Sonax",
    rating: "★★★★☆",
    reviewCount: 11,
    packageTitle: "Volum ambalaj",
    packageOptions: ["750 ml"],
    selectedPackage: "750 ml",
    lead: "Spray sealant pentru luciu rapid și protecție intre spălări, aplicăt direct pe vopsea umedă său uscata.",
    description: [
      "Xtreme Protect+Shine Spray&Seal se pulverizeaza direct pe panou și se șterge cu o lavetă microfibra.",
      "Adaugă luciu și un efect hidrofob ușor, fără să fie nevoie de polish său aplicare cu mașina.",
      "Este potrivit pentru intretinerea rapida intre doua spalari complete, mai ales primăvara și vara."
    ],
    specs: [
      ["Volum", "750 ml"],
      ["Brand", "Sonax"],
      ["Tip produs", "Spray ceară / sealant"],
      ["Suprafețe", "Vopsea, plastic exterior, crom"],
      ["Aplicare", "Pulverizare + lavetă microfibra"]
    ],
    reviews: [
      [
        "Mircea D.",
        "★★★★☆",
        "Rapid de aplicăt, dă un luciu frumos pentru câteva săptămâni."
      ],
      [
        "Larisa P.",
        "★★★★★",
        "Il folosesc după fiecare spălare, mașina rămâne lucioasă mai mult."
      ],
      [
        "Sebastian K.",
        "★★★☆☆",
        "Bun produs, dar pe murdărie multă nu inlocuiește o ceară clasica."
      ]
    ]
  },
  {
    id: 16,
    shortName: "Interior Cleaner 500ml",
    brand: "Sonax",
    rating: "★★★★☆",
    reviewCount: 8,
    packageTitle: "Volum ambalaj",
    packageOptions: ["500 ml"],
    selectedPackage: "500 ml",
    lead: "Soluție de curățare pentru plastic, vinil și cauciuc in interiorul mașinii, fără efect gras după uscare.",
    description: [
      "Interior Cleaner curată praful, petele și murdăria obișnuită de pe bord, console și panourile de plastic.",
      "Formula nu lasă un finisaj gras, astfel incat suprafețele nu devin lipicioase sau prea lucioase.",
      "Se pulverizează pe o lavetă moale sau direct pe suprafață, se șterge uniform și se lustruieste cu o lavetă uscata."
    ],
    specs: [
      ["Volum", "500 ml"],
      ["Brand", "Sonax"],
      ["Tip produs", "Curățare interior"],
      ["Suprafețe", "Plastic, vinil, cauciuc"],
      ["Finisaj", "Mat, fără efect gras"]
    ],
    reviews: [
      [
        "Teodora S.",
        "★★★★★",
        "Curată bine bordul fără să lase suprafață lipicioasa."
      ],
      [
        "Razvan M.",
        "★★★★☆",
        "Bun pentru intretinere regulata, miros discret și plăcut."
      ],
      [
        "Adelina C.",
        "★★★☆☆",
        "Funcționeaza bine, dar pe pete vechi trebuie aplicăt de mai multe ori."
      ]
    ]
  },
  {
    id: 17,
    shortName: "Gold Class Shampoo & Conditioner 1.4L",
    brand: "Meguiar's",
    rating: "★★★★★",
    reviewCount: 27,
    packageTitle: "Volum ambalaj",
    packageOptions: ["473 ml", "1.4 L"],
    selectedPackage: "1.4 L",
    lead: "Șampon auto spumant care curată și conditioneaza vopseaua intr-un singur pas, blând cu protecțiile existente.",
    description: [
      "Gold Class Car Wash Shampoo & Conditioner produce o spumă densa care ridica murdăria fără să zgârie vopseaua.",
      "Formula conditioneaza vopseaua pe măsură ce curată, fiind potrivită și pentru mașini cu ceară sau sealant aplicăt.",
      "Se diluează conform instrucțiunilor, se spală cu o lavetă sau mitt din microfibra și se clătește bine."
    ],
    specs: [
      ["Volum", "1.4 L"],
      ["Brand", "Meguiar's"],
      ["Tip produs", "Șampon auto"],
      ["Suprafețe", "Vopsea, plastic exterior"],
      ["Potrivit pentru", "Mașini ceruite sau cu sealant"]
    ],
    reviews: [
      [
        "Gabriel N.",
        "★★★★★",
        "Spumă multă și deasa, mașina rămâne foarte curată."
      ],
      [
        "Monica I.",
        "★★★★★",
        "Il folosesc de ani de zile, nu afectează ceară de pe mașina."
      ],
      [
        "Vasile T.",
        "★★★★☆",
        "Foarte bun, doar consumul e puțin mai mare la mașini mari."
      ]
    ]
  },
  {
    id: 18,
    shortName: "Ultimate Liquid Wax 473ml",
    brand: "Meguiar's",
    rating: "★★★★★",
    reviewCount: 17,
    packageTitle: "Volum ambalaj",
    packageOptions: ["473 ml"],
    selectedPackage: "473 ml",
    lead: "Ceară lichidă sintetica, ușor de aplicăt și de șters, pentru un luciu profund și protecție de durata.",
    description: [
      "Ultimate Liquid Wax combina tehnologie sintetica cu ingrediente naturale pentru un finisaj profund și umed.",
      "Se aplică intr-un strat fin, cu un applicator din burete sau microfibra, pe mașina spălată și uscata.",
      "După câteva minute, când produsul se uscă la o ceață fina, se lustruieste cu o lavetă microfibra curata."
    ],
    specs: [
      ["Volum", "473 ml"],
      ["Brand", "Meguiar's"],
      ["Tip produs", "Ceară lichidă sintetica"],
      ["Suprafețe", "Vopsea auto"],
      ["Aplicare", "Manuala, strat fin cu applicator"]
    ],
    reviews: [
      [
        "Alexandra F.",
        "★★★★★",
        "Luciu foarte frumos și se da ușor, fără pete albe."
      ],
      [
        "Catalin B.",
        "★★★★★",
        "Protecție buna câteva luni, recomand pe culori inchise."
      ],
      [
        "Nicoleta R.",
        "★★★★☆",
        "Bun produs, doar trebuie strat foarte fin ca să nu fie de munca la lustruire."
      ]
    ]
  },
  {
    id: 19,
    shortName: "Hot Rims Wheel & Tire Cleaner 710ml",
    brand: "Meguiar's",
    rating: "★★★★☆",
    reviewCount: 12,
    packageTitle: "Volum ambalaj",
    packageOptions: ["710 ml"],
    selectedPackage: "710 ml",
    lead: "Soluție spumanta pentru curățarea jantelor și anvelopelor, sigura pentru majoritatea finisajelor de janta.",
    description: [
      "Hot Rims Wheel & Tire Cleaner se pulverizează direct pe janta și pe anvelopa pentru a dizolva murdăria și praful de frana.",
      "Spuma activa ajuta la desprinderea murdăriei fără frecare excesiva, protejand finisajul jantei.",
      "Se lasă să acționeze câteva clipe, se freaca ușor cu o perie pentru jante și se clătește bine cu apă."
    ],
    specs: [
      ["Volum", "710 ml"],
      ["Brand", "Meguiar's"],
      ["Tip produs", "Curățare jante și anvelope"],
      ["Suprafețe", "Jante vopsite, lăcuite, anvelope"],
      ["Aplicare", "Pulverizare + perie pentru jante"]
    ],
    reviews: [
      [
        "Stefania L.",
        "★★★★☆",
        "Curată bine și anvelopele, nu doar jantele."
      ],
      [
        "Marius G.",
        "★★★★★",
        "Spuma activa scoate mult praf de frana fără efort."
      ],
      [
        "Petru H.",
        "★★★☆☆",
        "Bun la murdărie obișnuită, la praf vechi e nevoie de mai mult timp."
      ]
    ]
  },
  {
    id: 20,
    shortName: "Ice Car Wash 1.4L",
    brand: "Turtle Wax",
    rating: "★★★★☆",
    reviewCount: 22,
    packageTitle: "Volum ambalaj",
    packageOptions: ["500 ml", "1.4 L"],
    selectedPackage: "1.4 L",
    lead: "Șampon auto cu polimeri și ceară, pentru spălare ușoară, clătire rapida și un strat fin de protecție.",
    description: [
      "Ice Car Wash este formulat cu polimeri care ajuta apă să se scurga mai ușor de pe caroserie la clătire.",
      "Lasă in urma un strat fin de protecție, vizibil prin efectul hidrofob de pe vopsea după spălare.",
      "Se diluează in găleată sau se folosește cu pistolul de spumă, apoi se clătește bine inainte de uscare."
    ],
    specs: [
      ["Volum", "1.4 L"],
      ["Brand", "Turtle Wax"],
      ["Tip produs", "Șampon auto cu ceară"],
      ["Suprafețe", "Vopsea, plastic exterior"],
      ["Clătire", "Rapida, datorita polimerilor"]
    ],
    reviews: [
      [
        "Doina V.",
        "★★★★★",
        "Clătire foarte rapida, se scurge apă bine de pe mașina."
      ],
      [
        "Emil P.",
        "★★★★☆",
        "Bun raport calitate-pret, miros plăcut de mentă."
      ],
      [
        "Roxana M.",
        "★★★★☆",
        "Spumă suficienta, dar la murdărie multă fac doua treceri."
      ]
    ]
  },
  {
    id: 21,
    shortName: "Ice Spray Wax 500ml",
    brand: "Turtle Wax",
    rating: "★★★★★",
    reviewCount: 15,
    packageTitle: "Volum ambalaj",
    packageOptions: ["500 ml"],
    selectedPackage: "500 ml",
    lead: "Ceară spray pentru luciu rapid intre spălări complete, se aplică direct pe vopsea umedă sau uscata.",
    description: [
      "Ice Spray Wax se pulverizează pe panouri și se șterge cu o lavetă microfibra, fără apă sau frecare puternica.",
      "Adaugă luciu și un efect de respingere a apei, util pentru intretinerea rapida in weekend.",
      "Este potrivit și pentru retus local pe zone unde luciul s-a dus mai repede, cum ar fi capota sau plafonul."
    ],
    specs: [
      ["Volum", "500 ml"],
      ["Brand", "Turtle Wax"],
      ["Tip produs", "Ceară spray"],
      ["Suprafețe", "Vopsea auto"],
      ["Aplicare", "Pulverizare + lavetă microfibra"]
    ],
    reviews: [
      [
        "Bianca O.",
        "★★★★★",
        "Foarte rapid de folosit, ideal când nu am timp de ceară clasica."
      ],
      [
        "Cristian A.",
        "★★★★★",
        "Luciu frumos imediat, il țin in garaj pentru retusuri."
      ],
      [
        "Ileana D.",
        "★★★★☆",
        "Bun produs, durata protecției e mai scurta fata de ceară lichidă."
      ]
    ]
  },
  {
    id: 22,
    shortName: "Premium Microfiber Cloths 3 buc",
    brand: "Turtle Wax",
    rating: "★★★★☆",
    reviewCount: 10,
    packageTitle: "Set",
    packageOptions: ["3 buc"],
    selectedPackage: "3 buc",
    showPackageSection: false,
    lead: "Set de lavete din microfibra, fără scame, pentru uscare, lustruire și aplicăt ceară sau sealant.",
    description: [
      "Lavetele din microfibra absorb rapid apă și sunt potrivite pentru uscarea caroseriei fără zgârieturi.",
      "Sunt utile și pentru lustruirea finala după ceară, polish sau spray sealant, fără să lase scame pe vopsea.",
      "Se recomanda spălarea separat de alte textile și evitarea balsamului de rufe, pentru a păstra absorbtia."
    ],
    specs: [
      ["Continut", "3 lavete microfibra"],
      ["Brand", "Turtle Wax"],
      ["Utilizare", "Uscare, lustruire, aplicăt ceară"],
      ["Material", "Microfibra fără scame"],
      ["Întreținere", "Spălare separata, fără balsam de rufe"]
    ],
    reviews: [
      [
        "Daniela S.",
        "★★★★★",
        "Absorb foarte bine apă, mașina se usuca rapid."
      ],
      [
        "Octavian R.",
        "★★★★☆",
        "Bune și pentru lustruit ceară, nu lasă scame."
      ],
      [
        "Simona K.",
        "★★★★☆",
        "Set practic, dar pentru mașini mari ar fi nevoie de mai multe."
      ]
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

/* ===== Completare continut pagina de produs (sloturi statice) ===== */

function fillDescription(details) {
  for (let i = 0; i < 3; i++) {
    let p = document.getElementById("desc-p-" + (i + 1));

    if (!p) {
      continue;
    }

    if (i < details.description.length) {
      p.innerText = details.description[i];
      p.style.display = "";
    } else {
      p.style.display = "none";
    }
  }
}

function fillSpecs(details, product, selectedPackage) {
  let selectedVariant = product.getVariant(selectedPackage);
  let brandValue = document.getElementById("spec-brand-value");
  let packageValue = document.getElementById("spec-package-value");
  let priceValue = document.getElementById("spec-price-value");

  if (brandValue) {
    brandValue.innerText = details.brand;
  }

  if (packageValue) {
    packageValue.innerText = selectedVariant.label;
  }

  if (priceValue) {
    priceValue.innerText = formatPrice(product.getDiscountedPrice(selectedVariant.price));
  }

  let otherSpecs = [];

  for (let i = 0; i < details.specs.length; i++) {
    if (details.specs[i][0] !== "Volum") {
      otherSpecs.push(details.specs[i]);
    }
  }

  for (let i = 0; i < 4; i++) {
    let labelEl = document.getElementById("spec-row-" + (i + 1) + "-label");
    let valueEl = document.getElementById("spec-row-" + (i + 1) + "-value");

    if (!labelEl || !valueEl) {
      continue;
    }

    if (i < otherSpecs.length) {
      labelEl.innerText = otherSpecs[i][0];
      valueEl.innerText = otherSpecs[i][1];
    } else {
      labelEl.innerText = "";
      valueEl.innerText = "";
    }
  }
}

function fillReviews(details) {
  for (let i = 0; i < 3; i++) {
    let nameEl = document.getElementById("review-" + (i + 1) + "-name");
    let starsEl = document.getElementById("review-" + (i + 1) + "-stars");
    let ratingTextEl = document.getElementById(
      "review-" + (i + 1) + "-rating-text"
    );
    let textEl = document.getElementById("review-" + (i + 1) + "-text");
    let headingEl = document.getElementById("review-" + (i + 1) + "-heading");

    if (i < details.reviews.length) {
      let review = details.reviews[i];

      if (nameEl) {
        nameEl.innerText = review[0];
      }

      if (starsEl) {
        starsEl.innerText = review[1];
      }

      if (ratingTextEl) {
        ratingTextEl.innerText = getStarsRatingLabel(review[1]);
      }

      if (textEl) {
        textEl.innerText = "„" + review[2] + "”";
      }

      if (headingEl) {
        headingEl.innerText = "Recenzie " + review[0];
      }

      if (i === 2) {
        let box = document.getElementById("review-3-box");

        if (box) {
          box.style.display = "";
        }
      }
    } else if (i === 2) {
      let box = document.getElementById("review-3-box");

      if (box) {
        box.style.display = "none";
      }
    }
  }
}

function fillPackageOptions(product, selectedPackage, details) {
  let packageSection = document.getElementById("package-section");
  let packageTitleEl = document.getElementById("package-title");

  if (details && details.showPackageSection === false) {
    if (packageSection) {
      packageSection.style.display = "none";
    }

    return;
  }

  if (packageSection) {
    packageSection.style.display = "";
  }

  if (packageTitleEl && details) {
    packageTitleEl.innerText = details.packageTitle;
  }

  let packageBtnIds = ["package-btn-1", "package-btn-2", "package-btn-3"];

  for (let i = 0; i < packageBtnIds.length; i++) {
    let btn = document.getElementById(packageBtnIds[i]);

    if (!btn) {
      continue;
    }

    if (i < product.variants.length) {
      let option = product.variants[i];
      btn.style.display = "";
      btn.innerText = option.label;

      if (option.label === selectedPackage) {
        btn.style.background = GREEN_MAIN;
        btn.style.borderColor = GREEN_MAIN;
        btn.style.color = "#ffffff";
      } else {
        btn.style.background = "";
        btn.style.borderColor = "";
        btn.style.color = "";
      }
    } else {
      btn.style.display = "none";
    }
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

function fillSimilarProducts(currentProduct) {
  let currentCategory = getProductCategory(currentProduct.name);
  let similarProducts = [];

  for (let i = 0; i < shopProducts.length; i++) {
    if (
      shopProducts[i].id !== currentProduct.id &&
      getProductCategory(shopProducts[i].name) === currentCategory
    ) {
      similarProducts.push(shopProducts[i]);
    }
  }

  if (similarProducts.length < 4) {
    for (let i = 0; i < shopProducts.length; i++) {
      if (
        shopProducts[i].id !== currentProduct.id &&
        !hasSimilarProduct(similarProducts, shopProducts[i].id)
      ) {
        similarProducts.push(shopProducts[i]);
      }

      if (similarProducts.length === 4) {
        break;
      }
    }
  }

  for (let i = 0; i < 4; i++) {
    let n = i + 1;
    let box = document.getElementById("similar-" + n + "-box");

    if (!box) {
      continue;
    }

    if (i >= similarProducts.length) {
      box.style.display = "none";
      continue;
    }

    let product = similarProducts[i];
    box.style.display = "";

    let link = document.getElementById("similar-" + n + "-link");
    let img = document.getElementById("similar-" + n + "-img");
    let title = document.getElementById("similar-" + n + "-title");
    let price = document.getElementById("similar-" + n + "-price");
    let addBtn = document.getElementById("similar-" + n + "-addbtn");

    if (link) {
      link.href = "product.html?id=" + product.id;
      link.addEventListener("click", function () {
        saveSelectedProduct(product.id);
      });
    }

    if (img) {
      img.src = product.image;
      img.alt = product.name;
    }

    if (title) {
      title.innerText = getShortProductName(product.name);
    }

    if (price) {
      price.innerText = formatPrice(product.getDiscountedPrice(product.getDefaultVariant().price));
    }

    if (addBtn) {
      addBtn.addEventListener("click", function () {
        let added = addProductToStoredCart(product.id, 1);

        if (added) {
          addBtn.innerText = "Adăugat în coș";
        } else {
          addBtn.innerText = "Stoc epuizat";
        }
      });
    }
  }
}

function setupProductDetailPage() {
  let titleEl = document.getElementById("product-title");

  if (!titleEl) {
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

  let brandText = document.getElementById("product-brand");
  let ratingStars = document.getElementById("product-rating-stars");
  let ratingText = document.getElementById("product-rating-text");
  let ratingCount = document.getElementById("product-rating-count");
  let priceEl = document.getElementById("product-price");
  let priceOldEl = document.getElementById("product-price-old");
  let priceBadgeEl = document.getElementById("product-price-badge");
  let stockLabel = document.getElementById("product-stock-label");
  let leadEl = document.getElementById("product-lead");
  let breadcrumbCurrent = document.getElementById("breadcrumb-current");
  let mainImage = document.getElementById("product-main-img");
  let qtySpan = document.getElementById("qty-display");
  let qtyMinusBtn = document.getElementById("qty-minus-btn");
  let qtyPlusBtn = document.getElementById("qty-plus-btn");
  let addButton = document.getElementById("add-to-cart-btn");
  let qty = 1;

  if (availableStock < 1) {
    qty = 0;
  }

  if (brandText) {
    brandText.innerText = details.brand;
  }

  titleEl.innerText = product.name;

  fillPriceWithDiscount(priceEl, priceOldEl, priceBadgeEl, product, product.getVariantPrice(selectedPackage));

  if (mainImage) {
    mainImage.src = product.image;
    mainImage.alt = product.name;
  }

  for (let i = 1; i <= 3; i++) {
    let thumb = document.getElementById("gallery-thumb-" + i);

    if (!thumb) {
      continue;
    }

    thumb.src = product.image;
    thumb.alt = product.name + " - imagine produs " + i;
    thumb.style.cursor = "pointer";

    if (i === 1) {
      thumb.style.borderColor = GREEN_MAIN;
      thumb.style.boxShadow = GREEN_RING;
    } else {
      thumb.style.borderColor = "";
      thumb.style.boxShadow = "";
    }

    thumb.addEventListener("click", function () {
      if (mainImage) {
        mainImage.src = this.src;
        mainImage.alt = this.alt;
      }

      for (let j = 1; j <= 3; j++) {
        let otherThumb = document.getElementById("gallery-thumb-" + j);

        if (otherThumb) {
          otherThumb.style.borderColor = "";
          otherThumb.style.boxShadow = "";
        }
      }

      this.style.borderColor = GREEN_MAIN;
      this.style.boxShadow = GREEN_RING;
    });
  }

  if (breadcrumbCurrent) {
    breadcrumbCurrent.innerText = details.shortName;
  }

  if (leadEl) {
    leadEl.innerText = details.lead;
  }

  if (ratingStars) {
    ratingStars.innerText = details.rating;
  }

  if (ratingText) {
    ratingText.innerText = getStarsRatingLabel(details.rating);
  }

  if (ratingCount) {
    ratingCount.innerText = "(" + details.reviewCount + " recenzii)";
  }

  fillDescription(details);
  fillSpecs(details, product, selectedPackage);
  fillReviews(details);
  fillPackageOptions(product, selectedPackage, details);
  fillSimilarProducts(product);

  document.title = "Produs - " + details.shortName;

  if (qtySpan) {
    qtySpan.innerText = qty;
  }

  if (stockLabel) {
    if (availableStock < 1) {
      stockLabel.innerText = "Stoc epuizat";
      stockLabel.style.color = TEXT_DANGER;
    } else {
      stockLabel.innerText = "În stoc: " + availableStock + " buc.";
      stockLabel.style.color = TEXT_SUCCESS;
    }
  }

  let packageBtnIds = ["package-btn-1", "package-btn-2", "package-btn-3"];

  for (let i = 0; i < packageBtnIds.length; i++) {
    if (i >= product.variants.length) {
      continue;
    }

    let btn = document.getElementById(packageBtnIds[i]);
    let variantLabel = product.variants[i].label;

    if (btn) {
      btn.addEventListener("click", function () {
        selectedPackage = variantLabel;

        fillPriceWithDiscount(priceEl, priceOldEl, priceBadgeEl, product, product.getVariantPrice(selectedPackage));

        fillSpecs(details, product, selectedPackage);
        fillPackageOptions(product, selectedPackage, details);
      });
    }
  }

  if (qtyMinusBtn) {
    qtyMinusBtn.addEventListener("click", function () {
      if (qty > 1) {
        qty = qty - 1;

        if (qtySpan) {
          qtySpan.innerText = qty;
        }
      }
    });
  }

  if (qtyPlusBtn) {
    qtyPlusBtn.addEventListener("click", function () {
      if (qty < availableStock) {
        qty = qty + 1;

        if (qtySpan) {
          qtySpan.innerText = qty;
        }
      }
    });
  }

  if (addButton) {
    addButton.href = "cart.html";

    if (availableStock < 1) {
      addButton.innerText = "Stoc epuizat";
      addButton.style.opacity = "0.65";
      addButton.style.cursor = "not-allowed";
      addButton.style.pointerEvents = "none";
    } else {
      addButton.innerText = "Adaugă în coș";
    }

    addButton.addEventListener("click", function (event) {
      if (qty < 1) {
        event.preventDefault();
        alert("Produsul nu mai este disponibil in stoc.");
        return;
      }

      let added = addProductToStoredCart(product.id, qty, selectedPackage);

      if (!added) {
        event.preventDefault();
        alert("Cantitatea aleasă este mai mare decat stocul disponibil.");
        return;
      }

      updateCartNumbers();
    });
  }
}

/* ===== Formulare de utilizator (login / register) ===== */

function setupUserForms() {
  let loginForm = document.getElementById("login-form");

  if (loginForm) {
    let savedUser = getSavedUser();

    if (savedUser) {
      showMessage(
        "login-message",
        "Ești autentificat ca " + savedUser.username + ".",
        true
      );
    }
  }

  let registerForm = document.getElementById("register-form");

  if (registerForm) {
    registerForm.addEventListener("submit", function (event) {
      event.preventDefault();

      let firstNameEl = document.getElementById("firstName");
      let lastNameEl = document.getElementById("lastName");
      let emailEl = document.getElementById("registerEmail");
      let passwordEl = document.getElementById("registerPassword");
      let confirmPasswordEl = document.getElementById("confirmPassword");

      let firstName = firstNameEl ? firstNameEl.value.trim() : "";
      let lastName = lastNameEl ? lastNameEl.value.trim() : "";
      let email = emailEl ? emailEl.value.trim() : "";
      let password = passwordEl ? passwordEl.value.trim() : "";
      let confirmPassword = confirmPasswordEl
        ? confirmPasswordEl.value.trim()
        : "";

      if (
        firstName === "" ||
        lastName === "" ||
        email === "" ||
        password === ""
      ) {
        showMessage(
          "register-message",
          "Completează toate câmpurile obligatorii.",
          false
        );
        return;
      }

      if (password !== confirmPassword) {
        showMessage("register-message", "Parolele nu sunt la fel.", false);
        return;
      }

      let user = new User(firstName + " " + lastName, email);
      user.login();
      localStorage.setItem(
        USER_STORAGE_KEY,
        JSON.stringify({
          username: user.username,
          email: user.email,
          isLoggedIn: user.isLoggedIn,
          discount: user.getDiscount()
        })
      );

      showMessage(
        "register-message",
        "Contul a fost creat și utilizatorul a fost sălvat local.",
        true
      );
      updateHeaderUser();
    });
  }
}

/* ===== Cos: sumar, cupon, checkout, comenzi, newsletter ===== */

function getCartSummary(cart) {
  let subtotal = cart.getTotal();
  let shipping = SHIPPING_COST;

  if (subtotal === 0) {
    shipping = 0;
  }

  let discount = 0;
  let promo = localStorage.getItem("adartaPromo") || "";

  if (promo === "SAVE10") {
    discount = Math.round((subtotal * 10) / 100);
  } else if (promo === "SAVE15") {
    discount = Math.round((subtotal * 15) / 100);
  } else if (promo === "FREESHIP") {
    shipping = 0;
  }

  return {
    subtotal: subtotal,
    shipping: shipping,
    discount: discount,
    total: subtotal + shipping - discount,
    promo: promo
  };
}

function setupPromoForm() {
  let promoForm = document.getElementById("promo-form");

  if (!promoForm) {
    return;
  }

  promoForm.addEventListener("submit", function (event) {
    event.preventDefault();

    let input = document.getElementById("promo-input");
    let code = normalizeCoupon(input.value);

    if (isValidCoupon(code)) {
      localStorage.setItem("adartaPromo", code);
      showMessage("promo-message", "Cupon aplicăt: " + code, true);
    } else {
      localStorage.removeItem("adartaPromo");
      showMessage("promo-message", "Codul introdus nu este valid.", false);
    }

    if (typeof refreshCartPage === "function") {
      refreshCartPage();
    }

    renderCheckoutSummary();
  });
}

function renderCheckoutSummary() {
  let itemsList = document.getElementById("checkout-items-list");
  let checkoutTotal = document.getElementById("checkout-total");

  if (!itemsList || !checkoutTotal) {
    return;
  }

  let cart = getPageCart();
  let emptyMessage = document.getElementById("checkout-empty-message");
  let extraBox = document.getElementById("checkout-extra");

  if (cart.items.length === 0) {
    if (emptyMessage) {
      emptyMessage.style.display = "";
    }

    for (let i = 1; i <= 12; i++) {
      let row = document.getElementById("checkout-item-" + i);

      if (row) {
        row.style.display = "none";
      }
    }

    checkoutTotal.innerText = "0 Ron";

    if (extraBox) {
      extraBox.innerText = "";
    }

    return;
  }

  if (emptyMessage) {
    emptyMessage.style.display = "none";
  }

  for (let i = 1; i <= 12; i++) {
    let row = document.getElementById("checkout-item-" + i);

    if (!row) {
      continue;
    }

    if (i <= cart.items.length) {
      let item = cart.items[i - 1];
      row.style.display = "";

      let img = document.getElementById("checkout-item-" + i + "-img");
      let title = document.getElementById("checkout-item-" + i + "-title");
      let price = document.getElementById("checkout-item-" + i + "-price");
      let meta = document.getElementById("checkout-item-" + i + "-meta");

      if (img) {
        img.src = item.image;
        img.alt = item.name;
      }

      if (title) {
        title.innerText = item.name;
      }

      if (price) {
        price.innerText = formatPrice(item.price * item.qty);
      }

      if (meta) {
        meta.innerText =
          "Ambalaj: " + item.package + " - Cantitate: " + item.qty;
      }
    } else {
      row.style.display = "none";
    }
  }

  let summary = getCartSummary(cart);
  checkoutTotal.innerText = formatPrice(summary.total);

  if (extraBox) {
    extraBox.innerText =
      "Subtotal: " +
      formatPrice(summary.subtotal) +
      "\nLivrare: " +
      formatPrice(summary.shipping) +
      "\nReducere: " +
      formatPrice(summary.discount);
  }
}

function setupCheckoutForm() {
  let form = document.getElementById("checkout-form");

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

  let requiredFieldIds = [
    "prenume",
    "nume",
    "adresa",
    "tara",
    "oras",
    "codPostal",
    "numeCard",
    "numarCard",
    "lunaExp",
    "anExp",
    "cvc"
  ];

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    let cart = getPageCart();

    if (cart.items.length === 0) {
      showMessage(
        "checkout-message",
        "Coșul este gol. Nu se poate trimite comanda.",
        false
      );
      return;
    }

    let isValid = true;

    for (let i = 0; i < requiredFieldIds.length; i++) {
      let field = document.getElementById(requiredFieldIds[i]);

      if (field && field.value.trim() === "") {
        isValid = false;
      }
    }

    if (!isValid) {
      showMessage(
        "checkout-message",
        "Completează câmpurile obligatorii.",
        false
      );
      return;
    }

    let orders = [];

    try {
      orders = JSON.parse(localStorage.getItem(ORDERS_STORAGE_KEY)) || [];
    } catch (error) {
      orders = [];
    }

    let summary = getCartSummary(cart);
    orders.push({
      id: orders.length + 1,
      total: summary.total,
      items: cart.items,
      date: new Date().toLocaleDateString("ro-RO")
    });
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    localStorage.removeItem(CART_STORAGE_KEY);
    localStorage.removeItem("adartaPromo");
    updateCartNumbers();
    renderCheckoutSummary();

    showMessage(
      "checkout-message",
      "Comanda a fost sălvată local. Te redirecționăm spre comenzile tale...",
      true
    );

    setTimeout(function () {
      window.location.href = "orders.html";
    }, 1800);
  });
}

function setupNewsletterForms() {
  let form = document.getElementById("newsletter-form");

  if (!form) {
    return;
  }

  let input = document.getElementById("newsletterEmail");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (input && input.value.trim() !== "") {
      localStorage.setItem(NEWSLETTER_STORAGE_KEY, input.value.trim());
      showMessage(
        "newsletter-message",
        "Email sălvat pentru newsletter.",
        true
      );
    } else {
      showMessage("newsletter-message", "Introdu o adresă de email.", false);
    }
  });
}

function renderOrdersPage() {
  let ordersBox = document.getElementById("orders-box");

  if (!ordersBox) {
    return;
  }

  let orders = [];

  try {
    orders = JSON.parse(localStorage.getItem(ORDERS_STORAGE_KEY)) || [];
  } catch (error) {
    orders = [];
  }

  let emptyMessage = document.getElementById("orders-empty-message");

  if (orders.length === 0) {
    if (emptyMessage) {
      emptyMessage.style.display = "";
    }

    for (let i = 1; i <= 10; i++) {
      let row = document.getElementById("order-row-" + i);

      if (row) {
        row.style.display = "none";
      }
    }

    return;
  }

  if (emptyMessage) {
    emptyMessage.style.display = "none";
  }

  for (let i = 1; i <= 10; i++) {
    let row = document.getElementById("order-row-" + i);

    if (!row) {
      continue;
    }

    if (i <= orders.length) {
      let order = orders[i - 1];
      let itemCount = 0;

      for (let j = 0; j < order.items.length; j++) {
        itemCount = itemCount + order.items[j].qty;
      }

      row.style.display = "";

      let codeEl = document.getElementById("order-row-" + i + "-code");
      let dateEl = document.getElementById("order-row-" + i + "-date");
      let countEl = document.getElementById("order-row-" + i + "-count");
      let totalEl = document.getElementById("order-row-" + i + "-total");

      if (codeEl) {
        codeEl.innerText = "Comanda #" + order.id;
      }

      if (dateEl) {
        dateEl.innerText = order.date;
      }

      if (countEl) {
        countEl.innerText = itemCount + " produse";
      }

      if (totalEl) {
        totalEl.innerText = formatPrice(order.total);
      }
    } else {
      row.style.display = "none";
    }
  }
}

/* ===== Pornire ===== */

setupHeaderSearch();
setupFooterLinks();
updateCartNumbers();
updateHeaderUser();
decorateProductCards();
setupFilterAccordion();
setupSalePagination();
setupCatalogTools();
setupProductDetailPage();
setupUserForms();
setupPromoForm();
renderCheckoutSummary();
setupCheckoutForm();
setupNewsletterForms();
renderOrdersPage();
