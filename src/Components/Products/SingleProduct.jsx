import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { getCategoryById } from "../services/CategoryService";
import "./SingleProduct.css";

const SingleProduct = () => {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategory = async () => {
      const data = await getCategoryById(id);
      setCategory(data);
    };
    fetchCategory();
  }, [id]);

  return (
    <div>
      <NavBar />
      <div className="single-product-container">
        {category ? (
          <>
            <h2 className="single-category-title">{category.categoryName}</h2>
            <p className="single-category-description">{category.description}</p>

            {/* Subcategories Section */}
            <div className="subcategories-grid">
              {category.subCategories.length > 0 ? (
                category.subCategories.map((sub) => (
                  <div key={sub.id} className="subcategory-card">
                    <img
                      src={sub.imagePath}
                      alt={sub.subCategoryName}
                      className="subcategory-image"
                    />
                    <div className="subcategory-info">
                      <h3 className="subcategory-name">{sub.subCategoryName}</h3>
                      <button
                        className="subcategory-view-more"
                        onClick={() => navigate(`/subcategory/${sub.id}`)}
                      >
                        View More
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="no-subcategories">No subcategories available.</p>
              )}
            </div>
          </>
        ) : (
          <p>Loading category details...</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default SingleProduct;
