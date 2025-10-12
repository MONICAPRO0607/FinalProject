import React, { useState, useEffect } from "react";
import "./Guest.css";

const Guests = () => {
  const [search, setSearch] = useState("");
  const [guest, setGuest] = useState(null);
  const [guests, setGuests] = useState([]);

  useEffect(() => {
    const cleanCSVLine = (line) => {
    return line.split(",").map((item) => item.trim());
    };

    fetch("/assets/guestsData.csv")
      .then((res) => res.text())
      .then((data) => {
        const parsed = data
          .split("\n")
          .slice(1)
          .map((line) => {
            const [name, relation, party] = cleanCSVLine(line);
            return {
              name,
              nameNormalized: name.toLowerCase().trim().normalize("NFD").replace(/\p{Diacritic}/gu, ""),
              relation,
              party,
              menu: "",
              allergies: "",
              specialNeeds: "",
              message: "",
            };
          });
        setGuests(parsed);
      });
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    const query = e.target.value.toLowerCase().trim().normalize("NFD").replace(/\p{Diacritic}/gu, "");
    const found = guests.find((g) =>g.nameNormalized.includes(query));
    setGuest(found || null);
    };

  const handleChange = (field, value) => {
    setGuest({ ...guest, [field]: value });
  };

  const handleSubmit = () => {
    console.log("Datos guardados:", guest);
    alert("Tus opciones han sido guardadas ✅");
  };

  return (
    <div className="guests-page">
      <h1 className="names">Confirma tu asistencia</h1>
      <input
        type="text"
        placeholder="Escribe tu nombre..."
        value={search}
        onChange={handleSearch}
        className="search-input"
      />

      {guest ? (
        <div className="guest-card">
          <h2>{guest.name}</h2>
          <p><strong>Por parte de:</strong> {guest.party}</p>
          <p><strong>Relación:</strong> {guest.relation}</p>
         

          <label>Menú</label>
          <select value={guest.menu} onChange={(e) => handleChange("menu", e.target.value)}>
            <option value="">Elegir...</option>
            <option value="Adulto">Adulto</option>
            <option value="Infantil">Infantil</option>
          </select>

          <label>Alergias</label>
          <input type="text" value={guest.allergies} onChange={(e) => handleChange("allergies", e.target.value)} />

          <label>Necesidades especiales</label>
          <input type="text" value={guest.specialNeeds} onChange={(e) => handleChange("specialNeeds", e.target.value)} />

          <label>Mensaje a los novios</label>
          <textarea value={guest.message} onChange={(e) => handleChange("message", e.target.value)} />

          <button className="save-btn" onClick={handleSubmit}>Guardar cambios</button>
        </div>
      ) : (
        search && <p className="no-result">No encontramos tu nombre 😕. Revisa la ortografía.</p>
      )}
    </div>
  );
}

export default Guests;