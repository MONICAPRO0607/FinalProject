import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

import Home from './pages/Home/Home'
import History from './pages/History/History'
import EventDay from './pages/Eventday/EventDay'
import Guests from './pages/Guest/Guest'
import Gifts from './pages/Gifts/Gifts'
import Gratitudes from './pages/Gratitudes/Gratitudes'
import Dedications from './pages/Dedications/Dedications'
import Ideas from './pages/Ideas/Ideas'
import Pictures from './pages/Pictures/Pictures'
import Navbar from './components/NavBar/Navbar'
import FloatingHearts from './components/FloatingHearts/FloatingHearts'
import AdminPanel from './pages/AdminPanel/AdminPanel'

import './App.css'

const AnimatedRoutes = () => {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
        <Route path="/event" element={<EventDay />} />
        <Route path="/guests" element={<Guests />} />
        <Route path="/gifts" element={<Gifts />} />
        <Route path="/dedications" element={<Dedications />} />
        <Route path="/ideas" element={<Ideas />} />
        <Route path="/pictures" element={<Pictures />} />
        <Route path="/gratitudes" element={<Gratitudes />} />
        <Route path="/admin" element={<AdminPanel />} /> 
      </Routes>
    </AnimatePresence>
  )
}

const PageWrapper = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      className="page-transition"
    >
      {children}
    </motion.div>
  )
}

const App = () => {
  return (
    <Router>
      <Navbar />
      <FloatingHearts />
      <AnimatedRoutes />
    </Router>
  )
}


export default App;