import React, { useState } from "react";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";

import "./Career.css";
import { applyForCareer } from "./CareerService";

const Career = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    message: "",
  });
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Handle text input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file selection
  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    if (!resume) {
      setErrorMessage("Please upload a resume.");
      setLoading(false);
      return;
    }

    try {
      const response = await applyForCareer(formData, resume);
      setSuccessMessage("Application submitted successfully! 🎉");
      console.log("Response:", response);

      // Clear form after successful submission
      setFormData({ fullName: "", email: "", phoneNumber: "", message: "" });
      setResume(null);
    } catch (error) {
      setErrorMessage("Failed to submit application. Please try again.");
    }

    setLoading(false);
  };

  return (
    <>
      <NavBar />
      <div className="career">
        <div className="career-text-color">
          <div className="career-form-text">
            <h1>Careers</h1>
            <div className="career-form-text-para">
              <p className="career-text">
                We value talented and hardworking people. Our team is our biggest strength, and we create a friendly workplace where everyone can grow.
              </p>
              <h5 className="career-text">
                Fill out the form, and our team will contact you soon!
              </h5>
            </div>
          </div>
        </div>

        <div className="career-div">
          <h2 className="title">Join Our Team</h2>
          <p className="description">Fill out the form below to apply for a position with us.</p>

          {/* Display success or error messages */}
          {successMessage && <p className="success-message">{successMessage}</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <form className="career-form" onSubmit={handleSubmit}>
            <div className="form-group-career">
              <label>Full Name</label>
              <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
            </div>
            <div className="form-group-career">
              <label>Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-group-career">
              <label>Phone Number</label>
              <input type="number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
            </div>
            <div className="form-group-career">
              <label>Upload Resume</label>
              <input type="file" name="resume" onChange={handleFileChange} required />
            </div>
            <div className="form-group-career">
              <label>Message</label>
              <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Tell us about yourself..." rows="4"></textarea>
            </div>
            <button type="submit" className="submit-career-btn" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Career;