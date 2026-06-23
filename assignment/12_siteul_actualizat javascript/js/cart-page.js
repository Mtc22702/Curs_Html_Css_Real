/* ===== cart-page.js ===== */
/* Cosul foloseste clasele Product si Cart din shop-oop.js. */
/* Sloturile de produs sunt deja create static in cart.html (id="cart-item-1" .. "cart-item-12"),
   iar aici sunt doar completate cu date, prin index, fara querySelector/classList/createElement. */

let cartPageCart = createCartFromStorage();

function renderCartItems() {
  let emptyMessage = document.getElementById("cart-empty-message");

  if (emptyMessage) {
    emptyMessage.style.display = cartPageCart.items.length === 0 ? "" : "none";
  }

  for (let i = 1; i <= 12; i++) {
    let article = document.getElementById("cart-item-" + i);

    if (!article) {
      continue;
    }

    if (i > cartPageCart.items.length) {
      article.style.display = "none";
      continue;
    }

    let item = cartPageCart.items[i - 1];
    let product = findShopProductById(item.id);
    let brand = "";

    if (product !== null) {
      brand = product.brand;
    }
    article.style.display = "";

    let img = document.getElementById("cart-item-" + i + "-img");
    let title = document.getElementById("cart-item-" + i + "-title");
    let meta = document.getElementById("cart-item-" + i + "-meta");
    let qtySpan = document.getElementById("cart-item-" + i + "-qty");
    let price = document.getElementById("cart-item-" + i + "-price");

    if (img) {
      img.src = item.image;
      img.alt = item.name;
    }

    if (title) {
      title.innerText = item.name;
    }

    if (meta) {
      meta.innerText = brand + " - " + item.package;
    }

    if (qtySpan) {
      qtySpan.innerText = item.qty;
    }

    if (price) {
      price.innerText = item.price * item.qty + " Ron";
    }
  }
}

function refreshCartPage() {
  renderCartItems();

  let summary = getCartSummary(cartPageCart);
  let subtotalEl = document.getElementById("cart-subtotal");
  let shippingEl = document.getElementById("cart-shipping");
  let totalEl = document.getElementById("cart-total");
  let checkoutLink = document.getElementById("cart-checkout-link");

  if (subtotalEl) {
    subtotalEl.innerText = summary.subtotal + " Ron";
  }

  if (shippingEl) {
    shippingEl.innerText = summary.shipping + " Ron";
  }

  if (totalEl) {
    totalEl.innerText = summary.total + " Ron";
  }

  if (checkoutLink) {
    if (summary.subtotal === 0) {
      checkoutLink.href = "catalog.html";
      checkoutLink.innerText = "Alege produse din catalog";
    } else {
      checkoutLink.href = "checkout.html";
      checkoutLink.innerText = "Continuă la checkout";
    }
  }
}

/* Butoanele fiecarui slot sunt legate o singura data, la incarcarea paginii.
   La click, butonul citeste produsul curent din cartPageCart.items[i - 1],
   ca sa ramana corect si dupa ce alte produse au fost eliminate din cos. */
function setupCartItemSlots() {
  for (let i = 1; i <= 12; i++) {
    let minusBtn = document.getElementById("cart-item-" + i + "-minus-btn");
    let plusBtn = document.getElementById("cart-item-" + i + "-plus-btn");
    let removeBtn = document.getElementById("cart-item-" + i + "-remove-btn");

    if (minusBtn) {
      minusBtn.addEventListener("click", function () {
        if (i > cartPageCart.items.length) {
          return;
        }

        let item = cartPageCart.items[i - 1];
        let product = findShopProductById(item.id);

        if (product !== null) {
          cartPageCart.removeOne(product, item.key);
          saveCartToStorage(cartPageCart);
          updateCartNumbers();
          refreshCartPage();
        }
      });
    }

    if (plusBtn) {
      plusBtn.addEventListener("click", function () {
        if (i > cartPageCart.items.length) {
          return;
        }

        let item = cartPageCart.items[i - 1];
        let product = findShopProductById(item.id);

        if (product !== null) {
          cartPageCart.add(product, 1, item.package);
          saveCartToStorage(cartPageCart);
          updateCartNumbers();
          refreshCartPage();
        }
      });
    }

    if (removeBtn) {
      removeBtn.addEventListener("click", function () {
        if (i > cartPageCart.items.length) {
          return;
        }

        let item = cartPageCart.items[i - 1];
        cartPageCart.removeProduct(item.key);
        saveCartToStorage(cartPageCart);
        updateCartNumbers();
        refreshCartPage();
      });
    }
  }
}

setupCartItemSlots();
refreshCartPage();
