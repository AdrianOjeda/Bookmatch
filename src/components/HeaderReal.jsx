import React from "react";
import SearchBar from "./searchBar";
import ProfilePic from "./ProfilePic";

function HeaderReal() {
    return (
        <div className="header-container">
            <div className="logo-container">
                <img className="imagenLogo" src="./src/assets/logo.png" alt="LogoBookMatch" />
            </div>
            <div className="searchbar-container">
                <SearchBar/>
            </div>
            <div>
                <p className="pageLink" onClick={()=>{window.location.href= "/feed"}} >Inicio</p>
            </div>
            <div>
                <p className="pageLink" onClick={()=>{window.location.href= "/feed"}} >Mi perfil</p>
            </div>
            <div>
                <p className="pageLink" onClick={()=>{window.location.href= "/feed"}} >Mensajes</p>
            </div>
            <div>
                <p className="pageLink" onClick={()=>{window.location.href= "/feed"}} >Lista de espera</p>
            </div>
            <div>
                <p className="pageLink" onClick={()=>{window.location.href= "/feed"}} >Solicitudes</p>
            </div>
            <div>
                <p className="pageLink" onClick={()=>{window.location.href= "/feed"}} >Cerrar sesion</p>
            </div>
            <div className="profilepic-container">
                <ProfilePic/>
            </div>
        </div>
    );
}

export default HeaderReal;
