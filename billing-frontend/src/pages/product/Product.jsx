import React, { useEffect, useState } from 'react';
import API from '../../services/axios';
import './Product.css';

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({ pname: '', price: '', category: '', stock: '' });
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState('');

  const fetchProducts = async () => {
    try {
      const res = await API.get("/product/all");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await API.put(`/product/update/${editId}`, formData);
        setMessage('✅ Product updated!');
      } else {
        await API.post('/product/add', formData);
        setMessage('✅ Product added!');
      }
      setFormData({ pname: '', price: '', category: '', stock: '' });
      setEditId(null);
      fetchProducts();
      setTimeout(() => setMessage(''), 2500);
    } catch (err) {
      console.error(err);
      setMessage('❌ Error saving product');
    }
  };

  const handleEdit = (product) => {
    setFormData({
      pname: product.pname,
      price: product.price,
      category: product.category,
      stock: product.stock,
    });
    setEditId(product._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await API.delete(`/product/delete/${id}`);
        setMessage('🗑️ Product deleted!');
        fetchProducts();
        setTimeout(() => setMessage(''), 2500);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="product-page fade-in">
      <h2 className="page-title">📦 Product Management</h2>

      <div className="product-card glass-box slide-up">
        <form className="product-form" onSubmit={handleSubmit}>
          <div className="input-row">
            <input
              type="text"
              name="pname"
              placeholder="Product Name"
              value={formData.pname}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-row">
            <select name="category" value={formData.category} onChange={handleChange} required>
              <option value="">Select Category</option>
              <option value="Bakery">Bakery</option>
              <option value="Fast Food">Fast Food</option>
              <option value="Milkshake & Ice Creams">Milkshake & Ice Creams</option>
              <option value="Snacks Items">Snacks Items</option>
            </select>

            <input
              type="number"
              name="stock"
              placeholder="Stock"
              value={formData.stock}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            {editId ? 'Update Product' : 'Add Product'}
          </button>
        </form>

        {message && <p className="status-message fade-in">{message}</p>}
      </div>

      <div className="table-section slide-up">
        <table className="product-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price (₹)</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="table-row-animate">
                <td>{p.pname}</td>
                <td>{p.price}</td>
                <td>{p.category}</td>
                <td>{p.stock}</td>
                <td className="action-buttons">
                  <button className="edit-btn" onClick={() => handleEdit(p)}>✏️</button>
                  <button className="delete-btn" onClick={() => handleDelete(p._id)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
