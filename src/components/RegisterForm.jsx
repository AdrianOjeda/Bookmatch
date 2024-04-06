import React, { useState } from 'react';
import InputForm from './InputForm';

function RegisterForm() {
    const [formData, setFormData] = useState({
        nombres: '',
        apellidos: '',
        correo: '',
        password: '',
        repetirPassword: '',
    });

    const handleChange = (fieldName, value) => {
        setFormData({
            ...formData,
            [fieldName]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        const registerUser = async () => {
            try {
                // Make an HTTP POST request to your backend API endpoint
                const response = await fetch('/api/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                // Check if the request was successful
                if (!response.ok) {
                    throw new Error('Failed to register');
                }

                // Reset the form data after successful registration
                setFormData({
                    nombres: '',
                    apellidos: '',
                    correo: '',
                    password: '',
                    repetirPassword: '',
                });

                // Optionally, you can handle the response from the backend
                const data = await response.json();
                console.log('Registration successful:', data);
            } catch (error) {
                console.error('Registration failed:', error);
            }
        };

        // Call the async function to register the user
        registerUser();
    };

    return (
        <div className="form-container">
            <h1 className="header">Registrate</h1>
            <form className="form" onSubmit={handleSubmit}>
                <InputForm
                    placeholder="NOMBRES"
                    id="Nombres"
                    name="nombres"
                    type="text"
                    value={formData.nombres}
                    onChange={(value) => handleChange('nombres', value)}
                />
                <InputForm
                    placeholder="APELLIDOS"
                    id="apellidos"
                    name="apellidos"
                    type="text"
                    value={formData.apellidos}
                    onChange={(value) => handleChange('apellidos', value)}
                />
                <InputForm
                    placeholder="CORREO INSTITUCIONAL"
                    id="correo"
                    name="correo"
                    type="text"
                    value={formData.correo}
                    onChange={(value) => handleChange('correo', value)}
                />
                <InputForm
                    placeholder="CONTRASEÑA"
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={(value) => handleChange('password', value)}
                />

                <InputForm
                    placeholder="REPETIR CONTRASEÑA"
                    id="repetirPassword"
                    name="repetirPassword"
                    type="password"
                    value={formData.repetirPassword}
                    onChange={(value) => handleChange('repetirPassword', value)}
                />
                <div className="button-container">
                    <button type="submit" className="signup-button">
                        CREAR CUENTA
                    </button>
                </div>
            </form>
            <div className="footer">
                Ya tienes una cuenta?{' '}
                <a href="login.html" className="login-link">
                    Iniciar
                </a>
                <p className="terms">
                    Al registrarse, estas aceptando nuestros{' '}
                    <a href="#" className="terms-link">
                        Terminos y condiciones
                    </a>
                </p>
            </div>
        </div>
    );
}

export default RegisterForm;
