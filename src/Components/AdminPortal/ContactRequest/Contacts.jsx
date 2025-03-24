import { useState, useEffect } from "react";
import "./Contacts.css";
import axios from "axios";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [selectedPurpose, setSelectedPurpose] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/contact/get");
      setContacts(response.data);
      setFilteredContacts(response.data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = () => {
    let filtered = contacts;
    if (selectedPurpose) {
      filtered = filtered.filter((contact) => contact.purpose === selectedPurpose);
    }
    if (selectedStatus) {
      filtered = filtered.filter((contact) => contact.status === selectedStatus);
    }
    setFilteredContacts(filtered);
  };

  const updateStatus = async (id, newStatus, newComments) => {
    try {
      await axios.put(`http://localhost:8080/api/contact/update/status?id=${id}&status=${newStatus}&comments=${encodeURIComponent(newComments || "")}`);
      fetchContacts(); // Refresh the list after updating
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="admin-container">
      <div className="sidebar">
        <h3>Filter by Purpose</h3>
        <ul>
          {["", "Sales Enquiry", "Support", "Dealer Partnership", "Other"].map((purpose) => (
            <li key={purpose} onClick={() => setSelectedPurpose(purpose)} className={selectedPurpose === purpose ? "active" : ""}>
              {purpose || "All"}
            </li>
          ))}
        </ul>
        
        <h3>Filter by Status</h3>
        <select onChange={(e) => setSelectedStatus(e.target.value)}>
          <option value="">All</option>
          <option value="PENDING">Pending</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
        </select>
        
        <button onClick={handleFilter}>Apply Filters</button>
      </div>
      
      <div className="contact-table">
        <h2>Received Contacts</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Location</th>
                <th>Purpose</th>
                <th>Status</th>
                <th>Update Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts.map((contact) => (
                <tr key={contact.id}>
                  <td>{contact.name}</td>
                  <td>{contact.phoneNumber}</td>
                  <td>{contact.location}</td>
                  <td>{contact.purpose}</td>
                  <td>{contact.status}</td>
                  <td>
                    <select
                      className="p-1 border rounded"
                      value={contact.status}
                      onChange={(e) => updateStatus(contact.id, e.target.value)}
                    >
                      <option value="PENDING">Pending</option>
                      <option value="COMPLETED">Completed</option>
                      <option value="REJECTED">Rejected</option>
                    </select>
                  </td>
                  <td>
                  <textarea
  value={contact.comments ?? ""}
  onChange={(e) => {
    const updatedFilteredContacts = filteredContacts.map((c) =>
      c.id === contact.id ? { ...c, comments: e.target.value } : c
    );
    setFilteredContacts(updatedFilteredContacts);
  }}
  onBlur={() => updateStatus(contact.id, contact.status, contact.comments ?? "")}
/>


      </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Contacts;
