import React from 'react'
import Inputform from './InputForm'
import InputPassword from './InputPassword'

function LoginForm(){

    return <div className="form-container">
    <h1 className="header">Inicia sesión</h1>
    <form className="form">
        
        <Inputform
            placeholder = 'CORREO INSTITUCIONAL'
            id = 'correo'        
        />
        <InputPassword
            placeholder = "CONTRASEÑA"
            id = 'password'
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



