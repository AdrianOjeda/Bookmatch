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
                <p className="pageLink" onClick={()=>{window.location.href= "/feedreal"}} >Inicio</p>
            </div>
            <div>
                <p className="pageLink" onClick={()=>{window.location.href= "/profile"}} >Mi perfil</p>
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
            <div className="profilepic-container">
                <ProfilePic/>
            </div>
        </div>
    );
}

export default HeaderReal;
