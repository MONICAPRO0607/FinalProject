import React, { useState, useEffect } from 'react'
import './Ideas.css'

const Ideas = () => {
  const [name, setName] = useState("");
  const [idea, setIdea] = useState("");
  const [category, setCategory] = useState("Canción");
  const [ideas, setIdeas] = useState([]);

  useEffect(() => {
    const savedIdeas = localStorage.getItem("ideas");
    if (savedIdeas) {
      setIdeas(JSON.parse(savedIdeas));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("ideas", JSON.stringify(ideas));
  }, [ideas]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !idea) {
      alert("Por favor completa tu nombre y la idea");
      return;
    }

    const newIdea = {
      id: Date.now(),
      name,
      category,
      idea,
    };

    setIdeas([newIdea, ...ideas]);
    setName("");
    setIdea("");
    setCategory("Canción");
  };

  return (
    <div className="ideas">
      <h1 className="names">Ideas y Recuerdos</h1>
      <p className="intro">
        Queremos que os animeis a sugerirnos canciones, actividades, juegos o cualquier detalle que pueda hacer aún más especial este gran día.</p>
        <p>¡Ayúdanos a crear recuerdos inolvidables! 💕</p>


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
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
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
            <div key={i.id} className="idea-card">
              <h3>{i.category}</h3>
              <p><strong>{i.name}</strong>: {i.idea}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Ideas