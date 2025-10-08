import React from "react";
import "./Gifts.css";
import { FaPlane, FaHome, FaHeart, FaMoneyBillWave } from "react-icons/fa";

const Gifts = () => {
  return (
    <div className="gifts">
      <h1 className="names">Regalos con Amor</h1>
      <p className="intro">
        Tu presencia es el mejor regalo. Si deseas contribuir, aquí tienes nuestras ideas y opciones:
      </p>

      <div className="gift-options">
        <div className="gift-card">
          <div className="gift-header">
            <FaPlane className="icon" />
            <h2>Luna de miel</h2>
          </div>
          <p>
            Nos encantaría viajar a Bali y Japón para nuestra luna de miel.  
            Ideas: alojamiento romántico, experiencias culturales, excursiones, transporte.
          </p>
        </div>

        <div className="gift-card">
          <div className="gift-header">
            <FaHome className="icon" />
            <h2>Para el hogar</h2>
          </div>
          <p>
            Queremos decorar nuestro hogar con amor.  
            Ideas: electrodomésticos, vajilla, decoración, muebles pequeños.
          </p>
        </div>

        <div className="gift-card">
          <div className="gift-header">
            <FaHeart className="icon" />
            <h2>Experiencias</h2>
          </div>
          <p>
            Nos encanta vivir nuevas experiencias juntos.  
            Ideas: cenas románticas, clases de cocina, escapadas de fin de semana.
          </p>
        </div>

        <div className="gift-card">
          <div className="gift-header">
            <FaMoneyBillWave className="icon" />
            <h2>Contribución económica</h2>
          </div>
          <p>
            Si prefieres apoyarnos con una contribución económica, puedes hacerlo en nuestra cuenta:  
            <strong>ES12 3456 7890 1234 5678 9012</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Gifts;