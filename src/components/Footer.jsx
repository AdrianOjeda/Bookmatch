import React from "react";

function Footer()
{

    const currentYear = new Date().getFullYear();
    return (
        <footer className="footerFeed">
            <p>BOOKMATCH ⓒ {currentYear}</p>
        </footer>
    )
    
}

export default Footer;