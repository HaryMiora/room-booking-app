import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Salles from './pages/Salles'
import Register from './pages/Register'
import Login from './pages/Login'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Salles />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<div className="text-center mt-10">404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

