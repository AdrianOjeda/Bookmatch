import React, { useState } from 'react';

function CustomizeProfilePage() {
    const [fileName, setFileName] = useState(""); // Estado para almacenar el nombre del archivo

    async function handleImageUpload(event) {
        const file = event.target.files[0];
        if (file) {
            console.log("Imagen seleccionada:", file);
            console.log(file.name);
            setFileName(file.name); // Actualiza el nombre del archivo en el estado
        }
    }

    return (
        <div>
            <h1 className="titulo">Personalizar perfil</h1>
            <img src="https://i.postimg.cc/3NvB4jd9/Ilustracio-n-sin-ti-tulo.png" alt="default profile pic" className="centerImage" />
            <div className="container">
                <label htmlFor="fileInput" className="boton">Agregar foto de perfil</label>
                <input type="file" id="fileInput" style={{ display: "none" }} onChange={handleImageUpload} />
            </div>
            <p className='tituloImagen'>{fileName}</p> {}
        </div>
    );
}

export default CustomizeProfilePage;