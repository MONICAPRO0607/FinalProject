import React from 'react';
import './EventDay.css';

const EventDay = () => {
  const address = 'Calle Calzada S/N 40410 San Rafael (Segovia)';
  const encodedAddress = encodeURIComponent(address);

  return (
    <div className="event-page">
      <h1>El Gran Día 💍</h1>
      <p>Nos casamos el <strong>5 de septiembre de 2026</strong> 🎉</p>
      <p>
        Estamos deseando celebrar este día tan especial contigo. Aquí tienes
        toda la información para que no te pierdas nada.
      </p>
      <div className="map-container">
        <iframe
          title="Mapa Finca La Casona del Pinar"
          src="https://www.google.com/maps?q=Calle+Calzada+S/N+40410+San+Rafael+(Segovia)&output=embed"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
      <a
        className="visit-finca-btn"
        href="https://fincalacasonadelpinar.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Visitar página de la finca
      </a>
    </div>
  );
}

export default EventDay;