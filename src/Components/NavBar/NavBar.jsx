
import React, { useState } from 'react';
import './NavBar.css';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  
  return (
    <nav className="navbar">
      <div className="logo">
        <a href='/'>
          <img src="/Assests/logo.png" alt="Logo"/>
        </a>
      </div>

      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        <span className={`bar ${isOpen ? "open" : ""}`}></span>
        <span className={`bar ${isOpen ? "open" : ""}`}></span>
        <span className={`bar ${isOpen ? "open" : ""}`}></span>
      </div>

      <ul className={`nav-links ${isOpen ? "active" : ""}`}>
        <li><a href="products">Products</a></li>
        <li><a href="events">Events</a></li>
        <li><a href='resources'>Resources</a></li> 
        <li><a  href="company" >Company</a></li> 
        <li><a href="career">Career</a></li>
        <li><a href="dealers">Dealers</a></li>         
      
               

        <li><a href="contact" className='lets-talk'>Let's Talk</a></li>
      </ul>

      <div className='login-person'>
        <a href="login">
          <img src="/Assests/icon-login.png" alt="login"/>
        </a>
      </div>
    </nav>
  );
};

export default NavBar;

