import React from 'react';
import './estilos.css'; // Aquí irían los estilos dorados que vimos antes

const Navbar = () => {
  return (
    <nav className="navbar-lubriplus">
      {/* Grupo Izquierdo: Navegación principal */}
      <div className="nav-links">
        
        {/* Agrupa Inventario y Catálogo aquí */}
        <button className="btn-dorado">Productos</button>

        <button className="btn-dorado">Seguros</button>

        {/* Menú desplegable para los servicios específicos */}
        <div className="dropdown">
          <button className="btn-dorado">Servicios ▼</button>
          <div className="dropdown-content">
            <button className="submenu-item">Cambio de Aceite / Niveles</button>
            <button className="submenu-item">Filtros y Líquido de Frenos</button>
            <button className="submenu-item">Transmisión y Suspensión</button>
          </div>
        </div>
      </div>

      {/* Grupo Derecho: Acción principal de venta */}
      <div className="nav-actions">
        <button className="btn-factura">Generar Factura</button>
      </div>
    </nav>
  );
};

export default Navbar;