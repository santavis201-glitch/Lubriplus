import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Catalogo = () => {
    const navigate = useNavigate();
    // Datos de ejemplo para que la app no se vea vacía en la entrega
    const [productos] = useState([
        { id: 1, nombre: "Aceite Motul 10W40", categoria: "Lubricantes", precio: 45000, stock: 12 },
        { id: 2, nombre: "Filtro de Aceite Bosch", categoria: "Filtros", precio: 22000, stock: 8 },
        { id: 3, nombre: "Líquido de Frenos DOT4", categoria: "Químicos", precio: 15000, stock: 20 },
        { id: 4, nombre: "Refrigerante Rojo", categoria: "Químicos", precio: 30000, stock: 5 },
    ]);

    const handleLogout = () => {
        alert("Cerrando sesión...");
        navigate('/'); // Regresa al login
    };

    return (
        <div style={{ padding: '20px', color: 'white', backgroundColor: '#121212', minHeight: '100vh' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #e67e22', paddingBottom: '10px' }}>
                <h1>🛠️ Inventario Lubriplus</h1>
                <button onClick={handleLogout} style={{ width: 'auto', padding: '10px 20px', backgroundColor: '#c0392b' }}>Cerrar Sesión</button>
            </header>

            <section style={{ marginTop: '30px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#e67e22', color: 'black' }}>
                            <th style={{ padding: '10px' }}>Producto</th>
                            <th style={{ padding: '10px' }}>Categoría</th>
                            <th style={{ padding: '10px' }}>Precio</th>
                            <th style={{ padding: '10px' }}>Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map(p => (
                            <tr key={p.id} style={{ borderBottom: '1px solid #333' }}>
                                <td style={{ padding: '10px' }}>{p.nombre}</td>
                                <td style={{ padding: '10px' }}>{p.categoria}</td>
                                <td style={{ padding: '10px' }}>${p.precio.toLocaleString()}</td>
                                <td style={{ padding: '10px', color: p.stock < 10 ? '#e74c3c' : '#2ecc71' }}>{p.stock} unid.</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default Catalogo;