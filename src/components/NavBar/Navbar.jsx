import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">💞 P y Q</div>

        <div className="menu-icon" onClick={toggleMenu}>
          {isOpen ? '✖' : '☰'}
        </div>

        <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
          <li><NavLink onClick={closeMenu} to="/">Inicio</NavLink></li>
          <li><NavLink onClick={closeMenu} to="/history">Nuestra historia</NavLink></li>
          <li><NavLink onClick={closeMenu} to="/event">El Gran Día</NavLink></li>
          <li><NavLink onClick={closeMenu} to="/guests">Invitad@s</NavLink></li>
          <li><NavLink onClick={closeMenu} to="/gifts">Regalos</NavLink></li>
          <li><NavLink onClick={closeMenu} to="/dedications">Dedicatorias</NavLink></li>
          <li><NavLink onClick={closeMenu} to="/ideas">Ideas</NavLink></li>
          <li><NavLink onClick={closeMenu} to="/pictures">Fotos</NavLink></li>
          <li><NavLink onClick={closeMenu} to="/gratitudes">Agradecimientos</NavLink></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar