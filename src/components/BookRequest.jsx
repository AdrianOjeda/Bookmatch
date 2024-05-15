import React from "react";

function BookRequest(props)
{
    return (<div className="solicitud-info">
        <h2>{props.titulo}</h2>
        <p>Autor: {props.autor} </p>
        <p>ISBN: {props.isbn} </p>
        <p>Descripcion: {props.descripcion}
        </p>
    </div>)

}

export default BookRequest;