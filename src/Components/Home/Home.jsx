import React from 'react';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import './Home.css'; // Make sure to create this CSS file
import StatsSection from './StatsSection';
import ImageSlider from './ImageSlider';
import VideoSection from './VideoSection';

const Home = () => {
  return (
    <div className="about-us-container">
      <NavBar />
      <ImageSlider/>
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
                <p className='home-para'>Empowering farmers with smart, reliable, and sustainable agricultural solutions for a better tomorrow.</p>
              </div>
            </div>

            <div className="info-item">
              <img src="/Assests/icon-mission.webp" alt="Ambition" className="info-icon" />
              <div className="info-text">
                <h2>Our Ambition</h2>
                <p className='home-para'>To lead in farming technology with innovative products, training, and support for farmers' success.</p>
              </div>
            </div>

            <div className="info-item">
              <img src="/Assests/icon-purpose.webp" alt="Purpose" className="info-icon" />
              <div className="info-text">
                <h2>Our Purpose</h2>
                <p className='home-para'>Empowering farmers with efficient and reliable machinery. </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Image */}
        <div className="right-section">
  <div className="image-wrappe">

    <img src="/Assests/baler_no_back.png" alt="Experts in Growth" className="about-image" />


  </div>
</div>

      </div>

    
      <br/>

      <VideoSection/>
      <br/>
      <StatsSection/>


      <Footer />
    </div>
  );
};

export default Home ;
