import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { getAllCategories } from "../services/CategoryService";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ProductSlider.css";
import { useNavigate } from "react-router-dom";

const ProductSlider = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const productData = await getAllCategories();
      setProducts(productData);
    };
    fetchProducts();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4, 
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="product-slider-container">
      <h2 className="slider-title">Trending Products</h2>
      <Slider {...settings}>
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.imageUrl} alt={product.productName} className="product-imagee" />
            <br/>
           

            <a onClick={() => navigate(`/category/${product.id}`)} className="product-slider-link"><h3 className="product-name">{product.categoryName}</h3></a>

            
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductSlider;
