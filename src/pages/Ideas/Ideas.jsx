import React, { useState, useEffect } from "react";
import "./Ideas.css";

const Ideas = () => {
  const [name, setName] = useState("");
  const [idea, setIdea] = useState("");
  const [category, setCategory] = useState("Canción");
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const API_URL = "https://finalprojectbackend-avve.onrender.com/api/v1/idea";

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const res = await fetch(`${API_URL}`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setIdeas(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error al cargar ideas:", error);
        setErrorMsg("No se pudieron cargar las ideas. Intenta más tarde.");
        setIdeas([]);
      } finally {
        setLoading(false);
      }
    };
    fetchIdeas();
  }, [API_URL]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!name.trim() || !idea.trim()) {
      setErrorMsg("Por favor completa tu nombre y la idea");
      return;
    }

    const validCategories = ["Canción", "Actividad", "Juego", "Detalle especial"];
    if (!validCategories.includes(category)) {
      setErrorMsg("Categoría inválida");
      return;
    }

      const newIdea = { name: name.trim(), idea: idea.trim(), category, message: "" };

    try {
      console.log("Enviando idea:", newIdea);
      const res = await fetch(`${API_URL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newIdea),
      });

      if (!res.ok) {
         const errData = await res.json();
         throw new Error(errData.message ||`HTTP error! status: ${res.status}`);
      }
        
      const data = await res.json();
      setIdeas([data, ...ideas]);
      setName("");
      setIdea("");
      setCategory("Canción");
      } catch (error) {
        console.error("Error al enviar idea:", error);
        alert(" Hubo un error al enviar tu idea 😔");
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
        {errorMsg && <p className="error">{errorMsg}</p>}
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
        {loading ? (
          <p>Cargando ideas...</p>
        ) : ideas.length === 0 ? (
          <p className="no-ideas">Aún no hay ideas. ¡Sé el primero en sugerir algo!</p>
        ) : (
          ideas.map((i) => (
            <div key={i._id || Math.random()} className="idea-card">
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
