import React, { useEffect, useState } from 'react'
import './FloatingHearts.css'

const FloatingHearts = () => {
  const [hearts, setHearts] = useState([])

  useEffect(() => {
    const interval = setInterval(() => {
      const newHeart = {
        id: Math.random(),
        left: Math.random() * 100,
        size: Math.random() * 20 + 10,
        duration: Math.random() * 6 + 6, 
      }
      setHearts((prev) => [...prev, newHeart])

      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== newHeart.id))
      }, newHeart.duration * 1000)
    }, 900)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="floating-hearts-container">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="heart"
          style={{
            left: `${heart.left}%`,
            width: `${heart.size}px`,
            height: `${heart.size}px`,
            animationDuration: `${heart.duration}s`,
          }}
        ></div>
      ))}
    </div>
  )
}

export default FloatingHearts