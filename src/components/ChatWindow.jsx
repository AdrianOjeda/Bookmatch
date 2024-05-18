import React from "react";
import MessagesBar from "./MessagesBar";
import ChatUserInfo from "./ChatUserInfo";

function ChatWindow({ name, profilePic, title }) {
    return (
        <div className="Window-chat">
            <ChatUserInfo name={name} profilePic={profilePic} title={title} />
            <div className="chat-Window-Messages">
                <MessagesBar />
            </div>
        </div>
    );
}

export default ChatWindow;
