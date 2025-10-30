import React, { useState, useEffect } from "react";
import "./AdminPanel.css";

const API_URL = import.meta.env.VITE_API_URL;

const AdminPanel = () => {
  const [dedicatorias, setDedicatorias] = useState([]);
  const [ideas, setIdeas] = useState([]);
  const [fotos, setFotos] = useState({ Antes: [], Durante: [], Después: [] });
  const [modoRomantico, setModoRomantico] = useState(true);
  const [notification, setNotification] = useState("");

  const fetchData = async () => {
    try {
      const [dedRes, ideaRes, fotoRes] = await Promise.all([
        fetch(`${API_URL}/api/v1/dedication`),
        fetch(`${API_URL}/api/v1/idea`),
        fetch(`${API_URL}/api/v1/picture`),
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
    fetchData();
  }, []);

  useEffect(() => {
    let prevCounts = { d: 0, i: 0, f: 0 };

    const interval = setInterval(async () => {
      try {
        const [d, i, f] = await Promise.all([
          fetch(`${API_URL}/api/v1/dedication`).then((r) => r.json()),
          fetch(`${API_URL}/api/v1/idea`).then((r) => r.json()),
          fetch(`${API_URL}/api/v1/picture`).then((r) => r.json()),
        ]);

        if (d.length > prevCounts.d) {
          setNotification("💌 ¡Nueva dedicatoria recibida!");
          prevCounts.d = d.length;
          setDedicatorias(d);
        }
        if (i.length > prevCounts.i) {
          setNotification("💡 ¡Alguien ha mandado una nueva idea!");
          prevCounts.i = i.length;
          setIdeas(i);
        }
        if (f.length > prevCounts.f) {
          setNotification("📸 ¡Hay una nueva foto subida!");
          prevCounts.f = f.length;
          const agrupadas = { Antes: [], Durante: [], Después: [] };
          (f || []).forEach((p) => {
            const key =
              p.section?.toLowerCase() === "antes"
                ? "Antes"
                : p.section?.toLowerCase() === "durante"
                ? "Durante"
                : "Después";
            agrupadas[key].push(p);
          });
          setFotos(agrupadas);
        }

        if (notification) setTimeout(() => setNotification(""), 4000);
      } catch (err) {
        console.error("Error revisando novedades:", err);
      }
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`admin-panel ${modoRomantico ? "modo-romantico" : "modo-oscuro"}`}>
      <header>
        <h1 className="names">Panel de Novios 💖</h1>
        <p>
          Aquí podrán ver todo lo que sus invitados les han enviado con mucho cariño.
        </p>
        <button className="modo-btn" onClick={() => setModoRomantico(!modoRomantico)}>
          {modoRomantico ? "🌙 Modo oscuro" : "💞 Modo romántico"}
        </button>
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
