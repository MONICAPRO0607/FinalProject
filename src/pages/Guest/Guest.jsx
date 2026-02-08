import React, { useState, useEffect, useRef } from "react";
import "./Guest.css";

const Guests = () => {
  const [search, setSearch] = useState("");
  const [guest, setGuest] = useState(null);
  const [loading, setLoading] = useState(false);

  const [inputToken, setInputToken] = useState("");
  const [generatedName, setGeneratedName] = useState("");
  const [generatedEmail, setGeneratedEmail] = useState("");
  const [token, setToken] = useState("");

  const [errorGen, setErrorGen] = useState("");
  const [errorToken, setErrorToken] = useState("");
  const [errorSearch, setErrorSearch] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const guestFormRef = React.useRef(null);

  const handleGenerateToken = async () => {
    if (!generatedName.trim() || !generatedEmail.trim()) {
      setErrorGen("Debes escribir tu nombre y correo para generar un código");
      setSuccessMsg("");
      return;
    }

    const savedGuest = JSON.parse(localStorage.getItem("guest"));
    if (savedGuest?.email === generatedEmail.trim()) {
    setErrorGen("Ya tienes un código generado. Usa el que se te dio anteriormente.");
    return;
    }

    setLoading(true);
    setErrorGen("");
    setSuccessMsg("");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/guest/generate-token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: generatedName.trim(),
          email: generatedEmail.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error generando código");

      setToken(data.token);
      setGuest({ name: generatedName.trim(), email: generatedEmail.trim() });
      
      localStorage.setItem(
        "guest",
        JSON.stringify({ name: generatedName.trim(), email: generatedEmail.trim(), token: data.token })
      );
      
      setSuccessMsg(`Tu código personal es: ${data.token}. ¡Guárdalo para modificar tus datos!`);
    } catch (err) {
      setErrorGen(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFetchByToken = async () => {
    if (!inputToken.trim()) return;
    setLoading(true);
    setErrorToken("");
    setSuccessMsg("");
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/guest/token/${inputToken.trim()}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Código inválido o invitado no encontrado");
      setGuest(data);
      localStorage.setItem("guest", JSON.stringify(data));
      setToken(inputToken.trim());
    } catch (err) {
      setGuest(null);
      setErrorToken(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setGuest({ ...guest, [field]: value });
  };

  const handleSubmit = async () => {
    if (!guest || !token) {
      alert("Debes generar o ingresar tu código personal antes de guardar.");
      return;
    }
    setLoading(true);
    setErrorGen("");
    setErrorToken("");
    // setErrorSearch("");
    setSuccessMsg("");
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/guest/token/${token}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          menu: guest.menu,
          allergies: guest.allergies,
          specialNeeds: guest.specialNeeds,
          message: guest.message,
          confirmed: guest.confirmed,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error al guardar los datos");
      setGuest(data.guest || data);
      setSuccessMsg("Tus preferencias han sido guardadas ✅");
    } catch (err) {
      setErrorGen(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (guest && guestFormRef.current) {
    guestFormRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    }, [guest]);

  return (
    <div className="guests-page">
      <h1 className="names">Confirma tu asistencia</h1>

      <div className="guest-card">
        <h3>Si es tu primera vez, puedes generar tu código personal:</h3>
        <label>Nombre</label>
        <input
          type="text"
          placeholder="Tu nombre completo"
          value={generatedName}
          onChange={(e) => setGeneratedName(e.target.value)}
        />
        <label>Email</label>
        <input
          type="email"
          placeholder="Tu correo"
          value={generatedEmail}
          onChange={(e) => setGeneratedEmail(e.target.value)}
        />
        <button onClick={handleGenerateToken} disabled={loading}>
          {loading ? "Generando..." : "Generar código"}
        </button>
        {errorGen && <p className="error">{errorGen}</p>}
       
      </div>

      <div className="guest-card">
        <h3>Si ya tienes tu código personal, introdúcelo aquí:</h3>
        <input
          type="text"
          placeholder="Introduce tu código"
          value={inputToken}
          onChange={(e) => setInputToken(e.target.value)}
        />
        <button onClick={handleFetchByToken} disabled={loading}>
          {loading ? "Cargando..." : "Usar código"}
        </button>
        {errorToken && <p className="error">{errorToken}</p>}
      </div>

      {guest && (
        <div className="guest-card" ref={guestFormRef}>
        {successMsg && <p className="success">{successMsg}</p>}

          <h2>{guest.name}</h2>
          <p><strong>Por parte de:</strong> {guest.party || "Pendiente de asignar"}</p>
          <p><strong>Relación:</strong> {guest.relation || "Invitado"}</p>

          <label>Menú</label>
          <select value={guest.menu || ""} onChange={(e) => handleChange("menu", e.target.value)}>
            <option value="">Elegir...</option>
            <option value="Adulto">Adulto</option>
            <option value="Adolescente">Adolescente</option>
            <option value="Infantil">Infantil</option>
          </select>

          <label>Alergias</label>
          <input type="text" value={guest.allergies || ""} onChange={(e) => handleChange("allergies", e.target.value)} />

          <label>Necesidades especiales</label>
          <input type="text" value={guest.specialNeeds || ""} onChange={(e) => handleChange("specialNeeds", e.target.value)} />

          <label>Mensaje a los novios</label>
          <textarea value={guest.message || ""} onChange={(e) => handleChange("message", e.target.value)} />

          <label>Confirmar asistencia</label>
          <select value={guest.confirmed ? "true" : "false"} onChange={(e) => handleChange("confirmed", e.target.value === "true")}>
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>

          <button className="save-btn" onClick={handleSubmit} disabled={loading}>
            {loading ? "Guardando..." : "Guardar cambios"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Guests;
