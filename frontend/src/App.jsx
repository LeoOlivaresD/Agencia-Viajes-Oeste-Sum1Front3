import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Welcome from './pages/Welcome';
import AuthCallback from './pages/AuthCallback';
import Solicitudes from './pages/Solicitudes';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/solicitudes" element={<Solicitudes />} />
      </Routes>
    </Router>
  );
}

export default App;