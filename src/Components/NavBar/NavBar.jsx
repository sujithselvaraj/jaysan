import React, { useState, useEffect } from "react";

import "./NavBar.css";
import { getAllCategories } from "../services/CategoryService";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  // Fetch categories when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      const categoryData = await getAllCategories();
      console.log(categoryData)
      setCategories(categoryData);
    };
    fetchCategories();
  }, []);

  return (
    <nav className="navbar">
      <div className="logo">
        <a href="/">
          <img src="/Assests/logo.png" alt="Logo" />
        </a>
      </div>

      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        <span className={`bar ${isOpen ? "open" : ""}`}></span>
        <span className={`bar ${isOpen ? "open" : ""}`}></span>
        <span className={`bar ${isOpen ? "open" : ""}`}></span>
      </div>

      <ul className={`nav-links ${isOpen ? "active" : ""}`}>
        {/* Products Dropdown */}
        <li className="dropdown">
          <a href="#">Products</a>
          <ul className="dropdown-menu">
            <li>
              <a href="/categories">All Categories</a>
            </li>
            {categories.map((category) => (
              <li key={category.id}>
                <a href={`/category/${category.id}`}>{category.categoryName}</a>
              </li>
            ))}
          </ul>
        </li>

        <li><a href="/events">Events</a></li>
        <li><a href="/resources">Resources</a></li>
        <li><a href="/company">Company</a></li>
        <li><a href="/career">Career</a></li>
        <li><a href="/dealers">Dealers</a></li>
        <li><a href="/contact" className="lets-talk">Let's Talk</a></li>
      </ul>

      <div className="login-person">
        <a href="/login">
          <img src="/Assests/icon-login.png" alt="login" />
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
