/* ===== shop-oop.js ===== */
/* Logica orientata pe obiecte a magazinului: clase de baza pentru produse,
   utilizator si cos de cumparaturi. */
/* Metodele claselor doar returneaza valori; afisarea pe pagina se face in alt fisier. */

// Clasa Product - un produs din magazin (id, nume, pret, stoc, variante).
class Product {
  #quantity;

  constructor(id, name, price, quantity, image, variants) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.image = image;
    this.variants = variants || [{ label: "Standard", price: price }];
    this.#quantity = quantity;
  }

  get quantity() {
    return this.#quantity;
  }

  getDefaultVariant() {
    if (this.variants.length > 0) {
      return this.variants[0];
    }

    return { label: "Standard", price: this.price };
  }

  getVariant(label) {
    for (let i = 0; i < this.variants.length; i++) {
      if (this.variants[i].label === label) {
        return this.variants[i];
      }
    }

    return this.getDefaultVariant();
  }

  getVariantPrice(label) {
    return this.getVariant(label).price;
  }

  decreaseStock(qty) {
    if (qty <= 0) {
      return false;
    }

    if (qty > this.#quantity) {
      return false;
    }

    this.#quantity = this.#quantity - qty;
    return true;
  }

  increaseStock(qty) {
    if (qty <= 0) {
      return false;
    }

    this.#quantity = this.#quantity + qty;
    return true;
  }
}

// Clasa User - un utilizator simplu, cu autentificare de baza.
class User {
  #isLoggedIn;

  constructor(username, email) {
    this.username = username;
    this.email = email;
    this.#isLoggedIn = false;
  }

  get isLoggedIn() {
    return this.#isLoggedIn;
  }

  login() {
    this.#isLoggedIn = true;
    return this.#isLoggedIn;
  }

  logout() {
    this.#isLoggedIn = false;
    return this.#isLoggedIn;
  }

  getDiscount() {
    return 0;
  }
}

// Clasa Admin - extinde User, cu un rol si o reducere proprie.
class Admin extends User {
  constructor(username, email, role) {
    super(username, email);
    this.role = role;
  }

  addNewProduct(products, product) {
    products.push(product);
    return products.length;
  }

  getDiscount() {
    return 0.1;
  }
}

// Clasa Cart - gestioneaza produsele adaugate in cos (adaugare, eliminare, total).
class Cart {
  constructor() {
    this.items = [];
  }

  getItemKey(productId, variantLabel) {
    return productId + "-" + variantLabel;
  }

  getItemQty(productId) {
    let count = 0;

    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].id === productId) {
        count = count + this.items[i].qty;
      }
    }

    return count;
  }

  add(product, qty, variantLabel) {
    if (qty <= 0) {
      return false;
    }

    let variant = product.getVariant(variantLabel || product.getDefaultVariant().label);
    let itemKey = this.getItemKey(product.id, variant.label);
    let foundItem = null;

    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].key === itemKey) {
        foundItem = this.items[i];
        break;
      }
    }

    let currentProductQty = this.getItemQty(product.id);

    if (currentProductQty + qty > product.quantity) {
      return false;
    }

    if (foundItem !== null) {
      foundItem.qty = foundItem.qty + qty;
    } else {
      this.items.push({
        key: itemKey,
        id: product.id,
        name: product.name,
        package: variant.label,
        price: variant.price,
        image: product.image,
        qty: qty
      });
    }

    return true;
  }

  removeOne(product, itemKey) {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].key === itemKey || (!itemKey && this.items[i].id === product.id)) {
        if (this.items[i].qty > 1) {
          this.items[i].qty = this.items[i].qty - 1;
        } else {
          let newItems = [];

          for (let j = 0; j < this.items.length; j++) {
            if (j !== i) {
              newItems.push(this.items[j]);
            }
          }

          this.items = newItems;
        }

        return true;
      }
    }

    return false;
  }

  removeProduct(itemKey) {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].key === itemKey || String(this.items[i].id) === String(itemKey)) {
        let newItems = [];

        for (let j = 0; j < this.items.length; j++) {
          if (j !== i) {
            newItems.push(this.items[j]);
          }
        }

        this.items = newItems;
        return true;
      }
    }

    return false;
  }

  getTotal() {
    let total = 0;

    for (let i = 0; i < this.items.length; i++) {
      total = total + this.items[i].price * this.items[i].qty;
    }

    return total;
  }

  getItemsCount() {
    let count = 0;

    for (let i = 0; i < this.items.length; i++) {
      count = count + this.items[i].qty;
    }

    return count;
  }
}

