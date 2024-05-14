import React from "react";
import Request from "../components/Request.jsx";
import Footer from "../components/Footer.jsx"
function Solicitudes() {
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
            {/* Despues de este header sigue los componentes */}
                <Request/>
                <Request/>
                <Request/>
                <Footer/>
        </div>
    );
}

export default Solicitudes;
