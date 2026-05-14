/* ===== main.js ===== */

// Constante si variabile
const PRODUCT1_NAME = "Sampon auto cu efect ceramic";
let PRODUCT1_PRICE = 119;
let PRODUCT1_QTY = 1;

const PRODUCT2_NAME = "Spray protectie vopsea";
let PRODUCT2_PRICE = 65;
let PRODUCT2_QTY = 1;

const VAT = 0.21;
const CURRENCY = "RON";
const RON_TO_EURO = 5.2;

// Sirul cu cupoanele valide
const VALID_COUPONS = ["SAVE10", "SAVE15", "FREESHIP"];

console.log(typeof PRODUCT1_NAME);
console.log(typeof PRODUCT1_PRICE);
console.log(typeof PRODUCT1_QTY);

console.log(typeof PRODUCT2_NAME);
console.log(typeof PRODUCT2_PRICE);
console.log(typeof PRODUCT2_QTY);

console.log(typeof VAT);
console.log(typeof CURRENCY);
console.log(typeof RON_TO_EURO);
console.log(VALID_COUPONS);

// Variabila globala pentru suma totala a cumparaturilor
let suma = 0;

// Functie pentru normalizarea codului de reducere
function normalizeCoupon(code) {
  let trimmedCode = code.trim();
  let upperCode = trimmedCode.toUpperCase();
  return upperCode;
}

// Functie care verifica daca un cupon se gaseste in sir
function isValidCoupon(code) {
  for (let i = 0; i < VALID_COUPONS.length; i++) {
    if (VALID_COUPONS[i] === code) {
      return true;
    }
  }

  return false;
}

// Validarea cuponului si afisarea mesajului
function validateAndNotify() {
  let inputCode = document.getElementById("promo-input").value;
  let code = normalizeCoupon(inputCode);

  if (isValidCoupon(code)) {
    if (code === "SAVE10") {
      alert("Cuponul dvs. ofera 10% reducere.");
    } else if (code === "SAVE15") {
      alert("Cuponul dvs. ofera 15% reducere.");
    } else if (code === "FREESHIP") {
      alert("Cuponul dvs. ofera livrare gratuita.");
    }
  } else {
    alert("Codul introdus NU este valid.");
  }
}

// Functie pentru autentificare
function login() {
  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value.trim();

  if (email === "admin" && password === "admin") {
    return true;
  } else {
    return false;
  }
}

// Testarea functiei login
function testLogin() {
  if (login()) {
    alert("Login reusit.");
  } else {
    alert("Email sau parola gresita.");
  }
}

// Functie care adauga pretul produsului la suma globala
function adaugaLaSuma(pret) {
  suma = suma + pret;
  console.log("Total: " + suma + " RON");
}

// Demonstrarea functiei cu trei apeluri diferite
adaugaLaSuma(119);
console.log(suma);

adaugaLaSuma(65);
console.log(suma);

adaugaLaSuma(19);
console.log(suma);

// Afisarea sumei totale prin cos
function openCart() {
  alert("Suma totala curenta este: " + suma + " RON");
}

// Lista tuturor produselor din magazin
const allProducts = [
  {
    name: "Sampon auto cu efect ceramic Koch Chemie Ceramic Effect Shampoo, Ces, 1Lt",
    pret: 119,
    qty: 15
  },
  {
    name: "Sampon auto reactivare ceramica Koch Chemie Reactivation Shampoo, Rs, 1L",
    pret: 80,
    qty: 8
  },
  {
    name: "Polish 3 in 1 cu ceara Carnauba Koch Chemie One Cut and Finish, P6.02, 1L",
    pret: 280,
    qty: 5
  },
  {
    name: "Spray protectie vopsea Koch Chemie Spray Sealant, S0.02, 500ml",
    pret: 108,
    qty: 20
  },
  {
    name: "Set pensule interior Koch Chemie Interior Brush Set",
    pret: 70,
    qty: 3
  },
  {
    name: "Solutie curatare auto alcalina Koch Chemie VorreinigerB, Vb, 1L",
    pret: 50,
    qty: 12
  },
  {
    name: "Solutie curatare generala Koch Chemie Mehrzweckreiniger, Mzr, 1L",
    pret: 50,
    qty: 7
  },
  {
    name: "Solutie curatare jante reactiva Koch Chemie Magic Wheel Cleaner, Mwc, 500ml",
    pret: 80,
    qty: 9
  },
  {
    name: "Solutie spalare fara clatire Koch Chemie Rapid Rinseless Wash, Rrw, 1L",
    pret: 62,
    qty: 6
  },
  {
    name: "Spuma spalare cu pH neutru Koch Chemie Gentle Snow Foam, Gsf, 1L",
    pret: 81,
    qty: 4
  }
];

// Functie care calculeaza valoarea totala a stocului
function calculateStockValue() {
  let totalValue = 0;

  for (let i = 0; i < allProducts.length; i++) {
    totalValue = totalValue + allProducts[i].pret * allProducts[i].qty;
  }

  console.log("Valoarea totala a stocului: " + totalValue + " RON");
  return totalValue;
}

// Produsele cu stoc mic, (cantitatea mai mica decat 10 buc.)
let lowStock = [];

for (let i = 0; i < allProducts.length; i++) {
  if (allProducts[i].qty < 10) {
    lowStock.push(allProducts[i]);
  }
}

console.log("Produse cu stoc mic:");
console.log(lowStock);

// Cautare produs dupa nume, fara sa conteze majusculele
function findProductByName(list, searchName) {
  let normalizedSearch = searchName.toLowerCase().trim();

  for (let i = 0; i < list.length; i++) {
    let normalizedName = list[i].name.toLowerCase().trim();

    if (normalizedName === normalizedSearch) {
      return list[i];
    }
  }

  return null;
}

// Test functiile in consola
console.log(isValidCoupon("SAVE10"));
console.log(isValidCoupon("TEST"));
calculateStockValue();
console.log(
  findProductByName(
    allProducts,
    "Polish 3 in 1 cu ceara Carnauba Koch Chemie One Cut and Finish, P6.02, 1L"
  )
);
console.log(
  findProductByName(
    allProducts,
    "polish 3 in 1 cu ceara carnauba koch chemie one cut and finish, p6.02, 1l"
  )
);
console.log(findProductByName(allProducts, "Produs 1"));
