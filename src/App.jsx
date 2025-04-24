import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar.jsx';
import Home from './components/Home.jsx';
import ProductList from './components/ProductList.jsx';
import ProductForm from './components/ProductForm.jsx';
import ShoppingCart from './components/ShoppingCart.jsx';
import productsData from './data/db.json';
import './index.css';

function App() {
  const [products, setProducts] = useState(productsData.products);
  const [cart, setCart] = useState([]);

  const addProduct = (newProduct) => {
    const id = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    const productToAdd = { ...newProduct, id, inStock: true };
    setProducts([...products, productToAdd]);
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  return (
    <Router>
      <div className="App">
        <Navbar cartCount={cart.length} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/products" 
            element={
              <ProductList 
                products={products} 
                addToCart={addToCart} 
              />
            } 
          />
          <Route 
            path="/add-product" 
            element={<ProductForm addProduct={addProduct} />} 
          />
          <Route 
            path="/cart" 
            element={
              <ShoppingCart 
                cart={cart} 
                removeFromCart={removeFromCart} 
              />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
