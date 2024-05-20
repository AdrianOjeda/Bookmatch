
import React from 'react';
import swal from 'sweetalert';
function ReportContainer() {
    const idReport = localStorage.getItem('id reporte');
    const motivoReporte = localStorage.getItem('motivo reporte');
    const evidenciaReporte = localStorage.getItem("evidencia reporte");
    const nombreReportado = localStorage.getItem('nombre reportado');
    const idUserReportado =  localStorage.getItem("id reportado");

    console.log(idReport + motivoReporte + evidenciaReporte + nombreReportado + idUserReportado);

    const requestBody = {
        idReporte: idReport,
        idUserReportado: idUserReportado
    };

    console.log(requestBody);


    async function addStrike(){

        const addStrikeRequest = await fetch('/api/addStrike',{
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody),
        })

        if(addStrikeRequest.ok){
            //alert("Strike agregado");
            const message = await addStrikeRequest.json();
            swal({icon:"success",title:`${message.message}`}).then(() => {

                window.location.href = '/reportFeed.html'
            });
            
        }else{
            //alert("No se pudo agregar el strike")
            swal({icon:"error",title:"No se pudo agregar el strike"}).then(() => {
                window.location.href = '/reportFeed.html'
            });
        }

    }

    async function ignoreStrike(){
        const addStrikeRequest = await fetch('/api/ignoreStrikes',{
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody),
        })

        if(addStrikeRequest.ok){
            //alert("Se ha omitido el strike!");
            swal({icon:"success",title:"Se ha omitido el strike!"}).then(()=>{
                window.location.href = '/reportFeed.html'
            })
            
        }else{
            //alert("No se pudo omitir el strike")
            swal({icon:"error",title:"No se pudo omitir el strike!"}).then(()=>{
                window.location.href = '/reportFeed.html'
            })
        }

    }

    return (
        <div className="report-container container">
            <h1 className="title">Reporte sobre {nombreReportado}</h1>
            <div className="grid-container">
                <div className="grid-item text-container">
                    <h2 className="evidence-text text">Evidencia:</h2>
                </div>
                <div className="grid-item text-container">
                    <h2 className="text">Motivo:</h2>
                    <p className="text">{motivoReporte}</p>
                </div>
                <div className="grid-item image-container">
                    <div className="evidence-image">
                        <img className="image" src={`/uploads/${evidenciaReporte}`} alt="evidencia" />
                    </div>
                </div>
                <div className="grid-item button-container">
                    <div className="buttons">
                        <button onClick={addStrike}>Añadir Strike</button>
                        <button onClick = {ignoreStrike}>Omitir Reporte</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReportContainer;
