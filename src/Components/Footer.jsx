import React from "react";
import InstagramIcon from "../assets/instagramIcon.jpg";
import WhatsappIcon from "../assets/WhatsappIcon.png";
import TubertaIcon from "../assets/NavIcon.png";

const Footer = () => {
    return (
        <footer class="bg-PrimFont">
        <div class="container mx-auto flex items-center justify-between">

            <div class="flex space-x-4 ml-5">
            <a href="https://api.whatsapp.com/send/?phone=6283842343711&text=Halo%20saya%20ingin%20memesan%20catering&app_absent=0" aria-label="WhatsApp">
                <img src={WhatsappIcon} alt="WhatsApp" class=" w-8 h-8" />
            </a>
            <a href="https://www.instagram.com/p/DDSAkClNVr3/?utm_source=ig_web_copy_link" aria-label="Instagram">
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