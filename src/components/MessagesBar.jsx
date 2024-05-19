import React, { useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import swal from 'sweetalert';
function MessagesBar({ socket }) {
    const [message, setMessage] = useState('');

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
        const newMessage = event.target.value;
        console.log("Message changed:", newMessage);
    };

    const handleSendMessage = () => {
        if (message.trim() !== '') {
            const localTimestamp = new Date().toLocaleString();
            
            socket.emit('sendMessage', {
                userId: localStorage.getItem("user loged id"),
                otherUserId: localStorage.getItem("otherUserId"),
                idChat: localStorage.getItem("selectedChatId"),
                text: message,
                timestamp: localTimestamp
            });
            
            setMessage('');
        } else {
            //alert("Message cannot be empty");
            swal({icon:"info",title:"Message cannot be empty"})
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
