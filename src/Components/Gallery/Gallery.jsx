import React, { useState } from "react";
import "./Gallery.css";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
// Make sure the icon is in the correct path

const images = [
  { id: 1, src: "/Assests/baler_no_back.png", name: "Jaysan Baler Machine" },
  { id: 2, src: "/Assests/baler_no_back.png", name: "Jaysan Rotary Mulcher" },
  { id: 3, src: "/Assests/baler_no_back.png", name: "Horizontal Chaff Cutter" },
  { id: 4, src: "/Assests/baler_no_back.png", name: "Cultivator" },
  { id: 5, src: "/Assests/baler_no_back.png", name: "Hay Rake" },
  { id: 6, src: "/Assests/baler_no_back.png", name: "Jaysan Flail Mower" },
];

const Gallery = () => {
  const [search, setSearch] = useState("");

  const matchingImages = images.filter((image) =>
    image.name.toLowerCase().includes(search.toLowerCase())
  );

  // Display all images but move matching ones to the end
  const sortedImages = images.filter((img) => !matchingImages.includes(img)).concat(matchingImages);

  return (
    <>
      <NavBar />
      <div className="gallery-container">
        <h2 className="gallery-title">Our Gallery</h2>

        {/* Search Input */}
        <div className="search-box">
  <input
    type="text"
    placeholder="Search..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
  <img src="/Assests/serach.png" alt="Search" className="search-icon" />
</div>


        {/* Image Grid */}
        <div className="gallery-grid">
          {sortedImages.map((image) => (
            <div
              key={image.id}
              className={`gallery-item ${matchingImages.includes(image) ? "highlighted" : ""}`}
            >
              <img src={image.src} alt={image.name} />
              <p className="image-name">{image.name}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Gallery;
