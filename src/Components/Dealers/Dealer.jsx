import React, { useState, useEffect } from 'react';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import './Dealer.css';
import { AiOutlineSearch } from "react-icons/ai";
import api from '../Reducers/AxiosConfig';

const Dealer = () => {
  const [dealers, setDealers] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null); // Stores the index of the expanded card
  const [searchState, setSearchState] = useState('');

  useEffect(() => {
    api.get("/dealer")
      .then((response) => {
        setDealers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching dealers:", error);
      });
  }, []);

  // Function to handle expansion of one card at a time
  const handleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index); // Toggle between open and close
  };

  const filteredDealers = dealers.filter((dealer) =>
    dealer.dealerState.toLowerCase().includes(searchState.toLowerCase())
  );

  return (
    <div>
      <NavBar />
      <div className="dealer-container">
        <h2 className="title">Our Valuable Dealers</h2>
        
        {/* Search Bar */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by state..."
            value={searchState}
            onChange={(e) => setSearchState(e.target.value)}
            className="search-input"
          />
          <AiOutlineSearch className="search-icon" />
        </div>

        {/* Dealer List */}
        <div className="dealer-list">
          {filteredDealers.map((dealer, index) => (
            <div key={index} className={`dealer-card ${expandedIndex === index ? 'expanded' : ''}`}>
              <h3>{dealer.dealerName}</h3>
              <p>Email: {dealer.dealerEmail}</p>
              <p>Phone: {dealer.dealerPhoneNumber}</p>
              <button onClick={() => handleExpand(index)}>
                {expandedIndex === index ? 'View Less' : 'View More'}
              </button>

              {expandedIndex === index && (
                <div className="dealer-details">
                  <p>Address: {dealer.addressLine1}, {dealer.addressLine2}</p>
                  <p>Location: {dealer.dealerLocation}</p>
                  <p>State: {dealer.dealerState}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <br />
      <Footer />
    </div>
  );
};

export default Dealer;
