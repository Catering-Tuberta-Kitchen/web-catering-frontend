import { ShoppingCart, User } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import NavIcon from "../Assets/NavIcon.png";

const Navbar = ({ cart, clearCart, removeFromCart }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [user, setUser] = useState(null);
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, [auth]);

    const toggleCartDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="h-20 bg-MAIN flex items-center justify-between px-4 border-b border-b-white relative">
            {isDropdownOpen && (
                <div
                    className="fixed inset-0 bg-FOURTH bg-opacity-50 z-10 mt-20"
                    onClick={() => setIsDropdownOpen(false)}
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

            <div className="flex items-center gap-10 relative">
                <div
                    className="text-white cursor-pointer relative z-20 transition-colors p-2 rounded-lg hover:bg-FOURTH hover:text-black"
                    onClick={toggleCartDropdown}
                >
                    <ShoppingCart />
                    {cart.length > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                            {cart.length}
                        </span>
                    )}
                </div>

                {isDropdownOpen && (
                    <div className="absolute right-0 top-full mt-1 bg-white shadow-lg rounded-md p-4 z-30 w-64">
                        <h2 className="text-lg font-bold text-black">Shopping Cart</h2>
                        {cart.length === 0 ? (
                            <p className="text-gray-500 mt-2">Your cart is empty.</p>
                        ) : (
                            <ul className="text-black mt-2 space-y-2">
                                {cart.map((item, index) => (
                                    <li key={index} className="flex justify-between items-center">
                                        <span>{item.name} ({item.quantity})</span>
                                        <button
                                            className="text-red-500 hover:text-red-700"
                                            onClick={() => removeFromCart(item)}
                                        >
                                            Remove
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                        <div className="mt-4 flex justify-between">
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded-lg"
                                onClick={clearCart}
                            >
                                Clear All
                            </button>
                            <Link
                                to="/checkout"
                                className="bg-green-500 text-white px-4 py-2 rounded-lg"
                                onClick={() => setIsDropdownOpen(false)}
                            >
                                Checkout
                            </Link>
                        </div>
                    </div>
                )}

                {user ? (
                    <div className="flex items-center gap-4">
                        <div className="bg-blue-400 p-2 rounded-full mr-10">
                            <Link to="/profile">
                                <User />
                            </Link>
                        </div>
                    </div>
                ) : (
                    <Link
                        to="/login-account"
                        className="text-black font-inria font-medium text-lg rounded-2xl border border-PrimFont bg-PrimFont px-[26px] py-[6px]"
                    >
                        Login
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;