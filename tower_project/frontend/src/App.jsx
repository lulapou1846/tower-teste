import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import './App.css'

// Import components
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'
import PlansPage from './components/PlansPage'
import Dashboard from './components/Dashboard'
import CadastroPage from './components/CadastroPage'
import SintesePage from './components/SintesePage'
import FichaTecnicaPage from './components/FichaTecnicaPage'

function App() {
  const [user, setUser] = useState(null)

  return (
    <div className="tower-bg min-h-screen">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage setUser={setUser} />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/plans" element={<PlansPage />} />
          <Route path="/dashboard" element={<Dashboard user={user} />} />
          <Route path="/cadastro" element={<CadastroPage user={user} />} />
          <Route path="/sintese" element={<SintesePage user={user} />} />
          <Route path="/ficha-tecnica" element={<FichaTecnicaPage user={user} />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
