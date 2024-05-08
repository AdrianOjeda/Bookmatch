import React from "react";
import HeaderReal from "../components/HeaderReal";
import DisplayBooks from "../components/DisplayBooks";
import Footer from "../components/Footer";
import BooksFeed from "../components/BooksFeed";

function FeedReal()
{

    return <div>
        <div className="divHeader">
            <HeaderReal/>
        </div>
        <div>
            <BooksFeed/>
        </div>
        

    </div>

}

export default FeedReal