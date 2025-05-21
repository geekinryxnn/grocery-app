import { useState } from 'react';

function ProductForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Fruits',
    image: ''
  });

  const categories = ['Fruits', 'Vegetables', 'Dairy', 'Bakery', 'Meat'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const productToAdd = {
      ...formData,
      price: parseFloat(formData.price),
      inStock: true
    };
    onSubmit(productToAdd);
    setFormData({ 
      name: '', 
      price: '', 
      category: 'Fruits',
      image: '' 
    });
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <div className="form-group">
        <label>
          Image URL:
          <input 
            type="url" 
            name="image" 
            value={formData.image} 
            onChange={handleChange} 
            placeholder="https://example.com/image.jpg"
          />
        </label>
      </div>
      
      {formData.image && (
        <div className="image-preview">
          <img src={formData.image} alt="Preview" />
        </div>
      )}
      
      <div className="form-group">
        <label>
          Product Name:
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
          />
        </label>
      </div>
      
      <div className="form-group">
        <label>
          Price:
          <input 
            type="number" 
            name="price" 
            value={formData.price} 
            onChange={handleChange} 
            step="0.01" 
            min="0.01"
            required 
          />
        </label>
      </div>
      
      <div className="form-group">
        <label>
          Category:
          <select 
            name="category" 
            value={formData.category} 
            onChange={handleChange}
            required
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </label>
      </div>
      
      <button type="submit" className="submit-btn">Add Product</button>
    </form>
  );
}

export default ProductForm;