import { ShoppingCart, User } from "lucide-react";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import NavIcon from "../Assets/NavIcon.png";

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    const handleCartClick = () => {
        setIsClicked(!isClicked);
        setIsDropdownOpen(!isDropdownOpen);
    };

    const closeDropdown = () => {
        setIsDropdownOpen(false);
    };

    return (
        <div className={`h-20 bg-MAIN flex items-center justify-between px-4 border-b border-b-white relative`}>
            {isDropdownOpen && (
                <div
                    className="fixed inset-0 bg-FOURTH bg-opacity-50 z-10 mt-20"
                    onClick={closeDropdown}
                ></div>
            )}

            <div className="flex items-center space-x-4">
                <img src={NavIcon} alt="Navbar Icon" className="h-20" />
                <div className="flex flex-col items-start">
                    <h3 className="font-lexend font-normal text-PrimFont text-2xl">Tuberta</h3>
                    <h3 className="font-kameron font-medium text-SecFont text-xl">Kitchen</h3>
                </div>
            </div>

            <div className="flex flex-col">
                <ul className="flex space-x-10 items-center text-xl">
                    {["/", "/About", "/Menu", "/Contact"].map((path, index) => (
                        <li
                            key={index}
                            className={`font-inria font-medium text-center ${
                                isActive(path)
                                    ? "text-black bg-PrimFont px-4 py-1 rounded-full"
                                    : "text-PrimFont px-4 py-1 rounded-full hover:bg-PrimFont hover:text-black transition duration-300"
                            }`}
                        >
                            <Link to={path}>{path.slice(1) || "Home"}</Link>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="flex items-center gap-10">
                <div
                    className={`text-white cursor-pointer relative z-10 transition-colors p-2 rounded-lg ${
                        isClicked ? 'bg-FOURTH text-black' : 'hover:bg-FOURTH hover:text-black'
                    }`}
                    onClick={handleCartClick}
                >
                    <ShoppingCart className={`${isClicked ? 'text-black' : 'text-white'} hover:text-black`} />
                    {isDropdownOpen && isClicked && (
                        <div className="absolute left-0 top-full mt-2 bg-white shadow-lg rounded-md p-4 z-20">
                            <ul className="text-black">
                                <li className="p-2 hover:bg-gray-100 cursor-pointer">Item 1</li>
                                <li className="p-2 hover:bg-gray-100 cursor-pointer">Item 2</li>
                                <li className="p-2 hover:bg-gray-100 cursor-pointer">Item 3</li>
                            </ul>
                        </div>
                    )}
                </div>
                <Link
                    to="register-account"
                    className="text-black font-inria font-medium text-lg rounded-2xl border border-PrimFont bg-PrimFont px-[26px] py-[6px]"
                >
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
