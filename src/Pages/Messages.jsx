import React, { useState, useEffect } from "react";
import NameChats from "../components/NameChats.jsx";
import ChatWindow from "../components/ChatWindow.jsx";
import ChatUserInfo from "../components/ChatUserInfo.jsx";
function Messages()
{
    return (
        <aside className="Chat-Page">
            <div className="header">
                <div className="header-container">
                    <div className="title-container">
                        <h1>Chat</h1>
                    </div>
                    <div className="pageLink">
                        <p onClick={()=>{window.history.back()}} >Regresar</p>
                    </div>
                </div>
            </div>
            <div className="chat-frame">
                <div className="chats-Container">
                    <NameChats name="Leo"/>
                    <NameChats name="Denilson"/>
                    <NameChats name="Adrian"/>
                    <NameChats name="Jhovany"/>
                </div>
                <div className="chat-Window">
                    <ChatWindow/>
                </div>
            </div>
                
        </aside>
    );
}
export default Messages;