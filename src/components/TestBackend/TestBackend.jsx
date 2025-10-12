import React, { useEffect, useState } from 'react'

const TestBackend = () => {
  const [message, setMessage] = useState('')

  useEffect(() => {
    const url = `${import.meta.env.VITE_API_URL}/api/v1/test`
    console.log('🌐 Llamando a:', url)

    fetch(url)
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => setMessage('Error al conectar con backend: ' + err))
  }, [])

  return (
    <div
      style={{ padding: '20px', background: '#f0f0f0', borderRadius: '8px' }}
    >
      <h2>Prueba de conexión con Backend</h2>
      <p>{message || 'Conectando...'}</p>
    </div>
  )
}

export default TestBackend
