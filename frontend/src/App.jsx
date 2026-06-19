import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import DiagnosticoInicio from './pages/DiagnosticoInicio.jsx'
import DiagnosticoMentor from './pages/DiagnosticoMentor.jsx'
import DiagnosticoResultado from './pages/DiagnosticoResultado.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/diagnostico" element={<DiagnosticoInicio />} />
      <Route path="/diagnostico/mentor" element={<DiagnosticoMentor />} />
      <Route path="/diagnostico/resultado" element={<DiagnosticoResultado />} />
    </Routes>
  )
}
