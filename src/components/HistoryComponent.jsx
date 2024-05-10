import React from "react";
import BookRequest from "./BookRequest";
function ElementHistorial(props)
{
    return (
        <div className="elemento">
            <div className="info-container">
                <img src="https://imgs.search.brave.com/TzVCBfK2N0j4-efsYfjwa23o5lh6bGEin8qsyae80mo/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9jZG4u/Y3VsdHVyYWdlbmlh/bC5jb20vZXMvaW1h/Z2VuZXMvbGlicm8t/ZG9uLXF1aWpvdGUt/ZGUtbGEtbWFuY2hh/LTEtY2tlLmpwZw" alt="" />
                <BookRequest />
                <p className="status">Estado: <span style={{ color: props.status === "Rechazado" ? "red" : props.status === "Confirmado" ? "green" : "inherit" }}>{props.status}</span></p>
            </div>
            <div className="info">
                <p>Fecha de movimiento: {props.date}</p>
                <p>Propietario: {props.owner}</p>
            </div>
        </div>

    );
}

export default ElementHistorial;
