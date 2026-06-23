// Mini eCommerce Debug Lab - JS

const products = [
  { id: 1, name: "Basic T-Shirt", price: 19, stock: 5 },
  { id: 2, name: "Denim Jacket", price: 79, stock: 3 },
  { id: 3, name: "Running Sneakers", price: 120, stock: 2 }
];

let cart = [];
let discount = 0;

const addButtons = document.querySelectorAll(".add-to-cart");
const cartItemsEl = document.getElementById("cart-list");
const totalPriceEl = document.getElementById("total-price");

function updateStock() {
  document.querySelectorAll(".product-card").forEach((card) => {
    const id = Number(card.dataset.id);
    const product = products.find((item) => item.id === id);
    card.querySelector(".stock-value").textContent = product.stock;
  });
}

function renderCart() {
  cartItemsEl.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    total += item.price * item.qty;

    const listItem = document.createElement("li");
    listItem.textContent = `${item.name} x${item.qty} - $${(item.price * item.qty).toFixed(2)}`;
    cartItemsEl.appendChild(listItem);
  });

  total = total - total * discount;
  totalPriceEl.textContent = `$${total.toFixed(2)}`;
  updateStock();
}

function addToCart(productId) {
  const product = products.find((item) => item.id === productId);

  if (product.stock <= 0) {
    alert("Out of stock!");
    return;
  }

  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  product.stock -= 1;
  renderCart();
}

addButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const card = event.target.closest(".product-card");
    const id = Number(card.dataset.id);
    addToCart(id);
  });
});

document.getElementById("apply-coupon").addEventListener("click", () => {
  const code = document
    .getElementById("coupon-input")
    .value.trim()
    .toUpperCase();

  if (code === "SAVE10") {
    discount = 0.1;
    document.getElementById("coupon-status").textContent =
      "Coupon applied: 10% off!";
  } else {
    discount = 0;
    document.getElementById("coupon-status").textContent = "Invalid coupon.";
  }

  renderCart();
});

document.getElementById("clear-cart").addEventListener("click", () => {
  cart.forEach((cartItem) => {
    const product = products.find((item) => item.id === cartItem.id);
    product.stock += cartItem.qty;
  });

  cart = [];
  discount = 0;
  document.getElementById("coupon-status").textContent = "No coupon applied.";
  renderCart();
});

renderCart();
