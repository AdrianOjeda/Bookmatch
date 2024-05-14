import React from "react";
import Footer from "../components/Footer.jsx"
import ElementHistory from "../components/HistoryComponent.jsx";
function History()
{
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
            {/* Despues de este header sigue los componentes */}
                <ElementHistory status="Por confirmar" owner ="Adrian" date="09/05/2024"/>
                <ElementHistory status="Rechazado" owner = "Jhovany" date="10-05-2024"/>
                <ElementHistory status="Confirmado" owner = "Leo" date="11 de Mayo del 2024"/>
                <Footer/>
        </div>
    );
}
export default History;