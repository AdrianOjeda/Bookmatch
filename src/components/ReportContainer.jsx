import React from 'react';

function ReportContainer() {
    const idReport = localStorage.getItem('id reporte');
    const motivoReporte = localStorage.getItem('motivo reporte');
    const evidenciaReporte = localStorage.getItem("evidencia reporte");
    const nombreReportado = localStorage.getItem('nombre reportado');

    console.log(idReport + motivoReporte + evidenciaReporte + nombreReportado);

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
                        <button>Añadir Strike</button>
                        <button>Omitir Reporte</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReportContainer;
