import React from "react";
import BookRequest from "./BookRequest";
import Solicitante from "./Solicitante";
function Request(props)
{
    return <div className="solicitud">
        <div>
           <img src={`/uploads/${props.image}`} alt="cover image" />
           <BookRequest
           titulo={props.titulo}
           autor= {props.autor}
           isbn ={props.isbn}
           descripcion ={props.descripcion}
           />
        </div>
        <Solicitante
        solicitante = {props.requesterName}
        />
    </div>
}

export default Request;