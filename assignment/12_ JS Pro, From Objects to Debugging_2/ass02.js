// --- Product ---

class Product {
  #quantity;

  constructor(id, name, price, quantity) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.#quantity = quantity;
  }

  // cantitate
  get quantity() {
    return this.#quantity;
  }

  // scade stocul
  decreaseStock(qty) {
    if (qty <= 0) {
      console.log("Cantitatea trebuie sa fie mai mare decat 0.");
      return false;
    }

    if (qty > this.#quantity) {
      console.log("Stoc insuficient pentru: " + this.name);
      return false;
    }

    this.#quantity = this.#quantity - qty;
    return true;
  }

  // creste stocul
  increaseStock(qty) {
    if (qty <= 0) {
      console.log("Cantitatea trebuie sa fie mai mare decat 0.");
      return false;
    }

    this.#quantity = this.#quantity + qty;
    return true;
  }
}

// --- User ---

class User {
  #isLoggedIn;

  constructor(username, email) {
    this.username = username;
    this.email = email;
    this.#isLoggedIn = false;
  }

  // stare conectare
  get isLoggedIn() {
    return this.#isLoggedIn;
  }

  // login
  login() {
    this.#isLoggedIn = true;
    console.log(this.username + " s-a conectat.");
  }

  // logout
  logout() {
    this.#isLoggedIn = false;
    console.log(this.username + " s-a deconectat.");
  }

  // reducere
  getDiscount() {
    return 0;
  }
}

// --- Admin ---

// Admin mosteneste User
class Admin extends User {
  constructor(username, email, role) {
    super(username, email);
    this.role = role;
  }

  // adauga produs
  addNewProduct(products, product) {
    products.push(product);
    console.log("Produs adaugat de admin: " + product.name);
  }

  // reducere admin (polimorfism)
  getDiscount() {
    return 0.1;
  }
}

// --- Cart ---

class Cart {
  constructor() {
    this.items = [];
  }

  // adauga in cos
  add(product, qty) {
    if (qty <= 0) {
      console.log("Cantitatea trebuie sa fie mai mare decat 0.");
      return false;
    }

    if (product.quantity < qty) {
      console.log("Nu sunt suficiente produse in stoc pentru: " + product.name);
      return false;
    }

    let foundItem = null;

    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].id === product.id) {
        foundItem = this.items[i];
        break;
      }
    }

    if (foundItem !== null) {
      foundItem.qty = foundItem.qty + qty;
    } else {
      this.items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        qty: qty
      });
    }

    product.decreaseStock(qty);
    return true;
  }

  // total cos
  getTotal() {
    let total = 0;

    for (let i = 0; i < this.items.length; i++) {
      total = total + this.items[i].price * this.items[i].qty;
    }

    return total;
  }
}

// --- Date ---

let p1 = new Product(
  1,
  "Sampon auto cu efect ceramic Koch Chemie Ceramic Effect Shampoo, 1L",
  119,
  10
);

let p2 = new Product(
  2,
  "Sampon auto reactivare ceramica Koch Chemie Reactivation Shampoo, 1L",
  80,
  5
);

let p3 = new Product(
  3,
  "Set pensule interior Koch Chemie Interior Brush Set",
  70,
  0
);

let user1 = new User("matteo92", "matteo92@example.com");
let admin1 = new Admin("admin_shop", "admin@shop.com", "manager");
let cart1 = new Cart();

let products = [p1, p2, p3];

// --- Teste ---

console.log("------ TEST PRODUCT ------");

console.log("Cantitate p1 la inceput:");
console.log(p1.quantity);

console.log("Scad 3 bucati din p1:");
p1.decreaseStock(3);
console.log(p1.quantity);

console.log("Incerc sa scad din p3 care are stoc 0:");
p3.decreaseStock(1);

console.log("Cresc stocul pentru p3 cu 5:");
p3.increaseStock(5);
console.log(p3.quantity);

console.log("------ TEST USER ------");

console.log("User conectat la inceput:");
console.log(user1.isLoggedIn);
user1.login();
console.log(user1.isLoggedIn);
user1.logout();
console.log(user1.isLoggedIn);

console.log("Reducere user normal:");
console.log(user1.getDiscount());

console.log("------ TEST ADMIN ------");

console.log("Admin mosteneste login din User:");
admin1.login();
console.log(admin1.isLoggedIn);

console.log("Rol admin:");
console.log(admin1.role);

console.log("Reducere admin:");
console.log(admin1.getDiscount());

console.log("Admin adauga un produs nou in lista:");
let p4 = new Product(
  4,
  "Solutie curatare generala Koch Chemie Mehrzweckreiniger, 1L",
  50,
  8
);

admin1.addNewProduct(products, p4);
console.log(products.length);

console.log("------ TEST CART ------");

console.log("Adaug p1 in cos, 2 bucati:");
cart1.add(p1, 2);

console.log("Adaug p2 in cos, 1 bucata:");
cart1.add(p2, 1);

console.log("Produse in cos:");
console.log(cart1.items);

console.log("Total:");
console.log(cart1.getTotal());

console.log("Adaug din nou p1, ca sa vad ca nu se dubleaza:");
cart1.add(p1, 1);

console.log("Produse in cos dupa:");
console.log(cart1.items);

console.log("Total dupa:");
console.log(cart1.getTotal());

console.log("Incerc sa adaug prea multe bucati din p3:");
cart1.add(p3, 10);
