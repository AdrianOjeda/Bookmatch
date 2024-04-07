import React, {useState} from 'react'
import InputForm from './InputForm'


function LoginForm(){
    const [formData, setFormData] = useState({
        correo: '',
        password: '',
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
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    
                    body: JSON.stringify(formData),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Login failed');
                    alert(errorData.error)
                  }
                // Reset the form data after successful registration
                setFormData({
                    correo: '',
                    password: '',
                });

                // Optionally, you can handle the response from the backend
                const data = await response.json();
                console.log('Login successful:', data);

            } catch (error) {
                alert('Login failed: ' + error.message);
                console.error('Login failed:', error);
            }
        };

        // Call the async function to register the user
        registerUser();
    };

    return (<div className="form-container">
    <h1 className="header">Inicia sesión</h1>
    <form className="form" onSubmit={handleSubmit}>
        
        <InputForm
            placeholder = 'CORREO INSTITUCIONAL'
            id = 'correo'    
            type ='text'  
            name = 'correo'  
            value={formData.correo}
            onChange={(value) => handleChange('correo', value)}
        />
        <InputForm
            placeholder = "CONTRASEÑA"
            id = 'password'
            type = 'password'
            name = 'password'
            value={formData.password}
            onChange={(value) => handleChange('password', value)}
        />

        
        <div className="button-container">
            <button className="signup-button">Iniciar sesión</button>
        </div>
    </form>
    <div className="footer">
        No tienes una cuenta? <a href="index.html" className="login-link">Registrate</a>
        <p className="terms">Al registrarse, estas aceptando nuestros <a href="#" className="terms-link">Terminos y condiciones</a></p>
    </div>
</div>)


}

export default LoginForm



