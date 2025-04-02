import React from "react";
import "./Company.css";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";
import TeamSlider from "../Team/TeamSlider";


export default function Company() {
    const navigate = useNavigate();

  return (
    <>
    <div>
    <section className="company-header1">
        <div  className="about-us-title">
            <h1>About Us</h1>
        </div>
      </section>
      </div>

      <div className="company-container">

      <NavBar/>
      <div className="company-header">
      <p className="company-description">
        Since <strong>2014</strong>, <b>Jaysan Agri Industrial</b> has been manufacturing <strong>high-quality agricultural implements</strong> to improve farming efficiency. With over <strong>30 advanced machines</strong>, we help farmers adopt modern mechanization for better productivity and reduced labor. Our focus on <b>innovation, durability, and affordability</b> ensures reliable and long-lasting equipment.
        <br /><br />
        We are committed to making farming <strong>more sustainable and profitable</strong> with strong dealer support and after-sales service. Our mission is to provide <b>cutting-edge technology</b> and <strong>farmer-friendly solutions</strong>, transforming agriculture across <b>India and beyond</b>.
        </p>

      </div>
           
           <br/>
           <div className="infrastructure-section">
    <h2 className="infrastructure-title">Our Infrastructure</h2>
    <p className="infrastructure-description">
        At <b>Jaysan Agri Industrial</b>, our state-of-the-art facilities ensure efficient production, high quality, and timely delivery. 
        Our infrastructure includes advanced machinery, a robust supply chain, and strict quality control measures.
    </p>

    <div className="infrastructure-grid">
        <div className="infrastructure-card">
            <div className="infrastructure-icon">🏭</div>
            <h3>Manufacturing Facilities</h3>
            <p>30+ advanced machines operating in our high-tech manufacturing plants.</p>
        </div>

        <div className="infrastructure-card">
            <div className="infrastructure-icon">🚚</div>
            <h3>Logistics & Supply Chain</h3>
            <p>Efficient storage and distribution network ensuring on-time delivery.</p>
        </div>

        <div className="infrastructure-card">
            <div className="infrastructure-icon">🛠️</div>
            <h3>Advanced Machinery</h3>
            <p>Cutting-edge CNC, laser cutting, and welding machines for precision engineering.</p>
        </div>

        <div className="infrastructure-card">
            <div className="infrastructure-icon">✅</div>
            <h3>Quality Control</h3>
            <p>Stringent testing and inspection processes to maintain product excellence.</p>
        </div>
    </div>
</div>

           <br/>
      <div className="company-cta">
        <h2 className="company-cta-title">Ready to Elevate Your Farming Experience?</h2>
        <p className="company-cta-text">
          Explore our advanced agricultural solutions and experience superior efficiency today.
        </p>
        <button className="company-cta-button" onClick={() => navigate("/contact")}>
        Contact Us
        </button>

      </div>
    </div>
        <TeamSlider/>
    <Footer/>
    </>
  );
}
