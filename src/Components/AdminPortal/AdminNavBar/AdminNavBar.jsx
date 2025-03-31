import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminNavBar.css";
import api from "../../Reducers/AxiosConfig";

const AdminNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/logout", {}, { withCredentials: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
    navigate("/");

  };
  

  return (
    <nav className="admin-navbar">
      <div className="admin-logo">
        <a href="/admin-dashboard">
          <img src="../../Assests/logo.png" alt="Logo" />
        </a>
      </div>

      <div className="admin-hamburger" onClick={() => setIsOpen(!isOpen)}>
        <span className={`admin-bar ${isOpen ? "open" : ""}`}></span>
        <span className={`admin-bar ${isOpen ? "open" : ""}`}></span>
        <span className={`admin-bar ${isOpen ? "open" : ""}`}></span>
      </div>

      <ul className={`admin-nav-links ${isOpen ? "active" : ""}`}>
        <li
          className="admin-dropdown"
          onClick={() => setIsProductDropdownOpen(!isProductDropdownOpen)}
        >
          <a href="/list-category">Products ▾</a>
          <ul className={`admin-dropdown-menu ${isProductDropdownOpen ? "show" : ""}`}>
            <li><a href="/add-category">Add Category</a></li>
            <li><a href="/add-subcategory">Add SubCategory</a></li>
            <li><a href="/list-category">List Category</a></li>
            <li><a href="/list-subcategories">List SubCategory</a></li>
          </ul>
        </li>
        <li><a href="/add-events">Events</a></li>

        <li><a href="/add-blog">Blogs</a></li>
        <li><a href="/admin-company">Company</a></li>
        <li><a href="/admin-list-career">Career</a></li>
        <li><a href="/admin-list-dealers">Dealers</a></li>
        <li><a href="/admin-contact" className="admin-lets-talk">Let's Talk</a></li>
        <li className="admin-login-person">
          <button className="admin-logout-btn" onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavBar;
