import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { getSubCategoryById } from "../services/CategoryService";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const [subCategory, setSubCategory] = useState(null);

  useEffect(() => {
    const fetchSubCategory = async () => {
      try {
        const data = await getSubCategoryById(id);
        console.log(data)
        setSubCategory(data || {}); // Ensure we always have an object
      } catch (error) {
        console.error("Error fetching subcategory:", error);
      }
    };

    fetchSubCategory();
  }, [id]);

  if (!subCategory) {
    return (
      <div className="loading-container">
        <NavBar />
        <div className="loading-message">Loading product details...</div>
        <Footer />
      </div>
    );
  }
  

  const getYouTubeEmbedUrl = (url) => {
    if (!url) return "";
    const videoId = url.split("v=")[1]?.split("&")[0];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
  };

  return (
    <>
    <div className="product-details-container">
      <NavBar />

      <div className="product-content">
        <div className="product-image">
        <img
  src={subCategory.imagePath
  }
  alt={subCategory.subCategoryName}
/>

        </div>

        <div className="product-info">
          <h2>{subCategory.subCategoryName}</h2>
          <ul className="feature-list">
            {Array.isArray(subCategory.features) ? (
              subCategory.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))
            ) : (
              <p>No features available</p>
            )}
          </ul>
        </div>
      </div>

      {subCategory.youtubeLink && (
        <div className="video-container">
          <iframe
            src={getYouTubeEmbedUrl(subCategory.youtubeLink)}
            title="Product Video"
            allowFullScreen
          ></iframe>
        </div>
      )}

      <div className="specifications-table">
        <h3>Specifications</h3>
        <table>
          <thead>
            <tr>
              <th>Feature</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {subCategory.specificationDetails ? (
              Object.entries(subCategory.specificationDetails).map(
                ([key, value], index) => (
                  <tr key={index}>
                    <td>{key}</td>
                    <td>{value}</td>
                  </tr>
                )
              )
            ) : (
              <tr>
                <td colSpan="2">No specifications available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    
    </div>
    <Footer/>
    </>
  );
};

export default ProductDetails;
