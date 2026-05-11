import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importamos para poder navegar al login tras registrar
import './estilos.css'; // Asegúrate de que aquí importas el archivo donde pegaste el CSS unificado

const Registro = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Enviando datos al servidor...");

        try {
            const response = await fetch('http://localhost:8080/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                console.log("✅ Registro exitoso en la BD:", data);
                alert("¡Usuario registrado con éxito!");
                setFormData({ nombre: '', email: '', password: '' });
                navigate('/login'); // Te manda al login automáticamente
            } else {
                console.error("❌ Error del servidor:", data.mensaje);
                alert("Error: " + data.mensaje);
            }
        } catch (error) {
            console.error("❌ Error de red o conexión:", error);
            alert("No se pudo conectar con el servidor.");
        }
    };

    return (
        <div className="auth-container"> {/* CLASE UNIFICADA */}
            <div className="auth-card">     {/* CLASE UNIFICADA */}
                <h2>Lubriplus</h2>
                <p>CREAR NUEVA CUENTA TÉCNICA</p>

                <form onSubmit={handleSubmit}>
                    <div className="input-group"> {/* CONTENEDOR PARA EL ESTILO */}
                        <label>Nombre Completo</label>
                        <input 
                            type="text" 
                            name="nombre" 
                            placeholder="EJ: JAVIER SANTAFE" 
                            value={formData.nombre} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>

                    <div className="input-group">
                        <label>Correo Electrónico</label>
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="EMAIL@LUBRIPLUS.COM" 
                            value={formData.email} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>

                    <div className="input-group">
                        <label>Contraseña</label>
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="••••••••" 
                            value={formData.password} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>

                    <button type="submit" className="btn-primary"> {/* CLASE UNIFICADA */}
                        REGISTRARSE
                    </button>
                </form>

                <div className="auth-footer">
                    ¿Ya tienes cuenta? <span onClick={() => navigate('/login')}>Inicia Sesión</span>
                </div>
            </div>
        </div>
    );
};

export default Registro;