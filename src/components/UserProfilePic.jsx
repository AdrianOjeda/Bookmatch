import React, { useEffect, useState } from "react";

function UserProfilePic(props) {
    const [profilePicName, setProfilePicName] = useState(null);

    useEffect(() => {
        getProfilePic();
    }, []);

    async function getProfilePic(){

        const userId = localStorage.getItem("id propietario");
        console.log("token "+userId);
        try{
            const profilePic = await fetch(`/api/getUserProfilePic/${userId}`, {
                method: "GET",
                
    
            });
            if(!profilePic.ok){
                throw new Error("500: No se pudo obtener la foto de perfil");
            }else {
                const profile_pic = await profilePic.json();
                const fileName = profile_pic.profile_pic;
                
                setProfilePicName(fileName);
                console.log(profilePicName);

            }
            
            
        }catch(err){

            console.log("No se pudo obetener la foto de perfil!");
        }
    
    }
    return <img src={`/uploads/${profilePicName}`} alt="" className={props.className} />
}

export default UserProfilePic;