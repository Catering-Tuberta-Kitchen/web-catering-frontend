import React from "react";
import TubertaIcon from "../assets/NavIcon.png";
import boxicons from "boxicons";

const Footer = () => {
    return (
        <footer class="bg-PrimFont">
        <div class="container mx-auto flex items-center justify-center">
            <div className="mx-auto">
            <img src={TubertaIcon} alt="Tuberta Kitchen" class="h-16 " />
            </div>
        </div>
        </footer>
    )
};

export default Footer;