/* ===== cart-page.js ===== */
/* Coșul folosește clasele Product și Cart din shop-oop.js. */

let cartPageCart = createCartFromStorage();

function renderCartItems() {
  let cartBox = document.querySelector('section[aria-label="Produse în coș"] .site-card');

  if (!cartBox) {
    return;
  }

  cartBox.innerHTML = "";

  if (cartPageCart.items.length === 0) {
    return;
  }

  for (let i = 0; i < cartPageCart.items.length; i++) {
    let item = cartPageCart.items[i];
    let article = document.createElement("article");
    article.className = "cart-page-item";

    article.innerHTML =
      '<div class="cart-item-thumb d-flex align-items-center">' +
      '<img alt="' + item.name + '" src="' + item.image + '" />' +
      '</div>' +
      '<div>' +
      '<h2 class="h5 mb-2">' + item.name + '</h2>' +
      '<p class="cart-item-meta mb-2 d-flex align-items-center">Koch Chemie - ' + item.package + '</p>' +
      '<div class="quantity-box d-inline-flex align-items-center">' +
      '<button aria-label="Scade cantitatea" class="d-inline-flex align-items-center justify-content-center" data-cart-key="' + item.key + '" data-cart-id="' + item.id + '" data-cart-action="minus" type="button">−</button>' +
      '<span>' + item.qty + '</span>' +
      '<button aria-label="Crește cantitatea" class="d-inline-flex align-items-center justify-content-center" data-cart-key="' + item.key + '" data-cart-id="' + item.id + '" data-cart-action="plus" type="button">+</button>' +
      '</div>' +
      '<div class="mt-2">' +
      '<button class="cart-remove border-0 bg-transparent p-0" data-cart-key="' + item.key + '" data-cart-id="' + item.id + '" data-cart-action="remove" type="button">Elimină</button>' +
      '</div>' +
      '</div>' +
      '<p class="cart-item-price d-flex align-items-center fw-bold text-start">' + item.price * item.qty + ' Ron</p>';

    cartBox.appendChild(article);
  }
}

function refreshCartPage() {
  renderCartItems();

  let summary = getCartSummary(cartPageCart);
  let subtotal = summary.subtotal;
  let shipping = summary.shipping;
  let discount = summary.discount;
  let total = summary.total;

  let subtotalEl = document.querySelector('[data-cart-field="subtotal"]');
  let shippingEl = document.querySelector('[data-cart-field="shipping"]');
  let totalEl = document.querySelector('[data-cart-field="total"]');
  let checkoutLink = document.querySelector('[data-cart-field="checkout-link"]');
  let discountEl = document.querySelector('[data-cart-field="discount"]');

  if (subtotalEl) {
    subtotalEl.textContent = subtotal + " Ron";
  }
  if (shippingEl) {
    shippingEl.textContent = shipping + " Ron";
  }
  if (discountEl) {
    discountEl.textContent = discount + " Ron";
  }
  if (totalEl) {
    totalEl.textContent = total + " Ron";
  }

  if (checkoutLink) {
    if (subtotal === 0) {
      checkoutLink.setAttribute("href", "catalog.html");
      checkoutLink.textContent = "Alege produse din catalog";
    } else {
      checkoutLink.setAttribute("href", "checkout.html");
      checkoutLink.textContent = "Continuă la checkout";
    }
  }

  let cartButtons = document.querySelectorAll("[data-cart-action]");

  for (let i = 0; i < cartButtons.length; i++) {
    cartButtons[i].addEventListener("click", function () {
      let productId = Number(this.getAttribute("data-cart-id"));
      let action = this.getAttribute("data-cart-action");
      let itemKey = this.getAttribute("data-cart-key");
      let product = findShopProductById(productId);

      if (action === "plus" && product !== null) {
        let itemPackage = "";

        for (let i = 0; i < cartPageCart.items.length; i++) {
          if (cartPageCart.items[i].key === itemKey) {
            itemPackage = cartPageCart.items[i].package;
          }
        }

        cartPageCart.add(product, 1, itemPackage);
      } else if (action === "minus" && product !== null) {
        cartPageCart.removeOne(product, itemKey);
      } else if (action === "remove") {
        cartPageCart.removeProduct(itemKey);
      }

      saveCartToStorage(cartPageCart);
      updateCartNumbers();
      refreshCartPage();
    });
  }
}

refreshCartPage();
