import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

const MainLayout = ({ cart, addItemToCart, removeFromCart, clearCart, handleQuantityChange }) => {
    return (
        <>
            <Navbar
            cart={cart}
            addItemToCart={addItemToCart}
            removeFromCart={removeFromCart}
            clearCart={clearCart}
            handleQuantityChange={handleQuantityChange}
            />
            <Outlet />
            <Footer />
        </>
    );
};
export default MainLayout;