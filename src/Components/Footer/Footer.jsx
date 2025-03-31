import React, { useEffect, useState } from 'react';
import "./Footer.css";
import api from '../Reducers/AxiosConfig';

const Footer = () => {
  const [brochureUrl, setBrochureUrl] = useState(""); 

  useEffect(() => {
    const fetchBrochure = async () => {
      try {
        const response = await api.get("/brochure/latest");
        console.log(response);
        setBrochureUrl(response.data); // Store the URL in state
      } catch (error) {
        console.error("Error fetching brochure:", error);
      }
    };
    fetchBrochure();
  }, []);

  return (
    <div className='footer'>
      <div className="contact-footer">
        <div className="get-in-touch-footer">
          <div>
            <h3>Contact</h3>
            <div className='contact-item'>
              <p>Want to discuss our products or have a question? Contact us, and we'll get back to you ASAP!</p>
            </div>
            <div className='contact-item'>
              <img src='/Assests/icon-mail.png' alt='' />
              <a href='mailto:jaysanagriindustrial@gmail.com' style={{ textDecoration: "none", color: "inherit" }}>
                <p>jaysanagriindustrial@gmail.com</p>
              </a>
            </div>
            <div className='contact-item'>
              <img src='/Assests/icon-phone.png' alt='' />
              <a href="tel:+919843522997" style={{ textDecoration: "none", color: "inherit" }}>
                <p>+91 9843522997</p>
              </a>
            </div>
            <div className='contact-item' id='address-div'>
              <img src='/Assests/icon-location.png' alt='' className='location' />
              <p className='address'>
                80-1, 1, Valiyampalayam, S.S Garden, Vilankuruchi(Po), <br />
                Coimbatore, Tamil Nadu 641035, India
              </p>
            </div>
          </div>
        </div>

        <div className="get-in-touch-footer">
          <div>
            <h3>Get In Touch</h3>
            <p>Your next big opportunity starts here – download our brochure today!</p>
            <div className='brochure'>
              {brochureUrl ? (
                <a href={brochureUrl} target='blank'download className="brochure-btn">
                  <img src="/Assests/download.svg" alt="Download" className="download-icon" />
                  Download Brochure
                </a>
              ) : (
                <p>Loading brochure...</p>
              )}
            </div>
          </div>
          <div className='follow-us'>
            <h3>Follow us on</h3>
            <div>
              <a href="https://www.facebook.com/profile.php?id=61559346638446">
                <img src="/Assests/icon-facebook.jpeg" alt="fb" className="social-icon" />
              </a>
              <a href="https://www.instagram.com/jaysan.agri">
                <img src="/Assests/icon-instagram.jpeg" alt="insta" className="social-icon" />
              </a>
              <a href="https://youtube.com/@jaysanagri366">
                <img src="/Assests/icon-youtube.jpeg" alt="youtube" className="social-icon" />
              </a>
              <a href="linkedin">
                <img src="/Assests/icon-linkedin.jpeg" alt="linkedin" className="social-icon" />
              </a>
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
  );
};

export default Footer;
