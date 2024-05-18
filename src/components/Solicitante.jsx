import React from "react";
import swal from "sweetalert";
function Solicitante(props)
{

    async function rejectRequest(){
        console.log("reject");
        console.log(props.requesterId +" "+props.bookId);
        const userId = localStorage.getItem("token id")
        const rejectInfo = {
            requesterId: props.requesterId,
            bookId: props.bookId
        }
        console.log(rejectInfo);
        const rejectRequestPetition = await fetch('/api/rejectRequest',{
            method:"POST",
            headers:{
                'Authorization':`Bearer ${userId}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(rejectInfo)

        })

        if (rejectRequestPetition.ok) {
            const message = await rejectRequestPetition.json();
            swal({icon:'success', title:`${message.message}`}).then(()=>{

                window.location.reload();
            })
        }

    }

    async function acceptRequest(){
        console.log("accept");

        console.log(props.requesterId +" "+props.bookId);
        const userId = localStorage.getItem("token id")
        const acceptInfo = {
            requesterId: props.requesterId,
            bookId: props.bookId,
            loanId: props.loanId
        }
        console.log(acceptInfo);

        const acceptRequestPetition = await fetch('/api/acceptRequest',{
            method:"POST",
            headers:{
                "Content-type":"application/Json",
                'Authorization':`Bearer ${userId}`
            },
            body: JSON.stringify(acceptInfo)
        })
        if(acceptRequestPetition.ok){
            const message =  await acceptRequestPetition.json();
            swal({
                icon:"success",
                title: `${message.message}`
            }).then(()=>{

                window.location.reload();
            })
        }
    }



    return (<div className="solicitud-buttons">
    <p className="solicitante">Solicitante: {props.solicitante}</p>
    <button className="button" onClick={acceptRequest} >Aceptar</button>
    <button className="button" onClick={rejectRequest}>Rechazar</button>
</div>)
}

export default Solicitante;