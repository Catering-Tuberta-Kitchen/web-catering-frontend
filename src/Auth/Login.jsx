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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("Login Successful");
            window.location.href = "/profile";
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
        <div className="bg-MAIN min-h-screen flex flex-col justify-center items-center px-6 sm:px-10 md:px-16">
            <div className="text-center mb-10">
                <p className="text-PrimFont font-lexend text-4xl sm:text-5xl">Login</p>
            </div>
            <div className="w-full max-w-md">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 bg-THIRD rounded-md focus:outline-white text-white placeholder-white"
                        required
                    />
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 bg-THIRD rounded-md focus:outline-white text-white placeholder-white"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white focus:outline-none"
                        >
                            {showPassword ? <Eye /> : <EyeOff />}
                        </button>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 mt-6 font-lexend bg-PrimFont text-black rounded-md hover:bg-HOVER focus:outline-none"
                    >
                        Login
                    </button>
                </form>
                <div className="text-center mt-6 font-lexend text-sm text-white">
                    <p>
                        Lupa <Link to="/recovery-account" className="text-[#FFCC00] underline">password</Link> atau {" "}
                        <Link to="/register-account" className="text-[#FFCC00] underline">Buat akun baru</Link>?
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
