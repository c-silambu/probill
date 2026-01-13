import React, { useEffect, useState } from "react";
import API from "../../services/axios";
import "./InvoiceCreate.css";

const InvoiceCreate = () => {
  const [productlist, setProductlist] = useState([]);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [items, setItems] = useState([]);

  // ✅ Fetch all products
  useEffect(() => {
    API.get("/product/all")
      .then((res) => setProductlist(res.data))
      .catch((err) => console.error(err));
  }, []);

  // ✅ Search box logic
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value.trim()) {
      const matches = productlist.filter((p) =>
        p.pname.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
  };

  // ✅ Add product item
  const addItem = () => {
    if (!selectedProduct) {
      alert("Select a product before adding!");
      return;
    }

    const total = selectedProduct.price * quantity;
    const newItem = {
      productId: selectedProduct._id,
      pname: selectedProduct.pname,
      price: selectedProduct.price,
      quantity,
      total,
    };

    setItems((prev) => [...prev, newItem]);
    setSearch("");
    setQuantity(1);
    setSelectedProduct(null);
  };

  // ✅ Remove item
  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  // ✅ Totals
  const subTotal = items.reduce((sum, i) => sum + i.total, 0);
  const tax = subTotal * 0.05;
  const grandTotal = subTotal + tax;

  // ✅ Generate bill
  const handleSubmit = async () => {
    if (items.length === 0) {
      alert("Add at least one item before generating a bill!");
      return;
    }

    try {
      const payload = {
        invoiceNo: "INV-" + Date.now(),
        date: new Date(),
        items,
        totalAmount: grandTotal,
      };

      const res = await API.post("/bill/create", payload);
      if (res.status === 200 || res.status === 201) {
        alert("✅ Bill Created Successfully!");
        setItems([]);
      } else {
        alert("⚠️ Bill creation failed.");
      }
    } catch (error) {
      console.error(error);
      alert("Server Error: Unable to create bill.");
    }
  };

  // ✅ UI Rendering
  return (
    <div className="invoice-page fade-in">
      <h2 className="page-title">🧾 Billing System</h2>

      <div className="invoice-card glass-box slide-up">
        {/* Product Search */}
        <div className="search-section">
          <input
            placeholder="🔍 Search product..."
            value={search}
            onChange={handleSearchChange}
            className="search-input"
          />

          {suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map((p) => (
                <li
                  key={p._id}
                  onClick={() => {
                    setSelectedProduct(p);
                    setSearch(p.pname);
                    setSuggestions([]);
                  }}
                >
                  {p.pname}
                  <span className="price">₹{p.price}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Quantity + Add */}
        <div className="quantity-section">
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(+e.target.value)}
            className="qty-input"
          />
          <button className="add-btn" onClick={addItem}>
            + Add Item
          </button>
        </div>

        {/* Bill Table */}
        <table className="invoice-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((i, index) => (
              <tr key={index}>
                <td>{i.pname}</td>
                <td>₹{i.price}</td>
                <td>{i.quantity}</td>
                <td>₹{i.total}</td>
                <td>
                  <button
                    className="remove-btn"
                    onClick={() => removeItem(index)}
                  >
                    ✕
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <div className="totals-section">
          <p>
            Subtotal: <span>₹{subTotal}</span>
          </p>
          <p>
            Tax (5%): <span>₹{tax.toFixed(2)}</span>
          </p>
          <h3>
            Grand Total: <span>₹{grandTotal.toFixed(2)}</span>
          </h3>
        </div>

        <button className="generate-btn" onClick={handleSubmit}>
          💰 Generate Bill
        </button>
      </div>
    </div>
  );
};

export default InvoiceCreate;
