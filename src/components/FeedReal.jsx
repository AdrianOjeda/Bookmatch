import React from "react";
import HeaderReal from "./HeaderReal";
import DisplayBooks from "./DisplayBooks";

function FeedReal()
{

    return <div>
        <div className="divHeader">
            <HeaderReal/>
        
        </div>
        <div>
            <DisplayBooks/>
        </div>

    </div>

}

export default FeedReal