
import ReportEntry from "./ReportEntry";
import {useState, useEffect} from 'react';


function DisplayReports(){

    const [reports, setReports] = useState([]);

    useEffect(()=>{
        fetchReports();

    }, []);

    async function fetchReports(){

        try {

            const reportsResponse = await fetch('/api/renderReports',{
                method: 'GET',

            })
            
            if(reportsResponse.ok){

                const reportsData =   await reportsResponse.json();
                console.log('HOla crayola ');
                console.log(reportsData.reportsInfo);

                setReports(reportsData.reportsInfo);
            }else{
                alert("No se pudieron cargar los reportes!");
            }
            
        } catch (error) {
            alert("No sepudieron cargar los reportes");
        }
    }
    console.log("Estos son los reportes ");
    console.log(reports);

    function reportInfo( motivo, evidencia, id_reporte, nombres, idUsuario){

        console.log("See report info "+ motivo+" "+evidencia+" "+id_reporte);
        localStorage.setItem("id reporte", id_reporte);
        localStorage.setItem('nombre reportado', nombres);
        localStorage.setItem("evidencia reporte", evidencia);
        localStorage.setItem("motivo reporte", motivo);
        localStorage.setItem("id reportado", idUsuario);
        window.location.href = "/reportInfo.html"

    }

    return(

        <div className='listContainer'>
            {reports.map(reportItem =>(
                <ReportEntry
                key = {reportItem.id_reporte}
                profilePic = {reportItem.profile_pic}
                motivo ={reportItem.motivo}
                id = {reportItem.id_reporte}
                evidencia = {reportItem.evidencia}
                idUsuario = {reportItem.id_usuario}
                nombres = {reportItem.nombres}
                apellidos = {reportItem.apellidos}
                codigo = {reportItem.codigo}
                correo = {reportItem.correo}
                onClick = {reportInfo}
                />
            ))}
            
        </div>
    )
}


export default DisplayReports;