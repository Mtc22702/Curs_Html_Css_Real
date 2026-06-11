let products = [
  { id: 1, name: "Denim Shirt", price: 34, quantity: 10, category: "clothing" },
  {
    id: 2,
    name: "Running Shoes",
    price: 65,
    quantity: 5,
    category: "footwear"
  },
  { id: 3, name: "Wool Hat", price: 18, quantity: 0, category: "accessories" },
  {
    id: 4,
    name: "Leather Belt",
    price: 45,
    quantity: 8,
    category: "accessories"
  }
];

let user = {
  username: "matteo92",
  email: "matteo92@example.com",
  isLoggedIn: true
};

let cart = {
  items: [],
  totalPrice: 0
};

function calculateTotal(cart) {
  let total = 0;
  for (let i = 0; i < cart.items.length; i++) {
    total += cart.items[i].price * cart.items[i].quantity;
  }
  cart.totalPrice = total;
  return cart.totalPrice;
}

function isInStock(product, requestedQty) {
  return product.quantity >= requestedQty;
}

function addToCart(cart, product, qty) {
  if (!isInStock(product, qty)) {
    console.log("Nu sunt suficiente bucati in stoc pentru " + product.name);
    return;
  }

  let existingItem = null;
  for (let i = 0; i < cart.items.length; i++) {
    if (cart.items[i].id === product.id) {
      existingItem = cart.items[i];
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

function removeFromCart(cart, productId) {
  let index = -1;
  for (let i = 0; i < cart.items.length; i++) {
    if (cart.items[i].id === productId) {
      index = i;
    }
  }

  if (index === -1) {
    console.log("Produsul cu id " + productId + " nu se afla in cos");
    return;
  }

  let removedItem = cart.items[index];

  for (let i = 0; i < products.length; i++) {
    if (products[i].id === removedItem.id) {
      products[i].quantity += removedItem.quantity;
    }
  }

  cart.items.splice(index, 1);
  calculateTotal(cart);
}

const getCheapProducts = (products, limit) =>
  products.filter((product) => product.price < limit);

let getProductsByCategory = function (products, category) {
  return products.filter(function (product) {
    return product.category === category;
  });
};

function createDiscountTracker() {
  let usedDiscounts = 0;
  return function () {
    usedDiscounts++;
    return usedDiscounts;
  };
}

console.log("--- Test isInStock ---");
console.log(isInStock(products[0], 5));
console.log(isInStock(products[2], 1));

console.log("--- Test addToCart ---");
addToCart(cart, products[0], 2);
addToCart(cart, products[1], 1);
console.log(cart);

addToCart(cart, products[0], 3);
console.log(cart);

addToCart(cart, products[2], 1);

addToCart(cart, products[1], 100);

console.log("--- Test removeFromCart ---");
removeFromCart(cart, 2);
console.log(cart);

removeFromCart(cart, 99);

console.log("--- Test getCheapProducts ---");
console.log(getCheapProducts(products, 50));
console.log(getCheapProducts(products, 10));

console.log("--- Test getProductsByCategory ---");
console.log(getProductsByCategory(products, "accessories"));
console.log(getProductsByCategory(products, "electronics"));

console.log("--- Test createDiscountTracker ---");
let trackDiscount = createDiscountTracker();
console.log(trackDiscount());
console.log(trackDiscount());
console.log(trackDiscount());
