import React from "react";
import MainIMG from "../Assets/main.jpg";
import { Link } from "react-router-dom";

const Main = () => {
    return (
        <div className=" h-screen bg-black p-10">
            <div className="flex justify-between items-center mt-24">
                <div className="text-left text-white w-1/2 ml-20">
                    <div className="font-jockey">
                        <h1 className="text-4xl font-bold mb-2">Mau catring yang murah dan enak</h1>
                        <h2 className="text-3xl font-bold">
                            Ayo order di <span className="text-yellow-400">Tuberta</span> Kitchen
                        </h2>
                    </div>
                    <p className="mt-4 text-lg">
                    Berawal dari keinginan untuk menghadirkan hidangan rumahan yang sehat dan bergizi bagi mereka yang sibuk dan tak sempat memasak, kami tumbuh menjadi penyedia layanan kuliner yang lebih beragam
                    </p>
                    <div className="mt-8">
                        <Link to="/Menu"
                        className="bg-yellow-400 text-black text-lg font-bold px-6 py-3 rounded"
                        >
                            Order Sekarang
                        </Link>
                    </div>
                </div>
                <div className="md:w-1/2 w-full flex justify-center">
                    <img
                        src={MainIMG}
                        alt="MainImage"
                        className="w-full max-w-md rounded-lg object-cover"
                    />
                </div>
            </div>
        </div>
    );
};

export default Main;