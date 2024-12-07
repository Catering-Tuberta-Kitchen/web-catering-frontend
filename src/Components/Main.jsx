import React from "react";
import MainIMG from "../Assets/main.jpg";

const Main = () => {
    return (
        <div className=" h-screen bg-black p-10">
            <div className="flex justify-between items-center mt-40">
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
                        <button className="bg-yellow-400 text-black text-lg font-bold px-6 py-3 rounded">
                            Order Sekarang
                        </button>
                    </div>
                </div>
                <div className="w-1/2 flex justify-center">
                    <img
                        src={MainIMG}
                        alt="MainImage"
                        className="w-[350px] h-[350px] rounded-lg object-cover"
                    />
                </div>
            </div>
        </div>
    );
};

export default Main;