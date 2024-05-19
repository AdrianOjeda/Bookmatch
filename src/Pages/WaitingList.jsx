import React, { useState, useEffect } from "react";
import Footer from "../components/Footer.jsx";
import WaitingComponent from "../components/WaitingComponent.jsx";

function List() {
    const [waitingListElements, setWaitingListElements] = useState([]);
    
    useEffect(() => {
        fetchWaitingListElements();
    }, []);

    async function fetchWaitingListElements() {
        const idUser = localStorage.getItem('token id');
        console.log(idUser);
        const waitingElementsRequest = await fetch('/api/WaitingList', {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${idUser}`
            }
        });

        if (waitingElementsRequest.ok) {
            const waitingListElementsResponse = await waitingElementsRequest.json();
            setWaitingListElements(waitingListElementsResponse);
        }
    }

    console.log(waitingListElements);
    
    return (
        <div>
            <div className="header">
                <div className="header-container">
                    <div className="title-container">
                        <h1>Lista de Espera</h1>
                    </div>
                    <div className="pageLink">
                        <p onClick={() => { window.history.back() }}>Regresar</p>
                    </div>
                </div>
            </div>
            
            {waitingListElements.length === 0 ? (
                <div className="empty-list-container">
                    <img src="src\assets\logo.png" alt="Imagen default de logo" />
                    <h1 className="empty-list-title">No estás en ninguna lista de espera</h1>
                </div>
                
            ) : (
                waitingListElements.map((element) => (
                    <WaitingComponent 
                        key={element.waiting_id}
                        bookId={element.id_libro}
                        turn={element.turno}
                        owner={element.owner_name}
                        img={element.coverimage}
                        titulo={element.titulo}
                        autor={element.autor}
                        isbn={element.isbn}
                        descripcion={element.descripcion}
                        ownerId={element.owner_id}
                        date={element.request_date}
                        status={element.status}
                    />
                ))
            )}
            <Footer />
        </div>
    );
}

export default List;
