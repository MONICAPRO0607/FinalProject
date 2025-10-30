import React, { useState, useEffect } from "react";
import "./AdminPanel.css";

const API_URL = import.meta.env.VITE_API_URL;

const AdminPanel = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [dedicatorias, setDedicatorias] = useState([]);
  const [ideas, setIdeas] = useState([]);
  const [fotos, setFotos] = useState({ Antes: [], Durante: [], Después: [] });
  const [modoRomantico, setModoRomantico] = useState(true);
  const [notification, setNotification] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${API_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error al iniciar sesión");

      localStorage.setItem("token", data.token);
      setToken(data.token);
      setIsLoggedIn(true);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setIsLoggedIn(false);
  };

  const fetchData = async () => {
    try {
      const headers = { Authorization: `Bearer ${token}` };

      const [dedRes, ideaRes, fotoRes] = await Promise.all([
        fetch(`${API_URL}/api/v1/dedication`, { headers }),
        fetch(`${API_URL}/api/v1/idea`, { headers }),
        fetch(`${API_URL}/api/v1/picture`, { headers }),
      ]);

      if (!dedRes.ok || !ideaRes.ok || !fotoRes.ok)
        throw new Error("Error al obtener datos del servidor");

      const [dedData, ideaData, fotoData] = await Promise.all([
        dedRes.json(),
        ideaRes.json(),
        fotoRes.json(),
      ]);

      setDedicatorias(Array.isArray(dedData) ? dedData : []);
      setIdeas(Array.isArray(ideaData) ? ideaData : []);

      const agrupadas = { Antes: [], Durante: [], Después: [] };
      (fotoData || []).forEach((p) => {
        const key =
          p.section?.toLowerCase() === "antes"
            ? "Antes"
            : p.section?.toLowerCase() === "durante"
            ? "Durante"
            : "Después";
        agrupadas[key].push(p);
      });
      setFotos(agrupadas);
    } catch (err) {
      console.error("Error al cargar datos:", err);
    }
  };

  useEffect(() => {
    if (isLoggedIn) fetchData();
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <div className="login-container">
        <h2>💖 Panel de Novios - Iniciar Sesión</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Entrar</button>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
    );
  }

  return (
    <div
      className={`admin-panel ${modoRomantico ? "modo-romantico" : "modo-oscuro"}`}
    >
      <header>
        <h1 className="names">Panel de Novios 💖</h1>
        <p>Aquí veis todo lo que vuestros invitados os han enviado con mucho cariño.</p>
        <div className="header-buttons">
          <button className="modo-btn" onClick={() => setModoRomantico(!modoRomantico)}>
            {modoRomantico ? "🌙 Modo oscuro" : "💞 Modo romántico"}
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            🚪 Cerrar sesión
          </button>
        </div>
      </header>

      {notification && <div className="notification">{notification}</div>}

      <section className="admin-section">
        <h2>💌 Dedicatorias</h2>
        {dedicatorias.length === 0 ? (
          <p>No hay dedicatorias aún 🥰</p>
        ) : (
          <div className="admin-grid">
            {dedicatorias.map((d) => (
              <div key={d._id} className="admin-card">
                <h4>{d.name}</h4>
                <p>{d.message}</p>
                {d.file && <img src={d.file} alt="Adjunto" />}
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="admin-section">
        <h2>💡 Ideas y recuerdos</h2>
        {ideas.length === 0 ? (
          <p>No hay ideas todavía 💭</p>
        ) : (
          <div className="admin-grid">
            {ideas.map((i) => (
              <div key={i._id} className="admin-card">
                <h4>{i.category}</h4>
                <p>
                  <strong>{i.name}</strong>: {i.idea}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {["Antes", "Durante", "Después"].map((sec) => (
        <section className="admin-section" key={sec}>
          <h2>📸 {sec} de la boda</h2>
          {fotos[sec]?.length === 0 ? (
            <p>No hay fotos en esta sección 📷</p>
          ) : (
            <div className="admin-gallery">
              {fotos[sec].map((f) => (
                <div key={f._id} className="photo-card admin-card">
                  <img src={f.imageUrl} alt={f.comment} />
                  <p>{f.comment}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      ))}
    </div>
  );
};

export default AdminPanel;
