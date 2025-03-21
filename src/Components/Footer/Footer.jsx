import React from 'react';
import { FaFacebook, FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <div className='footer'>
      <div className="contact-footer">
        <div className="get-in-touch-footer">
          <h3>Contact</h3>
          <div className='contact-item'>
            <p>Want to discuss our products or have a question? Contact us, and we'll get back to you ASAP!</p>
          </div>
          <div className='contact-item'>
            <p>📧 upagritraders@gmail.com</p>
          </div>
          <div className='contact-item'>
            <p>📞 +91 8248690154</p>
          </div>
          <div className='contact-item' id='address-div'>
            <p className='address'>📍 80-1, 1, Valiyampalayam, S.S Garden, Vilankuruchi(Po), Coimbatore, Tamil Nadu 641035, India</p>
          </div>
        </div>

        <div className="get-in-touch-footer">
          <h3>Get In Touch</h3>
          <p>Your next big opportunity starts here – download our brochure today!</p>
          <div className='brochure'>
            <a href="/Assests/Jaysan_brochure.pdf" download className="brochure-btn">
              📄 Download Brochure
            </a>
          </div>
        </div>

        <div className='get-in-touch-footer follow-us'>
          <h3>Follow us on</h3>
          <div className="social-icons">
            <a href="https://www.facebook.com/profile.php?id=61559346638446" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="social-icon" size={28} />
            </a>
            <a href="https://www.instagram.com/jaysan.agri" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="social-icon" size={28} />
            </a>
            <a href="https://youtube.com/@jaysanagri366" target="_blank" rel="noopener noreferrer">
              <FaYoutube className="social-icon" size={28} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="social-icon" size={28} />
            </a>
          </div>
          
        </div>
        
      </div>

      <div className="copywright-footer">
        <p>Copyright © 2025 - Jaysan Agri Industrial</p>
      </div>
    </div>
  );
}

export default Footer;
