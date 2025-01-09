import { Mail, Phone, User } from "lucide-react";
import React, { useState } from "react";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        review: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Thank you for your submission!");
        console.log("Form Data:", formData);
        setFormData({ name: "", email: "", phone: "", review: "" });
    };

    return (
        <div className="bg-MAIN min-h-screen">
        <div className="flex justify-center items-center">
            <h1 className="text-white font-lexend text-4xl mt-20">
            <span className="text-PrimFont">Kontak</span> Kami
            </h1>
        </div>
        
        <div className="flex flex-col lg:flex-row items-start justify-between gap-10 p-10">
            <div className="lg:w-1/2 mb-10">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.1427517920774!2d110.3995944!3d-6.9924624999999985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708b000c1bad49%3A0x8e3ff4fb8bfbac4!2sRATS%20GAME%20%2301%20-%20SIMONGAN!5e0!3m2!1sid!2sid!4v1733644665309!5m2!1sid!2sid"
                width="100%"
                height="450"
                allowFullScreen=""
                loading="eager"
                referrerPolicy="no-referrer-when-downgrade"
                className="shadow-lg rounded-md"
            ></iframe>
            </div>

            <div className="lg:w-1/2 max-w-[634px]">
            <form onSubmit={handleSubmit} className="space-y-4 font-lexend">
                <div className="flex items-center bg-FOURTH rounded-md px-3">
                <span className="text-MAIN mr-2">
                    <User />
                </span>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-transparent w-full py-2 outline-none text-MAIN placeholder-THIRD"
                    required
                />
                </div>
                <div className="flex items-center bg-FOURTH rounded-md px-3">
                <span className="text-MAIN mr-2">
                    <Mail />
                </span>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-transparent w-full py-2 outline-none text-MAIN placeholder-THIRD"
                    required
                />
                </div>
                <div className="flex items-center bg-FOURTH rounded-md px-3">
                <span className="text-MAIN mr-2">
                    <Phone />
                </span>
                <input
                    type="number"
                    name="phone"
                    placeholder="No Handphone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="bg-transparent w-full py-2 outline-none text-MAIN placeholder-THIRD [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    required
                />
                </div>
                <div className="flex items-start bg-FOURTH rounded-md px-3">
                <textarea
                    name="review"
                    placeholder="Submit Review"
                    value={formData.review}
                    onChange={handleChange}
                    className="bg-transparent w-full h-60 py-2 outline-none text-MAIN resize-none placeholder-THIRD"
                    rows="4"
                    required
                ></textarea>
                </div>
                <div className="flex justify-end">
                <button
                type="submit"
                className=" bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 px-6 rounded-full w-40"
                >
                Send
                </button>
                </div>
            </form>
            </div>
        </div>
        </div>

    );
};

export default Contact;
