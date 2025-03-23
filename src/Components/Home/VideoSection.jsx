import React from "react";
import "./VideoSection.css";

const VideoSection = () => {
  return (
    <div className="video-section">
      {/* Engaging Heading for Video */}
      <h2 className="video-heading">Watch Our Video to Learn More!</h2>

      {/* Video Section */}
      <div className="video-container">
        <video controls poster="/Assests/poster.jpg">
          <source src="/Assests/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Text Section with Headline */}
      <div className="text-container">
        <h2>Why Choose Jaysan Agri Industrial?</h2>
        <p>
          Elevate your farming experience with our <strong>trusted, high-quality, and
          innovative solutions</strong>. Here’s why customers rely on us:
        </p>

        {/* Structured Bullet Points */}
        <div className="bullet-points">
          <div className="point">Transparent Business Dealing</div>
          <div className="point">Affordable Rates for Products</div>
          <div className="point">Budget-Friendly Pricing</div>
          <div className="point">Timely Completion of Orders</div>
          <div className="point">Innovative Ideas</div>
          <div className="point">Wide Service Network</div>
        </div>
      </div>
    </div>
  );
};

export default VideoSection;
