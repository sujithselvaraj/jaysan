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
    navigate(`/admin-add-dealers/${id}`);
  };

  const handleAddDealer = () => {
    navigate('/admin-add-dealers');
  };

  return (
    <div>
      <AdminNavBar />
      <div className="dealer-container">
        <h2 className="dealer-title">Dealer List</h2>
        <button className="dealer-add-btn" onClick={handleAddDealer}>+ Add Dealer</button>
        <div className="dealer-table-wrapper">
          <table className="dealer-table">
            <thead className="dealer-table-head">
              <tr className="dealer-table-row">
                <th className="dealer-table-header">Name</th>
                <th className="dealer-table-header">Email</th>
                <th className="dealer-table-header">Phone</th>
                <th className="dealer-table-header">State</th>
                <th className="dealer-table-header">Actions</th>
              </tr>
            </thead>
            <tbody className="dealer-table-body">
              {dealers.map(dealer => (
                <tr key={dealer.id} className="dealer-table-row">
                  <td className="dealer-table-data">{dealer.dealerName}</td>
                  <td className="dealer-table-data">{dealer.dealerEmail}</td>
                  <td className="dealer-table-data">{dealer.dealerPhoneNumber}</td>
                  <td className="dealer-table-data">{dealer.dealerState}</td>
                  <td className="dealer-table-data dealer-action-btns">
                    <button className="dealer-update-btn" onClick={() => handleUpdate(dealer.id)}>Update</button>
                    <button className="dealer-delete-btn" onClick={() => handleDelete(dealer.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ListDealer;
