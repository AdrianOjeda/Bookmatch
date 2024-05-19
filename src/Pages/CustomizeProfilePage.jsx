import React, { useState } from 'react';
import TagSelection from '../components/TagSelection.jsx';
import Footer from '../components/Footer.jsx'
import swal from 'sweetalert';

function CustomizeProfilePage() {
    const [profilePic, setProfilePic] = useState(null); // Estado para almacenar el nombre del archivo

    async function handleImageUpload(event) {
        const file = event.target.files[0];
        if (file) {
            console.log("Imagen seleccionada:", file);
            console.log(file.name);
            setProfilePic(file); // Actualiza el nombre del archivo en el estado
            
        }
    }
    async function handleSubmit(selectedTags) { //selectedTags es el arreglo de ids que se envian al backend
        
        if (profilePic === null) {
            //alert("Debes subir una foto de perfil!");

            swal({
                icon:'info',
                title:'Debes subir una foto de perfil!'
            })
        }else if(selectedTags.length === 0){
            swal({
                icon:'info',
                title:'Selecciona al menos 1 tag'
            })

        } else {

            try{
                const idUsuario = localStorage.getItem('idRegisteredUsuario');
                //alert(idUsuario);
                const profileDataToSend = new FormData();
                console.log(selectedTags);
                console.log(profilePic);
                const tagsJSON = JSON.stringify(selectedTags);
                // Append the JSON string to FormData
                profileDataToSend.append("tags", tagsJSON);
                profileDataToSend.append("image", profilePic);
                

                console.log("fotaza: ");
                console.log(profileDataToSend);
                const postProfile = await fetch(`/api/customizeProfile/${idUsuario}`, {
                    method: 'POST',
                    body: profileDataToSend,
                })

                if(postProfile.ok){
                    //alert("Perfil actualizado!");
                    swal({
                        icon:'success',
                        title:'Perfil personalizado con éxito'
                    }).then(()=>{

                        window.location.href = 'notVerified.html';
                    }).then(()=>{
                        window.history.replaceState({}, '', '/login');
                    })

                    // Replace the current history entry with a new one
                    
                }
            }catch(error){
                console.log(error);
            }
        

            
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
            <p className='tituloImagen'>{profilePic ? profilePic.name : ''}</p>
            <div>
            <TagSelection onSubmit={handleSubmit} />
            </div>
            <div>
                <Footer></Footer>
            </div>
        </div>
    );
}

export default CustomizeProfilePage;