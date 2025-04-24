import { Link } from 'react-router-dom';
import '../index.css';

function Navbar({ cartCount }) {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">Home</Link>
      <Link to="/products" className="nav-link">Products</Link>
      <Link to="/add-product" className="nav-link">Add Product</Link>
      <Link to="/cart" className="nav-link cart-link">
        Cart ({cartCount})
      </Link>
    </nav>
  );
}

export default Navbar;