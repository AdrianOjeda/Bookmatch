import React from "react";
import SendIcon from '@mui/icons-material/Send';
function MessagesBar(props){
    return(
        <div className="text-messages">
            <input type="text" placeholder="Enviar mensaje" name="messages-bar" className="messages-bar"/>
            <SendIcon
            className="button"
            onClick={()=> alert("Click")}
            />
            
        </div>
    );
}
export default MessagesBar;