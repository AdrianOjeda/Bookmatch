import React, { useState } from 'react';
import InputForm from './InputForm';

import BadgeIcon from '@mui/icons-material/Badge';

import swal from 'sweetalert';

function RegisterForm() {

    const initialFormData = {
        nombres: '',
        apellidos: '',
        codigo: '',
        correo: '',
        password: '',
        repetirPassword: '',
        image: null,
    };

    const [formData, setFormData] = useState(initialFormData);


    const handleChange = (fieldName, value) => {
        setFormData({
            ...formData,
            [fieldName]: value,
        });
    };
    
    const [selectedFile, setSelectedFile] = useState(null);

    const handleImageChange = (event) => {
        const imageFile = event.target.files[0];
        console.log(imageFile);
        setFormData({ ...formData, image: imageFile });
        setSelectedFile(imageFile);
        console.log(selectedFile);
        
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            const formDataToSend = new FormData(); // Use a different variable name to avoid confusion
            formDataToSend.append('nombres', formData.nombres);
            formDataToSend.append('apellidos', formData.apellidos);
            formDataToSend.append('codigo', formData.codigo);
            formDataToSend.append('correo', formData.correo);
            formDataToSend.append('password', formData.password);
            formDataToSend.append('repetirPassword', formData.repetirPassword);
            formDataToSend.append('image', selectedFile); // Use selectedFile, not formData.image
    
            console.log(formDataToSend);
            const response = await fetch('/api/register', {
                method: 'POST',
                body: formDataToSend,
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Registration failed');
            }if(response.ok){
                const idUsuario =  await response.json();
                console.log(idUsuario);
                localStorage.setItem('idRegisteredUsuario', idUsuario);
            }
    
            setFormData(initialFormData);
            setSelectedFile(null);
            swal({icon:"success", title:"Usuario registrado exitosamente" }).then(()=>{

                window.location.href = "/customizeProfile"

            })
        } catch (error) {
            swal({icon:"error", title:"No se pudo realizar el registro del usuario", className: "historyAlert", text: `Motivo: ${error.message}` })
            
            console.error('User registration failed:', error);
        }
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
                    placeholder="CODIGO ESTUDIANTE"
                    id="codigo"
                    name="codigo"
                    type="text"
                    value={formData.codigo}
                    onChange={(value) => handleChange('codigo', value)}
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
                <label htmlFor="fileInput">
                {selectedFile ? <p style={{marginBottom: '3px', marginTop: '3px'}}>Credencial: {selectedFile.name}</p> : <p style={{marginBottom: '3px',  marginTop: '3px'}}>Credencial: </p> }
                    <BadgeIcon style={{marginBottom: '10px', cursor: "pointer"}} />
                    
                </label>
                <input
                    type="file"
                    id="fileInput"
                    style={{ display: 'none' }}
                    onChange={handleImageChange}
                    accept="image/*"
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
                    <a href="./terminosYcondiciones" className="terms-link">
                        Terminos y condiciones
                    </a>
                </p>
            </div>
        </div>
    );
}

export default RegisterForm;