import React, { useState } from "react";
import SendIcon from '@mui/icons-material/Send';

function MessagesBar(props){
    const [message, setMessage] = useState('');

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
        const newMessage = event.target.value;
        console.log("Message changed:", newMessage);
    };

    const handleSendMessage = (event) => {
        // Handle sending message logic here
        alert("Message sent: " + message);
        // Clear the input field after sending the message
        setMessage('');
    };

    return(
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
