import React, { useState, useEffect } from "react";
import "./Dedications.css";

const Dedications = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [dedications, setDedications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDedications = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/dedication`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setDedications(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error al obtener dedicatorias:", error);
        setDedications([]);
      } finally {
        setLoading(false);
      }
    };
    fetchDedications();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !message) {
      alert("Por favor, completa tu nombre y dedicatoria ❤️");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("message", message);
    if (file) formData.append("file", file);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/dedication`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const data = await res.json();
      setDedications([data, ...dedications]);
      setName("");
      setMessage("");
      setFile(null);
      } catch (error) {
        console.error("Error al enviar dedicatoria:", error);
        alert("Error al enviar la dedicatoria 😔");
      }
  };

  return (
    <div className="dedications">
      <h1 className="names">Dedicatorias</h1>
      <p className="intro">Deja unas palabras especiales para los novios 💕</p>

      <form className="dedication-form" onSubmit={handleSubmit}>
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
          Tu mensaje:
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </label>

        <label>
          Archivo (opcional):
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            accept="image/*,video/*"
          />
        </label>

        <button type="submit">Enviar dedicatoria</button>
      </form>

      <div className="dedication-list">
        {dedications.length === 0 ? (
          <p className="no-dedications">Aún no hay dedicatorias 😍</p>
        ) : (
          dedications.map((d) => (
            <div key={d._id || Math.random()} className="dedication-card">
              <p><strong>{d.name}</strong>: {d.message}</p>
              {d.file && (
                <img
                  src={d.file}
                  alt="Adjunto"
                  className="dedication-file"
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dedications;