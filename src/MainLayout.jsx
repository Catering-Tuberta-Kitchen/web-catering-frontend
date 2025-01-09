import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

const MainLayout = ({ cart, addItemToCart, removeItemFromCart, clearCart }) => {
    return (
        <>
            <Navbar
            cart={cart}
            addItemToCart={addItemToCart}
            removeItemFromCart={removeItemFromCart}
            clearCart={clearCart}
            />
            <Outlet />
            <Footer />
        </>
    );
};
export default MainLayout;