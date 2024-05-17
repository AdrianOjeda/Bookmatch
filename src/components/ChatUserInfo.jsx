import React from "react";

function ChatUserInfo(props){
    return(
        <div className="user-profile-container">
            <img className="pefil-picture" src="src\assets\logo.png" alt="Esta es la imagen de perfil del usuario" />
            <p>{props.name}</p>
        </div>
    );
}
export default ChatUserInfo;