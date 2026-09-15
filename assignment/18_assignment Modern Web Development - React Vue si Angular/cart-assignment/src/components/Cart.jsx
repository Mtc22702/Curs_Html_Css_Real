// COMPONENTA CART

import { Component } from 'react'
import CartItem from './CartItem.jsx'

class Cart extends Component {
  constructor(props) {
    super(props)

    // Lista initiala cu produsele din cos
    this.state = {
      products: [
        {
          id: 1,
          name: 'Blazer',
          price: 95,
          color: 'Beige',
          size: 'S',
          quantity: 1,
          image: '/images/blazer.png',
        },
        {
          id: 2,
          name: 'Chunky Knit Sweater',
          price: 55,
          color: 'Brown',
          size: 'M',
          quantity: 1,
          image: '/images/sweater.png',
        },
        {
          id: 3,
          name: 'Mesh Sleeve Blouse',
          price: 32,
          color: 'Yellow',
          size: 'S',
          quantity: 1,
          image: '/images/blouse.png',
        },
        {
          id: 4,
          name: 'Retro Jeans',
          price: 70,
          color: 'Black',
          size: 'S',
          quantity: 1,
          image: '/images/jeans.png',
        },
      ],
    }
  }

  // Functie pentru calcularea valorii totale a produselor
  calculateTotal() {
    let total = 0

    for (let i = 0; i < this.state.products.length; i++) {
      total =
        total +
        this.state.products[i].price * this.state.products[i].quantity
    }

    return total
  }

  render() {
    return (
      <main className="cart">
        <section className="cart__items">
          {/* Generarea listei de produse folosind functia map */}
          {this.state.products.map((product) => (
            <CartItem
              key={product.id}
              name={product.name}
              price={product.price}
              color={product.color}
              size={product.size}
              quantity={product.quantity}
              image={product.image}
            />
          ))}
        </section>

        {/* Afisarea valorii totale a cosului */}
        <div className="cart__total">
          <span>Total</span>
          <strong>${this.calculateTotal()}</strong>
        </div>
      </main>
    )
  }
}

export default Cart
