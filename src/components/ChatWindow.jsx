import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import MessagesBar from "./MessagesBar";
import ChatUserInfo from "./ChatUserInfo";



function ChatWindow({ name, profilePic, title }) {
    const [messages, setMessages] = useState([]);
    const otherUserId = localStorage.getItem("otherUserId");
    const idChat = localStorage.getItem("selectedChatId");
    const userId = localStorage.getItem("user loged id");
    console.log(otherUserId + " " + idChat + " " + userId);

    

   

    useEffect(() => {
        const socket = io('http://localhost:3001');

        socket.emit('getMessages', { otherUserId, idChat, userId });
        console.log("hola server side");

        socket.on('messages', (messages) => {
            console.log('Received messages:', messages);
            setMessages(messages); // Update state with received messages
        });

        socket.on('error', (error) => {
            console.error('Socket error:', error);
        });

        return () => {
            socket.disconnect();
        };
    }, [userId, otherUserId, idChat]);
    console.log(messages);
    return (
        <div className="Window-chat">
            <ChatUserInfo name={name} profilePic={profilePic} title={title} />
            <div className="chat-Window-Messages">
                {messages.map((message, index) => (
                    <div key={index} className={`message ${message.sender_id === userId ? 'Enviado' : 'Recibido'}`}>
                        <p>{message.message_text} {`Mensaje ${message.sender_id == userId ? 'enviado' : 'recibido'}`}</p>
                        <small>{new Date(message.sent_at).toLocaleString()}</small>
                    </div>
                ))}
            </div>
            <MessagesBar />
        </div>
    );
}

export default ChatWindow;
