import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ThemeContext } from "../App";
import useOnlineStatus from "../hooks/useOnlineStatus";

const Header = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const onlineStatus = useOnlineStatus();

  const cartItems = useSelector((store) => store.cart.items);
  const totalQty = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo-link">
          <div className="logo">
            <span className="logo-icon">🍔</span>
            <span className="logo-text">swiggy</span>
          </div>
        </Link>

        <div className="location-bar">
          <span className="location-label">Deliver to</span>
          <div className="location-value">
            <span>Bengaluru</span>
            <span className="location-arrow">▾</span>
          </div>
        </div>

        <nav className={`nav-links ${menuOpen ? "nav-open" : ""}`}>
          <span className="online-dot" title={onlineStatus ? "Online" : "Offline"}>
            {onlineStatus ? "🟢" : "🔴"}
          </span>
          <Link to="/" className="nav-item" onClick={() => setMenuOpen(false)}>Search</Link>
          <Link to="/" className="nav-item" onClick={() => setMenuOpen(false)}>Offers</Link>
          <Link to="/" className="nav-item" onClick={() => setMenuOpen(false)}>Help</Link>
          <button className="nav-item login-btn" onClick={() => setIsLoggedIn(!isLoggedIn)}>
            {isLoggedIn ? "Logout" : "Sign In"}
          </button>
          <button className="dark-toggle" onClick={() => setDarkMode(!darkMode)} title="Toggle Dark Mode">
            {darkMode ? "☀️" : "🌙"}
          </button>
          <Link to="/cart" className="cart-btn" onClick={() => setMenuOpen(false)}>
            🛒
            {totalQty > 0 && <span className="cart-badge">{totalQty}</span>}
          </Link>
        </nav>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>
    </header>
  );
};

export default Header;
