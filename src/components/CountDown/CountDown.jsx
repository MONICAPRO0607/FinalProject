import React, { useState, useEffect } from 'react'
import './Countdown.css'

const Countdown = () => {
  const calculateTimeLeft = () => {
    const targetDate = new Date('2026-09-05T00:00:00')
    const now = new Date()
    const difference = targetDate - now

    let timeLeft = {}

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }

    return timeLeft
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
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
    </div>
  )
}

export default Countdown