import React, { useState } from "react";

function Inventario() {
  const [productos, setProductos] = useState([
    { id: 1, nombre: "Castrol Edge 5W-30", categoria: "Sintético", stock: 15, precio: 45000 },
    { id: 2, nombre: "Mobil 1 Synthetic", categoria: "Sintético", stock: 8, precio: 52000 },
  ]);

  return (
    <div className="inventario-container">
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <button className="btn-gold" style={{ width: 'auto', padding: '10px 20px' }}>
          + AGREGAR PRODUCTO
        </button>
      </div>

      <div className="inventario-table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Producto</th>
              <th>Categoría</th>
              <th>Stock</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td style={{ fontWeight: 'bold' }}>{p.nombre}</td>
                <td>{p.categoria}</td>
                <td style={{ color: p.stock < 10 ? '#ff4d4d' : '#fff' }}>{p.stock}</td>
                <td>${p.precio.toLocaleString()}</td>
                <td>
                  <button style={{ background: 'none', border: 'none', color: '#d4af37', cursor: 'pointer', marginRight: '10px' }}>Editar</button>
                  <button style={{ background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer' }}>Borrar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Inventario;