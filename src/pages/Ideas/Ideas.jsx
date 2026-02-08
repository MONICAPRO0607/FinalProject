import React, { useState, useEffect } from "react";
import "./Ideas.css";

const CATEGORY_OPTIONS = [
  { value: "cancion", label: "Canción" },
  { value: "actividad", label: "Actividad" },
  { value: "juego", label: "Juego" },
  { value: "detalle_especial", label: "Detalle especial" },
];

const Ideas = () => {
  const [name, setName] = useState("");
  const [idea, setIdea] = useState("");
  const [category, setCategory] = useState("cancion");
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const API_URL = import.meta.env.VITE_API_URL + '/idea';

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Error al cargar ideas");
        const data = await res.json();
        setIdeas(Array.isArray(data) ? data : data.ideas || []);
      } catch (error) {
        console.error(error);
        setErrorMsg("No se pudieron cargar las ideas");
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

    const trimmedName = name.trim();
    let trimmedIdea = idea.trim();
    const trimmedCategory = category.trim();

    if (!trimmedName || !trimmedIdea) {
      setErrorMsg("Por favor completa tu nombre y la idea");
      return;
    };

    trimmedIdea = trimmedIdea.replace(/"/g, "'");

    const newIdea = {
      name: trimmedName,
      idea: trimmedIdea,
      category: trimmedCategory,
      message: "",
    };

    console.log("Enviando idea al backend:", newIdea);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newIdea),
      });

      const text = await res.text(); 
      let data;
      try {
      data = JSON.parse(text); 
      } catch (err) {
      console.error("No es JSON:", text);
      throw new Error("Respuesta inválida del servidor");
      }

      if (!res.ok) {
      setErrorMsg(data.message || "Error al crear la idea");
      return;
      }

      setIdeas((prev) => [data, ...prev]);

      setName("");
      setIdea("");
      setCategory("cancion");

      } catch (error) {
      console.error("Error real:", error);
      setErrorMsg("Error de conexión con el servidor");
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
            {CATEGORY_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
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
              <h3>{CATEGORY_OPTIONS.find(opt => opt.value === i.category)?.label || i.category}</h3>
              <p><strong>{i.name}</strong>: {i.idea}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Ideas;
