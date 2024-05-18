import React from "react";

function ChatUserInfo({ name, profilePic, title }) {
    return (
        <div className="chat-user-info-header">
            <img className="chat-user-info-image" src={`/uploads/${profilePic}`} alt="Profile" />
            <div className="chat-user-info-text">
                <p className="chat-user-info-name">{name}</p>
                <p className="chat-user-info-title">{title}</p>
            </div>
        </div>
    );
}

export default ChatUserInfo;
