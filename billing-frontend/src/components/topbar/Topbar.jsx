import React, { useEffect, useState } from "react";
import "./topbar.css";

export default function Topbar() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="topbar">
      <div className="topbar-left">
        <div className="avatar">
          <span>A</span>
        </div>
        <div className="welcome-text">
          <h4 className="fade-text">Welcome, Admin 👋</h4>
          <p className="sub-text">Have a productive day</p>
        </div>
      </div>

      <div className="topbar-right">
        <span className="clock">{time.toLocaleString()}</span>
      </div>
    </div>
  );
}
