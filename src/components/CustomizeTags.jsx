import React, { useState } from 'react';
import TagSelection from '../components/TagSelection.jsx';
import Footer from '../components/Footer.jsx'
import swal from 'sweetalert'

function CustomizeTags() {
    
    async function handleSubmit(selectedTags) { //selectedTags es el arreglo de ids que se envian al backend
        
         if(selectedTags.length === 0){
            //alert("Selecciona al menos 1 tag");
            swal({
                icon:"info",
                title:"Selecciona al menos 1 tag"
            });

        } else {

            try{
                const idUsuario = localStorage.getItem('token id');
                //alert(idUsuario);
               
                console.log(selectedTags);
                console.log("Selected tags: ");
                console.log(selectedTags);
                
                const tagsJSON = JSON.stringify(selectedTags);
                // Append the JSON string to FormData
                
                console.log("json");
                console.log(tagsJSON);

                console.log("data: ");
                
                const postProfile = await fetch(`/api/customizeTags/`, {
                    method: 'POST',
                    body: tagsJSON,
                    headers: {
                        'Authorization': `Bearer ${idUsuario}`,
                        'Content-Type': 'application/json'
                    },
                })

                if(postProfile.ok){
                    //alert("Perfil actualizado!");
                    swal({
                        icon:'success',
                        title: "Perfil actualizado"
                    }).then(()=>{
                        window.location.href = 'profile.html';

                    })

                    
                }
            }catch(error){
                console.log(error);
            }
        

            
        }
    }
    

    return (
        
        <div>
            <h1 className="titulo">Personalizar perfil</h1>
            
            <div>
            <TagSelection onSubmit={handleSubmit} />
            </div>
            <div>
                <Footer></Footer>
            </div>
        </div>
    );
}

export default CustomizeTags;