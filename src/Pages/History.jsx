import React, { useState, useEffect } from "react";
import Footer from "../components/Footer.jsx"
import ElementHistory from "../components/HistoryComponent.jsx";
import swal from 'sweetalert';
function History()
{


    const [historyElements, setHistoryElements]= useState([]);
    useEffect(()=>{

        fetchHistoryElements();
    },[]);

    async function fetchHistoryElements(){
        const userId= localStorage.getItem('token id')

        console.log("Token "+userId);

        const HistoryElementsResponse = await fetch('/api/history',{
            method:"GET",
            headers:{
                'Authorization':`Bearer ${userId}`

            }
        })

        if(HistoryElementsResponse.ok){
            const historyData = await HistoryElementsResponse.json();
            setHistoryElements(historyData);
            
        }else{
            //alert("No se pudo obtener el historial")
            swal({icon:"warning",title:"No se pudo obtener el historial"})
        }
    }

    console.log(historyElements);
    return (
        <div>
            <div className="header">
                <div className="header-container">
                    <div className="title-container">
                        <h1>Historial</h1>
                    </div>
                    <div className="pageLink">
                        <p onClick={()=>{window.history.back()}} >Regresar</p>
                    </div>
                </div>
            </div>
            
            {historyElements.length === 0 ? (
                <div className="empty-list-container">
                    <img src="src/assets/logo.png" alt="Imagen default de logo" />
                    <h1 className="empty-list-title">El historial se encuentra vacio actualmente</h1>
                </div>
            ) : (
                historyElements.map((element) => (
                    <ElementHistory
                        key={element.loan_id}
                        date={element.loan_date}
                        status={element.status}
                        userId={element.user_id}
                        idPropietario={element.id_propietario}
                        image={element.coverimage}
                        titulo={element.titulo}
                        autor={element.autor}
                        isbn={element.isbn}
                        idLibro={element.id_libro}
                        descripcion={element.descripcion}
                        ownerName={element.owner_name}
                        ownerId={element.owner_id}
                    />
                ))
            )}
                <Footer/>
        </div>
    );
}
export default History;