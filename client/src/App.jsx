import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import Login from './Pages/Login'
import Home from './Pages/Home'
import FaceAuth from './Pages/FaceAuth'
import FingerAuth from './Pages/FingerAuth'
import CategorieGames from './Pages/CategorieGames';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/face-auth" element={<FaceAuth />} />
        <Route path="/finger-auth" element={<FingerAuth />} />
        <Route path="/home" element={<Home />} />
        <Route path='/categories'element={<CategorieGames></CategorieGames>}></Route>
      </Routes>
    </Router>
  )
}

export default App
