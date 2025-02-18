import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth, db } from '../API/Firebase';
import { setDoc, doc } from 'firebase/firestore';
import { toast } from 'react-toastify';

const CreateAcc = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [phone, setPhone] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleRegister=async (e)=>{
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth,email,password);
            const user = auth.currentUser;
            console.log(user);
            if(user){
                await setDoc(doc(db,"Users", user.uid), {
                    email:user.email,
                    firstName:fname,
                    lastName:lname,
                    phone:phone,
                });
            }
            console.log("User Registered Successfully");
            toast.success("Akun Berhasil Dibuat", {
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
    }

    return (
        <div className="bg-MAIN min-h-screen flex flex-col justify-center items-center px-4">
            <div className="text-center mb-10">
                <p className="text-PrimFont font-lexend text-3xl md:text-5xl">Create an account</p>
            </div>
            <div className="w-full max-w-md">
                <form
                    onSubmit={handleRegister}
                    className="flex flex-col gap-4 w-full"
                >
                    <div className="flex flex-col md:flex-row gap-4">
                        <input
                            type="text"
                            placeholder="First Name"
                            onChange={(e) => setFname(e.target.value)}
                            className="w-full md:w-1/2 px-3 py-2 bg-THIRD rounded-md focus:outline-white font-lexend text-white placeholder-white"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            onChange={(e) => setLname(e.target.value)}
                            className="w-full md:w-1/2 px-3 py-2 bg-THIRD rounded-md focus:outline-white font-lexend text-white placeholder-white"
                            required
                        />
                    </div>
                    <input
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 bg-THIRD rounded-md focus:outline-white pr-10 font-lexend text-white placeholder-white"
                        required
                    />
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
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
                    <input
                        type="tel"
                        placeholder="No Handphone"
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3 py-2 bg-THIRD rounded-md focus:outline-white pr-10 font-lexend placeholder-white text-white"
                        onInput={(e) => {
                            e.target.value = e.target.value.replace(/[^0-9]/g, "");
                        }}
                        required
                    />
                    <button
                        type="submit"
                        className="w-full py-2 mt-8 font-lexend bg-PrimFont text-black rounded-md hover:bg-HOVER focus:outline-none"
                    >
                        Create Account
                    </button>

                    <div className="flex justify-center mt-4 font-lexend">
                        <p className="text-white text-sm">
                            Sudah mempunyai Akun sebelumnya?{" "}
                            <Link to="/login-account" className="relative text-[#FFCC00] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-[#FFCC00] after:transition-all after:duration-300 after:ease-in-out hover:after:w-full after:rounded">
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
