import React from "react";
import "./EventDay.css";

const EventDay = () => {
  return (
    <div className="event-page">
      <h1>El Gran Día 💍</h1>

      <p className="intro">
        ¡Nos casamos el <strong>5 de septiembre de 2026</strong>! 🎉  
        Estamos deseando celebrar este día tan especial contigo.  
        Aquí tienes toda la información para que no te pierdas nada.
      </p>

      <div className="itinerary">
        <h2>🕰 Itinerario del día</h2>
        <ul>
          <li>
            <span className="time">16:30</span>
            <span className="activity">Llegada de los invitados</span>
          </li>
          <li>
            <span className="time">17:00</span>
            <span className="activity">Ceremonia civil en los jardines</span>
          </li>
          <li>
            <span className="time">18:00</span>
            <span className="activity">Cóctel de bienvenida</span>
          </li>
          <li>
            <span className="time">19:30</span>
            <span className="activity">Cena y celebración</span>
          </li>
          <li>
            <span className="time">23:00</span>
            <span className="activity">Baile y fiesta 🎶</span>
          </li>
          <li>
            <span className="time">02:00</span>
            <span className="activity">Fin de la celebración</span>
          </li>
        </ul>
      </div>

      <div className="map-section">
        <h2>📍 Cómo llegar</h2>
        <p>
          La celebración será en <strong>Finca La Casona del Pinar</strong>
          <br />
          <em>Calle Calzada S/N, 40410 San Rafael (Segovia)</em>
        </p>

        <div className="map-container">
          <iframe
            title="Mapa Finca La Casona del Pinar"
            src="https://www.google.com/maps?q=Calle+Calzada+S%2FN%2C+40410+San+Rafael+(Segovia)&output=embed"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>

        <a
          className="visit-finca-btn"
          href="https://www.google.com/maps/dir/?api=1&destination=Calle+Calzada+S%2FN%2C+40410+San+Rafael+(Segovia)"
          target="_blank"
          rel="noopener noreferrer"
        >
          Cómo llegar con Google Maps
        </a>

        <a
          className="visit-finca-link"
          href="https://fincalacasonadelpinar.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Visitar la web de la finca
        </a>
      </div>
    </div>
  );
};

export default EventDay;