// src/components/Header.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Header({ ToggleTheme, theme }) {
  return (
    <header className="m3-app-bar">
      <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
        <h1>Job Tracker</h1>
      </Link>

      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <button
          id="themeToggle"
          className="theme-toggle-btn"
          aria-label="Toggle Theme"
          onClick={ToggleTheme}
        >
          <span className="material-symbols-outlined" id="themeIcon">
            {theme === "light" ? "light_mode" : "dark_mode"}
          </span>
        </button>

        <div className="user-avatar">AA</div>
      </div>
    </header>
  );
}
