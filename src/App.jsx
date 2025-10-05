import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

import Home from './pages/Home/Home'
import History from './pages/History/History'
import EventDay from './pages/Eventday/EventDay'
import Guests from './pages/Guest/Guest'
import Gifts from './pages/Gifts/Gifts'
import Dedications from './pages/Dedications/Dedications'
import Ideas from './pages/Ideas/Ideas'
import Pictures from './pages/Pictures/Pictures'
import Navbar from './components/NavBar/Navbar'
import FloatingHearts from './components/FloatingHearts/FloatingHearts'
import './App.css'

const AnimatedRoutes = () => {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/history" element={<PageWrapper><History /></PageWrapper>} />
        <Route path="/event" element={<PageWrapper><EventDay /></PageWrapper>} />
        <Route path="/guests" element={<PageWrapper><Guests /></PageWrapper>} />
        <Route path="/gifts" element={<PageWrapper><Gifts /></PageWrapper>} />
        <Route path="/dedications" element={<PageWrapper><Dedications /></PageWrapper>} />
        <Route path="/ideas" element={<PageWrapper><Ideas /></PageWrapper>} />
        <Route path="/pictures" element={<PageWrapper><Pictures /></PageWrapper>} />
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