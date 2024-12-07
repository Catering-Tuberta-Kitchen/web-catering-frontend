import React from "react";
import InstagramIcon from "../assets/instagramIcon.jpg";
import WhatsappIcon from "../assets/WhatsappIcon.png";
import TubertaIcon from "../assets/NavIcon.png";

const Footer = () => {
    return (
        <footer class="bg-PrimFont">
        <div class="container mx-auto flex items-center justify-between">

            <div class="flex space-x-4 ml-5">
            <a href="#" aria-label="WhatsApp">
                <img src={WhatsappIcon} alt="WhatsApp" class=" w-8 h-8" />
            </a>
            <a href="#" aria-label="Instagram">
                <img src={InstagramIcon} alt="Instagram" class="rounded-full w-8 h-8" />
            </a>
            </div>

            <div className="mx-auto">
            <img src={TubertaIcon} alt="Tuberta Kitchen" class="h-16 " />
            </div>
        </div>
        </footer>
    )
};

export default Footer;