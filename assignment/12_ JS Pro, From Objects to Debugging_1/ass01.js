// lista de produse din magazin
let products = [
  {
    id: 1,
    name: "Sampon auto cu efect ceramic Koch Chemie Ceramic Effect Shampoo, Ces, 1Lt",
    price: 119,
    quantity: 10,
    category: "Exterior"
  },
  {
    id: 2,
    name: "Sampon auto reactivare ceramica Koch Chemie Reactivation Shampoo, Rs, 1L",
    price: 80,
    quantity: 5,
    category: "Exterior"
  },
  {
    id: 3,
    name: "Set pensule interior Koch Chemie Interior Brush Set",
    price: 70,
    quantity: 0,
    category: "Interior"
  },
  {
    id: 4,
    name: "Solutie curatare generala Koch Chemie Mehrzweckreiniger, Mzr, 1L",
    price: 50,
    quantity: 8,
    category: "Interior"
  }
];
// date despre utilizator
let user = {
  username: "matteo92",
  email: "matteo92@example.com",
  isLoggedIn: true
};

// cosul porneste gol
let cart = {
  items: [],
  totalPrice: 0
};

// calculeaza totalul din cos
function calculateTotal(cart) {
  let total = 0;
  for (let i = 0; i < cart.items.length; i++) {
    total += cart.items[i].price * cart.items[i].quantity;
  }
  cart.totalPrice = total;
  return cart.totalPrice;
}

// verifica daca produsul este in stoc
function isInStock(product, requestedQty) {
  return product.quantity >= requestedQty;
}

// adauga un produs in cos
function addToCart(cart, product, qty) {
  if (!isInStock(product, qty)) {
    console.log("Nu sunt suficiente bucati in stoc pentru: " + product.name);
    return;
  }

  // verific daca produsul e deja in cos
  let existingItem = null;
  for (let i = 0; i < cart.items.length; i++) {
    if (cart.items[i].id === product.id) {
      existingItem = cart.items[i];
      break;
    }
  }

  if (existingItem) {
    existingItem.quantity += qty;
  } else {
    cart.items.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: qty
    });
  }

  product.quantity -= qty;
  calculateTotal(cart);
}
// sterge un produs din cos
function removeFromCart(cart, productId) {
  let index = -1;
  for (let i = 0; i < cart.items.length; i++) {
    if (cart.items[i].id === productId) {
      index = i;
      break;
    }
  }

  if (index === -1) {
    console.log("Produsul cu id " + productId + " nu se afla in cos");
    return;
  }

  let removedItem = cart.items[index];

  // pune inapoi in stoc cantitatea scoasa din cos
  for (let i = 0; i < products.length; i++) {
    if (products[i].id === removedItem.id) {
      products[i].quantity += removedItem.quantity;
      break;
    }
  }

  cart.items.splice(index, 1);
  calculateTotal(cart);
}

// functie arrow care returneaza produsele mai ieftine decat limita
const getCheapProducts = (products, limit) =>
  products.filter((product) => product.price < limit);

// functie anonima care cauta produsele dupa categorie
let getProductsByCategory = function (products, category) {
  return products.filter(function (product) {
    return product.category === category;
  });
};

// closure: contorul ramane privat in functie
function createDiscountTracker() {
  let usedDiscounts = 0;
  return function () {
    usedDiscounts++;
    return usedDiscounts;
  };
}

// ---- teste ----

console.log("-- isInStock --");
// are 10 bucati, cer 5 (true)
console.log(isInStock(products[0], 5));
// set pensule are 0 in stoc (false)
console.log(isInStock(products[2], 1));

console.log("-- addToCart --");
addToCart(cart, products[0], 2);
addToCart(cart, products[1], 1);
console.log(cart);

// adaug din nou acelasi produs ca sa vad ca nu se dubleaza
addToCart(cart, products[0], 3);
console.log(cart);

// cazuri cu erori
addToCart(cart, products[2], 1);
addToCart(cart, products[1], 100);

console.log("-- removeFromCart --");
removeFromCart(cart, 2);
console.log(cart);

// id care nu exista
removeFromCart(cart, 99);

console.log("-- calculateTotal --");
console.log(calculateTotal(cart));
// cos gol
let cosGol = { items: [], totalPrice: 0 };
console.log(calculateTotal(cosGol));

console.log("-- getCheapProducts --");
console.log(getCheapProducts(products, 100));
// niciun produs sub 10
console.log(getCheapProducts(products, 10));

console.log("-- getProductsByCategory --");
console.log(getProductsByCategory(products, "Interior"));
// categorie inexistenta
console.log(getProductsByCategory(products, "electronics"));

console.log("-- createDiscountTracker --");
let trackDiscount = createDiscountTracker();
console.log(trackDiscount());
console.log(trackDiscount());
console.log(trackDiscount());
