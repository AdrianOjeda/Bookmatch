import React from "react";
import BookRequest from "./BookRequest";

import swal from "sweetalert";
function WaitingComponent(props){

    async function cancelarEspera(){
        console.log("clikiao");
        const ownerId = props.ownerId;
        const userId = localStorage.getItem('token id');
        const bookId = props.bookId;

        const cancelRequestBody ={
            ownerId: ownerId,
            bookId: bookId,
        }

        console.log(cancelRequestBody);
        const cancelLoanRequest = await fetch('/api/cancelLoanRequest',{
            method:'POST',
            headers:{
                'Content-type':'application/json',
                'Authorization':`Bearer ${userId}`
            },
            body: JSON.stringify(cancelRequestBody),
        })

        if(cancelLoanRequest.ok){
            const message = await cancelLoanRequest.json();
            //alert(message.message);
            swal({
                icon:'success',
                title:`${message.message}`
            }).then(()=>{
                window.location.reload();

            })
            
        }
    }
    

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
                    <button className="button" onClick={cancelarEspera} style={{color: "red"}} >Cancelar espera</button>
                </div> 
            </div>
            <div className="info-owner">
                    <p><span style={{fontWeight: "bold", textDecoration: "" }}>Propietario:</span> {props.owner}</p>
                    <p><span style={{fontWeight: "bold", textDecoration: "" }}>Fecha de solicitud:</span> {props.date}</p>
                    <p><span style={{fontWeight: "bold", textDecoration: "" }}>Estado:</span> {props.status}</p>
            </div>
        </div>

    );
}

export default WaitingComponent;
