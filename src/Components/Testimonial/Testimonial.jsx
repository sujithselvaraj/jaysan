import React, { useState, useEffect } from "react";
import "./Testimonial.css"; 
import api from "../Reducers/AxiosConfig";

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Fetch testimonials via Axios
    api.get("/testimonial")
      .then(response => setTestimonials(response.data))
      .catch(error => console.error("Error fetching testimonials:", error));
  }, []);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials]);

  if (testimonials.length === 0) {
    return <p>Loading testimonials...</p>;
  }

  // Extracting values based on your entity
  const { customerReview, customerName, productName, customerLocation, imageUrl } = testimonials[currentIndex];

  return (
    <div className="testimonial-container">
      <div className="testimonial-text">
        <h2>What People Say About Us</h2>
        <p style={{ fontSize: "18px", fontWeight:"bold" , marginTop: "14%"}}>"{customerReview}"</p>
        <p style={{ marginLeft: "20px", fontSize: "18px", fontWeight: "normal" }}> - {customerName}, {customerLocation}</p>
      </div>

      <div className="testimonial-card">
        <div className="testimonial-card-div">
            <img src={imageUrl} alt={customerName} className="profile-img" />
        </div>
        <div className="testimonial-card-div">
            <p className="testimonial-product">{productName}</p>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
