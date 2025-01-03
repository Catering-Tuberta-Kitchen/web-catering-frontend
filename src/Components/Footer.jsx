import React from "react";
import InstagramIcon from "../assets/instagramIcon.jpg";
import WhatsappIcon from "../assets/WhatsappIcon.png";
import boxicons from "boxicons";
import TubertaIcon from "../assets/NavIcon.png";

const Footer = () => {
    return (
        <footer class="bg-PrimFont">
        <div class="container mx-auto flex items-center justify-between">

            <div class="flex space-x-4 ml-5">
            <a href="https://wa.me/send/?phone=6281392975528&text=Halo%20saya%20ingin%20memesan%20Catering%20Tuberta%20Kitchen" aria-label="WhatsApp" class="rounded-full px-1 border-4 border-black hover:border-MAIN transition">
                <box-icon name='whatsapp' type='logo' color='#000000' size='40px'></box-icon>
            </a>
            <a href="https://www.instagram.com/tuberta_kitchen/?igsh=MWpiZnNxNWV4dmJscw%3D%3D#" aria-label="Instagram" class="rounded-full px-1 border-4 border-black hover:border-MAIN transition">
                <box-icon name='instagram' type='logo' color='#000000' size='40px' ></box-icon>
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