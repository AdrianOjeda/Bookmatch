import React, { useState } from 'react';
import InputForm from './InputForm';
//import jwt_decode from 'jwt-decode';

function Feed() {
    const [formBookData, setFormData] = useState({
        titulo: '',
        autor: '',
        isbn: '',
        precio: 0,
       
    });

    const handleChange = (fieldName, value) => {
        setFormData({
            ...formBookData,
            [fieldName]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        const addBook = async () => {
            try {
                const token = localStorage.getItem('token');
                setFormData({
                    ...formBookData,
                    idUsuario: token,
                }); //adds the userId token to the formBookData array in order to send it to the backend as post request
                console.log(formBookData);

                const response = await fetch('/api/addBook', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    
                    body: JSON.stringify(formBookData),
                });

                if (!response.ok) {
                    // If the response is not OK (status code other than 2xx),
                    // parse the error response JSON and throw an error
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Book registration failed');
                    alert(errorData.error)
                  }
                // Reset the form data after successful registration
                setFormData({
                    titulo: '',
                    autor: '',
                    isbn: '',
                    precio: 0,
                });

                // Optionally, you can handle the response from the backend
                const data = await response.json();
                console.log('Book added succesfully:', data);
            } catch (error) {
                alert('Book registration failed: ' + error.message);
                console.error('Book registration failed:', error);
            }
        };
        console.log(formBookData);
        // Call the async function to register the user
        addBook();
    };

    return (
        <div className="form-container">
            <h1 className="header">Ingresa el libro</h1>
            <form className="form" onSubmit={handleSubmit}>
                <InputForm
                    placeholder="TITULO"
                    id="titulo"
                    name="titulo"
                    type="text"
                    value={formBookData.nombres}
                    onChange={(value) => handleChange('titulo', value)}
                />
                <InputForm
                    placeholder="AUTOR"
                    id="autor"
                    name="autor"
                    type="text"
                    value={formBookData.apellidos}
                    onChange={(value) => handleChange('autor', value)}
                />
                <InputForm
                    placeholder="CODIGO ISBN"
                    id="isbn"
                    name="isbn"
                    type="text"
                    value={formBookData.codigo}
                    onChange={(value) => handleChange('isbn', value)}
                />
                <InputForm
                    placeholder="PRECIO"
                    id="precio"
                    name="precio"
                    type="number"
                    value={formBookData.correo}
                    onChange={(value) => handleChange('precio', value)}
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


