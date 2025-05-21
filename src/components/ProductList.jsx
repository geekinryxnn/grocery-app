import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

function ProductList({ products, addToCart }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const categories = ['All', 'Fruits', 'Vegetables', 'Dairy', 'Bakery', 'Meat'];
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, products]);

  useEffect(() => {
    const urlCategory = searchParams.get('category');
    if (urlCategory) {
      setSelectedCategory(urlCategory.charAt(0).toUpperCase() + urlCategory.slice(1));
    }
  }, [searchParams]);

  return (
    <div className="product-list-container">
      <div className="product-sidebar">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span>🔍</span>
        </div>

        <div className="category-filter">
          <h3>Categories</h3>
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="product-list">
        <h2>{selectedCategory === 'All' ? 'All Products' : selectedCategory}</h2>
        <p className="product-count">{filteredProducts.length} items</p>
        
        <div className="products-container">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
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
            ))
          ) : (
            <p className="no-results">No products match your search</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductList;