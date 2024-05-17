import React from "react";
import BookRequest from "./BookRequest";
import MessagesBar from "./MessagesBar";
import ChatUserInfo from "./ChatUserInfo";
function ChatWindow(props){
    return(
        <div className="Window-chat">
            <ChatUserInfo name ="Cesar"/>
            <div className="chat-Window-Messages">
                <MessagesBar/>
            </div>
        </div>
        
        
    );
}
export default ChatWindow;