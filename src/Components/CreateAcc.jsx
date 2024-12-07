import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from "react";
import { Link } from "react-router-dom";

const CreateAcc = () => {
    const [showPassword, setShowPassword] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Account successfully created!");
    };

    return (
        <div className="bg-MAIN h-screen">
            <div className="flex justify-center p-20">
                <p className="text-PrimFont font-lexend text-5xl ">Create an account</p>
            </div>
            <div className="flex justify-center items-center">
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4 w-1/3"
                    >
                        <div className="flex gap-7">
                            <input
                                type="text"
                                placeholder="First Name"
                                className="w-1/2 px-3 py-2 bg-THIRD rounded-md focus:outline-white font-lexend text-white placeholder-white"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Last Name"
                                className="w-1/2 px-3 py-2 bg-THIRD rounded-md focus:outline-white font-lexend text-white placeholder-white"
                                required
                            />
                        </div>
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full px-3 py-2 bg-THIRD rounded-md focus:outline-white pr-10 font-lexend text-white placeholder-white"
                        required
                        />
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                className="w-full px-3 py-2 bg-THIRD rounded-md focus:outline-white pr-10 font-lexend text-white placeholder-white"
                                required
                                />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-white focus:outline-none">
                                {showPassword ? <Eye /> : <EyeOff />}
                            </button>
                        </div>
                    <input
                        type="tel"
                        placeholder="No Handphone"
                        className="w-full px-3 py-2 bg-THIRD rounded-md focus:outline-white pr-10 font-lexend placeholder-white text-white"
                        onInput={(e) => {
                            e.target.value = e.target.value.replace(/[^0-9]/g, "");
                        }}
                        required
                    />
                    <button
                    type="submit"
                    className="w-full py-2 mt-12 font-lexend bg-PrimFont text-black rounded-md hover:bg-HOVER focus:outline-none"
                    >
                        Create Account
                    </button>

                    <div className="flex justify-start mt-4 font-lexend">
                        <p className="text-white text-sm">
                            Already an account?{" "}
                            <Link to="/login-account" className="text-[#FFCC00] underline">
                                Login
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default CreateAcc;