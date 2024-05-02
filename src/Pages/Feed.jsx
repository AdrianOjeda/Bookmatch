import React, { useState } from 'react';
import InputForm from '../components/InputForm';
//import jwt_decode from 'jwt-decode';
import FolderIcon from '@mui/icons-material/Folder';

function Feed() {
    const initialFormData = {
        titulo: '',
        autor: '',
        isbn: '',
        precio: 0,
        image: null,
    };

    const [formBookData, setFormData] = useState(initialFormData);

    const handleChange = (fieldName, value) => {
        setFormData({
            ...formBookData,
            [fieldName]: value,
        });
    };

    const [selectedFile, setSelectedFile] = useState(null);

   
    const handleImageChange = (event) => {
        const imageFile = event.target.files[0];
        console.log(imageFile);
        setFormData({ ...formBookData, image: imageFile });
        setSelectedFile(imageFile);
        
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            const token = localStorage.getItem('token id');
            const formData = new FormData();
            formData.append('titulo', formBookData.titulo);
            formData.append('autor', formBookData.autor);
            formData.append('isbn', formBookData.isbn);
            formData.append('precio', formBookData.precio);
            formData.append('image', formBookData.image);
            formData.append('idUsuario', token);
    
            const response = await fetch('/api/addBook', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Book registration failed');
            }
    
            // Reset the form data after successful registration
            setFormData(initialFormData);
            setSelectedFile(null);
            alert('Book added successfully');
        } catch (error) {
            alert('Book registration failed: ' + error.message);
            console.error('Book registration failed:', error);
        }
    };

    return (
        <div className="form-container">
            <h1 className="header">Registra el libro</h1>
            <form className="form" onSubmit={handleSubmit}>
                <InputForm
                    placeholder="TITULO"
                    id="titulo"
                    name="titulo"
                    type="text"
                    value={formBookData.titulo}
                    onChange={(value) => handleChange('titulo', value)}
                />
                <InputForm
                    placeholder="AUTOR"
                    id="autor"
                    name="autor"
                    type="text"
                    value={formBookData.autor}
                    onChange={(value) => handleChange('autor', value)}
                />
                <InputForm
                    placeholder="CODIGO ISBN"
                    id="isbn"
                    name="isbn"
                    type="text"
                    value={formBookData.isbn}
                    onChange={(value) => handleChange('isbn', value)}
                />
                <InputForm
                    placeholder="PRECIO"
                    id="precio"
                    name="precio"
                    type="number"
                    value={formBookData.precio}
                    onChange={(value) => handleChange('precio', value)}
                />
                <label htmlFor="fileInput">
                {selectedFile ? <p style={{marginBottom: '3px'}}>portada: {selectedFile.name}</p> : <p style={{marginBottom: '3px'}}>portada: </p> }
                    <FolderIcon style={{marginBottom: '10px'}} />
                    
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
                        INGRESAR LIBRO
                    </button>
                </div>
            </form>
            <div className="footer">
                <a href="layoutLibros.html" className="login-link">
                    Registro de libros
                </a>
            </div>
        </div>
    );
}

export default Feed;