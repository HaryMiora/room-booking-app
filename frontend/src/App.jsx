import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Reservations from './pages/Reservations'
import Salles from './pages/Salles'
import Register from './pages/Register'
import Login from './pages/Login'
import ForgotPassword from './components/ForgotPassword'
import ResetPassword from './components/ResetPassword'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Salles />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="*" element={<div className="text-center mt-10">404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

