const mongoose = require('mongoose');

const FacturaSchema = new mongoose.Schema({
    numeroFactura: { type: String, required: true, unique: true },
    fecha: { type: Date, default: Date.now },
    cliente: {
        nombre: { type: String, default: "Consumidor Final" },
        identificacion: { type: String, default: "222222222222" }, // Estándar DIAN
        direccion: { type: String, default: "Ciudad" }
    },
    items: [{
        descripcion: String,
        cantidad: Number,
        precioUnitario: Number,
        subtotal: Number
    }],
    total: { type: Number, required: true },
    metodoPago: { type: String, enum: ['Efectivo', 'Tarjeta', 'Transferencia'], default: 'Efectivo' }
});

module.exports = mongoose.model('Factura', FacturaSchema);