import React, {useState} from "react";
import SearchBar from "./SearchBar";
import ProfilePic from "./ProfilePic";
import '../styles/feed.css'
import swal from "sweetalert";

function HeaderReal() {
    const [searchValue, setSearchValue] = useState("");

     const handleSearchKeyDown = async (event) => {
        if (searchValue !== "") {
            localStorage.setItem("valorDeBusqueda", searchValue);
            window.location.href = "/feedRealSearch"
        }else{
           swal({icon: "error", title:"Busqueda invalida"})
        }
        
    };

    const handleSearchChange = (value) => {
        setSearchValue(value);
        
    };

    return (
        <div className="header-container">
            <div className="logo-container">
                <img onClick = {()=>{window.location.href = "/feedreal"}} className="imagenLogo" src="./src/assets/logo.png" alt="LogoBookMatch" />
            </div>
            <div className="searchbar-container">
                <SearchBar onSearchKeyDown={handleSearchKeyDown}
                    onSearchChange={handleSearchChange}
                    />
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
