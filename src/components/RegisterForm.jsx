import React from 'react'
import Inputform from './InputForm'
import InputPassword from './InputPassword'

function RegisterForm(){

    return <div className="form-container">
    <h1 className="header">Registrate</h1>
    <form className="form">
        <Inputform
            placeholder = 'NOMBRES'      
            id = 'Nombres'  
        />
        <Inputform
            placeholder = 'APELLIDOS'
            id = 'apellidos'        
        />
        <Inputform
            placeholder = 'CORREO INSTITUCIONAL'
            id = 'correo'        
        />
        <InputPassword
            placeholder = "CONTRASEÑA"
            id = 'password'
        />

        <InputPassword
            placeholder = "REPETIR CONTRASEÑA"
            id = 'repetirPassword'
        />
        <div className="button-container">
            <button className="signup-button">CREAR CUENTA</button>
        </div>
    </form>
    <div className="footer">
        Ya tienes una cuenta? <a href="LoginForm.jsx" className="login-link">Iniciar</a>
        <p className="terms">Al registrarse, estas aceptando nuestros <a href="#" className="terms-link">Terminos y condiciones</a></p>
    </div>
</div>


}

export default RegisterForm 



