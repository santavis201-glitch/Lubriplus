import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importamos el navegador
import '../estilos.css';

const Inicio = ({ user, onLogout }) => {
  const [tab, setTab] = useState('inventario');
  const navigate = useNavigate(); // Inicializamos la navegación

  const handleCerrarSesion = () => {
    // 1. Ejecutamos la lógica de logout (limpiar estado/tokens)
    if (onLogout) onLogout();
    
    // 2. Saltamos al Login
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      {/* BARRA LATERAL */}
      <nav className="sidebar">
        <h2 className="logo-title" style={{ fontSize: '1.8rem' }}>LUBRIPLUS</h2>
        <p className="login-subtitle" style={{ fontSize: '0.7rem', marginTop: '5px' }}>
          BIENVENIDO: {user?.nombre || 'ADMIN'}
        </p>
        
        <div className="gold-line"></div>
        
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li 
            className={`btn-outline ${tab === 'inventario' ? 'active-tab' : ''}`}
            onClick={() => setTab('inventario')}
            style={{ marginBottom: '10px', textAlign: 'center', cursor: 'pointer', display: 'block' }}
          >
            INVENTARIO
          </li>
          <li 
            className={`btn-outline ${tab === 'ventas' ? 'active-tab' : ''}`}
            onClick={() => setTab('ventas')}
            style={{ marginBottom: '10px', textAlign: 'center', cursor: 'pointer', display: 'block' }}
          >
            VENTAS
          </li>
        </ul>

        {/* BOTÓN VOLVER / CERRAR SESIÓN */}
        <button 
          onClick={handleCerrarSesion} 
          className="btn-gold" 
          style={{ marginTop: 'auto', background: 'transparent', border: '1px solid var(--rojo)', color: 'var(--rojo)' }}
        >
          CERRAR SESIÓN
        </button>
      </nav>

      {/* CONTENIDO PRINCIPAL */}
      <main className="content-main">
        <header>
          <h1 className="logo-title">{tab}</h1>
          <div className="gold-line" style={{ margin: '10px 0 30px 0' }}></div>
        </header>
        
        <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
          <div className="login-card" style={{ padding: '20px', maxWidth: 'none' }}>
            <p className="login-subtitle">PRODUCTOS EN STOCK</p>
            <h2 className="text-gold">124</h2>
          </div>
          <div className="login-card" style={{ padding: '20px', maxWidth: 'none' }}>
            <p className="login-subtitle">VENTAS DEL DÍA</p>
            <h2 className="text-gold">$1.200.000</h2>
          </div>
        </section>

        <div className="table-wrapper">
          <table className="gold-table">
            <thead>
              <tr>
                <th>PRODUCTO</th>
                <th>STOCK</th>
                <th>PRECIO</th>
                <th>ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>ACEITE MOTUL 10W40</td>
                <td>45</td>
                <td className="text-gold">$45.000</td>
                <td>
                  <button className="btn-gold" style={{ padding: '5px 10px', fontSize: '0.7rem' }}>EDITAR</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Inicio;