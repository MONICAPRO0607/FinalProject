import React, { useEffect, useState } from "react";
import "./AdminPanel.css";

const AdminPanel = () => {
  const [dedications, setDedications] = useState([]);
  const [ideas, setIdeas] = useState([]);
  const [pictures, setPictures] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    const headers = { Authorization: `Bearer ${token}` };

    Promise.all([
      fetch(`${import.meta.env.VITE_API_URL}/api/v1/dedications`, { headers }),
      fetch(`${import.meta.env.VITE_API_URL}/api/v1/ideas/admin`, { headers }),
      fetch(`${import.meta.env.VITE_API_URL}/api/v1/pictures`, { headers }),
    ])
      .then(async ([dedRes, ideaRes, picRes]) => {
        setDedications(await dedRes.json());
        setIdeas(await ideaRes.json());
        setPictures(await picRes.json());
      })
      .catch((err) => console.error("Error cargando panel:", err));
  }, [token]);

  const approveIdea = async (id) => {
    await fetch(`${import.meta.env.VITE_API_URL}/api/v1/ideas/${id}/approve`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
    });
    setIdeas((prev) =>
      prev.map((idea) =>
        idea._id === id ? { ...idea, approved: true } : idea
      )
    );
  };

  return (
    <div className="admin-panel">
      <h1 className="names">💖 Panel de Novios 💖</h1>
      <p className="intro">
        Aquí puedes ver y aprobar las dedicatorias, ideas y fotos subidas por los invitados.
      </p>

      <section className="admin-section">
        <h2>Dedicatorias</h2>
        <div className="admin-grid">
          {dedications.map((d) => (
            <div key={d._id} className="admin-card">
              <p><strong>{d.name}</strong></p>
              <p>{d.message}</p>
              {d.file && <img src={d.file} alt="dedicatoria" />}
            </div>
          ))}
        </div>
      </section>

      <section className="admin-section">
        <h2>Ideas</h2>
        <div className="admin-grid">
          {ideas.map((idea) => (
            <div key={idea._id} className="admin-card">
              <p><strong>{idea.name}</strong></p>
              <p>{idea.idea}</p>
              {!idea.approved ? (
                <button
                  onClick={() => approveIdea(idea._id)}
                  className="approve-btn"
                >
                  Aprobar ✅
                </button>
              ) : (
                <span className="approved">Aprobada 💚</span>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="admin-section">
        <h2>Fotos</h2>
        <div className="admin-gallery">
          {pictures.map((p) => (
            <div key={p._id} className="photo-card">
              <img src={p.imageUrl} alt={p.comment} />
              <p>{p.comment}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdminPanel;