import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ProductList from './components/ProductList';
import ShoppingCart from './components/ShoppingCart';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import productsData from './data/db.json';
import './index.css';

function App() {
  const [products, setProducts] = useState(productsData.products);
  const [cart, setCart] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const ADMIN_CREDENTIALS = {
    username: "admin",
    password: "admin123"
  };

  const addProduct = (newProduct) => {
    const id = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    const productToAdd = { ...newProduct, id };
    setProducts([...products, productToAdd]);
  };

  const deleteProduct = (productId) => {
    setProducts(products.filter(product => product.id !== productId));
    // Also remove from cart if present
    setCart(cart.filter(item => item.id !== productId));
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const handleAdminLogin = (username, password) => {
    if (username === ADMIN_CREDENTIALS.username && 
        password === ADMIN_CREDENTIALS.password) {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
  };

  return (
    <Router>
      <div className="App">
        <Navbar 
          cartCount={cart.length} 
          isAdmin={isAdmin} 
          onLogout={handleAdminLogout} 
        />
        <main className="main-content">
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
              path="/admin/login" 
              element={
                isAdmin ? (
                  <Navigate to="/admin/dashboard" replace />
                ) : (
                  <AdminLogin onLogin={handleAdminLogin} />
                )
              } 
            />
            <Route 
              path="/admin/dashboard" 
              element={
                isAdmin ? (
                  <AdminDashboard 
                    products={products}
                    onAddProduct={addProduct}
                    onDeleteProduct={deleteProduct}
                  />
                ) : (
                  <Navigate to="/admin/login" replace />
                )
              } 
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
        </main>
      </div>
    </Router>
  );
}

export default App;
