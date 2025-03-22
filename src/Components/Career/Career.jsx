import React from "react";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import "./Career.css";

const Career = () => {
  return (
    <>
      <NavBar />
      <div className="career">
        <div className="career-text-color">
      <div className="career-form-text">
          <h1>Careers</h1>
            <div className="career-form-text-para">
              <p className="career-text">We value talented and hardworking people. Our team is our biggest strength, and we create a friendly workplace where everyone can grow. If you're looking for a great career, we have opportunities for you!</p>
              <h5 className="career-text">Fill out the form , and our team will contact you soon!</h5>
            </div>
        </div>
        </div>

        <div className="career-div">
          <h2 className="title">Join Our Team</h2>
          <p className="description">
            Fill out the form below to apply for position with us.
          </p>
          <form className="career-form" >
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" name="name"  required />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email"  required />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input type="number" name="phone" required />
            </div>
            <div className="form-group">
              <label>Upload Resume</label>
              <input type="file" name="resume" required />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea name="message" placeholder="Tell us about yourself..." rows="4"></textarea>
            </div>
            <button type="submit" className="submit-btn">Submit</button>
          </form>
        </div>
        
      </div>
      <Footer />
    </>
  );
};

export default Career;