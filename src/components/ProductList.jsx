function ProductList({ products, addToCart }) {
    return (
      <div className="product-list">
        <h2>Our Grocery Products</h2>
        <div className="products-container">
          {products.map(product => (
            <div key={product.id} className="product-card">
              {product.image && (
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="product-image"
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                  }}
                />
              )}
              <h3>{product.name}</h3>
              <p>${product.price.toFixed(2)}</p>
              <p>Category: {product.category}</p>
              <button 
                onClick={() => addToCart(product)}
                disabled={!product.inStock}
              >
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  export default ProductList;