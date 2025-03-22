import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminNavBar.css";

const AdminNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:8080/logout", {
        method: "POST",
        credentials: "include", // ✅ Required to destroy session
      });
      navigate("/"); // ✅ Redirect to homepage after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <a href="/admin-dashboard">
          <img src="../../Assests/logo.png" alt="Logo" />
        </a>
      </div>

      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        <span className={`bar ${isOpen ? "open" : ""}`}></span>
        <span className={`bar ${isOpen ? "open" : ""}`}></span>
        <span className={`bar ${isOpen ? "open" : ""}`}></span>
      </div>

      <ul className={`nav-links ${isOpen ? "active" : ""}`}>
        <li
          className="dropdown"
          onMouseEnter={() => setIsProductDropdownOpen(true)}
          onMouseLeave={() => setIsProductDropdownOpen(false)}
        >
          <a href="#">Products ▾</a>
          {isProductDropdownOpen && (
            <ul className="dropdown-menu">
              <li><a href="/add-category">Add Category</a></li>
              <li><a href="/add-subcategory">Add SubCategory</a></li>
              <li><a href="/list-category">List Category</a></li>
              <li><a href="/list-subcategories">List SubCategory</a></li>
            </ul>
          )}
        </li>
        <li><a href="events">Events</a></li>
        <li><a href="resources">Resources</a></li>
        <li><a href="about">Company</a></li>
        <li><a href="career">Career</a></li>
        <li><a href="dealers">Dealers</a></li>
        <li><a href="/contact" className="lets-talk">Let's Talk</a></li>
      </ul>

      <div className="login-person">
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default AdminNavBar;
