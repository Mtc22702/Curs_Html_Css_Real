// PAGINA PRODUS

// Lista produse
let products = [
  {
    id: 1,
    name: "Șampon auto cu efect ceramic Koch Chemie Ceramic Effect Shampoo, Ces",
    price: 145,
    brand: "Koch Chemie",
    category: "Exterior",
    image:
      "images/1-sampon-auto-cu-efect-ceramic-koch-chemie-ceramic-effect-shampoo-ces-1l-438344-768.jpg",
    description:
      "Șampon cu efect ceramic pentru spălare manuală. Curăță și protejează vopseaua, sticla și plasticul într-un singur pas. Recomandat pentru suprafețe deja ceramice.",
    colors: ["Alb", "Negru"],
    sizes: ["1 L", "5 L"],
    priceBySize: { "1 L": 145, "5 L": 549 }
  },
  {
    id: 2,
    name: "Șampon auto reactivare ceramică Koch Chemie Reactivation Shampoo, Rs",
    price: 92,
    brand: "Koch Chemie",
    category: "Exterior",
    image:
      "images/2-sampon-auto-reactivare-ceramica-koch-chemie-reactivation-shampoo-1l-767567-768.jpg",
    description:
      "Șampon acid pentru reactivarea acoperirilor ceramice. Elimină depunerile hidrofobe și calcarul, restaurând performanța de respingere a apei.",
    colors: ["Albastru", "Verde"],
    sizes: ["1 L", "5 L"],
    priceBySize: { "1 L": 92, "5 L": 329 }
  },
  {
    id: 3,
    name: "Polish 3 în 1 cu ceară Carnauba Koch Chemie One Cut and Finish, P6.02",
    price: 103,
    brand: "Koch Chemie",
    category: "Exterior",
    image:
      "images/3-Pasta-Polish-3-in-1-Koch-Chemie-One-Cut-Finish-P6.02-250ml-1000x1000-768.jpg",
    description:
      "Polish de mașină pentru corecția vopselei și finisare într-un singur pas. Elimină zgârieturile fine începând de la granulația P2000 și sigilează suprafața simultan.",
    colors: ["Roșu", "Negru"],
    sizes: ["250 ml", "1 L"],
    priceBySize: { "250 ml": 103, "1 L": 332 }
  },
  {
    id: 4,
    name: "Spray protecție vopsea Koch Chemie Spray Sealant, S0.02",
    price: 135,
    brand: "Koch Chemie",
    category: "Exterior",
    image:
      "images/4-spray-protectie-vopsea-koch-chemie-spray-sealant-s0-02-500ml-673060-768.jpg",
    description:
      "Spray sealant pentru aplicare rapidă după spălare. Sigilează vopseaua, creează o suprafață hidrofobă și oferă luciu intens cu efect până la 12 săptămâni.",
    colors: ["Gri", "Alb"],
    sizes: ["500 ml", "5 L"],
    priceBySize: { "500 ml": 135, "5 L": 549 }
  },
  {
    id: 5,
    name: "Soluție curățare auto alcalină Koch Chemie VorreinigerB, Vb",
    price: 59,
    brand: "Koch Chemie",
    category: "Exterior",
    image:
      "images/6-solutie-curatare-auto-alcalina-koch-chemie-vorreinigerb-vb-1l-505138-768.webp",
    description:
      "Pre-spălător alcalin cu putere mare de spumare. Dizolvă insectele, excrementele de păsări și murdăria de pe caroserie și jante înainte de spălarea cu șampon.",
    colors: ["Galben", "Negru"],
    sizes: ["1 L", "11 kg"],
    priceBySize: { "1 L": 59, "11 kg": 393 }
  },
  {
    id: 6,
    name: "Soluție curățare generală Koch Chemie Mehrzweckreiniger, Mzr",
    price: 64,
    brand: "Koch Chemie",
    category: "Interior",
    image:
      "images/7-Solutie-Curatare-Generala-Koch-Chemie-MZR-Mehrzweckreiniger-1L-1000x1000h-768.jpg",
    description:
      "Degresant multi-uz pentru interior. Curăță tapițeria, plasticul, bordul și căptușeala tavanului fără a necesita clătire. Aprobat Daimler.",
    colors: ["Verde", "Alb"],
    sizes: ["1 L", "5 kg"],
    priceBySize: { "1 L": 64, "5 kg": 194 }
  },
  {
    id: 7,
    name: "Soluție curățare jante reactivă Koch Chemie Magic Wheel Cleaner, Mwc",
    price: 97,
    brand: "Koch Chemie",
    category: "Exterior",
    image:
      "images/8-solutie-curatare-jante-reactiva-koch-chemie-magic-wheel-cleaner-mwc-500ml-573022-768.jpg",
    description:
      "Curățător reactiv pentru jante care își schimbă culoarea în roșu la contactul cu particulele de fier. Curăță jantele din aliaj, crom și oțel fără acizi.",
    colors: ["Mov", "Negru"],
    sizes: ["500 ml", "10 L"],
    priceBySize: { "500 ml": 97, "10 L": 879 }
  },
  {
    id: 8,
    name: "Soluție spălare fără apă Koch Chemie Wash and Finish, Wf",
    price: 79,
    brand: "Koch Chemie",
    category: "Exterior",
    image:
      "images/10-solutie-spalare-fara-apa-koch-chemie-wash-and-finish-wf-1l-977478-768.jpg",
    description:
      "Soluție de spălare fără apă pentru vehicule ușor murdare. Curăță, îngrijește și sigilează vopseaua, sticla și plasticul într-un singur pas.",
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
    description:
      "Set de pensule pentru detailing, util pentru zone greu accesibile, grile, embleme, interior și exterior. Potrivite pentru curățare delicată.",
    colors: ["Maro", "Negru"],
    sizes: ["3 buc"],
    priceBySize: { "3 buc": 70 }
  },
  {
    id: 10,
    name: "Soluție curățare universală Koch Chemie Green Star, Gs",
    price: 42,
    brand: "Koch Chemie",
    category: "Exterior",
    image:
      "images/9-solutie-curatare-universala-koch-chemie-green-star-gs-1l-3229062912-768.jpg",
    description:
      "Soluție universală concentrată pentru curățare auto. Poate fi folosită pe zone murdare ale exteriorului, jante, praguri și alte suprafețe rezistente.",
    colors: ["Verde", "Galben"],
    sizes: ["1 L", "11 kg"],
    priceBySize: { "1 L": 42, "11 kg": 239 }
  },
  {
    id: 11,
    name: "Soluție spălare fără clătire Koch Chemie Rapid Rinseless Wash, Rrw",
    price: 62,
    brand: "Koch Chemie",
    category: "Exterior",
    image:
      "images/11-solutie-spalare-fara-clatire-koch-chemie-rapid-rinseless-wash-rrw-1l-685449-768.jpg",
    description:
      "Soluție pentru spălare fără clătire, potrivită pentru curățarea rapidă a exteriorului atunci când nu este posibilă spălarea clasică cu jet de apă.",
    colors: ["Alb", "Albastru"],
    sizes: ["1 L", "5 L"],
    priceBySize: { "1 L": 62, "5 L": 259 }
  },
  {
    id: 12,
    name: "Spumă spălare cu pH neutru Koch Chemie Gentle Snow Foam, Gsf",
    price: 81,
    brand: "Koch Chemie",
    category: "Exterior",
    image:
      "images/12-spuma-spalare-cu-ph-neutru-koch-chemie-gentle-snow-foam-gsf-1l-592375-768.jpg",
    description:
      "Spumă cu pH neutru pentru prespălare și spălare delicată. Produce spumă densă și ajută la desprinderea murdăriei de pe exteriorul mașinii.",
    colors: ["Roz", "Alb"],
    sizes: ["1 L", "5 L"],
    priceBySize: { "1 L": 81, "5 L": 299 }
  },
  {
    id: 13,
    name: "Șampon auto cu ceară Sonax Xtreme Wash & Wax",
    price: 28,
    brand: "Sonax",
    category: "Exterior",
    image: "images/13-sonax-wash-wax.webp",
    description:
      "Șampon auto cu ceară pentru spălare și luciu într-un singur pas. Este potrivit pentru întreținerea rapidă a exteriorului mașinii.",
    colors: ["Portocaliu", "Negru"],
    sizes: ["500 ml", "1 L"],
    priceBySize: { "500 ml": 28, "1 L": 45 }
  },
  {
    id: 14,
    name: "Soluție curățare jante Sonax Wheel Cleaner Full Effect",
    price: 38,
    brand: "Sonax",
    category: "Exterior",
    image: "images/14-sonax-curatare-jante.webp",
    description:
      "Soluție pentru curățarea jantelor, utilă pentru depuneri de praf de frână și murdărie persistentă de pe roți.",
    colors: ["Roșu", "Alb"],
    sizes: ["500 ml"],
    priceBySize: { "500 ml": 38 }
  },
  {
    id: 15,
    name: "Spray ceară lichidă Sonax Xtreme Protect+Shine Spray&Seal",
    price: 65,
    brand: "Sonax",
    category: "Exterior",
    image: "images/15-sonax-ceramic-spray.webp",
    description:
      "Spray de protecție pentru vopsea, folosit după spălare pentru luciu și efect hidrofob pe suprafețele exterioare.",
    colors: ["Argintiu", "Negru"],
    sizes: ["750 ml"],
    priceBySize: { "750 ml": 65 }
  },
  {
    id: 16,
    name: "Soluție curățare interior Sonax Interior Cleaner",
    price: 32,
    brand: "Sonax",
    category: "Interior",
    image: "images/16-sonax-curatare-interior.webp",
    description:
      "Soluție pentru curățarea interiorului mașinii, potrivită pentru plastic, bord și alte suprafețe interioare.",
    colors: ["Bleu", "Gri"],
    sizes: ["500 ml"],
    priceBySize: { "500 ml": 32 }
  },
  {
    id: 17,
    name: "Șampon auto Meguiar's Gold Class Car Wash Shampoo & Conditioner",
    price: 35,
    brand: "Meguiar's",
    category: "Exterior",
    image: "images/17-meguiars-gold-class.webp",
    description:
      "Șampon auto pentru spălare delicată, cu efect de condiționare a suprafeței și finisaj lucios pe exterior.",
    colors: ["Auriu", "Negru"],
    sizes: ["473 ml", "1.4 L"],
    priceBySize: { "473 ml": 35, "1.4 L": 75 }
  },
  {
    id: 18,
    name: "Ceară lichidă Meguiar's Ultimate Liquid Wax",
    price: 95,
    brand: "Meguiar's",
    category: "Exterior",
    image: "images/18-meguiars-liquid-wax.webp",
    description:
      "Ceară lichidă pentru protecția vopselei, recomandată pentru luciu intens și protecție pe suprafețele exterioare.",
    colors: ["Negru", "Gri"],
    sizes: ["473 ml"],
    priceBySize: { "473 ml": 95 }
  },
  {
    id: 19,
    name: "Soluție curățare jante Meguiar's Hot Rims Wheel & Tire Cleaner",
    price: 48,
    brand: "Meguiar's",
    category: "Exterior",
    image: "images/19-meguiars-hot-rims.webp",
    description:
      "Soluție pentru curățarea jantelor și anvelopelor, folosită pentru murdărie, praf de frână și depuneri de pe roți.",
    colors: ["Roșu", "Gri"],
    sizes: ["710 ml"],
    priceBySize: { "710 ml": 48 }
  },
  {
    id: 20,
    name: "Șampon auto cu ceară Turtle Wax Ice Car Wash",
    price: 22,
    brand: "Turtle Wax",
    category: "Exterior",
    image: "images/20-turtlewax-ice-carwash.jpg",
    description:
      "Șampon auto cu ceară pentru spălare și protecție ușoară, potrivit pentru întreținerea exteriorului mașinii.",
    colors: ["Albastru", "Alb"],
    sizes: ["500 ml", "1.4 L"],
    priceBySize: { "500 ml": 22, "1.4 L": 40 }
  },
  {
    id: 21,
    name: "Ceară spray Turtle Wax Ice Spray Wax",
    price: 35,
    brand: "Turtle Wax",
    category: "Exterior",
    image: "images/21-turtlewax-spray-wax.webp",
    description:
      "Ceară spray pentru aplicare rapidă, folosită pentru luciu și protecție pe vopseaua mașinii.",
    colors: ["Verde", "Negru"],
    sizes: ["500 ml"],
    priceBySize: { "500 ml": 35 }
  },
  {
    id: 22,
    name: "Set lavete microfibră Turtle Wax Premium Microfiber Cloths",
    price: 45,
    brand: "Turtle Wax",
    category: "Accesorii",
    image: "images/22-turtlewax-laveta-microfibra.webp",
    description:
      "Set de lavete din microfibră pentru ștergere, uscare și aplicarea produselor de detailing pe interior și exterior.",
    colors: ["Alb", "Gri"],
    sizes: ["3 buc"],
    priceBySize: { "3 buc": 45 }
  }
];

