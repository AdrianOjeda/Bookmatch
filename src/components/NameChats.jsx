import React from "react";

function NameChats({ name, profilePic, title, onClick }) {
    return (
        <div className="profile-container" onClick={onClick}>
            <img className="pefil-picture" src={`/uploads/${profilePic}`} alt="Esta es la imagen de perfil del usuario" />
            <p>{name} | {title}</p>
        </div>
    );
}

export default NameChats;
