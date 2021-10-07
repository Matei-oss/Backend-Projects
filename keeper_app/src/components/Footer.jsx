import React from "react";


function Footer(){

    const currentYear = new Date().getFullYear();

    return <p>
        Copyright Ⓒ {currentYear}
    </p>
}

export default Footer;