import React, { useState, useEffect } from 'react';
import InputForm from '../components/InputForm';
//import jwt_decode from 'jwt-decode';
import FolderIcon from '@mui/icons-material/Folder';

function Feed() {
    const initialFormData = {
        titulo: '',
        autor: '',
        isbn: '',
        descripcion: '',
        image: null,
        tags: [],
    };

    const [formBookData, setFormData] = useState(initialFormData);

    const handleChange = (fieldName, value) => {
        setFormData({
            ...formBookData,
            [fieldName]: value,
        });
    };

    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedTags, setSelectedTags] = useState([]);
    const [tags, setTags] = useState([]);

    useEffect(() => {
        
        fetchTags();
    }, []);

    async function fetchTags() {
        try {
            const response = await fetch('/api/tags');
            if (response.ok) {
                const tagsData = await response.json();
                setTags(tagsData.tagsInfo);
            } else {
                console.error('Failed to fetch tags:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching tags:', error);
        }
    }

    console.log(tags);
   

    const handleTagChange = (event) => {
        const selectedTagsArray = Array.from(event.target.selectedOptions, option => option.value);
        setSelectedTags(selectedTagsArray);
        console.log("Selected Tags:", selectedTagsArray);
    };

    const handleImageChange = (event) => {
        const imageFile = event.target.files[0];
        console.log(imageFile);
        setFormData({ ...formBookData, image: imageFile });
        setSelectedFile(imageFile);
        
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            console.log(selectedTags);
            console.log(formBookData.image);
            if(selectedTags.length === 0){
                alert("Elige al menos 1 tag")
            }else if(!formBookData.image){
                alert("Debes subir una foto de portada")
            }else{
            const token = localStorage.getItem('token id');
            const formData = new FormData();
            formData.append('titulo', formBookData.titulo);
            formData.append('autor', formBookData.autor);
            formData.append('isbn', formBookData.isbn);
            formData.append('descripcion', formBookData.descripcion);
            formData.append('image', formBookData.image);
            formData.append('idUsuario', token);
            formData.append('tags', JSON.stringify(selectedTags));
    
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
            }
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
                    placeholder="DESCRIPCION"
                    id="descripcion"
                    name="descripcion"
                    type="text"
                    value={formBookData.descripcion}
                    onChange={(value) => handleChange('descripcion', value)}
                />
                <label htmlFor="tag-select">Elige tags para el libro:</label>
                <select 
                name="tags" 
                id="tag-select" 
                multiple 
                className="tag-select"
                value={selectedTags} 
                onChange={handleTagChange} 
                >
                <option value="">--Elija una o mas opciones--</option>
                {tags.map((tag) => (
                    <option key={tag.idtag} value={tag.idtag}>{tag.tagname}</option>
                ))}
                </select>

                <label htmlFor="fileInput">
                {selectedFile ? <p style={{marginBottom: '3px'}}>portada: {selectedFile.name}</p> : <p style={{marginBottom: '3px'}}>portada: </p> }
                    <FolderIcon style={{marginBottom: '10px', cursor: 'pointer'}} />
                    
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
                <a href="/profile" className="login-link">
                    Perfil
                </a>
            </div>
        </div>
        
    );
}

export default Feed;