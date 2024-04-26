import React from "react";
import HeaderReal from "./HeaderReal";
import DisplayBooks from "./DisplayBooks";
import Footer from "./Footer";

function FeedReal()
{

    return <div>
        <div className="divHeader">
            <HeaderReal/>
        </div>
        <div>
            <DisplayBooks/>
        </div>
        <div>
            <Footer/>
        </div>

    </div>

}

export default FeedReal