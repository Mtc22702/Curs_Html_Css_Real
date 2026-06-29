// PAGINA PRODUS - Assignment 04

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
    description:
      "Sampon cu efect ceramic pentru spalare manuala. Curata si protejeaza vopseaua, sticla si plasticul intr-un singur pas. Recomandat pentru suprafete deja ceramice.",
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
    description:
      "Sampon acid pentru reactivarea acoperirilor ceramice. Elimina depunerile hidrofobe si calcarul, restaurand performanta de respingere a apei.",
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
    description:
      "Polish de masina pentru corectia vopselei si finisare intr-un singur pas. Elimina zgarieturile fine incepand de la granulatia P2000 si sigileaza suprafata simultan.",
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
    description:
      "Spray sealant pentru aplicare rapida dupa spalare. Sigileaza vopseaua, creeaza o suprafata hidrofoba si ofera luciu intens cu efect pana la 12 saptamani.",
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
    description:
      "Pre-spalator alcalin cu putere mare de spumare. Dizolva insectele, excrementele de pasari si murdaria de pe caroserie si jante inainte de spalarea cu sampon.",
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
    description:
      "Degresant multi-uz pentru interior. Curata tapiteria, plasticul, bordul si captuseala tavanului fara a necesita clatire. Aprobat Daimler.",
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
    description:
      "Curatator reactiv pentru jante care isi schimba culoarea in rosu la contactul cu particulele de fier. Curata jantele din aliaj, crom si otel fara acizi.",
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
    description:
      "Solutie de spalare fara apa pentru vehicule usor murdare. Curata, ingrijeste si sigileaza vopseaua, sticla si plasticul intr-un singur pas.",
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
      "Set de pensule pentru detailing, util pentru zone greu accesibile, grile, embleme, interior si exterior. Potrivite pentru curatare delicata.",
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
    description:
      "Solutie universala concentrata pentru curatare auto. Poate fi folosita pe zone murdare ale exteriorului, jante, praguri si alte suprafete rezistente.",
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
    description:
      "Solutie pentru spalare fara clatire, potrivita pentru curatarea rapida a exteriorului atunci cand nu este posibila spalarea clasica cu jet de apa.",
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
    description:
      "Spuma cu pH neutru pentru prespalare si spalare delicata. Produce spuma densa si ajuta la desprinderea murdariei de pe exteriorul masinii.",
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
    description:
      "Sampon auto cu ceara pentru spalare si luciu intr-un singur pas. Este potrivit pentru intretinerea rapida a exteriorului masinii.",
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
    description:
      "Solutie pentru curatarea jantelor, utila pentru depuneri de praf de frana si murdarie persistenta de pe roti.",
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
    description:
      "Spray de protectie pentru vopsea, folosit dupa spalare pentru luciu si efect hidrofob pe suprafetele exterioare.",
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
    description:
      "Solutie pentru curatarea interiorului masinii, potrivita pentru plastic, bord si alte suprafete interioare.",
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
    description:
      "Sampon auto pentru spalare delicata, cu efect de conditionare a suprafetei si finisaj lucios pe exterior.",
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
    description:
      "Ceara lichida pentru protectia vopselei, recomandata pentru luciu intens si protectie pe suprafetele exterioare.",
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
    description:
      "Solutie pentru curatarea jantelor si anvelopelor, folosita pentru murdarie, praf de frana si depuneri de pe roti.",
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
    description:
      "Sampon auto cu ceara pentru spalare si protectie usoara, potrivit pentru intretinerea exteriorului masinii.",
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
    description:
      "Ceara spray pentru aplicare rapida, folosita pentru luciu si protectie pe vopseaua masinii.",
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
    description:
      "Set de lavete din microfibra pentru stergere, uscare si aplicarea produselor de detailing pe interior si exterior.",
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

    addToCartBtn.textContent = "Adaugat in cos!";
    setTimeout(function () {
      addToCartBtn.textContent = "Adauga in cos";
    }, 1500);
  });
}

// Eveniment buton plus
let plusBtn = document.querySelector("[aria-label='Creste cantitatea']");

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
