import React from "react";
import BookRequest from "./BookRequest";
import Solicitante from "./Solicitante";
function Request(props)
{

    console.log("Id libro "+props.idLibro);
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
        requesterId = {props.requesterId}
        bookId = {props.idLibro}
        loanId={props.loanId}
        />
    </div>
}

export default Request;