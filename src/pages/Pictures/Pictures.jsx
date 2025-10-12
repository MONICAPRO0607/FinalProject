import React, { useState, useEffect } from "react";
import "./Pictures.css";

const Pictures = () => {
  const [section, setSection] = useState("Antes");
  const [photo, setPhoto] = useState(null);
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState({ Antes: [], Durante: [], Después: [] });

  useEffect(() => {
    const saved = localStorage.getItem("pictures");
    if (saved) {
      setPhotos(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("pictures", JSON.stringify(photos));
  }, [photos]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!photo) {
      alert("Por favor selecciona una foto");
      return;
    }

    const newPhoto = {
      id: Date.now(),
      src: URL.createObjectURL(photo),
      description,
    };

    setPhotos((prev) => ({
      ...prev,
      [section]: [newPhoto, ...prev[section]],
    }));

    setPhoto(null);
    setDescription("");
    e.target.reset();
  };

  return (
    <div className="pictures">
      <h1 className="names">Galería de Recuerdos</h1>
      <p className="intro">
        Comparte con nosotros los mejores momentos de antes, durante y después de la boda 💕
      </p>

      <div className="section-tabs">
        {["Antes", "Durante", "Después"].map((sec) => (
          <button
            key={sec}
            className={section === sec ? "active" : ""}
            onClick={() => setSection(sec)}
          >
            {sec}
          </button>
        ))}
      </div>

      <h2 className="section-title">{section} de la boda</h2>

      <form className="upload-form" onSubmit={handleSubmit}>
        <label>
          Sube una foto:
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files[0])}
            required
          />
        </label>

        <label>
          Añade una descripción:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Cuéntanos el momento..."
          />
        </label>

        <button type="submit">Subir foto</button>
      </form>

      <div className="gallery">
        {photos[section].length === 0 ? (
          <p className="no-photos">
            No hay fotos en esta sección aún. ¡Sube la primera!
          </p>
        ) : (
          photos[section].map((p) => (
            <div key={p.id} className="photo-card">
              <img src={p.src} alt="Foto subida" />
              <p>{p.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Pictures;
