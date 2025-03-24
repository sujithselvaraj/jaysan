import React, { useEffect, useState } from "react";
import AdminNavBar from "../AdminNavBar/AdminNavBar";
import Footer from "../../Footer/Footer";

import { FaTrash } from "react-icons/fa";
import "./ListCareer.css";
import api from "../../Reducers/AxiosConfig";

const ListCareer = () => {
  const [careers, setCareers] = useState([]);

  // Fetch all careers
  useEffect(() => {
    api.get("/careers")
      .then((response) => setCareers(response.data))
      .catch((error) => console.error("Error fetching careers:", error));
  }, []);

  // Delete a career entry
  const deleteCareer = (id) => {
    if (window.confirm("Are you sure you want to delete this career entry?")) {
      api
        .delete(`/careers/${id}`)
        .then(() => {
          setCareers(careers.filter((career) => career.id !== id));
          alert("Career entry deleted successfully.");
        })
        .catch((error) => console.error("Error deleting career:", error));
    }
  };

  return (
    <>
    <div className="career-container">
      <AdminNavBar />
      <h2 className="career-title">Career Applications</h2>
      <div className="table-container">
      <table className="career-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Resume</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {careers.length > 0 ? (
              careers.map((career) => (
                <tr key={career.id}>
                  <td>{career.id}</td>
                  <td>{career.fullName}</td>
                  <td>{career.email}</td>
                  <td>{career.phoneNumber}</td>
                  <td>
                    <a
                      href={career.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="download-link"
                    >
                      Download
                    </a>
                  </td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => deleteCareer(career.id)}
                    >
                      <FaTrash /> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="no-data">
                  No career applications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
     
    </div>
    <Footer />
    </>
  );
};

export default ListCareer;
