import React from 'react';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import './AboutUs.css'; // Make sure to create this CSS file

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <NavBar />
      
      <div className="about-us-content">
        {/* Left Section - Text */}
        <div className="left-section">
   {/* Circle Background */}

  <h1 className="main-heading">Experts in Growth</h1>
  <p className="sub-text">Easily adapt with the latest trending technologies</p>




          <div className="info-box">
            <div className="info-item">
              <img src="/Assests/icon-vision.webp" alt="Vision" className="info-icon" />
              <div className="info-text">
                <h2>Our Vision</h2>
                <p>By empowering organizations with optimized technology and advanced analytics, we contribute to better productivity.</p>
              </div>
            </div>

            <div className="info-item">
              <img src="/Assests/icon-mission.webp" alt="Ambition" className="info-icon" />
              <div className="info-text">
                <h2>Our Ambition</h2>
                <p>We aim to continuously increase our impact on development with our data-driven decision support.</p>
              </div>
            </div>

            <div className="info-item">
              <img src="/Assests/icon-purpose.webp" alt="Purpose" className="info-icon" />
              <div className="info-text">
                <h2>Our Purpose</h2>
                <p>We want to improve the world using our passion for technologies.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Image */}
        <div className="right-section">
  <div className="image-wrappe">
    <img src="/Assests/agri.jpeg" alt="Experts in Growth" className="about-image" />
  </div>
</div>

      </div>

      <Footer />
    </div>
  );
};

export default AboutUs;
