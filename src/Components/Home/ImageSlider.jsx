import React, { useState, useEffect } from "react";
import "./ImageSlider.css";
import { getAllCategories } from "../services/CategoryService";

const images = [
  { src: "/Assests/chaff cutter.png", title: "Chaff Cutter" },
  { src: "/Assests/hay_rake_noback.png", title: "Hay Rake" },
  { src: "/Assests/rotavator-athletic.png", title: "Rotavator Athletic" },
  { src: "/Assests/baler_no_back.png", title: "Baler Machine" },
];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    getAllCategories();
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Auto-change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  // Move to previous image
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="slider-container">
      <h1 className="slider-heading">🚜 Discover Our Featured Agricultural Machines – Built for Performance & Efficiency! 🌾</h1>
      
      <div className="image-slider">
        <button className="slider-btn left" onClick={prevSlide}>❮</button>
        
        <div className="slider-content">
          <img src={images[currentIndex].src} alt={images[currentIndex].title} className="slider-image" />
          <h2 className="slider-title">{images[currentIndex].title}</h2>
        </div>

        <button className="slider-btn right" onClick={nextSlide}>❯</button>
      </div>
    </div>
  );
};

export default ImageSlider;
