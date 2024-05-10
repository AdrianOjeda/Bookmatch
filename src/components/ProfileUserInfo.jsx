import { useEffect, useState } from "react";
import UserProfilePic from "./UserProfilePic";
import TagProfileInfo from "./TagProfileInfo";

function ProfileUserInfo() {
    const [profileName, setProfileName] = useState('');
    
    useEffect(() => {
        getProfileName();
    }, []);

    
    async function getProfileName() {
        try {
            const userId = localStorage.getItem("id propietario");
            console.log(userId);
            const response = await fetch(`/api/getUserName/${userId}`, {
                method: 'GET',
                
            });
            const data = await response.json();
            setProfileName(data.fullName);
        } catch (err) {
            console.error(err);
        }
    }

    function reportUser(){
        const idReportedUser = localStorage.getItem("id propietario");
        
        localStorage.setItem('id reportado', idReportedUser)
        window.location.href = "/reportarUsuario.html" 
                
    }

    

    return (
        <div className="profile-info">
            <div className="profile-pic-container">
                <UserProfilePic className="Profile-Pic" />
            </div>
            <div>
                <p className="profile-name">{profileName}</p>
            </div>


            <button className="upload-button" onClick={reportUser}>Reportar usuario</button>
            
        </div>
    );
}

export default ProfileUserInfo;
