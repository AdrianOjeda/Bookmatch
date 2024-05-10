import React from 'react';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';

function ReportEntry(){


    return(
        <div className="usersContainer">
            
            <img alt="Profile Pic" className="profilePic" />
            <div className="userDetail">
                <p style = {{marginBottom: "6px", marginTop: "6px"}}>Nombres: </p>
                <p style = {{marginBottom: "6px", marginTop: "6px"}}>Código: </p>
                <p style = {{marginBottom: "6px", marginTop: "6px"}}>Correo: </p>
                
                <p style = {{marginBottom: "6px", marginTop: "6px", textDecoration: 'underline'}}>Ver informacion del reporte </p>
                
                
            </div>
        </div>
    )



}


export default ReportEntry