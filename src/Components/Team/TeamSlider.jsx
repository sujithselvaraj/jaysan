import { useEffect, useState, useRef } from "react";
import { FaEnvelope, FaWhatsapp } from "react-icons/fa";
import "./TeamSlider.css";
import api from "../Reducers/AxiosConfig";

const TeamSlider = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await api.get("/team");
        setTeamMembers(response.data);
      } catch (error) {
        console.error("Error fetching team members:", error);
      }
    };
  
    fetchTeamMembers();
  }, []);
  

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let interval = setInterval(() => {
      if (slider.scrollWidth > slider.clientWidth) {
        slider.scrollBy({ left: 260, behavior: "smooth" });

        if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth) {
          slider.scrollTo({ left: 0, behavior: "smooth" });
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [teamMembers]);

  return (
    <div className="team-slider-container">
      <h2>Meet Our Team</h2>
      <div className="team-slider" ref={sliderRef}>
        {teamMembers.map((member) => (
          <div key={member.id} className="team-card">
            <img src={member.imageUrl} alt={member.name} className="team-img" />
            <div className="team-info">
              <h3>{member.name}</h3>
              <p>{member.designation}</p>
              <div className="team-contact">
              <a href={`mailto:${member.email}`} className="email-icon" title="Send Email">
                  <FaEnvelope />
                </a>
                {/* WhatsApp Icon with Direct Chat Link */}
                <a href={`https://wa.me/${member.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="whatsapp-icon" title="Chat on WhatsApp">
                  <FaWhatsapp />
                </a>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamSlider;
