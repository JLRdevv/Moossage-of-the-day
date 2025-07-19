import {  BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Motd from './components/pages/Motd'


function App() {
  return(
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={"/motd"} replace />} />
        <Route path="/about" element={<h1>About Page</h1>} />
        <Route path="/motd" element={<Motd/>} />
      </Routes>
    </Router>
  </>
  )
}

export default App