// Lista de produse disponibile in magazin, construita din clasa Product.
const shopProducts = [
  new Product(1, "Șampon auto cu efect ceramic Koch Chemie Ceramic Effect Shampoo, Ces, 1Lt", 135, 15, "images/1-sampon-auto-cu-efect-ceramic-koch-chemie-ceramic-effect-shampoo-ces-1l-438344-480.jpg", [{ label: "1 L", price: 135 }, { label: "5 L", price: 450 }]),
  new Product(2, "Șampon auto reactivare ceramică Koch Chemie Reactivation Shampoo, Rs, 1L", 89, 8, "images/2-sampon-auto-reactivare-ceramica-koch-chemie-reactivation-shampoo-1l-767567-480.jpg", [{ label: "1 L", price: 89 }]),
  new Product(3, "Polish 3 in 1 cu ceară Carnauba Koch Chemie One Cut and Finish, P6.02, 1L", 306, 5, "images/3-Pasta-Polish-3-in-1-Koch-Chemie-One-Cut-Finish-P6.02-250ml-1000x1000-480.jpg", [{ label: "250 ml", price: 95 }, { label: "1 L", price: 306 }]),
  new Product(4, "Spray protecție vopsea Koch Chemie Spray Sealant, S0.02, 500ml", 138, 20, "images/4-spray-protectie-vopsea-koch-chemie-spray-sealant-s0-02-500ml-673060-480.jpg", [{ label: "500 ml", price: 138 }]),
  new Product(5, "Set pensule interior Koch Chemie Interior Brush Set", 70, 3, "images/5-Set-Pensule-Detailing-Interior-Koch-Chemie-3-buc-1000x1000-480.jpg", [{ label: "3 buc", price: 70 }]),
  new Product(6, "Soluție curățare auto alcalină Koch Chemie VorreinigerB, Vb, 1L", 69, 12, "images/6-solutie-curatare-auto-alcalina-koch-chemie-vorreinigerb-vb-1l-505138-480.webp", [{ label: "1 L", price: 69 }, { label: "5 L", price: 179 }]),
  new Product(7, "Soluție curățare generală Koch Chemie Mehrzweckreiniger, Mzr, 1L", 69, 7, "images/7-Solutie-Curatare-Generala-Koch-Chemie-MZR-Mehrzweckreiniger-1L-1000x1000h-480.jpg", [{ label: "1 L", price: 69 }, { label: "10 L", price: 307 }]),
  new Product(8, "Soluție curățare jante reactivă Koch Chemie Magic Wheel Cleaner, Mwc, 500ml", 94, 9, "images/8-solutie-curatare-jante-reactiva-koch-chemie-magic-wheel-cleaner-mwc-500ml-573022-480.jpg", [{ label: "500 ml", price: 94 }]),
  new Product(9, "Soluție curățare universală Koch Chemie Green Star, Gs, 1L", 46, 10, "images/9-solutie-curatare-universala-koch-chemie-green-star-gs-1l-3229062912-480.jpg", [{ label: "1 L", price: 46 }, { label: "5 L", price: 190 }, { label: "11 kg", price: 336 }]),
  new Product(10, "Soluție spălare fără apă Koch Chemie Wash and Finish, Wf, 1L", 65, 6, "images/10-solutie-spalare-fara-apa-koch-chemie-wash-and-finish-wf-1l-977478-480.jpg", [{ label: "1 L", price: 65 }]),
  new Product(11, "Soluție spălare fără clătire Koch Chemie Rapid Rinseless Wash, Rrw, 1L", 62, 6, "images/11-solutie-spalare-fara-clatire-koch-chemie-rapid-rinseless-wash-rrw-1l-685449-480.jpg", [{ label: "1 L", price: 62 }]),
  new Product(12, "Spumă spălare cu pH neutru Koch Chemie Gentle Snow Foam, Gsf, 1L", 108, 4, "images/12-spuma-spalare-cu-ph-neutru-koch-chemie-gentle-snow-foam-gsf-1l-592375-480.jpg", [{ label: "1 L", price: 108 }, { label: "5 L", price: 370 }])
];

function findShopProductById(id) {
  for (let i = 0; i < shopProducts.length; i++) {
    if (shopProducts[i].id === id) {
      return shopProducts[i];
    }
  }

  return null;
}

function createCartFromStorage() {
  let cart = new Cart();
  let savedItems = [];

  try {
    savedItems = JSON.parse(localStorage.getItem("adartaCart")) || [];
  } catch (error) {
    savedItems = [];
  }

  for (let i = 0; i < savedItems.length; i++) {
    let product = findShopProductById(Number(savedItems[i].id));
    let savedQty = Number(savedItems[i].qty);
    let savedPackage = savedItems[i].package || product && product.getDefaultVariant().label;

    if (product !== null && savedQty > 0) {
      if (cart.getItemQty(product.id) + savedQty > product.quantity) {
        savedQty = product.quantity - cart.getItemQty(product.id);
      }

      if (savedQty > 0) {
        let variant = product.getVariant(savedPackage);
        cart.items.push({
          key: savedItems[i].key || cart.getItemKey(product.id, variant.label),
          id: product.id,
          name: product.name,
          package: variant.label,
          price: variant.price,
          image: product.image,
          qty: savedQty
        });
      }
    }
  }

  return cart;
}

function saveCartToStorage(cart) {
  let cleanItems = [];

  for (let i = 0; i < cart.items.length; i++) {
    if (cart.items[i].qty > 0) {
      cleanItems.push(cart.items[i]);
    }
  }

  localStorage.setItem("adartaCart", JSON.stringify(cleanItems));
}
