// COMPONENTA CART ITEM

// Afisarea unui produs folosind datele primite prin props
function CartItem(props) {
  return (
    <article className="cart-item">
      <img className="cart-item__image" src={props.image} alt={props.name} />

      <div className="cart-item__details">
        <h2>{props.name}</h2>
        <p>Color: {props.color}</p>
        <p>Size: {props.size}</p>

        {/* Butoane pentru modificarea cantitatii produsului */}
        <div className="quantity">
          <button type="button" onClick={() => props.onDecrease(props.id)}>
            -
          </button>
          <span>{props.quantity}</span>
          <button type="button" onClick={() => props.onIncrease(props.id)}>
            +
          </button>
        </div>
      </div>

      <div className="cart-item__actions">
        <strong>${props.price}</strong>
        <button
          className="remove-button"
          type="button"
          onClick={() => props.onRemove(props.id)}
        >
          Remove
        </button>
      </div>
    </article>
  );
}

export default CartItem;
