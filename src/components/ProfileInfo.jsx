import { useEffect, useState } from "react";
import ProfilePic from "./ProfilePic";

function ProfileInfo() {
    const [profileName, setProfileName] = useState('');

    useEffect(() => {
        getProfileName();
    }, []);

    async function getProfileName() {
        try {
            const userId = localStorage.getItem("token id");
            const response = await fetch('/api/getName', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${userId}`,
                },
            });
            const data = await response.json();
            setProfileName(data.fullName);
        } catch (err) {
            console.error(err);
        }
    }

    function handleUploadProfilePic() {
        // Implement upload functionality here
        console.log("Upload new profile picture");
    }

    return (
        <div className="profile-info">
            <div className="profile-pic-container">
                <ProfilePic className="Profile-Pic" />
                
            </div>
            <div>
                <p className="profile-name">{profileName}</p>
            </div>
            
            <button className = "upload-button" onClick={handleUploadProfilePic}>Actualiza tu foto de perfil</button>
            <button className = "upload-button" onClick={handleUploadProfilePic}>Elige nuevos tags</button>
            <button className = "upload-button" onClick={window.location.href = "/feed.html"}>Añade un nuevo libro</button>
        </div>
    );
}

export default ProfileInfo;
