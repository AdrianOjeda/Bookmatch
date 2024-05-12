


function ReportContainer(){

    const idReport =  localStorage.getItem('id reporte');
    const motivoReporte =  localStorage.getItem('motivo reporte');
    const evidenciaReporte =  localStorage.getItem("evidencia reporte")

    

    console.log(idReport + motivoReporte + evidenciaReporte);

    return(
        <div>

            <h1>Reporte de </h1>


            <div className="evidence-image">
                <img src={`/uploads/${evidenciaReporte}`} alt="evidencia" />
                <p>{motivoReporte}</p>

            </div>

            <div>
                <button>Añadir Strike</button>
                <button>Omitir Reporte</button>
                
            </div>
        </div>
    )
}


export default ReportContainer;
