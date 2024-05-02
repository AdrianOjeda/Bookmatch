import React from "react";
import HeaderReal from "../components/HeaderReal";
import DisplayBooks from "../components/DisplayBooks";
import Footer from "../components/Footer";

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