import React, { useState, useEffect } from "react";
import MessagesBar from "./MessagesBar";
import ChatUserInfo from "./ChatUserInfo";


function ChatWindow({ name, profilePic, title, socket }) {
    const [messages, setMessages] = useState([]);
    const otherUserId = localStorage.getItem("otherUserId");
    const idChat = localStorage.getItem("selectedChatId");
    const userId = localStorage.getItem("user loged id");

    useEffect(() => {
        socket.emit('getMessages', { otherUserId, idChat, userId });

        socket.on('messages', (messages) => {
            console.log('Received messages:', messages);
            setMessages(messages); // Update state with received messages
        });

        socket.on('newMessage', (newMessage) => {
            console.log('Received new message:', newMessage);
            setMessages((prevMessages) => [...prevMessages, newMessage]); // Append new message to state
        });

        socket.on('error', (error) => {
            console.error('Socket error:', error);
        });

        return () => {
            socket.off('messages'); // Clean up listeners on unmount
            socket.off('newMessage');
            socket.off('error');
        };
    }, [userId, otherUserId, idChat, socket]);

    console.log(messages);

    return (
        <div className="Window-chat">
            <ChatUserInfo name={name} profilePic={profilePic} title={title} />
            <div className="chat-Window-Messages">
                {messages.map((message, index) => (
                    <div key={index} className={`message ${message.sender_id == userId ? 'sent' : 'received'}`}>
                        <p>{message.message_text} </p>
                        <small>{`Mensaje ${message.sender_id == userId ? 'enviado' : 'recibido'}`} {new Date(message.sent_at).toLocaleString()}</small>
                    </div>
                ))}
            </div>
            <MessagesBar socket={socket} />
        </div>
    );
}

export default ChatWindow;
