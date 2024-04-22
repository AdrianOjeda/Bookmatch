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

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            const token = data.token;

            const typeAccount =  data.tokenTypeAccount;
            const isVerified = data.isVerified;
            alert("is admin " + typeAccount + " is verified "+isVerified );
            // Assuming the API response contains a token
            localStorage.setItem('token', token);
            // Redirect to feed page or handle login success in other ways
            if(typeAccount === false && isVerified === false){
                
                window.location.href = "/notVerified";

            }if(typeAccount === true && isVerified === true){

                window.location.href = '/adminFeed';
            }
            if (typeAccount === false && isVerified ===  true){
                window.location.href = '/feed';
            }

            
            
        } catch (error) {
            alert('Login failed: ' + error.message);
            console.error('Login failed:', error);
        }
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
        <p className="terms">Al registrarse, estas aceptando nuestros <a href="./terminosYcondiciones" className="terms-link">Terminos y condiciones</a></p>
    </div>
</div>)


}

export default LoginForm;