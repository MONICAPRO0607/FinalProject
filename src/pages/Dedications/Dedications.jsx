import React, { useState, useEffect } from "react";
import "./Dedications.css";

const Dedications = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [dedications, setDedications] = useState([]);

  useEffect(() => {
    const fetchDedications = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/dedications");
        const data = await res.json();
        setDedications(data);
      } catch (error) {
        console.error("Error al obtener dedicatorias:", error);
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
      const res = await fetch("http://localhost:3000/api/dedications", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setDedications([data, ...dedications]);
        setName("");
        setMessage("");
        setFile(null);
      } else {
        alert("Error al enviar la dedicatoria 😔");
      }
    } catch (error) {
      console.error("Error al enviar dedicatoria:", error);
      alert("Hubo un error al enviar tu dedicatoria 😢");
    }
  };

  return (
    <div className="dedications">
      <h1 className="titles">Dedicatorias</h1>
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
            <div key={d._id} className="dedication-card">
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