import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [productos, setProductos] = useState([]);
  const [usuario, setUsuario] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user_name');
    if (!user) {
      navigate('/');
    } else {
      setUsuario(user);
    }

    fetch("http://localhost:5000/api/productos")
      .then(res => res.json())
      .then(data => setProductos(data))
      .catch(err => console.error("Error:", err));
  }, [navigate]);

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Lubri<span>Plus-PIEA </span></h1>
        <div className="user-badge">
          <span>Admin: <strong>{usuario}</strong></span>
          <button onClick={() => { localStorage.removeItem('user_name'); navigate('/'); }} className="btn-logout">SALIR</button>
        </div>
      </header>

      <main className="inventory-grid">
        {productos.length > 0 ? (
          productos.map((prod) => (
            <div key={prod._id} className="product-card">
              <span className="product-icon-large">{prod.icono || "🛢️"}</span>
              <h3>{prod.nombre}</h3>
              <p className="product-price">${prod.precio.toFixed(2)}</p>
              <button className="btn-manage">GESTIONAR STOCK</button>
            </div>
          ))
        ) : (
          <div className="loading">Conectando con la base de datos...</div>
        )}
      </main>
    </div>
  );
};

export default Home;