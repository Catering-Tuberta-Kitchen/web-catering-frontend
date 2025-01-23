import { signInWithEmailAndPassword } from 'firebase/auth';
import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { auth } from '../API/Firebase';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const handleSubmit =async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("Login Successfull");
            window.location.href="/profile";
            toast.success("Login Berhasil", {
                position: "top-center",
                pauseOnHover: false,
                theme: "dark"
            });
        } catch (error) {
            console.log(error.message);
            toast.error(error.message, {
                position: "bottom-center",
                pauseOnHover: false,
                theme: "dark"
            });
        }
    };

    return (
        <div className="bg-MAIN h-screen">
            <div className="flex justify-center p-20">
                <p className="text-PrimFont font-lexend text-5xl ">Login</p>
            </div>
            <div className="flex justify-center flex-col items-center">
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4 w-1/3"
                    >
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 bg-THIRD rounded-md focus:outline-white pr-10 font-lexend text-white placeholder-white"
                        required
                        />
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
                    <button
                    type="submit"
                    className="w-full py-2 mt-12 font-lexend bg-PrimFont text-black rounded-md hover:bg-HOVER focus:outline-none"
                    >
                        Login
                    </button>
                </form>
                <div className="flex mt-6 font-lexend gap-1 flex-nowrap">
                    <p className="text-white text-sm">
                        Forgot your {" "}
                        <Link to="/recovery-account" className="text-[#FFCC00] underline">
                            password
                        </Link>
                        {" "}
                        or need to {" "}
                        <Link to="/register-account" className="text-[#FFCC00] underline">
                            create a new account
                        </Link>
                        {" "}?
                    </p>
                </div>
            </div>
        </div>
    )
};

export default Login;