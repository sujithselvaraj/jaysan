import React, { useState } from 'react';
import AdminNavBar from '../AdminNavBar/AdminNavBar';
import Footer from '../../Footer/Footer';
import AddTestimonial from '../Testimonials/AddTestimonial';
import api from '../../Reducers/AxiosConfig';

const Dashboard = () => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setUploadStatus('');
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadStatus('Please select a file to upload.');
      return;
    }
  
    const formData = new FormData();
    formData.append('brochure', file);
  
    try {
      const response = await api.post('/brochure', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.status === 200) {
        setUploadStatus('Upload successful!');
      } else {
        setUploadStatus('Upload failed. Please try again.');
      }
    } catch (error) {
      setUploadStatus('An error occurred while uploading.');
      console.error("Upload error:", error);
    }
  };
  

  return (
    <div>
      <AdminNavBar />
      <br />
<br/>
      {/* Brochure Upload Form */}
      <div style={{ padding: '20px', border: '1px solid #ddd', maxWidth: '400px', margin: 'auto' }}>
        <h3>Upload Brochure</h3>
        <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
        {file && <p>Selected File: {file.name}</p>}
        <button onClick={handleUpload} style={{ marginTop: '10px', padding: '5px 10px', cursor: 'pointer' }}>
          Upload
        </button>
        {uploadStatus && <p>{uploadStatus}</p>}
      </div>

      <AddTestimonial/>

      <Footer />
    </div>
  );
};

export default Dashboard;
