import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./AllCategory.css";
import { getAllCategories } from "../services/CategoryService";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";

const AllCategory = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      const categoryData = await getAllCategories();
      console.log(categoryData)
      setCategories(categoryData);
    };
    fetchCategories();
  }, []);

  return (
    <>
      <div className="category-container">
        <NavBar />
        <h2 className="category-title">Explore our Products!!</h2>
        <div className="category-grid">
          {categories.map((category) => (
            <div key={category.id} className="category-card">
              <div className="category-card-inner">
                {/* Front Side */}
                <div className="category-card-front">
                <img
  src={category.imageUrl} // Use the full URL directly
  alt={category.categoryName}
  className="category-image"
/>
                  <div className="category-info">
                    <h3 className="category-name">{category.categoryName}</h3>
                    <p className="category-desc">
                      {category.description.length > 80
                        ? category.description.substring(0, 80) + "..."
                        : category.description}
                    </p>
                  </div>
                </div>

                {/* Back Side */}
                <div className="category-card-back">
                  <div className="category-info">
                    <h3 className="category-name">{category.categoryName}</h3>
                    <p className="category-desc">{category.description}</p>
                    <button
                      className="view-more-btn"
                      onClick={() => navigate(`/category/${category.id}`)}
                    >
                      View More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AllCategory;

