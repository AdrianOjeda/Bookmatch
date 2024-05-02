import React from "react";
import BookRequest from "./BookRequest";
import Solicitante from "./Solicitante";
function Request()
{
    return <div className="solicitud">
        <div>
           <img src="https://imgs.search.brave.com/TzVCBfK2N0j4-efsYfjwa23o5lh6bGEin8qsyae80mo/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9jZG4u/Y3VsdHVyYWdlbmlh/bC5jb20vZXMvaW1h/Z2VuZXMvbGlicm8t/ZG9uLXF1aWpvdGUt/ZGUtbGEtbWFuY2hh/LTEtY2tlLmpwZw" alt="" />
            <BookRequest/>
        </div>
        <Solicitante
        solicitante = "Christian Jhovany Flores Lozano xd"
        />
    </div>
}

export default Request;