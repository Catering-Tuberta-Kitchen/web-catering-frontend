import React from "react";
import AboutImage from "../assets/about.jpg";

const About = () => {
    return (
        <div className="bg-MAIN px-10 py-20">

            <div className="flex justify-center items-center mb-10">
                <h1 className="font-lexend text-SecFont text-4xl">
                <span className="text-PrimFont">Tentang</span> Kami
                </h1>
            </div>

            <div className="flex flex-col md:flex-row justify-center items-center">
        
        <div className="md:w-1/2 w-full flex justify-center">
            <img
                src={AboutImage}
                alt="Ayam Bakar Kremes"
                className="w-full max-w-md"
            />
        </div>

        <div className="md:w-1/2 w-full">
            <p className="font-lexend text-2xl text-SecFont mb-6">
            Kenapa harus order di <span className="text-PrimFont">Tuberta</span> Kitchen?
            </p>
            <p className="font-lexend text-base text-SecFont mb-4">
            Alasan pertanyaan kuwi aku gatau
            </p>
            <p className="font-lexend text-base text-SecFont">
            Nah maka dari itu layanan catering ini adalah untuk memenuhi kebutuhan konsumen dalam berbagai acara. Dengan menyediakan makanan yang sesuai dengan preferensi dan kebutuhan gizi para tamu.
            </p>
        </div>
    </div>
</div>
    );
};

export default About;
