import { useState } from 'react';

function ProductForm({ addProduct }) {
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
    addProduct(productToAdd);
    setFormData({ 
      name: '', 
      price: '', 
      category: 'Fruits',
      image: '' 
    });
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <h2>Add New Product</h2>
      
      {formData.image && (
        <div className="image-preview">
          <img src={formData.image} alt="Preview" />
        </div>
      )}
      
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
      <label>
        Description:
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          placeholder="Enter product description..."
        />
      </label>
      
      
      <button type="submit">Add Product</button>
    </form>
  );
}

export default ProductForm;