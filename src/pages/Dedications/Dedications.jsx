import React, { useState, useEffect } from "react";
import "./Dedications.css";

const Dedications = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [fileData, setFileData] = useState(null);
  const [dedications, setDedications] = useState([]);


  useEffect(() => {
    const saved = localStorage.getItem("dedications");
    if (saved) {
      setDedications(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("dedications", JSON.stringify(dedications));
  }, [dedications]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFileData(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !message) {
      alert("Por favor completa tu nombre y mensaje");
      return;
    }

    const newDedication = {
      id: Date.now(),
      name,
      message,
      file: fileData || null,
      fileName: file ? file.name : null,
    };

    setDedications([newDedication, ...dedications]);
    setName("");
    setMessage("");
    setFile(null);
    setFileData(null);
  };

  return (
    <div className="dedications">
      <h1 className="titles">Dedicatorias</h1>

      <form className="dedication-form" onSubmit={handleSubmit}>
        <label>
          Tu nombre:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <label>
          Escribe tu mensaje o recuerdo:
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </label>

        <label>
          Añadir texto o archivo:
          <input
            type="file"
            accept="image/*,video/*,.pdf,.txt"
            onChange={handleFileChange}
          />
        </label>

        <button type="submit">Enviar dedicatoria</button>
      </form>

      <div className="dedication-list">
        {dedications.length === 0 && <p>No hay dedicatorias aún.</p>}
        {dedications.map((d) => (
          <div key={d.id} className="dedication-card">
            <h3>{d.name}</h3>
            <p>{d.message}</p>
            {d.file && (
              <div className="dedication-file">
                <p>Archivo adjunto: {d.fileName}</p>
                {d.file.startsWith("data:image") ? (
                  <img src={d.file} alt="Archivo adjunto" />
                ) : (
                  <a href={d.file} target="_blank" rel="noreferrer">
                    Ver archivo
                  </a>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dedications;