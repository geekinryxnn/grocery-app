import { Link } from 'react-router-dom';
import '../index.css';

function Navbar({ cartCount, isAdmin, onLogout }) {
  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/products" className="nav-link">Products</Link>
        
        {isAdmin ? (
          <>
            <Link to="/admin/dashboard" className="nav-link">Dashboard</Link>
            <button onClick={onLogout} className="nav-link logout-btn">Logout</button>
          </>
        ) : (
          <Link to="/admin/login" className="nav-link">Admin</Link>
        )}
        
        <Link to="/cart" className="nav-link cart-link">
          Cart ({cartCount})
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;