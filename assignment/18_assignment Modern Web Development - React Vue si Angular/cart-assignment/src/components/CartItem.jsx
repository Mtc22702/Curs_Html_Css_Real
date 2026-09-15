// COMPONENTA CART ITEM

// Afisarea unui produs folosind datele primite prin props
function CartItem(props) {
  return (
    <article className="cart-item">
      <img
        className="cart-item__image"
        src={props.image}
        alt={props.name}
      />

      <div className="cart-item__details">
        <h2>{props.name}</h2>
        <p>Color: {props.color}</p>
        <p>Size: {props.size}</p>

        {/* Butoanele pentru cantitate nu sunt functionale in acest assignment */}
        <div className="quantity">
          <button type="button">-</button>
          <span>{props.quantity}</span>
          <button type="button">+</button>
        </div>
      </div>

      <div className="cart-item__actions">
        <strong>${props.price}</strong>
        <button className="remove-button" type="button">
          Remove
        </button>
      </div>
    </article>
  )
}

export default CartItem
