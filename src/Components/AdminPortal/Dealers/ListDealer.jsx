import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavBar from '../AdminNavBar/AdminNavBar';
import Footer from '../../Footer/Footer';
import './ListDealer.css';
import DealerService from './DealerService';

const ListDealer = () => {
  const [dealers, setDealers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    DealerService.getAllDealers()
      .then(response => setDealers(response.data))
      .catch(error => console.error("Error fetching dealers:", error));
  }, []);

  const handleDelete = (id) => {
    DealerService.deleteDealer(id)
      .then(() => setDealers(dealers.filter(dealer => dealer.id !== id)))
      .catch(error => console.error("Error deleting dealer:", error));
  };

  const handleUpdate = (id) => {
    navigate(`/admin-add-dealers/${id}`); // Redirect to AddDealer with dealer ID
  };

  const handleAddDealer = () => {
    navigate('/admin-add-dealers'); // Redirect to AddDealer page
  };

  return (
    <div>
      <AdminNavBar />
      <div className="dealer-list-container">
        <h2>Dealer List</h2>
        <button className="add-dealer-btn" onClick={handleAddDealer}>+ Add Dealer</button>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>State</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {dealers.map(dealer => (
              <tr key={dealer.id}>
                <td>{dealer.dealerName}</td>
                <td>{dealer.dealerEmail}</td>
                <td>{dealer.dealerPhoneNumber}</td>
                <td>{dealer.dealerState}</td>
                <td>
                  <button className="update-btn" onClick={() => handleUpdate(dealer.id)}>Update</button>
                  <button className="delete-btn" onClick={() => handleDelete(dealer.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
};

export default ListDealer;
