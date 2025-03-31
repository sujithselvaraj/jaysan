import React, { useEffect, useState } from "react";
import "./Events.css";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import api from "../Reducers/AxiosConfig";

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    api.get("/event")
      .then(response => setEvents(response.data))
      .catch(error => console.error("Error fetching events:", error));
  }, []);

  return (
    <>
    <NavBar/>
    <div>
    <section className="company-header2">
        <div  className="about-us-title">
            <h1>Our Events</h1>
        </div>
      </section>
      </div>
    <div className="event-page-container">
      <p className="event-title"> Relive our memorable moments and key milestones.

Don’t miss out—explore our events and news today!</p>
      <div className="event-grid">
        {events.map(event => (
          <div key={event.id} className="event-card">
            <img src={event.imageUrl} alt={event.eventName} className="event-image" />
            <div className="event-details">
              <h2 className="event-name">{event.eventName}</h2>
              <p className="event-desc">{event.eventDesc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Events;
