function ShoppingCart({ cart, removeFromCart }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="shopping-cart">
      <h2>Your Shopping Cart</h2>
      {cart.length === 0 ? (
        <p className="empty-message">Your cart is empty</p>
      ) : (
        <>
          <ul className="cart-items">
            {cart.map((item, index) => (
              <li key={`${item.id}-${index}`} className="cart-item">
                <div style={{ display: 'flex', alignItems: 'center' }}>
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
                  <span>{item.name} - ${item.price.toFixed(2)}</span>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="remove-btn"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <h3>Total: ${total.toFixed(2)}</h3>
          </div>
        </>
      )}
    </div>
  );
}

export default ShoppingCart;