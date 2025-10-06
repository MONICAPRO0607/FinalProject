import React, { useState, useEffect } from 'react'
import './Countdown.css'

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({})
  const [typed, setTyped] = useState('')

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date('2026-09-05T00:00:00')
      const now = new Date()
      const difference = targetDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      } else {
        setTimeLeft({})
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const full = 'Cada segundo nos acerca al “Sí, quiero” 💞'
    let i = 0

    setTyped(full[0])

    const t = setInterval(() => {
      i++
      if (i < full.length) {
        setTyped(prev => prev + full[i])
      } else {
        clearInterval(t)}}, 80) 
    return () => clearInterval(t)
  }, [])

  return (
    <div className="countdown">
      <h2>💍 Cuenta atrás para el gran día 💕</h2>

      {timeLeft.days !== undefined ? (
        <div className="countdown-boxes">
          <div><span>{timeLeft.days}</span><small>días</small></div>
          <div><span>{timeLeft.hours}</span><small>horas</small></div>
          <div><span>{timeLeft.minutes}</span><small>minutos</small></div>
          <div><span>{timeLeft.seconds}</span><small>segundos</small></div>
        </div>
      ) : (
        <p>¡Ya llegó el gran día! 🎉</p>
      )}

      <p className="typing-text-js">{typed}</p>
    </div>
  )
}

export default Countdown