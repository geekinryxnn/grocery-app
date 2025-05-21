function ShoppingCart({ cart, removeFromCart }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="shopping-cart">
      <h2>Your Shopping Cart</h2>
      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <a href="/products" className="continue-shopping">Continue Shopping</a>
        </div>
      ) : (
        <>
          <ul className="cart-items">
            {cart.map((item, index) => (
              <li key={`${item.id}-${index}`} className="cart-item">
                <div className="cart-item-details">
                  {item.image && (
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="cart-item-image"
                      onError={(e) => {
                        e.target.onerror = null; 
                        e.target.src = 'https://via.placeholder.com/50x50?text=No+Img';
                      }}
                    />
                  )}
                  <div>
                    <span className="cart-item-name">{item.name}</span>
                    <span className="cart-item-price">${item.price.toFixed(2)}</span>
                  </div>
                </div>
                <button 
                  onClick={() => removeFromCart(index)}
                  className="remove-btn"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <div className="cart-total">
              <h3>Total: ${total.toFixed(2)}</h3>
            </div>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
}

export default ShoppingCart;