import React from "react";
import MessagesBar from "./MessagesBar";
import ChatUserInfo from "./ChatUserInfo";

function ChatWindow({ name, profilePic, title }) {

    const otherUserId = localStorage.getItem("otherUserId")
    const idChat = localStorage.getItem("selectedChatId")
    const userId = localStorage.getItem("token id");
    
    return (
        <div className="Window-chat">
            <ChatUserInfo name={name} profilePic={profilePic} title={title} />
            <div className="chat-Window-Messages">
                {/* Chat messages will be rendered here */}
            </div>
            <MessagesBar />
        </div>
    );
}

export default ChatWindow;
