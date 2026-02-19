import React, { useState, useEffect, useRef } from "react";
import "./Guest.css";

const Guests = () => {
  const [search, setSearch] = useState("");
  const [guest, setGuest] = useState(null);
  const [loading, setLoading] = useState(false);

  const [inputToken, setInputToken] = useState("");
  const [emailRecovery, setEmailRecovery] = useState("");
  const [generatedName, setGeneratedName] = useState("");
  const [generatedEmail, setGeneratedEmail] = useState("");
  const [token, setToken] = useState("");

  const [errorGen, setErrorGen] = useState("");
  const [errorToken, setErrorToken] = useState("");
  const [errorSearch, setErrorSearch] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const successRef = useRef(null);

  const guestFormRef = useRef(null);

  const handleGenerateToken = async () => {
    if (!generatedName.trim() || !generatedEmail.trim()) {
      setErrorGen("Debes escribir tu nombre y correo para generar o recuperar un código");
      setSuccessMsg("");
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
      setGuest({
      name: data.name,
      email: data.email,
      party: data.party,
      relation: data.relation,
      });

      localStorage.setItem(
        "guest",
        JSON.stringify({
        name: data.name,
        email: data.email,
        token: data.token,
        party: data.party,
        relation: data.relation,
      })
      );
      
      setSuccessMsg(`Tu código personal es: ${data.token}. ¡Guárdalo para modificar tus datos!`);
    } catch (err) {
      setErrorGen(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRecoverToken = async () => {
    if (!emailRecovery.trim()) {
      setErrorGen("Debes escribir tu correo para recuperar tu código");
      setSuccessMsg("");
      return;
    }
    setLoading(true);
    setErrorGen("");
    setSuccessMsg("");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/guest/recover-token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailRecovery.trim() }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error recuperando código");

      setToken(data.token);
      setGuest({
        name: data.name,
        email: data.email,
        party: data.party,
        relation: data.relation,
      });

      localStorage.setItem(
        "guest",
        JSON.stringify({
          name: data.name,
          email: data.email,
          token: data.token,
          party: data.party,
          relation: data.relation,
        })
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
      setToken(inputToken.trim());
      localStorage.setItem("guest", JSON.stringify(data));
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

      const updatedGuest = data.guest || data;

      setGuest(updatedGuest);
      localStorage.setItem("guest", JSON.stringify(updatedGuest));
      setSuccessMsg("Tus preferencias han sido guardadas ✅");

      setTimeout(() => {
      if (successRef.current) {
        successRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
      }
      }, 50);

    } catch (err) {
      setErrorGen(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (successMsg && successRef.current) {
      successRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    }, [successMsg]);

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
          {loading ? "Procesando..." : "Generar / Recuperar código"}
        </button>
        {errorGen && <p className="error">{errorGen}</p>}
        {successMsg && !guest && <p ref={successRef} className="success">{successMsg}</p>}
      </div>

       <div className="guest-card">
        <h3>Si has olvidado tu código, recupéralo con tu correo:</h3>
        <input
          type="email"
          placeholder="Tu correo"
          value={emailRecovery}
          onChange={(e) => setEmailRecovery(e.target.value)}
        />
        <button onClick={handleRecoverToken} disabled={loading}>
          {loading ? "Procesando..." : "Recuperar código"}
        </button>
        {errorGen && <p className="error">{errorGen}</p>}
        {successMsg && !guest && <p ref={successRef} className="success">{successMsg}</p>}
      </div>

      <div className="guest-card">
        <h3>Introduce aquí tu código personal:</h3>
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
        <div className="guest-card" 
        ref={guestFormRef}>

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

          {successMsg && (
            <p ref={successRef} className="success" style={{ marginTop: "20px", textAlign: "center" }}>
              {successMsg}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Guests;
