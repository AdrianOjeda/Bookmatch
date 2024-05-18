import React, { useState } from "react";
import SendIcon from '@mui/icons-material/Send';

function MessagesBar({ socket }) {
    const [message, setMessage] = useState('');

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
        const newMessage = event.target.value;
        console.log("Message changed:", newMessage);
    };

    const handleSendMessage = () => {
        if (message.trim() !== '') {
            // Emit the sendMessage event to the WebSocket server
            socket.emit('sendMessage', {
                userId: localStorage.getItem("user loged id"),
                otherUserId: localStorage.getItem("otherUserId"),
                idChat: localStorage.getItem("selectedChatId"),
                text: message,
                timestamp: new Date()
            });
            // Clear the input field after sending the message
            setMessage('');
        } else {
            alert("Message cannot be empty");
        }
    };

    return (
        <div className="text-messages">
            <input
                type="text"
                placeholder="Enviar mensaje"
                name="messages-bar"
                className="messages-bar"
                value={message}
                onChange={handleMessageChange}
            />
            <SendIcon
                className="button"
                onClick={handleSendMessage}
            />
        </div>
    );
}

export default MessagesBar;
