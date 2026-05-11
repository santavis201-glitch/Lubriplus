import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Importa el App.jsx que acabamos de limpiar
import './index.css';   // Importa tu archivo de estilos principal

// Creamos el punto de renderizado en el elemento con id 'root' de tu index.html
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);