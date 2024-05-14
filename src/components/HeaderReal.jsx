import React from "react";
import SearchBar from "./SearchBar";
import ProfilePic from "./ProfilePic";
import '../styles/feed.css'

function HeaderReal() {
    return (
        <div className="header-container">
            <div className="logo-container">
                <img onClick = {()=>{window.location.href = "/feedreal"}} className="imagenLogo" src="./src/assets/logo.png" alt="LogoBookMatch" />
            </div>
            <div className="searchbar-container">
                <SearchBar/>
            </div>
            <div>
                <p className="pageLink" onClick={()=>{window.location.href= "/feedreal"}} >Inicio</p>
            </div>
            <div>
                <p className="pageLink" onClick={()=>{window.location.href= "/messages"}} >Mensajes</p>
            </div>
            <div>
                <p className="pageLink" onClick={()=>{window.location.href= "/waitingList"}} >Lista de espera</p>
            </div>
            
            <div>
                <p className="pageLink" onClick={()=>{window.location.href= "/requests"}} >Solicitudes</p>
            </div>
            <div>
                <p className="pageLink" onClick={()=>{window.location.href= "/login"}} >Cerrar sesion</p>
            </div>
            <div>
                <p className="pageLink" onClick={()=>{window.location.href= "/profile"}} >Mi perfil</p>
            </div>
            
            <div className="profilepic-container">
                <ProfilePic
                className = 'ProfilePic'
                />
            </div>
        </div>
    );
}

export default HeaderReal;
