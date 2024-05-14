import { useEffect, useState } from "react";
import ProfilePic from "./ProfilePic";
import TagProfileInfo from "./TagProfileInfo";

function ProfileInfo() {
    const [profileName, setProfileName] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileName, setFileName] = useState('');

    const [tags, setTags] = useState([]);


    useEffect(()=>{
        getTags();

    }, []);

    useEffect(() => {
        getProfileName();
    }, []);

    async function getTags() {
        try {
            const userId = localStorage.getItem("token id");
            const tagsFetched = await fetch('/api/getTags', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${userId}`,
                },
            });
            if (!tagsFetched.ok) {
                throw new Error('Failed to fetch tags');
            }
            
            const tagsResponse = await tagsFetched.json();
            console.log(tagsResponse);
            const newTags = tagsResponse.sentTags;
            console.log("los tags: ");
            console.log(newTags.tagname);
    
            // Set the state to the new tags received
            setTags(newTags);
    
            console.log(tags);
    
        } catch (error) {
            console.error("No se pudieron obtener los tags", error);
        }
    }
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

    const handleUploadProfilePic = (event) => {
        const imageFile = event.target.files[0];
        setSelectedFile(imageFile);
        setFileName(imageFile.name);
    };

    const handleUploadSubmit = async () => {
        // Perform upload operation here
        console.log("Uploading file:", selectedFile);
        // You can send the selectedFile to the backend here
        try{
            const imageToSend = new FormData();
            imageToSend.append('image', selectedFile);
            const userId = localStorage.getItem("token id");
            const updateProfilePic =  await fetch('/api/profile/updatePic', {
            method: 'POST',
            body: imageToSend,
            headers: {
                'Authorization': `Bearer ${userId}` 
            },
            
        })
        if(updateProfilePic.ok){
            console.log("La foto se actualizo con exito");
            window.location.href = "/profile";
        }
        console.log("image: ");
        console.log(imageToSend);

        }catch(error){

            console.error("No se pudo actualizar la foto de perfil!")
        }
    };

    return (
        <div className="profile-info">
            <div className="profile-pic-container">
                <ProfilePic className="Profile-Pic" />
            </div>
            <div>
                <p className="profile-name">{profileName}</p>
            </div>
            

            <label htmlFor="fileInput" style={{ position: 'relative' }}>
                <input
                    type="file"
                    id="fileInput"
                    style={{ position: 'absolute', opacity: 0, width: '100%', height: '100%', top: 0, left: 0, cursor: 'pointer' }}
                    onChange={handleUploadProfilePic}
                    accept="image/*"
                />
                <button className="upload-button">Actualiza tu foto de perfil</button>
            </label>

            {selectedFile && (
                <div>
                    <p className = "fileName">{fileName}</p>
                    <button className="submit-button" onClick={handleUploadSubmit}>Subir</button>
                </div>
            )}

            <button className="upload-button" onClick={() => { window.location.href = "/feed.html" }}>Añade un nuevo libro</button>
            <button className="upload-button" onClick={() => { window.location.href = "/customizeTags.html" }}>Agrega nuevos tags</button>
            <div className='tag-container'>
                
            {tags.map((tag, index) => (
            <TagProfileInfo
                className = 'tag-entry'
                key={index} // Remember to add a unique key when using map
                tagname={tag.tagname}
            />
            ))}
            </div>
        </div>
    );
}

export default ProfileInfo;
