import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar"cd billing-frontend
;
import Topbar from "../components/topbar/Topbar";
import "./AdminLayout.css";

export default function AdminLayout() {
  return (
    <div className="admin-layout">
      <aside className="sidebar-container">
        <Sidebar />
      </aside>

      <div className="admin-main">
        <header className="topbar-container">
          <Topbar />
        </header>

        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
