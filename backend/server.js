const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// --- MIDDLEWARES ---
app.use(cors());
app.use(express.json());

// --- CONFIGURACIÓN DE MONGODB ---
const MONGO_URI = 'mongodb://127.0.0.1:27017/lubriplus';
const PORT = 8080;

console.log('⏳ Intentando conectar a MongoDB...');

mongoose.connect(MONGO_URI)
.then(() => console.log('✅ ÉXITO: Conectado a la base de datos LUBRIPLUS'))
.catch(err => console.log('❌ ERROR CRÍTICO DE CONEXIÓN DB:', err.message));

// --- MODELO DE USUARIO ---
const User = mongoose.model('User', new mongoose.Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}));

// --- RUTA DE REGISTRO (Mantenida por seguridad) ---
app.post('/api/auth/register', async (req, res) => {
    try {
        const { nombre, email, password } = req.body;
        const nuevoUsuario = new User({ nombre, email: email.toLowerCase(), password });
        await nuevoUsuario.save();
        res.status(201).json({ mensaje: 'REGISTRO EXITOSO' });
    } catch (error) {
        res.status(400).json({ mensaje: 'ERROR AL REGISTRAR' });
    }
});

// --- RUTA DE LOGIN CON DIAGNÓSTICO AVANZADO ---
app.post('/api/auth/login', async (req, res) => {
    console.log("\n-----------------------------------------");
    console.log("📥 [1] ¡PETICIÓN RECIBIDA!");
    console.log("Datos del cuerpo:", req.body);

    try {
        // PASO 1: Verificar si Mongoose está conectado
        const estadoConexion = mongoose.connection.readyState;
        console.log("📡 [2] Estado de conexión Mongoose:", estadoConexion);
        // 0: desconectado, 1: conectado, 2: conectando, 3: desconectando

        if (estadoConexion !== 1) {
            console.log("❌ ERROR: La base de datos no está lista.");
            return res.status(500).json({ mensaje: 'DB_NO_CONECTADA' });
        }

        const { email, password } = req.body;
        if (!email || !password) {
            console.log("⚠️ ERROR: Faltan campos en la petición.");
            return res.status(400).json({ mensaje: 'FALTAN_DATOS' });
        }

        const emailNormalizado = email.toLowerCase();
        console.log(`🔍 [3] Buscando usuario: ${emailNormalizado}`);

        // PASO 2: Buscar usuario con un límite de tiempo (Timeout)
        const user = await User.findOne({ email: emailNormalizado }).maxTimeMS(3000);

        if (!user) {
            console.log(`🚫 [4] Resultado: Usuario "${emailNormalizado}" no encontrado.`);
            return res.status(401).json({ mensaje: 'CREDENCIALES_INVALIDAS' });
        }

        console.log(`✅ [4] Resultado: Usuario encontrado. Verificando contraseña...`);

        // PASO 3: Validar contraseña
        if (user.password === password) {
            console.log("🎉 [5] LOGIN EXITOSO para:", user.nombre);
            return res.status(200).json({ 
                nombre: user.nombre, 
                email: user.email,
                mensaje: "LOGIN_EXITOSO" 
            });
        } else {
            console.log("❌ [5] Error: Contraseña incorrecta.");
            return res.status(401).json({ mensaje: 'CONTRASEÑA_INCORRECTA' });
        }

    } catch (error) {
        // ESTO ES LO QUE CAPTURARÁ EL "ERROR 500" REAL
        console.log("🔥 ERROR CRÍTICO DETECTADO:");
        console.error(error); 
        return res.status(500).json({ 
            mensaje: 'ERROR_INTERNO_SERVIDOR',
            detalle: error.message 
        });
    }
});

// --- LANZAMIENTO ---
app.listen(PORT, () => {
    console.log(`🚀 SERVIDOR LUBRIPLUS CORRIENDO EN: http://localhost:${PORT}`);
});