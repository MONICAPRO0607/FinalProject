import React from "react";
import "./History.css";

const History = () => {
  const sections = [
    {
      title: "Cómo nos conocimos 💫",
      text: "Todo comenzó con una mirada... Fue una casualidad, un cruce de caminos que ninguno esperaba, pero que cambió nuestras vidas para siempre.",
      image: "./assets/conocernos.jpg",
    },
    {
      title: "Nuestro primer viaje juntos ✈️",
      text: "El primer viaje fue una aventura. No todo salió como planeábamos, pero entre risas, canciones y paisajes, aprendimos a disfrutar del camino.",
      image: "./assets/viajando.jpg",
    },
    {
      title: "Nuestra primera casa 🏡",
      text: "Dimos el paso de vivir juntos, llenando cada rincón de recuerdos, plantas, fotos y amor. Fue el comienzo de un hogar, no solo una casa.",
      image: "./assets/Casa.jpg",
    },
    {
      title: "La gran declaración 💍",
      text: "Un momento mágico, inesperado y sincero. Con el corazón latiendo fuerte, una pregunta, una sonrisa, y un ‘sí’ que lo cambió todo.",
      image: "./assets/declaración.jpg",
    },
  ];

  return (
    <div className="history-page">
      <h1 className="names">Nuestra historia</h1>
      <p>Pequeños detalles que hacen grande el amor.</p>
      <div className="timeline">
        {sections.map((item, index) => (
          <div
            className={`timeline-item ${index % 2 === 0 ? "left" : "right"}`}
            key={index}
          >
            <div className="timeline-content">
              <h2>{item.title}</h2>
              <p>{item.text}</p>
            </div>
            {item.image && (
              <img
                src={item.image}
                alt={item.title}
                className="timeline-image"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;

