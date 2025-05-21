import { Link } from 'react-router-dom';
import '../index.css';

function Home() {
  const featuredCategories = [
    { name: "Fruits", icon: "🍎" },
    { name: "Vegetables", icon: "🥦" },
    { name: "Dairy", icon: "🥛" },
    { name: "Bakery", icon: "🥖" },
    { name: "Meat", icon: "🥩" }
  ];

  return (
    <div className="home-container">
      <section className="hero-banner">
        <h1>The Grocery Store App <span>🛒</span></h1>
        <p>Your one-stop shop for fresh groceries delivered fast</p>
        <Link to="/products" className="cta-button">Shop Now →</Link>
      </section>

      <section className="featured-section">
        <h2>Shop by Category</h2>
        <div className="category-grid">
          {featuredCategories.map((category, index) => (
            <Link 
              to={`/products?category=${category.name.toLowerCase()}`} 
              key={index}
              className="category-card"
            >
              <span className="category-icon">{category.icon}</span>
              <h3>{category.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      <section className="testimonial">
        <blockquote>
          "The Grocery Store App saved me 3 hours weekly on grocery shopping! The quality is always fresh."
          <cite>- Happy Customer</cite>
        </blockquote>
      </section>
    </div>
  );
}

export default Home;