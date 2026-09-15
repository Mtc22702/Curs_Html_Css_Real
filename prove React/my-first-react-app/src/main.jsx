import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import macImage from "./assets/macbook-air-m5-15.png";

const discoverBrandsEl = (
  <div className="discover-section">
    <h2>Discover Brands</h2>
    <p>
      Discover a collection that blends style and comfort. Browse our carefully
      selected pieces of modern clothing that follow the latest trends while
      staying true to your unique style.
    </p>
  </div>
);

const bannerEl = (
  <section className="season-banner">
    <p>Enjoy 20% Off This Season’s Styles</p>
    <button>Show All</button>
  </section>
);
function makeMessage(age) {
  if (age > 17) {
    return <div className="age-message">You are Welcome!</div>;
  } else {
    return <div className="age-message-no">You can't enter!</div>;
  }
}

const elem = makeMessage(18);

const categories = ["Clothing", "Shoes", "Accessories", "Bags", "Hats"];

const elemUl = (
  <section className="categories-section">
    <p className="section-label">Explore</p>
    <h2>Shop by category</h2>
    <ul className="category-list">
      {categories.map((value) => {
        return <li key={value}>{value}</li>;
      })}
    </ul>
  </section>
);

const products = [
  { id: 1, name: "Blue T-Shirt", price: 25, discount: 5 },
  { id: 2, name: "Black Hoodie", price: 50, discount: 10 },
  { id: 3, name: "White Sneakers", price: 80, discount: 20 }
];

function handleAddToCart(productName) {
  console.log(`Added ${productName} to cart`);
}

const productsElement = (
  <section className="products-section">
    <div className="products-heading">
      <p className="section-label">New arrivals</p>
      <h1>Products</h1>
    </div>

    <div className="products-grid">
      {products.map((product) => {
        const finalPrice = product.price - product.discount;

        return (
          <article className="product-card" key={product.id}>
            <div className="product-card-image" aria-hidden="true">
              <span>{product.name.charAt(0)}</span>
            </div>
            <div className="product-card-content">
              <h2>{product.name}</h2>
              <p className="product-original-price">
                Original price: ${product.price}
              </p>
              <div className="product-card-price">
                <strong>${finalPrice}</strong>
                <span>Save ${product.discount}</span>
              </div>
              <button onClick={() => handleAddToCart(product.name)}>
                Add to Cart
              </button>
            </div>
          </article>
        );
      })}
    </div>
  </section>
);

function sayHelloWorld() {
  alert("Hello world");
}
const elemHello = (
  <section className="hello-section">
    <button className="hello-button" onClick={sayHelloWorld}>
      Say Hello World <span aria-hidden="true">→</span>
    </button>
  </section>
);
function Counter() {
  const [counter, setCounter] = useState(0);

  function onClick() {
    setCounter((currentCounter) => {
      const nextCounter = currentCounter + 1;
      console.log(nextCounter);
      return nextCounter;
    });
  }

  return (
    <section className="counter-section">
      <p className="section-label">Interactive test</p>
      <h2>Counter</h2>
      <button className="counter-button" onClick={onClick}>
        <span className="counter-symbol" aria-hidden="true">
          +
        </span>
        <span>Count: {counter}</span>
      </button>
    </section>
  );
}

function Product(props) {
  return (
    <div className="product-page">
      <div className="product-gallery">
        <div className="main-image-wrapper">
          <img src={props.image} alt={props.name} className="main-image" />
        </div>
        <div className="product-info">
          <h1 className="product-title">{props.name}</h1>
          <p className="price">${props.price}</p>
          <p className="description">{props.description}</p>
        </div>
      </div>
    </div>
  );
}

const elementProps = (
  <Product
    name={'MacBook Air 15" con chip M5'}
    price={2499}
    description="Un notebook leggero da 15 pollici con display ampio, prestazioni veloci e batteria per tutta la giornata."
    image={macImage}
  />
);

const name = "Matteo";
const age = 43;

const personEl = (
  <div className="personEl">
    <h1>Ciao {name} !</h1>
    <p>Hai {age} anni</p>
  </div>
);

const users = [
  { name: "Matteo", posts: 5 },
  { name: "Ancu", posts: 10 }
];

const totalPosts = users.map((u) => u.posts).reduce((a, b) => a + b, 0);
<p>{totalPosts}</p>;

const root = createRoot(document.getElementById("root"));
root.render(
  <div>
    {discoverBrandsEl}
    {bannerEl}
    {elem}
    {elemUl}
    {productsElement}
    {elemHello}
    <Counter />
    {elementProps}
  </div>
);
