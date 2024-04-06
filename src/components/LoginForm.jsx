import React from 'react'
import InputForm from './InputForm'


function LoginForm(){

    return <div className="form-container">
    <h1 className="header">Inicia sesión</h1>
    <form className="form">
        
        <InputForm
            placeholder = 'CORREO INSTITUCIONAL'
            id = 'correo'    
            type ='text'  
            name = 'correo'  
        />
        <InputForm
            placeholder = "CONTRASEÑA"
            id = 'password'
            type = 'password'
            name = 'password'
        />

        
        <div className="button-container">
            <button className="signup-button">Iniciar sesión</button>
        </div>
    </form>
    <div className="footer">
        No tienes una cuenta? <a href="index.html" className="login-link">Registrate</a>
        <p className="terms">Al registrarse, estas aceptando nuestros <a href="#" className="terms-link">Terminos y condiciones</a></p>
    </div>
</div>


}

export default LoginForm



