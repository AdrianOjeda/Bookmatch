import React from "react";

function Solicitante(props)
{
    return (<div class="solicitud-buttons">
    <p className="solicitante">Solicitante: {props.solicitante}</p>
    <button class="button" onClick={()=> alert("Click")} >Aceptar</button>
    <button class="button" onClick={()=> alert("Click")}>Rechazar</button>
</div>)
}

export default Solicitante;