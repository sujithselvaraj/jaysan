
import React, { useEffect, useState } from "react";
import api from "../../Reducers/AxiosConfig";
import Footer from "../../Footer/Footer";
import AdminNavBar from "../AdminNavBar/AdminNavBar";
import "./AddEvents.css";

const AddEvents = () => {
  const [events, setEvents] = useState([]);
  const [eventData, setEventData] = useState({ eventName: "", eventDesc: "" });
  const [selectedFile, setSelectedFile] = useState(null);
  const [editingEventId, setEditingEventId] = useState(null); // Track if editing

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    api.get("/event")
      .then(response => setEvents(response.data))
      .catch(error => console.error("Error fetching events:", error));
  };

  const handleDelete = (id) => {
    api.delete(`/event/${id}`)
      .then(() => fetchEvents())
      .catch(error => console.error("Error deleting event:", error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("eventRequest", new Blob([JSON.stringify(eventData)], { type: "application/json" }));
    if (selectedFile) {
      formData.append("eventImage", selectedFile);
    }

    if (editingEventId) {
      // Update existing event
      api.put(`/event/${editingEventId}`, formData, { headers: { "Content-Type": "multipart/form-data" } })
        .then(() => {
          fetchEvents();
          resetForm();
        })
        .catch(error => console.error("Error updating event:", error));
    } else {
      // Add new event
      api.post("/event", formData, { headers: { "Content-Type": "multipart/form-data" } })
        .then(() => {
          fetchEvents();
          resetForm();
        })
        .catch(error => console.error("Error adding event:", error));
    }
  };

  const handleEditClick = (event) => {
    setEventData({ eventName: event.eventName, eventDesc: event.eventDesc });
    setEditingEventId(event.id);
  };

  const resetForm = () => {
    setEventData({ eventName: "", eventDesc: "" });
    setSelectedFile(null);
    setEditingEventId(null);
  };

  return (
    <>
      <AdminNavBar />
      <div className="admin-event-container">
        <h1 className="admin-event-title">{editingEventId ? "Edit Event" : "Manage Events"}</h1>
        
        <form className="admin-event-form" onSubmit={handleSubmit}>
          <input type="text" placeholder="Event Name" value={eventData.eventName} onChange={(e) => setEventData({ ...eventData, eventName: e.target.value })} required />
          <textarea placeholder="Event Description" value={eventData.eventDesc} onChange={(e) => setEventData({ ...eventData, eventDesc: e.target.value })} required />
          <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
          <button type="submit">{editingEventId ? "Update Event" : "Add Event"}</button>
          {editingEventId && <button type="button" className="cancel-btn" onClick={resetForm}>Cancel</button>}
        </form>

        <table className="admin-event-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Event Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map(event => (
              <tr key={event.id}>
                <td>{event.id}</td>
                <td>{event.eventName}</td>
                <td>{event.eventDesc}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEditClick(event)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(event.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default AddEvents;
