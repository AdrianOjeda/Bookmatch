import React, { useState } from 'react';
import InputForm from '../components/InputForm';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import BadgeIcon from '@mui/icons-material/Badge';
import swal from 'sweetalert';
function ReportForm() {

    const initialFormData = {
        motivo: '',
        image: null,
    };

    const [formData, setFormData] = useState(initialFormData);


    const handleChange = (fieldName, value) => {
        setFormData({
            ...formData,
            [fieldName]: value,
        });
        console.log(formData);
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
        const userReportedId =  localStorage.getItem('id reportado');
        
        try {
            const formDataToSend = new FormData(); // Use a different variable name to avoid confusion
            formDataToSend.append('motivo', formData.motivo);
            formDataToSend.append('image', selectedFile); // Use selectedFile, not formData.image
    
            console.log(formDataToSend);
            const response = await fetch(`/api/reportUser/${userReportedId}`, {
                method: 'POST',
                body: formDataToSend,
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'No se pudo realizar el reporte');
            }else{
                //alert("El reporte se realizo con exito :)")
                swal({icon:"success",title:"El reporte se realizo con exito"})
            }
    
            setFormData(initialFormData);
            setSelectedFile(null);
            
        
        } catch (error) {
            //alert('User registration failed: ' + error.message);
            swal({icon:"error",title:"No se pudo reportar al usuario"})
            console.error('User registration failed:', error);
        }
    };
    return (
        <div className="form-container">
            <h1 className="header">Reporte</h1>
            <form className="form" onSubmit={handleSubmit}>
            <textarea
                placeholder="MOTIVO"
                id="Motivo"
                name="motivo"
                value={formData.motivo}
                onChange={(e) => handleChange('motivo', e.target.value)}
                style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    fontSize: '16px',
                    marginBottom: '25px',
                    fontFamily: 'Arial, sans-serif',
                }}
/>
                
                <label htmlFor="fileInput">
                {selectedFile ? <p style={{marginBottom: '3px', marginTop: '3px'}}>Evidencia: {selectedFile.name}</p> : <p style={{marginBottom: '3px',  marginTop: '3px'}}>Evidencia: </p> }
                    <DriveFolderUploadIcon fontSize="large" className = 'evidence-button' />
                    
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
                        REPORTAR
                    </button>
                </div>
            </form>
            <div className="footer">
                
                <a href="userProfile.html" className="login-link">
                    Regresar
                </a>
                
            </div>
        </div>
    );
}

export default ReportForm;