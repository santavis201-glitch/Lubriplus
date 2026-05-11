import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import "../n-index.css"; // Los dos puntos suben a la carpeta src

function Success() {
  const navigate = useNavigate();
  const location = useLocation();
  const [detalles, setDetalles] = useState(null);

  useEffect(() => {
    // Obtenemos los datos del pago que Mercado Pago envía en la URL
    const query = new URLSearchParams(location.search);
    const paymentId = query.get('payment_id');
    const status = query.get('status');

    if (status === 'approved') {
      setDetalles({ id: paymentId, status: 'Aprobado' });
    }
  }, [location]);

  const imprimirComprobante = () => {
    window.print();
  };

  return (
    <div className="success-container">
      <div className="success-card">
        <div className="success-icon">Check de Pago✓</div>
        <h1>¡Pago Confirmado!</h1>
        <p>Gracias por tu compra en <strong>LUBRIPLUS</strong>. Tu pedido está siendo procesado.</p>
        
        <div className="payment-details">
          <div className="detail-row">
            <span>ID de Transacción:</span>
            <span>{detalles?.id || 'Generando...'}</span>
          </div>
          <div className="detail-row">
            <span>Estado:</span>
            <span className="status-badge">Acreditado</span>
          </div>
        </div>

        <div className="actions-group">
          <button onClick={imprimirComprobante} className="btn-print-final">
            🖨️ Imprimir Factura
          </button>
          <button onClick={() => navigate('/home')} className="btn-back-home">
            Volver al Catálogo
          </button>
        </div>
      </div>
    </div>
  );
}

export default Success;