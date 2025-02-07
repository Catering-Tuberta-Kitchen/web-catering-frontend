import React from "react";
import AboutImage from "../assets/about.jpg";
import AsuransiAllianz from "../assets/TubertaCompanyAssets/asuransi-allianz.jpg";
import AsuransiMpm from "../assets/TubertaCompanyAssets/asuransi-mpm.png";
import DinasTataKotaSemarang from "../assets/TubertaCompanyAssets/dinas-tata-kota-semarang.jpg";
import FakPeternakanUndip from "../assets/TubertaCompanyAssets/fak-peternakan-undip.png";
import FakPsikologiUnika from "../assets/TubertaCompanyAssets/fak-psikolog-unika.jpg";
import KpuKabSemarang from "../assets/TubertaCompanyAssets/kpu-kab-semarang.jpg";
import KpuProvinsi from "../assets/TubertaCompanyAssets/kpu-provinsi.png";
import PtSakatinta from "../assets/TubertaCompanyAssets/PT-sakatinta.png";
import RektoratUnnes from "../assets/TubertaCompanyAssets/rektorat-unnes.jpg";

const gambarArray = [
    { src: AsuransiAllianz, alt: "Asuransi Allianz" },
    { src: AsuransiMpm, alt: "Asuransi MPM" },
    { src: DinasTataKotaSemarang, alt: "Dinas Tata Kota Semarang" },
    { src: FakPeternakanUndip, alt: "Fakultas Peternakan Undip" },
    { src: FakPsikologiUnika, alt: "Fakultas Psikologi Unika" },
    { src: KpuKabSemarang, alt: "KPU Kab Semarang" },
    { src: KpuProvinsi, alt: "KPU Provinsi" },
    { src: PtSakatinta, alt: "PT Sakatinta" },
    { src: RektoratUnnes, alt: "Rektorat Unnes" },
];

const About = () => {
    return (
        <div className="bg-MAIN min-h-screen pt-20 px-4">
            <div className="flex justify-center items-center mb-10">
                <h1 className="font-lexend text-SecFont text-4xl mt-10 text-center">
                    <span className="text-PrimFont">Tentang</span> Kami
                </h1>
            </div>

            <div className="flex flex-col md:flex-row md:justify-center md:items-center md:gap-8">
                <div className="md:w-1/3 w-full flex justify-center mb-6 md:mb-0">
                    <img
                        src={AboutImage}
                        alt="Ayam Bakar Kremes"
                        className="w-96 h-60 md:w-full md:h-full md:max-w-sm rounded-md shadow-lg"
                    />
                </div>

                <div className="md:w-2/3 w-full text-left md:text-left">
                    <h2 className="font-jockey text-4xl md:text-5xl text-SecFont mb-4">
                        Mau catering yang murah dan enak
                    </h2>
                    <p className="font-jockey text-3xl md:text-4xl text-SecFont mb-4">
                        Ayo order di <span className="text-PrimFont font-bold">Tuberta</span> Kitchen
                    </p>
                    <p className="font-lexend text-base text-SecFont mb-10">
                        Berawal dari keinginan untuk menghadirkan hidangan rumahan yang sehat dan bergizi bagi mereka
                        yang sibuk dan tak sempat memasak, kami tumbuh menjadi penyedia layanan kuliner yang lebih
                        beragam.
                    </p>

                    {/* Tombol Sosial Media Diletakkan di Bawah Teks */}
                    <div className="flex items-center justify-center space-x-4 md:justify-start md:space-x-6 mb-10 md:mt-6">
                        <a
                            href="https://www.instagram.com/tuberta_kitchen/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-pink-500 text-white p-4 rounded-full shadow-lg hover:bg-pink-600 transition-all"
                        >
                            <box-icon type="logo" name="instagram" size="lg" color="white"></box-icon>
                        </a>
                        <a
                            href="https://www.facebook.com/people/Tuberta-Kitchen/pfbid02y2Pq8hKiJH69rtBxnHYGsagnCSfVVUL3mX9weibpAYQS1AipyYXhrfUfqtoCY1bhl/?rdid=YVAFSP6DWoY1MHVH&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1BNFKS7FNW%2F"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all"
                        >
                            <box-icon type="logo" name="facebook-square" size="lg" color="white"></box-icon>
                        </a>
                    </div>
                </div>
            </div>

            <div className="md:mt-16 text-left md:p-7">
                <h2 className="font-jockey text-SecFont text-4xl md:text-5xl mb-6">
                    Kenapa harus order di <span className="text-PrimFont font-bold">Tuberta Kitchen</span>?
                </h2>
                <p className="font-lexend text-base text-SecFont pb-12">
                    Layanan catering ini hadir sebagai solusi bagi para konsumen yang membutuhkan
                    hidangan berkualitas untuk berbagai jenis acara, baik itu acara keluarga, pertemuan bisnis,
                    pernikahan, ataupun acara spesial lainnya. Kami berkomitmen untuk menyediakan makanan yang tidak
                    hanya lezat tetapi juga disesuaikan dengan selera, preferensi, serta kebutuhan gizi setiap tamu, sehingga setiap hidangan yang disajikan dapat memberikan pengalaman kuliner yang memuaskan dan berkesan.
                </p>
            </div>
            <div>
                <h1 className="text-white font-jockey text-2xl md:text-3xl flex justify-center mb-10">
                    Menjadi&nbsp;<span className="text-PrimFont">PILIHAN</span>&nbsp;yang&nbsp;<span className="text-PrimFont">TERBAIK</span>
                </h1>
                <div className="overflow-hidden w-full relative pb-10">
                    <div className="flex animate-moveRightToLeft">
                        {gambarArray.map((gambar, index) => (
                            <img
                                key={index}
                                src={gambar.src}
                                alt={gambar.alt}
                                className="w-20 md:w-44 h-auto rounded-lg shadow-md mx-3"
                            />
                        ))}
                        {gambarArray.map((gambar, index) => (
                            <img
                                key={`clone-${index}`}
                                src={gambar.src}
                                alt={gambar.alt}
                                className="w-20 md:w-44 h-auto rounded-lg shadow-md mx-3"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
