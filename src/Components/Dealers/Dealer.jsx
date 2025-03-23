import React, { useState, useEffect } from 'react';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import './Dealer.css';
import { AiOutlineSearch } from "react-icons/ai";
import api from '../Reducers/AxiosConfig';

const Dealer = () => {
  const [dealers, setDealers] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
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

  const handleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const filteredDealers = dealers.filter((dealer) =>
    dealer.dealerState.toLowerCase().includes(searchState.toLowerCase())
  );

  return (
    <div>
      <NavBar />
      <div className="dealer-updated-container">
        <h2 className="dealer-updated-title">Our Valuable Dealers</h2>
        
        <div className="dealer-updated-search-container">
          <input
            type="text"
            placeholder="Search by state..."
            value={searchState}
            onChange={(e) => setSearchState(e.target.value)}
            className="dealer-updated-search-input"
          />
          <AiOutlineSearch className="dealer-updated-search-icon" />
        </div>

        <div className="dealer-updated-list">
          {filteredDealers.map((dealer, index) => (
            <div key={index} className={`dealer-updated-card ${expandedIndex === index ? 'dealer-updated-expanded' : ''}`}>
              <h3>{dealer.dealerName}</h3>
              <p>Email: {dealer.dealerEmail}</p>
              <p>Phone: {dealer.dealerPhoneNumber}</p>
              <button onClick={() => handleExpand(index)}>
                {expandedIndex === index ? 'View Less' : 'View More'}
              </button>

              {expandedIndex === index && (
                <div className="dealer-updated-details">
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
