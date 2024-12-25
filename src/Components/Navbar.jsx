import React from "react";
import NavIcon from "../Assets/NavIcon.png";
import { ShoppingCart } from 'lucide-react';
import { User } from 'lucide-react';
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    return (
        <div className="h-20 bg-MAIN flex items-center justify-between px-4 border-b border-b-white">
            
            <div className="flex items-center space-x-4">
                <img src={NavIcon} alt="Navbar Icon" className="h-20" />
                <div className="flex flex-col items-start ">
                <h3 className="font-lexend font-normal text-PrimFont text-2xl">Tuberta</h3>
                <h3 className="font-kameron font-medium text-SecFont text-xl">Kitchen</h3>
                </div>
            </div>
        
            
            <div className="flex flex-col">
                <ul className="flex space-x-10 items-center text-xl">
                    <li
                    className={`font-inria font-medium text-center ${
                        isActive("/")
                        ? "text-black bg-PrimFont px-4 py-1 rounded-full"
                        : "text-PrimFont px-4 py-1 rounded-full hover:bg-PrimFont hover:text-black transition duration-300"
                    }`}
                    >
                    <Link to="/">Home</Link>
                    </li>
                    <li
                    className={`font-inria font-medium text-center ${
                        isActive("/about")
                        ? "text-black bg-PrimFont px-4 py-1 rounded-full"
                        : "text-PrimFont px-4 py-1 rounded-full hover:bg-PrimFont hover:text-black transition duration-300"
                    }`}
                    >
                    <Link to="/about">About</Link>
                    </li>
                    <li
                    className={`font-inria font-medium text-center ${
                        isActive("/menu")
                        ? "text-black bg-PrimFont px-4 py-1 rounded-full"
                        : "text-PrimFont px-4 py-1 rounded-full hover:bg-PrimFont hover:text-black transition duration-300"
                    }`}
                    >
                    <Link to="/menu">Menu</Link>
                    </li>
                    <li
                    className={`font-inria font-medium text-center ${
                        isActive("/contact")
                        ? "text-black bg-PrimFont px-4 py-1 rounded-full"
                        : "text-PrimFont px-4 py-1 rounded-full hover:bg-PrimFont hover:text-black transition duration-300"
                    }`}
                    >
                    <Link to="/contact">Contact</Link>
                    </li>
                </ul>
            </div>

            <div className="flex items-center gap-10">
                <ShoppingCart className="text-white" />
                <Link to="register-account"
                className="text-black font-inria font-medium text-lg rounded-2xl border border-PrimFont bg-PrimFont px-[26px] py-[6px]">
                Login
                </Link>
                <div className="bg-blue-400 p-2 rounded-full">
                    <Link to="profile">
                        <User />
                    </Link>
                </div>
            </div>
            
        </div>
    );
};

export default Navbar;