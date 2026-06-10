import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="logo">
              <span className="logo-icon">🍔</span>
              <span className="logo-text">swiggy</span>
            </div>
            <p className="footer-tagline">Delivering happiness, one meal at a time.</p>
            <div className="footer-social">
              <a href="#" className="social-btn">📸</a>
              <a href="#" className="social-btn">🐦</a>
              <a href="#" className="social-btn">👤</a>
              <a href="#" className="social-btn">💼</a>
            </div>
          </div>
          <div className="footer-col">
            <h4 className="footer-col-title">Company</h4>
            <ul className="footer-links">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Team</a></li>
              <li><a href="#">Swiggy One</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4 className="footer-col-title">Contact</h4>
            <ul className="footer-links">
              <li><a href="#">Help & Support</a></li>
              <li><a href="#">Partner with Us</a></li>
              <li><a href="#">Ride with Us</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4 className="footer-col-title">Legal</h4>
            <ul className="footer-links">
              <li><a href="#">Terms & Conditions</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Refund Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 Swiggy Clone — Built with ❤️ using React.js (Namaste React)</p>
          <p className="footer-dev">
            Developed by <a href="https://github.com/codewalalakshya" target="_blank" rel="noreferrer">Lakshya Pratap Singh</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
