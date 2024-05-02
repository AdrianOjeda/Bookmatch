import React, { useState } from 'react';
import InputForm from '../components/InputForm';
//import jwt_decode from 'jwt-decode';

function BookForm() {
    const initialFormData = {
        titulo: '',
        autor: '',
        isbn: '',
        precio: '',
    };

    const [formBookData, setFormData] = useState(initialFormData);

    const handleChange = (fieldName, value) => {
        setFormData({
            ...formBookData,
            [fieldName]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const tokenLibro = localStorage.getItem('tokenLibro');
            const token = localStorage.getItem('token');
            const updatedFormData = { ...formBookData, idUsuario: token, idLibro: tokenLibro };

            const response = await fetch('/api/editBook', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(updatedFormData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Book update failed');
            }

            // Reset the form data after successful registration
            setFormData(initialFormData);
            alert('Libro editado correctamente');
            window.location.href = '/feed';
        } catch (error) {
            alert('Book update failed: ' + error.message);
            console.error('Book update failed:', error);
        }
    };

    return (
        <div className="form-container">
            <h1 className="header">Edita el libro</h1>
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
                <div className="button-container">
                    <button type="submit" className="signup-button">
                        EDITAR
                    </button>
                </div>
            </form>
            <div className="footer">
                <a href="layoutLibros.html" className="login-link">
                    Regresar
                </a>
            </div>
        </div>
    );
}

export default BookForm;