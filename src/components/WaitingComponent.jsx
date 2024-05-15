import React from "react";
import BookRequest from "./BookRequest";
function WaitingComponent(props){
    return (
        <div className="elemento">
            <div className="info-container">
                <img src={`/uploads/${props.img}`} alt="portada" />
                <BookRequest 
                autor = {props.autor}
                descripcion = {props.descripcion}
                isbn = {props.isbn}
                titulo ={props.titulo}
                />
                <div className="info">
                    <p><span style={{fontWeight: "bold", textDecoration: "" }}>Turno:</span> {props.turn}</p>
                    <button className="button" onClick={()=> alert("Click")} style={{color: "red"}} >Cancelar espera</button>
                </div> 
            </div>
            <div className="info-owner">
                    <p><span style={{fontWeight: "bold", textDecoration: "" }}>Propietario:</span> {props.owner}</p>
                    <p><span style={{fontWeight: "bold", textDecoration: "" }}>Fecha:</span> {props.date}</p>
            </div>
        </div>

    );
}

export default WaitingComponent;
