// COMPONENTA CART

import { useEffect, useState } from "react";
import CartItem from "./CartItem.jsx";

// Lista initiala cu produsele din cos
const initialProducts = [
  {
    id: 1,
    name: "Blazer",
    price: 95,
    color: "Beige",
    size: "S",
    quantity: 1,
    image: "/images/blazer.png"
  },
  {
    id: 2,
    name: "Chunky Knit Sweater",
    price: 55,
    color: "Brown",
    size: "M",
    quantity: 1,
    image: "/images/sweater.png"
  },
  {
    id: 3,
    name: "Mesh Sleeve Blouse",
    price: 32,
    color: "Yellow",
    size: "S",
    quantity: 1,
    image: "/images/blouse.png"
  },
  {
    id: 4,
    name: "Retro Jeans",
    price: 70,
    color: "Black",
    size: "S",
    quantity: 1,
    image: "/images/jeans.png"
  }
];

function Cart() {
  const [products, setProducts] = useState(initialProducts);

  // Afisarea starii cosului dupa fiecare modificare
  useEffect(() => {
    console.log("Cart updated:", products);
  }, [products]);

  // Functie pentru marirea cantitatii unui produs
  function increaseQuantity(productId) {
    const updatedProducts = products.map((product) => {
      if (product.id === productId) {
        return {
          id: product.id,
          name: product.name,
          price: product.price,
          color: product.color,
          size: product.size,
          quantity: product.quantity + 1,
          image: product.image
        };
      }

      return product;
    });

    setProducts(updatedProducts);
  }

  // Functie pentru micsorarea cantitatii unui produs
  function decreaseQuantity(productId) {
    const updatedProducts = products.map((product) => {
      if (product.id === productId && product.quantity > 1) {
        return {
          id: product.id,
          name: product.name,
          price: product.price,
          color: product.color,
          size: product.size,
          quantity: product.quantity - 1,
          image: product.image
        };
      }

      return product;
    });

    setProducts(updatedProducts);
  }

  // Functie pentru eliminarea unui produs din cos
  function removeProduct(productId) {
    const updatedProducts = products.filter(
      (product) => product.id !== productId
    );

    setProducts(updatedProducts);
  }

  // Functie pentru calcularea valorii totale a produselor
  function calculateTotal() {
    let total = 0;

    for (let i = 0; i < products.length; i++) {
      total = total + products[i].price * products[i].quantity;
    }

    return total;
  }

  return (
    <main className="cart">
      {products.length === 0 ? (
        <p className="cart__empty">Your cart is empty.</p>
      ) : (
        <>
          <section className="cart__items">
            {/* Generarea listei de produse folosind functia map */}
            {products.map((product) => (
              <CartItem
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                color={product.color}
                size={product.size}
                quantity={product.quantity}
                image={product.image}
                onIncrease={increaseQuantity}
                onDecrease={decreaseQuantity}
                onRemove={removeProduct}
              />
            ))}
          </section>

          {/* Afisarea valorii totale a cosului */}
          <div className="cart__total">
            <span>Total</span>
            <strong>${calculateTotal()}</strong>
          </div>
        </>
      )}
    </main>
  );
}

export default Cart;
