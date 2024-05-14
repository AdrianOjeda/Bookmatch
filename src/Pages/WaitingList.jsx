import React from "react";
import Footer from "../components/Footer.jsx"
import WaitingComponent from "../components/WaitingComponent.jsx";
function List()
{
    return (
        <div>
            <div className="header">
                <div className="header-container">
                    <div className="title-container">
                        <h1>Lista de Espera</h1>
                    </div>
                    <div className="pageLink">
                        <p onClick={()=>{window.history.back()}} >Regresar</p>
                    </div>
                </div>
            </div>
            {/* Despues de este header sigue los componentes */}
                <WaitingComponent turn="5" owner="Adrian"/>
                <WaitingComponent turn="2" owner="Jhovany"/>
                <WaitingComponent turn="10" owner="Jessenia"/>
                <Footer/>
        </div>
    );
}
export default List;