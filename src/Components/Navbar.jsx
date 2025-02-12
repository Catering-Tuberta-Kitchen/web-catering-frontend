import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, User, Trash2, Menu } from "lucide-react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../API/Firebase";
import NavIcon from "../Assets/NavIcon.png";
import { MainAPI } from "../API/BaseURL";

const Navbar = ({ cart, clearCart, removeFromCart, handleQuantityChange }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [user, setUser] = useState(null);

    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            auth.onAuthStateChanged(async (user) => {
                if (user) {
                    const docRef = doc(db, "Users", user.uid);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        setUserDetails(docSnap.data());
                    }
                }
            });
        };
        fetchUserData();
    }, []);

    const [products, setProducts] = useState([]);
    const location = useLocation();

    const isActive = (path) => location.pathname === path;
    const auth = getAuth();

    const handlePurchase = (cart) => {
        if (cart.length === 0) {
            alert("Keranjang Anda kosong. Tambahkan item terlebih dahulu!");
            return;
        }

        if (!userDetails || !userDetails.phone || !userDetails.firstName || !userDetails.lastName) {
            alert("Data pengguna tidak lengkap. Silakan lengkapi profil Anda terlebih dahulu!");
            return;
        }


        const userNumber = userDetails.phone;
        const sellerNumber = "+6282136412013";
        const userName = `${userDetails.firstName} ${userDetails.lastName}`;
        const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

        const itemsList = cart
            .map((item) => `- ${item.quantity} ${item.name}`)
            .join("\n");

        const message =
            `Halo ${userName} / ${userNumber}, Terimakasih sudah memesan di CATERING TUBERTA KITCHEN\n\n` +
            `Berikut ada data pesanan Anda:\nAnda memesan:\n${itemsList}\n\n` +
            `Berikut jumlah pembayarannya:\nRp ${totalPrice.toLocaleString()}\n\n` +
            `Untuk pembayarannya bisa melalui beberapa cara di bawah:\n` +
            `1. BCA: E Fetty Kusumastuti 4620732015\n` +
            `2. Mandiri: E Fetty Kusumastuti 1360033617116\n\n` +
            `Sertakan bukti pembayaran jika melakukan pembayaran non-cash. Silahkan kirim bukti pembayaran ke nomor penjual.\n\n` +
            `Jika terdapat data yang salah, mohon segera konfirmasi ke penjual.\n\n` +
            `Sekali lagi kami ucapkan terimakasih.\n-Tuberta Kitchen`;

        const whatsappUrl = `https://wa.me/${sellerNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, "_blank");
    };


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${MainAPI}/products`, { redirect: "manual" });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                const mappedProducts = data.map((product) => ({
                    id: product.id,
                    name: product.name,
                    price: parseFloat(product.price),
                    quantity: 1,
                    imageUrl: product.images.length > 0 ? product.images[0].url : "",
                }));
                setProducts(mappedProducts);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, [auth]);

    const toggleCartDropdown = () => setIsDropdownOpen(!isDropdownOpen);
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    return (
        <div
            className="h-20 bg-MAIN flex items-center justify-between md:justify-between px-4 border-b border-b-white fixed top-0 left-0 w-full z-50">
            {isDropdownOpen && (
                <div
                    className="fixed inset-0 bg-FOURTH bg-opacity-50 z-10 mt-20"
                    onClick={() => setIsDropdownOpen(false)}
                ></div>
            )}

            <div className="flex items-center md:space-x-4 cursor-pointer">
                <Link to="/">
                    <div className="flex items-center">
                        <img
                            src={NavIcon}
                            alt="Navbar Icon"
                            className="h-20 md:h-16 lg:h-20 w-auto"
                        />
                        <div className="flex flex-col items-start">
                            <h3 className="font-lexend font-normal text-PrimFont text-xl sm:text-2xl md:text-3xl lg:text-2xl">Tuberta</h3>
                            <h3 className="font-kameron font-medium text-SecFont text-lg sm:text-xl md:text-2xl lg:text-xl">Kitchen</h3>
                        </div>
                    </div>
                </Link>
            </div>

            <div className="flex space-x-4">
                <ul className="hidden md:flex md:space-x-10 items-center text-xl absolute left-1/2 transform -translate-x-1/2">
                    {["/", "/About", "/Menu", "/Contact"].map((path) => (
                        <li key={path}
                            className={`font-inria font-medium text-center px-4 py-2 rounded-3xl hover:bg-PrimFont hover:text-black transition duration-300 ${isActive(path) ? "text-black bg-PrimFont" : "text-PrimFont"}`}>
                            <Link to={path}>{path.slice(1) || "Home"}</Link>
                        </li>
                    ))}
                </ul>

                <div className="flex items-center gap-4 relative">
                    <div
                        className={`md:block hidden text-white cursor-pointer relative z-20 transition-colors p-2 rounded-lg ${
                            isDropdownOpen ? "bg-FOURTH text-black" : "hover:bg-FOURTH hover:text-black"
                        }`}
                        onClick={toggleCartDropdown}
                    >
                        <ShoppingCart className={isDropdownOpen ? "text-black" : "text-white"}/>
                        {cart.length > 0 && (
                            <span
                                className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                                {cart.reduce((total, item) => total + item.quantity, 0)}
                            </span>
                        )}
                    </div>

                    {/*KERANJANG*/}
                    {isDropdownOpen && (
                        <div className="h-full w-full">
                            <div
                                className="fixed md:absolute mt-8 md:mt-16 right-0 md:right-0 bg-white shadow-lg rounded-lg p-4 z-30 w-80 max-sm:w-[90vw] max-sm:left-1/2 max-sm:transform max-sm:-translate-x-1/2 max-sm:top-16 max-sm:right-auto max-sm:ml-0">
                                <h2 className="text-lg font-bold text-black border-b pb-2">Keranjang</h2>
                                {cart.length === 0 ? (
                                    <p className="text-gray-500 mt-4 text-center">Keranjangmu Kosong</p>
                                ) : (
                                    <div className="mt-4 max-h-64 overflow-y-auto">
                                        <ul className="space-y-4">
                                            {cart.map((item) => (
                                                <li key={item.id} className="flex items-center gap-4 border-b pb-3">
                                                    <img
                                                        src={item.imageUrl}
                                                        alt={item.name}
                                                        className="w-14 h-14 object-cover rounded-md"
                                                    />
                                                    <div className="flex-1">
                                                        <h3 className="text-sm font-medium text-gray-700">{item.name}</h3>
                                                        <p className="text-sm text-gray-500">Rp {item.price.toLocaleString()}</p>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <button
                                                            className="text-sm font-bold text-green-600"
                                                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                                        >
                                                            -
                                                        </button>
                                                        <input
                                                            type="number"
                                                            value={item.quantity}
                                                            onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                                                            className="w-10 text-center border border-gray-300 rounded-md"
                                                            min="1"
                                                        />
                                                        <button
                                                            className="text-sm font-bold text-green-600"
                                                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                    <button
                                                        className="text-sm text-red-500 hover:text-red-700"
                                                        onClick={() => removeFromCart(item.id)}
                                                    >
                                                        <Trash2/>
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                <div className="mt-4 flex justify-between items-center">
                                    <span
                                        className="font-bold text-black">Total: Rp {totalPrice.toLocaleString()}</span>
                                </div>
                                <div className="mt-4 flex space-x-4">
                                    <button
                                        className="flex-1 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                                        onClick={clearCart}
                                    >
                                        Hapus Semua
                                    </button>
                                    <Link
                                        to="#"
                                        className="flex-1 bg-green-500 text-white px-4 py-2 rounded-md text-center hover:bg-green-600"
                                        onClick={() => handlePurchase(cart)}
                                    >
                                        Beli
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}

                    {user ? (
                        <div className="flex items-center gap-4">
                            <div className="bg-white text-MAIN p-2 rounded-full">
                                <Link to="/profile">
                                    <User/>
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

                <div
                    className={`md:hidden fixed bottom-4 right-4 bg-FOURTH hover:bg-THIRD hover:text-FOURTH transition duration-200 text-black p-3 rounded-full shadow-lg cursor-pointer z-10 ${
                        isDropdownOpen ? "bg-THIRD text-black" : "hover:bg-FOURTH hover:text-white"
                    }`}
                    onClick={toggleCartDropdown}
                >
                    <ShoppingCart className={isDropdownOpen ? "text-white" : "text-black"}/>
                        {cart.length > 0 && (
                            <span
                                className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
            {cart.reduce((total, item) => total + item.quantity, 0)}
          </span>
                        )}
                    </div>

                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleMobileMenu}
                            className="text-white"
                        >
                            <Menu className="w-6 h-6"/>
                        </button>
                    </div>
                </div>

                {isMobileMenuOpen && (
                    <div className="md:hidden fixed top-20 left-0 w-full bg-MAIN z-40">
                        <ul className="flex flex-col items-center space-y-4 py-4">
                            {["/", "/About", "/Menu", "/Contact"].map((path) => (
                                <li key={path}
                                    className={`font-inria font-medium text-center px-4 py-2 rounded-3xl hover:bg-PrimFont hover:text-black transition duration-300 ${isActive(path) ? "text-black bg-PrimFont" : "text-PrimFont"}`}>
                                    <Link to={path} onClick={toggleMobileMenu}>{path.slice(1) || "Home"}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            );
            };

            export default Navbar;