import React, { useState, useEffect } from "react";
import "./AdminPanel.css";

const API_URL = import.meta.env.VITE_API_URL;

const AdminPanel = () => {
  const [dedicatorias, setDedicatorias] = useState([]);
  const [ideas, setIdeas] = useState([]);
  const [fotos, setFotos] = useState([]);
  const [modoRomantico, setModoRomantico] = useState(true);
  const [notification, setNotification] = useState("");

  const fetchData = async () => {
    try {
      const [dedRes, ideaRes, fotoRes] = await Promise.all([
        fetch(`${API_URL}/api/v1/dedications`),
        fetch(`${API_URL}/api/v1/ideas`),
        fetch(`${API_URL}/api/v1/pictures`),
      ]);

      if (!dedRes.ok || !ideaRes.ok || !fotoRes.ok) throw new Error("Error en la carga");

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
          p.section?.toLowerCase() === "antes"? "Antes"
            : p.section?.toLowerCase() === "durante"? "Durante": "Después";
        agrupadas[key].push(p);
      });
      setFotos(agrupadas);
    } catch (err) {
      console.error("Error al obtener datos:", err);
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
          fetch(`${API_URL}/api/v1/dedications`).then((r) => r.json()),
          fetch(`${API_URL}/api/v1/ideas`).then((r) => r.json()),
          fetch(`${API_URL}/api/v1/pictures`).then((r) => r.json()),
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
              p.section?.toLowerCase() === "antes"? "Antes"
                : p.section?.toLowerCase() === "durante"? "Durante": "Después";
            agrupadas[key].push(p);
          });
          setFotos(agrupadas);
        }

        if (notification) setTimeout(() => setNotification(""), 4000);
      } catch (err) {
        console.error("Error verificando novedades:", err);
      }
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const handleAprobar = async (tipo, id) => {
    try {
      await fetch(`${API_URL}/api/v1/${tipo}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ aprobado: true }),
      });
      fetchData();
    } catch (err) {
      console.error("Error al aprobar:", err);
    }
  };

  return (
    <div className={`admin-panel ${modoRomantico ? "modo-romantico" : "modo-oscuro"}`}>
      <header>
        <h1 className="names">Panel de Novios 💖</h1>
        <p>Aquí se puede ver todo lo que sus invitados han enviado y aprobarlo.</p>
        <button
          className="modo-btn"
          onClick={() => setModoRomantico(!modoRomantico)}
        >
          {modoRomantico ? "🌙 Modo oscuro" : "💞 Modo romántico"}
        </button>
      </header>

      {notification && <div className="notification">{notification}</div>}

      <section className="admin-section">
        <h2>💌 Dedicatorias</h2>
        <div className="admin-grid">
          {dedicatorias.map((d) => (
            <div key={d._id} className="admin-card">
              <h4>{d.name}</h4>
              <p>{d.message}</p>
              {d.file && <img src={d.file} alt="Adjunto" />}
              {d.aprobado ? (
                <span className="approved">✔ Aprobado</span>
              ) : (
                <button
                  className="approve-btn"
                  onClick={() => handleAprobar("dedications", d._id)}
                >
                  Aprobar
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="admin-section">
        <h2>💡 Ideas</h2>
        <div className="admin-grid">
          {ideas.map((i) => (
            <div key={i._id} className="admin-card">
              <h4>{i.category}</h4>
              <p>
                <strong>{i.name}</strong>: {i.idea}
              </p>
              {i.aprobado ? (
                <span className="approved">✔ Aprobado</span>
              ) : (
                <button
                  className="approve-btn"
                  onClick={() => handleAprobar("ideas", i._id)}
                >
                  Aprobar
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      {["Antes", "Durante", "Después"].map((sec) => (
        <section className="admin-section" key={sec}>
          <h2>📸 {sec} de la boda</h2>
          <div className="admin-gallery">
            {fotos[sec]?.map((f) => (
              <div key={f._id} className="photo-card admin-card">
                <img src={f.imageUrl} alt={f.comment} />
                <p>{f.comment}</p>
                {f.aprobado ? (
                  <span className="approved">✔ Aprobado</span>
                ) : (
                  <button
                    className="approve-btn"
                    onClick={() => handleAprobar("pictures", f._id)}
                  >
                    Aprobar
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default AdminPanel;