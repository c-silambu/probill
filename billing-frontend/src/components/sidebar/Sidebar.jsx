import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="brand" onClick={() => setCollapsed(!collapsed)}>
        <span className="brand-short">SD</span>
        <span className="brand-full">SalesDesk</span>
      </div>

      <nav>
        <NavLink to="/admin/dashboard" className="nav-item">
          <span className="icon">📊</span>
          <span className="text">Dashboard</span>
        </NavLink>

        <NavLink to="/admin/invoice" className="nav-item">
          <span className="icon">🧾</span>
          <span className="text">Invoice</span>
        </NavLink>

        <NavLink to="/admin/products" className="nav-item">
          <span className="icon">📦</span>
          <span className="text">Products</span>
        </NavLink>

        <NavLink to="/admin/summary" className="nav-item">
          <span className="icon">📑</span>
          <span className="text">Summary</span>
        </NavLink>
      </nav>
    </div>
  );
}
