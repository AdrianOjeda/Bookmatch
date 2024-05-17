import React from "react";
import BookRequest from "./BookRequest";

import swal from 'sweetalert';

function ElementHistory(props){

    function finalizarPrestamo(){
        console.log("click");

        const ownerId = props.ownerId;
        const bookId = props.idLibro;

        const idToSend={
            bookId: bookId,
            ownerId: ownerId
        }

        console.log(idToSend);
        swal({icon:"success", 
            title:"Prestamo finalizado",
            className: "historyAlert", 
            text: `El prestamo con ${props.ownerName} finalizó correctamente` }).then(async ()=>{
                const userId = localStorage.getItem("token id");
                console.log(userId);
                const endLoan = await fetch('/api/endLoan',{
                    method:"POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization':`Bearer ${userId}`
                    },
                    body: JSON.stringify(idToSend),

                })
                if(endLoan.ok){
                    window.location.reload();
                }
                
            })


        
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
