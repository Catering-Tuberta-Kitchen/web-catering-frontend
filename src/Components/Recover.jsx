import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../API/Firebase';
import React from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function Recover() {
    const navigate = useNavigate();

    const handleReset = async (e) => {
        e.preventDefault();
        const emailVal = e.target.email.value;
        try {
            await sendPasswordResetEmail(auth, emailVal);
            toast.success("Silahkan Cek Email Anda", {
                position: "top-center",
                theme: "dark"
            });

            setTimeout(() => {
                navigate('/login-account');
            }, 2000);
        } catch (error) {
            console.log(error.message);
            toast.error(error.message, {
                position: "bottom-center",
                theme: "dark"
            });
        }
    };

    return (
        <div className="bg-MAIN min-h-screen flex justify-center items-center px-4">
            <div className="w-full max-w-md font-lexend p-6 rounded-lg shadow-lg">
                <h1 className="text-PrimFont text-2xl mb-6 text-center">
                    Forgot Password
                </h1>
                <p className="text-white text-sm text-left mb-4">
                    Type your email address to reset password
                </p>
                <form onSubmit={(e) => handleReset(e)} className="flex flex-col gap-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="w-full px-4 py-2 bg-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-300"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full py-2 bg-PrimFont text-black rounded-md hover:bg-HOVER transition duration-200"
                    >
                        Kirim
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Recover;