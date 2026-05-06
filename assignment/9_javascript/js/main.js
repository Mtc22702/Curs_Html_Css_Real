/* ===== main.js ===== */

// Constante si variabile
const PRODUCT1_NAME = 'Sampon auto cu efect ceramic';
let PRODUCT1_PRICE = 119;
let PRODUCT1_QTY = 1;

const PRODUCT2_NAME = 'Spray protecție vopsea';
let PRODUCT2_PRICE = 65;
let PRODUCT2_QTY = 1;

const VAT_RATE = 0.21;
const CURRENCY = 'RON';
const RON_PER_EUR = 5.2;
const RAW_COUPON = 'SAVE10';

console.log(typeof PRODUCT1_NAME);
console.log(typeof PRODUCT1_PRICE);
console.log(typeof PRODUCT1_QTY);

console.log(typeof PRODUCT2_NAME);
console.log(typeof PRODUCT2_PRICE);
console.log(typeof PRODUCT2_QTY);

console.log(typeof VAT_RATE);
console.log(typeof CURRENCY);
console.log(typeof RON_PER_EUR);

// Variabila globala pentru suma totala a cumparaturilor
let suma = 0;

// Functie pentru normalizarea codului de reducere
function normalizeCoupon(code) {
  let trimmedCode = code.trim();
  let upperCode = trimmedCode.toUpperCase();
  return upperCode;
}

// Validarea cuponului si afisarea mesajului
function validateAndNotify() {
  let inputCode = document.getElementById('promo-input').value;
  let coupon = normalizeCoupon(inputCode);

  if (coupon === RAW_COUPON) {
    alert('Codul introdus este valid !');
  } else {
    alert('Codul introdus NU este valid.');
  }
}

// Functie pentru autentificare
function login() {
  let email = document.getElementById('email').value.trim();
  let password = document.getElementById('password').value.trim();

  if (email === 'admin' && password === 'admin') {
    return true;
  } else {
    return false;
  }
}

// Testarea functiei login
function testLogin() {
  if (login()) {
    alert('Login reusit.');
  } else {
    alert('Email sau parola gresita.');
  }
}

// Demonstrarea functiei cu trei apeluri diferite

adaugaLaSuma(119);
console.log(suma);

adaugaLaSuma(65);
console.log(suma);

adaugaLaSuma(19);
console.log(suma);

// Functie care adauga pretul produsului la suma globala
function adaugaLaSuma(preț) {
  suma = suma + preț;
  console.log('Suma totala este: ' + suma + ' RON');
}

// Afisarea sumei totale prin cos
function openCart() {
  alert('Suma totala curenta este: ' + suma + ' RON');
}
