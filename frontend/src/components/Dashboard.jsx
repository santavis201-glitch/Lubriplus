import React from 'react';

const Dashboard = ({ usuario }) => {
  const productos = [
    { id: 1, nombre: "Aceite Sintético 10W-30", precio: 45000, stock: 20, imagen: "https://via.placeholder.com/150" },
    { id: 2, nombre: "Filtro de Aire Premium", precio: 25000, stock: 15, imagen: "https://via.placeholder.com/150" },
    { id: 3, nombre: "Líquido de Frenos DOT4", precio: 18000, stock: 50, imagen: "https://via.placeholder.com/150" },
  ];

  return (
    <div className="dashboard-container">
      <header className="dash-header">
        <h2>LUBRI<span>PLUS</span> - Panel de Ventas</h2>
        <div className="user-info">Bienvenido, <strong>{usuario}</strong></div>
      </header>

      <section className="catalogo">
        <h3>Catálogo de Productos</h3>
        <div className="productos-grid">
          {productos.map(prod => (
            <div key={prod.id} className="producto-card">
              <img src={prod.image} alt={prod.nombre} />
              <h4>{prod.nombre}</h4>
              <p className="precio">${prod.precio.toLocaleString()}</p>
              <p className="stock">Stock: {prod.stock} und</p>
              <button className="btn-agregar">Agregar al Carrito</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;