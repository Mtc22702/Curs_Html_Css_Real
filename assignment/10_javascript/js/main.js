/* ===== main.js ===== */

// Constante si variabile
const PRODUS1_NUME = "Sampon auto cu efect ceramic";
let PRODUS1_PRET = 119;
let PRODUS1_CANTITATE = 1;

const PRODUS2_NUME = "Spray protectie vopsea";
let PRODUS2_PRET = 65;
let PRODUS2_CANTITATE = 1;

const TVA = 0.21;
const MONEDA = "RON";
const RON_PENTRU_EURO = 5.2;

// Sirul cu cupoanele valide
const CUPOANE_VALIDE = ["SAVE10", "SAVE15", "FREESHIP"];

console.log(typeof PRODUS1_NUME);
console.log(typeof PRODUS1_PRET);
console.log(typeof PRODUS1_CANTITATE);

console.log(typeof PRODUS2_NUME);
console.log(typeof PRODUS2_PRET);
console.log(typeof PRODUS2_CANTITATE);

console.log(typeof TVA);
console.log(typeof MONEDA);
console.log(typeof RON_PENTRU_EURO);
console.log(CUPOANE_VALIDE);

// Variabila globala pentru suma totala a cumparaturilor
let suma = 0;

// Functie pentru normalizarea codului de reducere
function normalizeazaCupon(cod) {
  let codFaraSpatii = cod.trim();
  let codCuMajuscule = codFaraSpatii.toUpperCase();
  return codCuMajuscule;
}

// Functie care verifica daca un cupon se gaseste in sir
function esteCuponValid(cod) {
  for (let i = 0; i < CUPOANE_VALIDE.length; i++) {
    if (CUPOANE_VALIDE[i] === cod) {
      return true;
    }
  }

  return false;
}

// Validarea cuponului si afisarea mesajului
function valideazaSiNotifica() {
  let codIntrodus = document.getElementById("promo-input").value;
  let cupon = normalizeazaCupon(codIntrodus);

  if (esteCuponValid(cupon)) {
    if (cupon === "SAVE10") {
      alert("Cuponul dvs. ofera 10% reducere.");
    } else if (cupon === "SAVE15") {
      alert("Cuponul dvs. ofera 15% reducere.");
    } else if (cupon === "FREESHIP") {
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
function testeazaLogin() {
  if (login()) {
    alert("Login reusit.");
  } else {
    alert("Email sau parola gresita.");
  }
}

// Functie care adauga pretul produsului la suma globala
function adaugaLaSuma(pret) {
  suma = suma + pret;
  console.log("Suma totala este: " + suma + " RON");
}

// Afisarea sumei totale prin cos
function deschideCos() {
  alert("Suma totala curenta este: " + suma + " RON");
}

// Lista tuturor produselor din magazin
const toateProdusele = [
  {
    nume: "Sampon auto cu efect ceramic Koch Chemie Ceramic Effect Shampoo, Ces, 1Lt",
    pret: 119,
    cantitate: 15
  },
  {
    nume: "Sampon auto reactivare ceramica Koch Chemie Reactivation Shampoo, Rs, 1L",
    pret: 80,
    cantitate: 8
  },
  {
    nume: "Polish 3 in 1 cu ceara Carnauba Koch Chemie One Cut and Finish, P6.02, 1L",
    pret: 280,
    cantitate: 5
  },
  {
    nume: "Spray protectie vopsea Koch Chemie Spray Sealant, S0.02, 500ml",
    pret: 108,
    cantitate: 20
  },
  {
    nume: "Set pensule interior Koch Chemie Interior Brush Set",
    pret: 70,
    cantitate: 3
  },
  {
    nume: "Solutie curatare auto alcalina Koch Chemie VorreinigerB, Vb, 1L",
    pret: 50,
    cantitate: 12
  },
  {
    nume: "Solutie curatare generala Koch Chemie Mehrzweckreiniger, Mzr, 1L",
    pret: 50,
    cantitate: 7
  },
  {
    nume: "Solutie curatare jante reactiva Koch Chemie Magic Wheel Cleaner, Mwc, 500ml",
    pret: 80,
    cantitate: 9
  },
  {
    nume: "Solutie curatare universala Koch Chemie Green Star, Gs, 1L",
    pret: 42,
    cantitate: 2
  },
  {
    nume: "Solutie spalare fara apa Koch Chemie Wash and Finish, Wf, 1L",
    pret: 65,
    cantitate: 18
  },
  {
    nume: "Solutie spalare fara clatire Koch Chemie Rapid Rinseless Wash, Rrw, 1L",
    pret: 62,
    cantitate: 6
  },
  {
    nume: "Spuma spalare cu pH neutru Koch Chemie Gentle Snow Foam, Gsf, 1L",
    pret: 81,
    cantitate: 4
  }
];

// Functie care calculeaza valoarea totala a stocului
function calculeazaValoareaStocului() {
  let valoareTotala = 0;

  for (let i = 0; i < toateProdusele.length; i++) {
    valoareTotala =
      valoareTotala + toateProdusele[i].pret * toateProdusele[i].cantitate;
  }

  console.log("Valoarea totala a stocului: " + valoareTotala + " RON");
  return valoareTotala;
}

// Produsele cu stoc mic, unde cantitatea este mai mica decat 10
let stocMic = [];

for (let i = 0; i < toateProdusele.length; i++) {
  if (toateProdusele[i].cantitate < 10) {
    stocMic.push(toateProdusele[i]);
  }
}

console.log("Produse cu stoc mic:");
console.log(stocMic);

// Cautare produs dupa nume, fara sa conteze majusculele
function cautaProdusDupaNume(lista, numeCautat) {
  let numeCautatNormalizat = numeCautat.toLowerCase().trim();

  for (let i = 0; i < lista.length; i++) {
    let numeProdusNormalizat = lista[i].nume.toLowerCase().trim();

    if (numeProdusNormalizat === numeCautatNormalizat) {
      return lista[i];
    }
  }

  return null;
}

// Demonstrarea functiei cu trei apeluri diferite
adaugaLaSuma(119);
console.log(suma);

adaugaLaSuma(65);
console.log(suma);

adaugaLaSuma(19);
console.log(suma);

// Testam functiile in consola
console.log(esteCuponValid("SAVE10"));
console.log(esteCuponValid("TEST"));
calculeazaValoareaStocului();
console.log(
  cautaProdusDupaNume(
    toateProdusele,
    "Polish 3 in 1 cu ceara Carnauba Koch Chemie One Cut and Finish, P6.02, 1L"
  )
);
console.log(
  cautaProdusDupaNume(
    toateProdusele,
    "polish 3 in 1 cu ceara carnauba koch chemie one cut and finish, p6.02, 1l"
  )
);
console.log(cautaProdusDupaNume(toateProdusele, "Produs inexistent"));
