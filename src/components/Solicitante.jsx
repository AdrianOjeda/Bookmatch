import React from "react";

function Solicitante(props)
{
    return (<div className="solicitud-buttons">
    <p className="solicitante">Solicitante: {props.solicitante}</p>
    <button className="button" onClick={()=> alert("Click")} >Aceptar</button>
    <button className="button" onClick={()=> alert("Click")}>Rechazar</button>
</div>)
}

export default Solicitante;