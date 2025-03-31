import { useState, useEffect } from "react";
import "./AddTeam.css";
import Footer from "../../Footer/Footer";
import AdminNavBar from "../AdminNavBar/AdminNavBar";
import api from "../../Reducers/AxiosConfig";

const AddTeam = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    email: "",
    whatsappNumber: "",
    imageFile: null,
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = () => {
    api.get("/team")
      .then((response) => setTeamMembers(response.data))
      .catch((error) => console.error("Error fetching team members:", error));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, imageFile: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const url = editId ? `/team/${editId}` : "/team";
    const method = editId ? "put" : "post";
  
    const data = new FormData();
    const teamRequestJson = {
      name: formData.name,
      designation: formData.designation,
      email: formData.email,
      whatsappNumber: formData.whatsappNumber,
    };
  
    data.append("teamRequest", new Blob([JSON.stringify(teamRequestJson)], { type: "application/json" }));
  
    if (formData.imageFile) {
      data.append("imageFile", formData.imageFile);
    }
  
    try {
      const response = await api({
        url,
        method,
        data,
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      if (response.status === 200) {
        setFormData({
          name: "",
          designation: "",
          email: "",
          whatsappNumber: "",
          imageFile: null,
        });
        setEditId(null);
        fetchTeamMembers();
      } else {
        alert("Failed to save team member.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this team member?")) return;
  
    try {
      const response = await api.delete(`/team/${id}`);
  
      if (response.status === 200) {
        setTeamMembers(teamMembers.filter((t) => t.id !== id));
      } else {
        alert("Failed to delete team member.");
      }
    } catch (error) {
      console.error("Error deleting team member:", error);
    }
  };
  

  const handleEdit = (teamMember) => {
    setFormData({
      name: teamMember.name,
      designation: teamMember.designation,
      email: teamMember.email,
      whatsappNumber: teamMember.whatsappNumber,
      imageFile: null,
    });
    setEditId(teamMember.id);
  };

  return (
    <>
    <AdminNavBar/>
    <br/>
    <br/>
    <div className="team-form-container">
      <h2>{editId ? "Edit Team Member" : "Add Team Member"}</h2>
      
      <form onSubmit={handleSubmit} className="team-form">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="designation"
          placeholder="Designation"
          value={formData.designation}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="whatsappNumber"
          placeholder="WhatsApp Number"
          value={formData.whatsappNumber}
          onChange={handleChange}
          required
        />
        <input type="file" name="imageFile" onChange={handleFileChange} accept="image/*" />
        <button type="submit">{editId ? "Update" : "Submit"}</button>
      </form>
      </div>

<div className="team-table-div">
  <div className="team-table-view">
    <h2>Team Members</h2>
      
      <table className="team-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Designation</th>
            <th>Email</th>
            <th>WhatsApp</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teamMembers.map((teamMember) => (
            <tr key={teamMember.id}>
              <td>{teamMember.name}</td>
              <td>{teamMember.designation}</td>
              <td>{teamMember.email}</td>
              <td>{teamMember.whatsappNumber}</td>
              <td>
                {teamMember.imageUrl && <img src={teamMember.imageUrl} alt="Team Member" width="50" />}
              </td>
              <td>
                <button onClick={() => handleEdit(teamMember)}>Edit</button>
                <button onClick={() => handleDelete(teamMember.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      </div>
    <Footer/>
    </>
  );
};

export default AddTeam;
