import React from "react";

function MessagesBar(props){
    return(
        <div className="text-messages">
            <input type="text" placeholder="Enviar mensaje" name="messages-bar" className="messages-bar"/>
            <button className="button" onClick={()=> alert("Click")} >Aceptar</button>
        </div>
    );
}
export default MessagesBar;