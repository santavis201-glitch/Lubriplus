import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../estilos.css';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Intentando conectar con el servidor...");

    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Aseguramos que el email vaya en minúsculas al servidor
        body: JSON.stringify({ email: email.toLowerCase(), password })
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login exitoso:", data);
        
        // 1. Guardamos los datos del usuario
        onLogin({ email: data.email, nombre: data.nombre });
        
        // 2. IMPORTANTE: Guardar en localStorage para que si el usuario 
        // recarga la página, no lo saque del sistema.
        localStorage.setItem('user', JSON.stringify(data));

        // 3. Redirección forzada
        // Usamos setTimeout de 100ms para asegurar que el estado de App.jsx se actualice primero
        setTimeout(() => {
          navigate('/inicio');
        }, 100);

      } else {
        alert(data.mensaje || "Credenciales incorrectas");
      }
    } catch (err) {
      console.error("Error de conexión:", err);
      alert("No se pudo conectar al servidor. Revisa la terminal del backend.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="logo-title">LUBRIPLUS</h1>
        <p className="login-subtitle">ACCESO AL SISTEMA</p>
        
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input 
              type="email" 
              placeholder="CORREO ELECTRÓNICO" 
              value={email}
              // Normalizamos a minúsculas mientras escribe para evitar líos
              onChange={(e) => setEmail(e.target.value.toLowerCase())}
              required 
            />
          </div>
          <div className="input-group">
            <input 
              type="password" 
              placeholder="CONTRASEÑA" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <button type="submit" className="btn-gold">
            ENTRAR
          </button>

          <button 
            type="button" 
            className="btn-outline" 
            onClick={() => navigate('/registro')}
            style={{ marginTop: '10px', width: '100%' }}
          >
            CREAR CUENTA
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;