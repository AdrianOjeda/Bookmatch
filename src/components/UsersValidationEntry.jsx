import React from 'react';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';

function UsersValidationEntry(props) {

    function handleDeleteUser(){
        props.onDelete(props.id);
    }
    function handleValidateUser(){
        props.onClick(props.id);


    }
    return (
        <div className="usersContainer">
            
            <img src={`/uploads/${props.credencial}`} alt="Profile Pic" className="profilePic" />
            <div className="userDetail">
                <p style = {{marginBottom: "6px", marginTop: "6px"}}>Nombres: {props.nombres} {props.apellidos}</p>
                <p style = {{marginBottom: "6px", marginTop: "6px"}}>Código: {props.codigo}</p>
                <p style = {{marginBottom: "6px", marginTop: "6px"}}>Correo: {props.correo}</p>
                <div className="validateUserContainer">
                    <p>Validar usuario</p>
                    <CheckBoxIcon className='checkIcon' onClick={handleValidateUser}/>
                    
                </div>
                <div className="validateUserContainer">
                    <p>Rechazar usuario</p>
                    <ThumbDownAltIcon className='checkIcon' onClick={handleDeleteUser}/>
                    
                </div>
            </div>
        </div>
    );
}

export default UsersValidationEntry;