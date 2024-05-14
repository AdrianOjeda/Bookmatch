import React from "react";
import BookRequest from "./BookRequest";
function WaitingComponent(props)
{
    return (
        <div className="elemento">
            <div className="info-container">
                <img src="https://imgs.search.brave.com/TzVCBfK2N0j4-efsYfjwa23o5lh6bGEin8qsyae80mo/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9jZG4u/Y3VsdHVyYWdlbmlh/bC5jb20vZXMvaW1h/Z2VuZXMvbGlicm8t/ZG9uLXF1aWpvdGUt/ZGUtbGEtbWFuY2hh/LTEtY2tlLmpwZw" alt="" />
                <BookRequest />
                <div className="info">
                    <p><span style={{fontWeight: "bold", textDecoration: "" }}>Turno:</span> {props.turn}</p>
                    <button class="button" onClick={()=> alert("Click")} style={{color: "red"}} >Cancelar espera</button>
                </div> 
            </div>
            <div className="info-owner">
                    <p><span style={{fontWeight: "bold", textDecoration: "" }}>Propietario:</span> {props.owner}</p>
            </div>
        </div>

    );
}

export default WaitingComponent;
