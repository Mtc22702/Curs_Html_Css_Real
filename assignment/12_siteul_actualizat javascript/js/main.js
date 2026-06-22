/* ===== main.js ===== */
/* Functii de baza folosite in site: cupon de reducere, autentificare simpla
   si lista de produse pentru calcule de stoc. */

const PRODUCT1_NAME = "Șampon auto cu efect ceramic";
let PRODUCT1_PRICE = 119;
let PRODUCT1_QTY = 1;

const PRODUCT2_NAME = "Spray protecție vopsea";
let PRODUCT2_PRICE = 65;
let PRODUCT2_QTY = 1;

const VAT = 0.21;
const CURRENCY = "RON";
const RON_TO_EURO = 5.2;
const VALID_COUPONS = ["SAVE10", "SAVE15", "FREESHIP"];

let suma = 0;

function normalizeCoupon(code) {
  let trimmedCode = code.trim();
  let upperCode = trimmedCode.toUpperCase();
  return upperCode;
}

function isValidCoupon(code) {
  for (let i = 0; i < VALID_COUPONS.length; i++) {
    if (VALID_COUPONS[i] === code) {
      return true;
    }
  }

  return false;
}

function validateAndNotify() {
  let input = document.getElementById("promo-input");

  if (!input) {
    return false;
  }

  let code = normalizeCoupon(input.value);
  return isValidCoupon(code);
}

function login() {
  let emailInput = document.getElementById("email");
  let passwordInput = document.getElementById("password");

  if (!emailInput || !passwordInput) {
    return false;
  }

  let email = emailInput.value.trim();
  let password = passwordInput.value.trim();

  if (email === "admin" && password === "admin") {
    return true;
  }

  return false;
}

function showLoginMessage(message, isSuccess) {
  let messageBox = document.getElementById("login-message");

  if (!messageBox) {
    return;
  }

  messageBox.textContent = message;

  if (isSuccess) {
    messageBox.className = "small-text mt-3 mb-0 text-center text-success";
  } else {
    messageBox.className = "small-text mt-3 mb-0 text-center text-danger";
  }
}

function saveLoggedUser() {
  let user = new User("admin", "admin");
  user.login();

  localStorage.setItem(
    "adartaUser",
    JSON.stringify({
      username: user.username,
      email: user.email,
      isLoggedIn: user.isLoggedIn,
      discount: user.getDiscount()
    })
  );
}

function testLogin() {
  if (login()) {
    saveLoggedUser();
    showLoginMessage(
      "Autentificare reușită. Utilizatorul admin a fost salvat.",
      true
    );
  } else {
    localStorage.removeItem("adartaUser");
    showLoginMessage(
      "Username sau parolă greșită. Încearcă admin / admin.",
      false
    );
  }
}

function adaugaLaSuma(pret) {
  suma = suma + pret;
  return suma;
}

function openCart() {
  return true;
}

const allProducts = [
  {
    name: "Șampon auto cu efect ceramic Koch Chemie Ceramic Effect Shampoo, Ces, 1Lt",
    price: 135,
    qty: 15
  },
  {
    name: "Șampon auto reactivare ceramică Koch Chemie Reactivation Shampoo, Rs, 1L",
    price: 89,
    qty: 8
  },
  {
    name: "Polish 3 in 1 cu ceară Carnauba Koch Chemie One Cut and Finish, P6.02, 1L",
    price: 306,
    qty: 5
  },
  {
    name: "Spray protecție vopsea Koch Chemie Spray Sealant, S0.02, 500ml",
    price: 138,
    qty: 20
  },
  {
    name: "Set pensule interior Koch Chemie Interior Brush Set",
    price: 70,
    qty: 3
  },
  {
    name: "Soluție curățare auto alcalină Koch Chemie VorreinigerB, Vb, 1L",
    price: 69,
    qty: 12
  },
  {
    name: "Soluție curățare generală Koch Chemie Mehrzweckreiniger, Mzr, 1L",
    price: 69,
    qty: 7
  },
  {
    name: "Soluție curățare jante reactivă Koch Chemie Magic Wheel Cleaner, Mwc, 500ml",
    price: 94,
    qty: 9
  },
  {
    name: "Soluție curățare universală Koch Chemie Green Star, Gs, 1L",
    price: 46,
    qty: 10
  },
  {
    name: "Soluție spălare fără apă Koch Chemie Wash and Finish, Wf, 1L",
    price: 65,
    qty: 6
  },
  {
    name: "Soluție spălare fără clătire Koch Chemie Rapid Rinseless Wash, Rrw, 1L",
    price: 62,
    qty: 6
  },
  {
    name: "Spumă spălare cu pH neutru Koch Chemie Gentle Snow Foam, Gsf, 1L",
    price: 108,
    qty: 4
  }
];

function calculateStockValue() {
  let totalValue = 0;

  for (let i = 0; i < allProducts.length; i++) {
    totalValue = totalValue + allProducts[i].price * allProducts[i].qty;
  }

  return totalValue;
}

function getLowStockProducts() {
  let lowStock = [];

  for (let i = 0; i < allProducts.length; i++) {
    if (allProducts[i].qty < 10) {
      lowStock.push(allProducts[i]);
    }
  }

  return lowStock;
}

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
