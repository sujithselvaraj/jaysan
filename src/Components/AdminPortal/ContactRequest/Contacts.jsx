import { useState, useEffect } from "react";
import "./Contacts.css";
import AdminNavBar from "../AdminNavBar/AdminNavBar";
import Footer from "../../Footer/Footer";
import api from "../../Reducers/AxiosConfig";
import "./Contacts.css"

const Contacts = () => {
  const [allContacts, setAllContacts] = useState([]);
  const [supportContacts, setSupportContacts] = useState([]);
  const [dealerContacts, setDealerContacts] = useState([]);
  const [salesContacts, setSalesContacts] = useState([]);
  const [otherContacts, setOtherContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [comments, setComments] = useState({});

  useEffect(() => {
    fetchContacts("all");
  }, []);

  const fetchContacts = async (category) => {
    setLoading(true);
    setSelectedCategory(category);
    let url = "";

    switch (category) {
      case "support":
        url = "/contact/get/support";
        break;
      case "dealer":
        url = "/contact/get/dealer";
        break;
      case "sales":
        url = "/contact/get/sales";
        break;
      case "other":
        url = "/contact/get/other";
        break;
      default:
        url = "/contact/get";
        break;
    }

    try {
      const response = await api.get(url);
      switch (category) {
        case "support":
          setSupportContacts(response.data);
          break;
        case "dealer":
          setDealerContacts(response.data);
          break;
        case "sales":
          setSalesContacts(response.data);
          break;
        case "other":
          setOtherContacts(response.data);
          break;
        default:
          setAllContacts(response.data);
          break;
      }
    } catch (error) {
      console.error(`Error fetching ${category} contacts:`, error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus,comments) => {
    try {
      await api.put(
        `/contact/update/status?id=${id}&status=${newStatus}&comments=${encodeURIComponent(comments||"")}`
      );
      fetchContacts(selectedCategory);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const filteredContacts = (contacts) => {
    return selectedStatus === "all"
      ? contacts
      : contacts.filter((contact) => contact.status === selectedStatus);
  };

  return (
    <>
      <AdminNavBar />
      <div className="admin-container">
        <div className="sidebar">
          <h3>Filter by Purpose</h3>
          <ul>
            <li><button onClick={() => fetchContacts("all")}>All</button></li>
            <li><button onClick={() => fetchContacts("support")}>Support</button></li>
            <li><button onClick={() => fetchContacts("dealer")}>Dealer</button></li>
            <li><button onClick={() => fetchContacts("sales")}>Sales</button></li>
            <li><button onClick={() => fetchContacts("other")}>Other</button></li>
          </ul>
        </div>

        <div className="contact-table-container">
          {/* Status Filter Dropdown */}
          <div className="status-filter">
            <label>Filter by Status: </label>
            <select onChange={(e) => setSelectedStatus(e.target.value)} value={selectedStatus}>
              <option value="all">All</option>
              <option value="PENDING">Pending</option>
              <option value="COMPLETED">Completed</option>
              <option value="REJECTED">Rejected</option>
              <option value="IN_PROGRESS">In Progress</option>
            </select>
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              {selectedCategory === "all" && allContacts.length > 0 && (
                <div className="table-section">
                  <h2>All Contacts</h2>
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Location</th>
                        <th>Purpose</th>
                        <th>Status</th>
                        <th>Comments</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredContacts(allContacts).map((contact) => (
                        <tr key={contact.id}>
                          <td>{contact.name}</td>
                          <td>{contact.phoneNumber}</td>
                          <td>{contact.location}</td>
                          <td>{contact.purpose}</td>
                          <td>{contact.status}</td>
                          <td>{contact.comments}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {selectedCategory === "support" && supportContacts.length > 0 && (
                <div className="table-section">
                  <h2>Support Contacts</h2>
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Phone Number</th>
                        <th>Location</th>
                        <th>Product</th>
                        <th>Issue</th>
                        <th>Status</th>
                        <th>Comments</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredContacts(supportContacts).map((contact) => (
                        <tr key={contact.id}>
                          <td>{contact.name}</td>
                          <td>{contact.phoneNumber}</td>
                          <td>{contact.location}</td>
                          <td>{contact.product}</td>
                          <td>{contact.issue}</td>

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
                                value={comments[contact.id] ?? contact.comments ?? ""}
                                placeholder="Enter comments"
                                onChange={(e) => {
                                  setComments((prev) => ({
                                    ...prev,
                                    [contact.id]: e.target.value, // Update the specific comment
                                  }));
                                }}
                                onBlur={() => {
                                  const updatedComment = comments[contact.id] ?? contact.comments ?? "";
                                  updateStatus(contact.id, contact.status, updatedComment);
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    e.preventDefault();
                                    const updatedComment = comments[contact.id] ?? contact.comments ?? "";
                                    updateStatus(contact.id, contact.status, updatedComment);
                                  }
                                }}
                              />
                            </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {selectedCategory === "dealer" && dealerContacts.length > 0 && (
                <div className="table-section">
                  <h2>Dealer Contacts</h2>
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Company</th>
                        <th>Phone</th>
                        <th>Location</th>
                        <th>Product</th>
                        <th>Status</th>
                        <th>Comments</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredContacts(dealerContacts).map((contact) => (
                        <tr key={contact.id}>
                          <td>{contact.name}</td>
                          <td>{contact.companyName}</td>
                          <td>{contact.phoneNumber}</td>
                          <td>{contact.location}</td>
                          <td>{contact.product}</td>
                          <td>
                            <select
                              value={contact.status}
                              onChange={(e) => updateStatus(contact.id, e.target.value)}
                            >
                              <option value="PENDING">Pending</option>
                              <option value="COMPLETED">Completed</option>
                              <option value="REJECTED">Rejected</option>
                              <option value="IN_PROGRESS">In Progress</option>
                            </select>
                          </td>
                          <td>
                            <textarea
                              value={comments[contact.id] ?? contact.comments ?? ""}
                              placeholder="Enter comments"
                              onChange={(e) => {
                                setComments((prev) => ({
                                  ...prev,
                                  [contact.id]: e.target.value, // Update the specific comment
                                }));
                              }}
                              onBlur={() => {
                                const updatedComment = comments[contact.id] ?? contact.comments ?? "";
                                updateStatus(contact.id, contact.status, updatedComment);
                              }}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                  const updatedComment = comments[contact.id] ?? contact.comments ?? "";
                                  updateStatus(contact.id, contact.status, updatedComment);
                                }
                              }}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {selectedCategory === "sales" && salesContacts.length > 0 && (
                <div className="table-section">
                  <h2>Sales Contacts</h2>
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Product</th>
                        <th>Phone</th>
                        <th>Location</th>
                        <th>Status</th>
                        <th>Comments</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredContacts(salesContacts).map((contact) => (
                        <tr key={contact.id}>
                          <td>{contact.name}</td>
                          <td>{contact.product}</td>
                          <td>{contact.phoneNumber}</td>
                          <td>{contact.location}</td>
                          <td>
                            <select
                              value={contact.status}
                              onChange={(e) => updateStatus(contact.id, e.target.value)}
                            >
                              <option value="PENDING">Pending</option>
                              <option value="COMPLETED">Completed</option>
                              <option value="REJECTED">Rejected</option>
                              <option value="IN_PROGRESS">In Progress</option>
                            </select>
                          </td>
                          <td>
                            <textarea
                              value={comments[contact.id] ?? contact.comments ?? ""}
                              placeholder="Enter comments"
                              onChange={(e) => {
                                setComments((prev) => ({
                                  ...prev,
                                  [contact.id]: e.target.value, // Update the specific comment
                                }));
                              }}
                              onBlur={() => {
                                const updatedComment = comments[contact.id] ?? contact.comments ?? "";
                                updateStatus(contact.id, contact.status, updatedComment);
                              }}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                  const updatedComment = comments[contact.id] ?? contact.comments ?? "";
                                  updateStatus(contact.id, contact.status, updatedComment);
                                }
                              }}
                            />
                          </td>
                        </tr>
                      ))
                      }
                    </tbody>
                  </table>
                </div>

              )}

               {selectedCategory === "other" && otherContacts.length > 0 && (
                <div className="table-section">
                  <h2>Other Contacts</h2>
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>District</th>
                        <th>Status</th>
                        <th>Comments</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredContacts(otherContacts).map((contact) => (
                        <tr key={contact.id}>
                          <td>{contact.name}</td>
                          <td>{contact.phoneNumber}</td>
                          <td>{contact.location}</td>
                          <td>
                            <select
                              value={contact.status}
                              onChange={(e) => updateStatus(contact.id, e.target.value)}
                            >
                              <option value="PENDING">Pending</option>
                              <option value="COMPLETED">Completed</option>
                              <option value="REJECTED">Rejected</option>
                              <option value="IN_PROGRESS">In Progress</option>
                            </select>
                          </td>
                          <td>
                            <textarea
                              value={comments[contact.id] ?? contact.comments ?? ""}
                              placeholder="Enter comments"
                              onChange={(e) => {
                                setComments((prev) => ({
                                  ...prev,
                                  [contact.id]: e.target.value, // Update the specific comment
                                }));
                              }}
                              onBlur={() => {
                                const updatedComment = comments[contact.id] ?? contact.comments ?? "";
                                updateStatus(contact.id, contact.status, updatedComment);
                              }}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                  const updatedComment = comments[contact.id] ?? contact.comments ?? "";
                                  updateStatus(contact.id, contact.status, updatedComment);
                                }
                              }}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                   </table>
                 </div>
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contacts;
