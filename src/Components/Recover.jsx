import { sendPasswordResetEmail } from 'firebase/auth';
import { auth, db } from '../API/Firebase';
import React, { useState } from "react";
import { toast } from 'react-toastify';
import { Loader2 } from "lucide-react";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from "firebase/firestore";

function Recover() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleReset = async (e) => {
        e.preventDefault();
        const emailVal = e.target.email.value;
        setLoading(true);

        try {
            const usersRef = collection(db, "Users");
            const q = query(usersRef, where("email", "==", emailVal));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                toast.error("Akun tidak terdaftar", {
                    position: "top-center",
                    theme: "dark",
                    closeOnClick: false,
                    pauseOnHover: false,
                    draggable: true,
                });
                setLoading(false);
                return;
            }

            await sendPasswordResetEmail(auth, emailVal);
            toast.success("Silahkan Cek Email Anda", {
                position: "top-center",
                theme: "dark",
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true
            });

            setTimeout(() => {
                navigate('/login-account');
            }, 2000);

        } catch (error) {
            console.log(error.message);
            toast.error(error.message, {
                position: "bottom-center",
                theme: "dark",
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-MAIN min-h-screen flex justify-center items-center px-4">
            <div className="w-full max-w-md font-lexend rounded-lg shadow-lg">
                <h1 className="text-PrimFont text-2xl mb-6 text-center">
                    Lupa Password
                </h1>
                <p className="flex text-white text-sm text-left mb-4 justify-center items-center text-center">
                    Masukkan email yang ingin anda reset password
                </p>
                <form onSubmit={handleReset} className="flex flex-col gap-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="w-full px-4 py-2 bg-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-300"
                        required
                    />
                    <button
                        type="submit"
                        className={`w-full py-2 flex items-center justify-center rounded-md transition duration-200
                        ${loading ? "bg-PrimFont cursor-not-allowed" : "bg-PrimFont hover:bg-HOVER text-black"}`}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="animate-spin h-5 w-5 mr-2 text-black"/>
                                <span className="text-black">Memproses</span>
                            </>
                        ) : (
                            "Kirim"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Recover;