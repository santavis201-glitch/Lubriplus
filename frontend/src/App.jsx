import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Importación de tus componentes
import Login from './components/Login';
import Registro from './components/Registro';
import Inicio from './components/inicio';

// El CSS Maestro que abarca todo
import './estilos.css';

function App() {
  // Estado para simular si el usuario está autenticado
  const [user, setUser] = useState(null);

  // Función para cerrar sesión (se pasa al Inicio)
  const handleLogout = () => {
    setUser(null);
    // Aquí podrías limpiar el localStorage si usas tokens
  };

  return (
    <Router>
      <Routes>
        {/* RUTA: LOGIN (Página principal por defecto) */}
        <Route 
          path="/" 
          element={!user ? <Login onLogin={setUser} /> : <Navigate to="/inicio" />} 
        />

        {/* RUTA: REGISTRO */}
        <Route 
          path="/registro" 
          element={<Registro />} 
        />

        {/* RUTA: INICIO (Protegida: si no hay user, manda al login) */}
        <Route 
          path="/inicio" 
          element={user ? <Inicio user={user} onLogout={handleLogout} /> : <Navigate to="/" />} 
        />

        {/* Redirección por si el usuario escribe cualquier otra cosa */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;