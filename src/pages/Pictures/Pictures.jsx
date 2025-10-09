import React, { useState, useEffect } from "react";
import "./Pictures.css";

const Pictures = () => {
  const [section, setSection] = useState("antes");
  const [file, setFile] = useState(null);
  const [comment, setComment] = useState("");
  const [gallery, setGallery] = useState({ antes: [], durante: [], despues: [] });

  useEffect(() => {
    const saved = localStorage.getItem("weddingGallery");
    if (saved) setGallery(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("weddingGallery", JSON.stringify(gallery));
  }, [gallery]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      alert("Por favor, selecciona una imagen 📸");
      return;
    }

    const newImage = {
      id: Date.now(),
      url: URL.createObjectURL(file),
      comment,
    };

    setGallery((prev) => ({
      ...prev,
      [section]: [newImage, ...prev[section]],
    }));

    setFile(null);
    setComment("");
  };

  const handleChangeSection = (newSection) => setSection(newSection);

  return (
    <div className="pictures">
      <h1 className="names">Galería de Recuerdos</h1>
      <p className="intro">¡Comparte tus mejores momentos con nosotros! 💕</p>

      <div className="section-tabs">
        <button
          onClick={() => handleChangeSection("antes")}
          className={section === "antes" ? "active" : ""}
        >
          🕊️ Antes de la boda
        </button>
        <button
          onClick={() => handleChangeSection("durante")}
          className={section === "durante" ? "active" : ""}
        >
          💒 Durante la boda
        </button>
        <button
          onClick={() => handleChangeSection("despues")}
          className={section === "despues" ? "active" : ""}
        >
          💍 Después de la boda
        </button>
      </div>

      <form className="upload-form" onSubmit={handleSubmit}>
        <label>
          Sube tu foto:
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </label>

        <label>
          Escribe un comentario:
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Describe el momento..."
          />
        </label>

        <button type="submit">Guardar foto</button>
      </form>

      <div className="gallery">
        {gallery[section].length === 0 ? (
          <p className="no-photos">Aún no hay fotos en esta sección 📷</p>
        ) : (
          gallery[section].map((img) => (
            <div key={img.id} className="photo-card">
              <img src={img.url} alt="Recuerdo" />
              {img.comment && <p>{img.comment}</p>}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Pictures;