import React, { useEffect, useState } from "react";
import API from "../../services/axios";
import "./Dashboard.css";

export default function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [recentBills, setRecentBills] = useState([]);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const summaryRes = await API.get("/dashboard/summary");
      const recentRes = await API.get("/dashboard/recentbill");
      setSummary(summaryRes.data);
      setRecentBills(recentRes.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!summary) return <p className="loading-text">Loading dashboard...</p>;

  return (
    <div className="dashboard">
      {/* ===== KPI CARDS ===== */}
      <div className="dashboard-cards">
        <div className="card fade-in">
          <h4>Total Invoices</h4>
          <p>{summary.totalInvoices}</p>
        </div>

        <div className="card fade-in delay-1">
          <h4>Today Sales</h4>
          <p>₹ {summary.todaySales}</p>
        </div>
      </div>

      {/* ===== CATEGORY WISE TABLE ===== */}
      <div className="category-summary glass-box fade-in delay-2">
        <h3>Category Summary</h3>

        {Object.keys(summary.categorySummary).map((category) => {
          const catData = summary.categorySummary[category];
          return (
            <div key={category} className="category-box">
              <h4 className="category-title">{category}</h4>

              <table className="styled-table">
                <thead>
                  <tr>
                    <th>Item Name</th>
                    <th>Qty</th>
                    <th>Amount</th>
                  </tr>
                </thead>

                <tbody>
                  {catData.items.map((item, index) => (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>{item.qty}</td>
                      <td>₹ {item.amount}</td>
                    </tr>
                  ))}
                  <tr className="total-row">
                    <td><b>Total</b></td>
                    <td><b>{catData.totalQty}</b></td>
                    <td><b>₹ {catData.totalAmount}</b></td>
                  </tr>
                </tbody>
              </table>
            </div>
          );
        })}
      </div>

      {/* ===== RECENT BILLS ===== */}
      <div className="recent-bills glass-box fade-in delay-3">
        <h3>Recent Bills</h3>

        <table className="styled-table">
          <thead>
            <tr>
              <th>Invoice</th>
              <th>Amount</th>
              <th>Created By</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {recentBills.map((bill) => (
              <tr key={bill._id}>
                <td>{bill.invoiceNumber || bill._id.slice(-6)}</td>
                <td>₹ {bill.totalAmount}</td>
                <td>{bill.createdBy?.username || "Admin"}</td>
                <td>{new Date(bill.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
