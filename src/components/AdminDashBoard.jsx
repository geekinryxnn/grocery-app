import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductForm from './ProductForm';

function AdminDashboard({ products, onAddProduct, onDeleteProduct }) {
  const [activeTab, setActiveTab] = useState('add');

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <div className="admin-tabs">
        <button 
          onClick={() => setActiveTab('add')}
          className={activeTab === 'add' ? 'active' : ''}
        >
          Add Product
        </button>
        <button 
          onClick={() => setActiveTab('manage')}
          className={activeTab === 'manage' ? 'active' : ''}
        >
          Manage Products
        </button>
      </div>

      {activeTab === 'add' && (
        <div className="admin-section">
          <h3>Add New Product</h3>
          <ProductForm addProduct={onAddProduct} />
        </div>
      )}

      {activeTab === 'manage' && (
        <div className="admin-section">
          <h3>Current Products ({products.length})</h3>
          <div className="product-management-list">
            {products.map(product => (
              <div key={product.id} className="product-management-item">
                <span>{product.name} - ${product.price}</span>
                <button 
                  onClick={() => onDeleteProduct(product.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;