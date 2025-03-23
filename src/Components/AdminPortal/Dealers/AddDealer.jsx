import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DealerService from './DealerService';
import AdminNavBar from '../AdminNavBar/AdminNavBar';
import Footer from '../../Footer/Footer';
import './AddDealer.css';
import { toast } from 'react-toastify';

const AddDealer = () => {
  const { id } = useParams(); // Get dealer ID from URL
  const navigate = useNavigate();

  const [dealer, setDealer] = useState({
    dealerName: '',
    dealerPhoneNumber: '',
    dealerEmail: '',
    addressLine1: '',
    addressLine2: '',
    dealerLocation: '',
    dealerState: ''
  });

  useEffect(() => {
    if (id) {
      // ✅ Correct API Call
      DealerService.getDealerById(id)
        .then(response => {
          if (response.data) {
            setDealer(response.data);
          }
        })
        .catch(error => console.error("Error fetching dealer details:", error));
    }
  }, [id]);

  const handleChange = (e) => {
    setDealer({ ...dealer, [e.target.name]: e.target.value || '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      // ✅ Update existing dealer
      DealerService.updateDealer(id, dealer)
        .then(() => {
          toast.success("Dealer updated successfully");
          navigate("/admin-list-dealers"); // Redirect back to dealer list
        })
        .catch(error => console.error("Error updating dealer:", error));
    } else {
      // ✅ Add new dealer
      DealerService.addDealer(dealer)
        .then(() => {
          toast.success("Dealer added successfully");
          setDealer({
            dealerName: '',
            dealerPhoneNumber: '',
            dealerEmail: '',
            addressLine1: '',
            addressLine2: '',
            dealerLocation: '',
            dealerState: ''
          });
        })
        .catch(error => console.error("Error adding dealer:", error));
    }
  };

  return (
    <div>
      <AdminNavBar />
      <br />
      <br />
      
      <div className="add-dealer-container">
        
        <h2>{id ? "Update Dealer" : "Add Dealer"}</h2>
        
        <form onSubmit={handleSubmit}>
          <input type="text" name="dealerName" placeholder="Dealer Name" value={dealer.dealerName || ''} onChange={handleChange} required />
          <input type="text" name="dealerPhoneNumber" placeholder="Phone Number" value={dealer.dealerPhoneNumber || ''} onChange={handleChange} required />
          <input type="email" name="dealerEmail" placeholder="Email" value={dealer.dealerEmail || ''} onChange={handleChange} />
          <input type="text" name="addressLine1" placeholder="Address Line 1" value={dealer.addressLine1 || ''} onChange={handleChange} required />
          <input type="text" name="addressLine2" placeholder="Address Line 2" value={dealer.addressLine2 || ''} onChange={handleChange} />
          <input type="text" name="dealerLocation" placeholder="Location" value={dealer.dealerLocation || ''} onChange={handleChange} required />
          <input type="text" name="dealerState" placeholder="State" value={dealer.dealerState || ''} onChange={handleChange} required />
          
          <button type="submit">{id ? "Update Dealer" : "Add Dealer"}</button>
        </form>

        {/* ✅ "All Dealers" Button to Navigate to the Dealer List */}
        <button className="all-dealers-btn" onClick={() => navigate("/admin-list-dealers")}>All Dealers</button>
      </div>
      <Footer />
    </div>
  );
};

export default AddDealer;