function getColorValue(colorName) {
  if (colorName === "Alb") {
    return "#f8fafc";
  } else if (colorName === "Negru") {
    return "#111827";
  } else if (colorName === "Albastru") {
    return "#2563eb";
  } else if (colorName === "Verde") {
    return "#16a34a";
  } else if (colorName === "Roșu") {
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

// Citire produs din URL
let urlParams = window.location.search;
let productId = parseInt(urlParams.split("=")[1]);

if (isNaN(productId)) {
  productId = 1;
}

let foundProduct = null;

for (let p = 0; p < products.length; p++) {
  if (products[p].id === productId) {
    foundProduct = products[p];
  }
}

// Variabila pentru pretul produsului
let priceEl = null;

if (foundProduct !== null) {
  let nameEl = document.getElementById("product-nume");
  let imageEl = document.getElementById("product-imagine");
  let descriptionEl = document.getElementById("product-descriere");
  let colorContainer = document.querySelector(".color-options");
  let sizeContainer = document.querySelector(".size-options");

  priceEl = document.getElementById("product-pret");

  if (nameEl !== null) {
    nameEl.textContent = foundProduct.name;
  }

  if (imageEl !== null) {
    imageEl.src = foundProduct.image;
    imageEl.alt = foundProduct.name;
  }

  if (priceEl !== null) {
    priceEl.textContent =
      foundProduct.priceBySize[foundProduct.sizes[0]] + " RON";
  }

  if (descriptionEl !== null) {
    descriptionEl.textContent = foundProduct.description;
  }

  if (colorContainer !== null) {
    colorContainer.innerHTML = "";
    for (let t = 0; t < foundProduct.colors.length; t++) {
      let colorBtn = document.createElement("button");
      colorBtn.type = "button";
      colorBtn.className = "color-option";
      colorBtn.title = foundProduct.colors[t];

      let colorDot = document.createElement("span");
      colorDot.className = "color-dot";
      colorDot.style.backgroundColor = getColorValue(foundProduct.colors[t]);
      colorBtn.appendChild(colorDot);
      colorBtn.appendChild(document.createTextNode(foundProduct.colors[t]));

      if (t === 0) {
        colorBtn.classList.add("is-selected");
      }
      colorContainer.appendChild(colorBtn);
    }
  }

  if (sizeContainer !== null) {
    sizeContainer.innerHTML = "";
    for (let v = 0; v < foundProduct.sizes.length; v++) {
      let sizeBtn = document.createElement("button");
      sizeBtn.type = "button";
      sizeBtn.className = "size-option";
      sizeBtn.textContent = foundProduct.sizes[v];
      sizeBtn.title = foundProduct.sizes[v];
      if (v === 0) {
        sizeBtn.classList.add("is-selected");
      }
      sizeContainer.appendChild(sizeBtn);
    }
  }
}

// Variabile pentru cos si cantitate
let cartCount = 0;
let quantity = 1;

// Functie pentru actualizarea cosului
function updateCartCounter() {
  let cartCounterEl = document.getElementById("cart-count");
  if (cartCounterEl !== null) {
    cartCounterEl.textContent = cartCount;
  }

  let cartCountSm = document.getElementById("cart-count-sm");
  if (cartCountSm !== null) {
    cartCountSm.textContent = cartCount;
  }
}

// Functie pentru afisarea cantitatii
function updateQuantityDisplay() {
  let quantityDisplay = document.getElementById("qty-display");
  if (quantityDisplay !== null) {
    quantityDisplay.textContent = quantity;
  }
}

// Eveniment buton adauga in cos
let addToCartBtn = document.getElementById("btn-adauga-cos");

if (addToCartBtn !== null) {
  addToCartBtn.addEventListener("click", function () {
    cartCount = cartCount + quantity;
    updateCartCounter();

    addToCartBtn.textContent = "Adăugat în coș!";
    setTimeout(function () {
      addToCartBtn.textContent = "Adaugă în coș";
    }, 1500);
  });
}

// Eveniment buton plus
let plusBtn = document.querySelector("[aria-label='Crește cantitatea']");

if (plusBtn !== null) {
  plusBtn.addEventListener("click", function () {
    quantity = quantity + 1;
    updateQuantityDisplay();
  });
}

// Eveniment buton minus
let minusBtn = document.querySelector("[aria-label='Scade cantitatea']");

if (minusBtn !== null) {
  minusBtn.addEventListener("click", function () {
    if (quantity > 1) {
      quantity = quantity - 1;
      updateQuantityDisplay();
    }
  });
}

// Eveniment butoane culoare
let colorButtons = document.querySelectorAll(".color-option");

for (let i = 0; i < colorButtons.length; i++) {
  colorButtons[i].addEventListener("click", function () {
    for (let j = 0; j < colorButtons.length; j++) {
      colorButtons[j].classList.remove("is-selected");
    }
    this.classList.add("is-selected");
  });
}

// Eveniment butoane marime
let sizeButtons = document.querySelectorAll(".size-option");

for (let k = 0; k < sizeButtons.length; k++) {
  sizeButtons[k].addEventListener("click", function () {
    for (let l = 0; l < sizeButtons.length; l++) {
      sizeButtons[l].classList.remove("is-selected");
    }
    this.classList.add("is-selected");
    if (foundProduct !== null && priceEl !== null) {
      priceEl.textContent = foundProduct.priceBySize[this.textContent] + " RON";
    }
  });
}
