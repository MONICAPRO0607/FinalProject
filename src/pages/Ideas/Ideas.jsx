import React, { useState, useEffect } from "react";
import "./Ideas.css";

const Ideas = () => {
  const [name, setName] = useState("");
  const [idea, setIdea] = useState("");
  const [category, setCategory] = useState("Canción");
  const [ideas, setIdeas] = useState([]);

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/ideas");
        const data = await res.json();
        setIdeas(data);
      } catch (error) {
        console.error("Error al cargar ideas:", error);
      }
    };
    fetchIdeas();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !idea) {
      alert("Por favor completa tu nombre y la idea");
      return;
    }

    const newIdea = { name, category, idea };

    try {
      const res = await fetch("http://localhost:3000/api/ideas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newIdea),
      });

      if (res.ok) {
        const data = await res.json();
        setIdeas([data, ...ideas]);
        setName("");
        setIdea("");
        setCategory("Canción");
      } else {
        alert("Error al enviar tu idea 😔");
      }
    } catch (error) {
      console.error("Error al enviar idea:", error);
      alert("Hubo un error al enviar tu idea 😢");
    }
  };

  return (
    <div className="ideas">
      <h1 className="names">Ideas y Recuerdos</h1>
      <p className="intro">
        ¡Ayúdanos a crear recuerdos inolvidables! 💕  
        Puedes sugerir canciones, actividades, juegos o cualquier detalle especial.
      </p>

      <form className="ideas-form" onSubmit={handleSubmit}>
        <label>
          Tu nombre:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <label>
          Categoría:
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Canción">Canción</option>
            <option value="Actividad">Actividad</option>
            <option value="Juego">Juego</option>
            <option value="Detalle especial">Detalle especial</option>
          </select>
        </label>

        <label>
          Tu idea:
          <textarea
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="Escribe aquí tu sugerencia..."
            required
          />
        </label>

        <button type="submit">Enviar idea</button>
      </form>

      <div className="ideas-list">
        {ideas.length === 0 ? (
          <p className="no-ideas">Aún no hay ideas. ¡Sé el primero en sugerir algo!</p>
        ) : (
          ideas.map((i) => (
            <div key={i._id} className="idea-card">
              <h3>{i.category}</h3>
              <p><strong>{i.name}</strong>: {i.idea}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Ideas;
