import React, { useEffect, useState } from "react";
import API from "../../services/axios";
import "./Summary.css";

export default function SummaryPage() {
  const [summary, setSummary] = useState({
    categorySummary: {},
    totalInvoices: 0,
    todaySales: 0,
  });

  const fetchSummary = async () => {
    try {
      const res = await API.get("/dashboard/summary");
      setSummary(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  const handlePrint = () => window.print();

  const { categorySummary, totalInvoices, todaySales } = summary;

  return (
    <div className="summary-page fade-in">
      {/* ===== HEADER ===== */}
      <div className="summary-header slide-down">
        <h2>📈 Sales Summary Dashboard</h2>
        <button onClick={handlePrint} className="print-btn">
          🖨️ Print Report
        </button>
      </div>

      {/* ===== KPI CARDS ===== */}
      <div className="kpi-container slide-up">
        <div className="kpi-card">
          <h4>Today's Sales</h4>
          <p className="value">₹{todaySales}</p>
        </div>
        <div className="kpi-card">
          <h4>Total Invoices</h4>
          <p className="value">{totalInvoices}</p>
        </div>
      </div>

      {/* ===== CATEGORY SUMMARY ===== */}
      <div className="category-section">
        {Object.keys(categorySummary).length === 0 ? (
          <p className="no-data">No summary data available</p>
        ) : (
          Object.keys(categorySummary).map((cat, index) => (
            <div key={cat} className="category-box glass-box fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
              <h3>{cat}</h3>
              <table>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Qty</th>
                    <th>Amount</th>
                    <th>Category</th>
                  </tr>
                </thead>
                <tbody>
                  {categorySummary[cat].items.map((item, idx) => (
                    <tr key={idx}>
                      <td>{item.name}</td>
                      <td>{item.qty}</td>
                      <td>₹{item.amount}</td>
                      <td>{item.category}</td>
                    </tr>
                  ))}
                  <tr className="category-total">
                    <td><b>Total</b></td>
                    <td><b>{categorySummary[cat].totalQty}</b></td>
                    <td><b>₹{categorySummary[cat].totalAmount}</b></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
