import React from 'react';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';

function ReportEntry(props){

    function handleReport(){

        props.onClick(props.motivo, props.evidencia, props.id, props.nombres, props.idUsuario)

        
    }

    return(
        <div className="usersContainer">
            
            <img alt="Profile Pic" src={`/uploads/${props.profilePic}`} className="profilePic" />
            <div className="userDetail">
                <p style = {{marginBottom: "6px", marginTop: "6px"}}>Nombres: {props.nombres} {props.apellidos} </p>
                <p style = {{marginBottom: "6px", marginTop: "6px"}}>Código: {props.codigo}</p>
                <p style = {{marginBottom: "6px", marginTop: "6px"}}>Correo: {props.correo}</p>
                
                <p style = {{marginBottom: "6px", marginTop: "6px", textDecoration: 'underline', cursor:'pointer'}} onClick={handleReport}>Ver informacion del reporte </p>
                
                
            </div>
        </div>
    )



}


export default ReportEntry