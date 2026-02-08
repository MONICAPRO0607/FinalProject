import React, { useState, useEffect } from "react";
import "./Pictures.css";

const API_URL = import.meta.env.VITE_API_URL;

const normalizeSection = (sec) => {
  if (!sec) return null;
  const s = sec.toLowerCase();
  if (s === "antes") return "Antes";
  if (s === "durante") return "Durante";
  if (s === "después" || s === "despues") return "Después";
  return null;
};

const Pictures = () => {
  const [section, setSection] = useState("Antes");
  const [photo, setPhoto] = useState(null);
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState({ Antes: [], Durante: [], Después: [] });

  useEffect(() => {
    fetch(`${API_URL}/picture`)
      .then((res) => res.json())
      .then((data) => {
        const grouped = { Antes: [], Durante: [], Después: [] };
        data.forEach((p) => {
          const sec = normalizeSection(p.section);
          if (sec) grouped[sec].push(p);
        });
        setPhotos(grouped);
      })
      .catch((err) => console.error("Error cargando fotos:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!photo) {
      alert("Por favor selecciona una foto");
      return;
    }

    const formData = new FormData();
    formData.append("image", photo);
    formData.append("comment", description);
    formData.append("section", section.toLowerCase()); 

    try {
      const res = await fetch(`${API_URL}/picture`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Error al subir la foto");

      const data = await res.json();
      const normalizedSection = normalizeSection(data.section) || section;

      if (!normalizedSection) return;

      setPhotos((prev) => ({
        ...prev,
         [normalizedSection]: [data, ...prev[normalizedSection]],
      }));

      setPhoto(null);
      setDescription("");
      e.target.reset();
    } catch (error) {
      console.error(error);
      alert("Hubo un error al subir la foto 😔");
    }
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
          photos[section].map((p, index) => (
            <div key={p._id ?? `${p.imageUrl}-${index}`} className="photo-card">
               <img
                src={
                  p.imageUrl?.startsWith("http")
                    ? p.imageUrl
                    : `${API_URL}/${p.imageUrl}`
                }
                alt="Foto subida"
                loading="lazy"
              />
              {p.comment && <p>{p.comment}</p>}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Pictures;