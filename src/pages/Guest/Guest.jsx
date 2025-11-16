import React, { useState, useEffect } from "react";
import "./Guest.css";

const Guests = () => {
  const [search, setSearch] = useState("");
  const [guest, setGuest] = useState(null);
  const [searching, setSearching] = useState(false);

  const handleSearch = async (query) => {
    if (!query) {
      setGuest(null);
      return;
    }

    setSearching(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/guest/search?name=${encodeURIComponent(query)}`
      );

      if (!res.ok) {
        setGuest(null);
        setSearching(false);
        return;
      }

      const data = await res.json();
       if (Array.isArray(data)) {
        setGuest(data.length ? data[0] : null);
      } else {
        setGuest(data);
      }
    } catch (err) {
      console.error("Error buscando invitado:", err);
      setGuest(null);
    } finally {
      setSearching(false);
    }
  };

   useEffect(() => {
    const t = setTimeout(() => {
      if (search !== "") handleSearch(search);
    }, 200);
    if (!search) {
      setGuest(null);
    }
    return () => clearTimeout(t);
  }, [search]);

  const handleChange = (field, value) => {
    setGuest({ ...guest, [field]: value });
  };

   const saveGuest = async (guest) => {
    const method = guest._id ? "PUT" : "POST";
    const url = guest._id
      ? `${import.meta.env.VITE_API_URL}/guest/${guest._id}`
      : `${import.meta.env.VITE_API_URL}/guest`;

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(guest),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Error al guardar los datos");
    }

    setGuest(data);
    return data;
  };

  const handleSubmit = async () => {
    if (!guest) return;

    try {
      await saveGuest(guest);
      alert("Tus opciones han sido guardadas ✅");
    } catch (err) {
      alert("Error al guardar los datos: " + err.message);
    }
  };

  return (
    <div className="guests-page">
      <h1 className="names">Confirma tu asistencia</h1>
      <input
        type="text"
        placeholder="Escribe tu nombre..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      {searching && <p>Buscando invitado...</p>}

      {guest ? (
        <div className="guest-card">
          <h2>{guest.name}</h2>
          <p><strong>Por parte de:</strong> {guest.party}</p>
          <p><strong>Relación:</strong> {guest.relation}</p>

          <label>Menú</label>
          <select value={guest.menu || ""} onChange={(e) => handleChange("menu", e.target.value)}>
            <option value="">Elegir...</option>
            <option value="Adulto">Adulto</option>
            <option value="Adolescente">Adolescente</option>
            <option value="Infantil">Infantil</option>
          </select>

          <label>Alergias</label>
          <input
            type="text"
            value={guest.allergies || ""}
            onChange={(e) => handleChange("allergies", e.target.value)}
          />

          <label>Necesidades especiales</label>
          <input
            type="text"
            value={guest.specialNeeds || ""}
            onChange={(e) => handleChange("specialNeeds", e.target.value)}
          />

          <label>Mensaje a los novios</label>
          <textarea
            value={guest.message || ""}
            onChange={(e) => handleChange("message", e.target.value)}
          />

          <button className="save-btn" onClick={handleSubmit}>Guardar cambios</button>
        </div>
      ) : (
        search && !searching && <p className="no-result">No encontramos tu nombre 😕. Revisa la ortografía.</p>
      )}
    </div>
  );
  
};

export default Guests;