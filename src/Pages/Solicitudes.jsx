import React, { useState, useEffect } from "react";
import Request from "../components/Request.jsx";
import Footer from "../components/Footer.jsx"
function Solicitudes() {


    const [requests, setRequests] = useState([]);
    useEffect(()=>{
        fetchRequests();
    },[])
    async function fetchRequests(){

        const idUser = localStorage.getItem("token id");
        console.log(idUser);

        const requestsResponse = await fetch('/api/getRequests',{
            method:"GET",
            headers:{
                'Authorization':`Bearer ${idUser}`
            }
        })

        if (requestsResponse.ok) {
            const fetchedRequests = await requestsResponse.json();
           
            setRequests(fetchedRequests);

            
        }
    }

    console.log(requests);
    return (
        <div>
            <div className="header">
                <div className="header-container">
                    <div className="title-container">
                        <h1>Solicitudes</h1>
                    </div>
                    <div className="pageLink">
                        <p  onClick={()=>{window.location.href= "/history"}} >Historial</p>
                    </div>
                    
                    <div className="pageLink">
                        
                        <p onClick={()=>{window.history.back()}} >Regresar</p>
                    </div>
                </div>
            </div>
            {requests.length === 0 ? (
                <div className="empty-list-container">
                    <img src="src\assets\logo.png" alt="Imagen default de logo" />
                    <h1 className="empty-list-title">No tienes solicitudes pendientes</h1>
                </div>
            ) : (
                requests.map((element) => (
                    <Request
                        key={element.loan_id}
                        loanId={element.loan_id}
                        date={element.loan_date}
                        status={element.status}
                        requesterId={element.user_id}
                        image={element.coverimage}
                        titulo={element.titulo}
                        autor={element.autor}
                        isbn={element.isbn}
                        idLibro={element.id_libro}
                        descripcion={element.descripcion}
                        requesterName={element.requester_name}
                    />
                ))
            )}
                
                <Footer/>
        </div>
    );
}

export default Solicitudes;
