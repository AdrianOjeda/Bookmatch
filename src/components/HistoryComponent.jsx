import React from "react";
import BookRequest from "./BookRequest";
function ElementHistory(props){

    async function finalizarPrestamo(){
        console.log("click");
    }

    function goToProfile(){

        console.log("perfil clikiado "+props.ownerId);
        localStorage.setItem("id propietario", props.ownerId);
        window.location.href='userProfile.html'
    }
    return (
        <div className="elemento">
            <div className="info-container">
                <img src={`/uploads/${props.image}`} alt="" />
                <BookRequest 
                titulo = {props.titulo}
                autor={props.autor}
                isbn={props.isbn}
                descripcion={props.descripcion}
                />
                <p className="status"> <span style={{fontWeight: "bold", textDecoration: "" }}>Estado:</span> <span style={{ color: props.status === "Rechazado" ? "red" : props.status === "Confirmado" ? "green" : "inherit" }}>{props.status}</span></p>
                <button className="button" onClick={finalizarPrestamo} style={{color: "red"}} >Finalizar prestamo</button>
            </div>
            <div className="info">
            
                <p><span style={{fontWeight: "bold", textDecoration: "" }} >Fecha de movimiento:</span> {props.date}</p>
                <p style={{cursor:"pointer"}} onClick={goToProfile}><span style={{fontWeight: "bold", textDecoration: ""}}>Propietario:</span > {props.ownerName}</p>
            </div>
        </div>

    );
}

export default ElementHistory;
