import { useState } from "react";
import './ContactUs.css';
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";

const ContactUs = () => {

  const [purpose, setPurpose] = useState("");

  return (
    <div className="lets-talk-form">
      <NavBar/>
      <br></br>
      <h2>Thanks for contacting Jaysan Agri Industrial</h2>
   
      <br></br>

      <br></br>

      {/* Step 1: Ask for the purpose */}
      {!purpose ? (
        <div>
          <h3>What is the purpose of contacting us?</h3>
          <select onChange={(e) => setPurpose(e.target.value)}>
            <option value="">Select an option</option>
            <option value="Support">Complaint Registration</option>
            <option value="Sales Enquiry">Sales Enquiry</option>
            <option value="Dealer Partnership">Dealer Patnership Interest</option>
            <option value="Contact">Other</option>
          </select>
        </div>
      ) : (
        <form>
          <h3>Fill the form for {purpose}</h3>

          <label>Name</label>
          <input type="text" placeholder="Your Name" required />

          <label>Phone Number</label>
          <input type="number" placeholder="Your PhoneNumber" required />


          <label>Your District</label>
          <input type="text" placeholder="Your Current Location" required />

          {purpose === "Support" && (
            <>
              <label>Select the Machine</label>
              <select>
                <option value="">-- Select Machine --</option>
                <option value="tractor">Tractor</option>
                <option value="harvester">Harvester</option>
                <option value="baler">Baler</option>
                <option value="plow">Plow</option>
                <option value="seeder">Seeder</option>
              </select>
              <label>Issue</label>
              <textarea placeholder="Describe your issue" required></textarea>
            </>
          )}

          {purpose === "Sales Enquiry" && (
            <>
              <label>Product Interest:</label>
              <input type="text" placeholder="Product name" required />
            </>
          )}

          {purpose === "Dealer Partnership" && (
            <>
              <label>Product Interest:</label>
              <input type="text" placeholder="Product name" required />
              <label>Company Name:</label>
              <input type="text" placeholder="Your Company Name" required />
            </>
          )}

          <button type="submit">Submit</button>
        </form>
      )}
      <br/>
      <br/>

      <br/>

      <Footer/>
    </div>
  );
};

export default ContactUs;
