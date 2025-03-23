import React from "react";
import "./StatsSection.css";
import { FaShoppingCart, FaCheckCircle, FaHandshake, FaTools, FaUsers } from "react-icons/fa";

const StatsSection = () => {
  const stats = [
    { icon: <FaShoppingCart />, label: "Products", value: "25+" },
    { icon: <FaCheckCircle />, label: "Approved SRFMTTI", value: "Approved" },
    { icon: <FaHandshake />, label: "Dealers", value: "50+" },
    { icon: <FaTools />, label: "Service Center", value: "100+" },
    { icon: <FaUsers />, label: "Customers", value: "100000+" }
  ];

  return (
    <div className="stats-container">
      {stats.map((stat, index) => (
        <div className="stat-box" key={index}>
          <div className="stat-icon">{stat.icon}</div>
          <div className="stat-value">{stat.value}</div>
          <div className="stat-label">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

export default StatsSection;
