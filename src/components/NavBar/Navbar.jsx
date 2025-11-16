import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import '../../components/NavBar/Navbar.css'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)
  const toggleMenu = () => setMenuOpen(!menuOpen)

  const query = new URLSearchParams(window.location.search)
  const showNoviosButton = query.get('novios') === 'true'

  return (
    <nav className='navbar'>
      <div className='navbar-container'>
        <div className='logo'>💞 P y Q</div>

        <div className='menu-icon' onClick={toggleMenu}>
          {menuOpen ? '✖' : '☰'}
        </div>

        <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <li>
            <NavLink onClick={closeMenu} to='/'>
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink onClick={closeMenu} to='/history'>
              Nuestra historia
            </NavLink>
          </li>
          <li>
            <NavLink onClick={closeMenu} to='/event'>
              El Gran Día
            </NavLink>
          </li>
          <li>
            <NavLink onClick={closeMenu} to='/guests'>
              Invitad@s
            </NavLink>
          </li>
          <li>
            <NavLink onClick={closeMenu} to='/gifts'>
              Regalos
            </NavLink>
          </li>
          <li>
            <NavLink onClick={closeMenu} to='/dedications'>
              Dedicatorias
            </NavLink>
          </li>
          <li>
            <NavLink onClick={closeMenu} to='/ideas'>
              Ideas
            </NavLink>
          </li>
          <li>
            <NavLink onClick={closeMenu} to='/pictures'>
              Fotos
            </NavLink>
          </li>
          <li>
            <NavLink onClick={closeMenu} to='/gratitudes'>
              Agradecimientos
            </NavLink>
          </li>

          {showNoviosButton && (
            <li>
              <NavLink onClick={closeMenu} to='/admin' className='nav-novios'>
                Panel Novios 💖
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
