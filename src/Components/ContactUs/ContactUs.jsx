import { useState } from "react";
import "./ContactUs.scss";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";

const ContactUs = () => {
  const [purpose, setPurpose] = useState("");
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      question: "How can I register a complaint?",
      answer: "You can register a complaint by selecting 'Complaint Registration' and filling out the form with issue details."
    },
    {
      question: "How do I become a dealer?",
      answer: "If you're interested in a dealership, select 'Dealer Partnership Interest' and provide your company details."
    },
    {
      question: "Where can I buy your products?",
      answer: "You can find our products through our authorized dealers or by submitting a sales enquiry form."
    },
  ];

  return (
    <div className="contact-container">
      <br/>
      <br/>
      <h2 className="contact-title">Thanks for contacting Jaysan Agri Industrial</h2>

      {/* FAQ Section */}
      <div className="faq-section">
        <h3 className="faq-title">Frequently Asked Questions</h3>
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item" onClick={() => setOpenFAQ(openFAQ === index ? null : index)}>
            <h4 className="faq-question">{faq.question}</h4>
            {openFAQ === index && <p className="faq-answer">{faq.answer}</p>}
          </div>
        ))}
      </div>

      {/* Purpose Dropdown */}
      {!purpose ? (
        <div className="purpose-section">
          <h3 className="purpose-title">What is the purpose of contacting us?</h3>
          <select className="purpose-dropdown" onChange={(e) => setPurpose(e.target.value)}>
            <option value="">Select an option</option>
            <option value="Support">Complaint Registration</option>
            <option value="Sales Enquiry">Sales Enquiry</option>
            <option value="Dealer Partnership">Dealer Partnership Interest</option>
            <option value="Contact">Other</option>
          </select>
        </div>
      ) : (
        <form className="contact-form">
          <h3 className="form-title">Fill the form for {purpose}</h3>

          <label className="form-label">Name</label>
          <input className="form-input" type="text" placeholder="Your Name" required />

          <label className="form-label">Phone Number</label>
          <input className="form-input" type="number" placeholder="Your Phone Number" required />

          <label className="form-label">Your District</label>
          <input className="form-input" type="text" placeholder="Your Current Location" required />

          {purpose === "Support" && (
            <>
              <label className="form-label">Select the Machine</label>
              <select className="form-input">
                <option value="">-- Select Machine --</option>
                <option value="tractor">Tractor</option>
                <option value="harvester">Harvester</option>
                <option value="baler">Baler</option>
                <option value="plow">Plow</option>
                <option value="seeder">Seeder</option>
              </select>

              <label className="form-label">Issue</label>
              <textarea className="form-textarea" placeholder="Describe your issue" required></textarea>
            </>
          )}

          {purpose === "Sales Enquiry" && (
            <>
              <label className="form-label">Product Interest</label>
              <input className="form-input" type="text" placeholder="Product name" required />
            </>
          )}

          {purpose === "Dealer Partnership" && (
            <>
              <label className="form-label">Product Interest</label>
              <input className="form-input" type="text" placeholder="Product name" required />

              <label className="form-label">Company Name</label>
              <input className="form-input" type="text" placeholder="Your Company Name" required />
            </>
          )}

          <button className="submit-btn" type="submit">Submit</button>
        </form>
      )}

      {/* Google Map Section */}
      <div className="map-section">
        <h3 className="map-title">Our Location</h3>
        <iframe
          className="map-frame"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093745!2d144.9559283155049!3d-37.8172098797515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xa65bace1e6f5!2sGoogle!5e0!3m2!1sen!2sus!4v1634694387389!5m2!1sen!2sus"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactUs;
