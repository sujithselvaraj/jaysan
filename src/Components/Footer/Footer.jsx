import React from 'react'
import "./Footer.css";

const Footer = () => {
  return (
    <div className='footer'>

      <div className="contact-footer">
        <div class="get-in-touch-footer">
            <div>
              <h3>Contact</h3>
                <div className='contact-item'>
                  <p>Want to discuss our products or have a question? Contact us, and we'll get back to you ASAP!</p>
                </div>
                <div className='contact-item'>
                  <img src='/Assests/icon-mail.png' alt=''/>
                  <p> upagritraders@gmail.com</p>
                </div>
                <div className='contact-item'>
                  <img src='/Assests/icon-phone.png' alt=''/>
                  <p>+91 8248690154</p>
                </div>
                <div className='contact-item' id='address-div'>
                  <img src='/Assests/icon-location.png' alt='' className='location'/>
                  <p className='address'>80-1, 1, Valiyampalayam, S.S Garden, Vilankuruchi(Po), Coimbatore , Tamil Nadu 641035 ,India</p>
                </div>
            </div>
        </div>
                

        <div class="get-in-touch-footer">
          <div>
            <h3>Get In Touch</h3>
            <p>Your next big opportunity starts here – download our brochure today!</p>
            <div className='brochure'>
              <a href="/Assests/Jaysan_brochure.pdf" download className="brochure-btn">
                <img src="/Assests/download.svg" alt="Download" className="download-icon" />
                Download Brochure
              </a>
             </div>
          </div>
          <div className='follow-us'>
            <h3>Follow us on</h3>
            <div>
              <a href= "https://www.facebook.com/profile.php?id=61559346638446&amp;amp;amp;amp;amp;amp;amp;mibextid=ZbWKwL"><img src="/Assests/icon-facebook.jpeg" alt="fb" className="social-icon" /></a>
              <a href= "https://www.instagram.com/jaysan.agri?igsh=MXZhN3kyMmtncmZkaQ=="><img src="/Assests/icon-instagram.jpeg" alt="insta" className="social-icon"/></a>
              <a href= "https://youtube.com/@jaysanagri366?si=EkCNO6E6i61kXLZm"><img src="/Assests/icon-youtube.jpeg" alt="youtube" className="social-icon" /></a>
              <a href="linkedin"><img src="/Assests/icon-linkedin.jpeg" alt="linkedin" className="social-icon"/></a>
            </div>
          </div>
        </div>

      </div>

      <div className="copywright-footer">
        <div className='copywright-text'>
          <p>Copyright © 2025 - Jaysan Agri Industrial</p>
        </div>
      </div>

    </div>
  )
}

export default Footer