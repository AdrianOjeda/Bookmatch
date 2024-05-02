import React, { useEffect, useState } from "react";

function ProfilePic(props) {
    const [profilePicName, setProfilePicName] = useState(null);

    useEffect(() => {
        getProfilePic();
    }, []);

    async function getProfilePic(){

        try{
            const userId = localStorage.getItem("token id");
            console.log("token "+userId);
            const profilePic = await fetch('/api/getProfilePic', {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${userId}`,
                },
    
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
    return <img src={`/uploads/${profilePicName}`} alt="" className={props.className} onClick = {()=>{window.location.href = "/profile"}}/>
}

export default ProfilePic;