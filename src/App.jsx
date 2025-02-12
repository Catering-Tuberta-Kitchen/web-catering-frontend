import { useState } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import './App.css';
import CreateAcc from './Auth/CreateAcc';
import Login from './Auth/Login';
import About from './Components/About';
import Contact from './Components/Contact';
import Main from './Components/Main';
import Menus from './Components/Menu';
import Profile from './Components/Profile';
import Recover from './Components/Recover';
import Error from './Error';
import MainLayout from './MainLayout';
import { toast } from 'react-toastify';

function App() {
  const [cart, setCart] = useState([]);

  const addItemToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((i) => i.id === item.id);
      if (existingItem) {
        return prevCart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
  try {
    setCart((prevCart) => {
      const itemToRemove = prevCart.find((item) => item.id === id);
      if (!itemToRemove) {
        throw new Error("Item tidak ditemukan di keranjang");
      }

      const updatedCart = prevCart.filter((item) => item.id !== id);

      toast.success(
        `${itemToRemove.name} Berhasil dihapus dari keranjang`,
        {
          position: "top-left",
          autoClose: 2000,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          theme: "dark",
          className: "custom-toast"
        }
      );

      return updatedCart;
    });
  } catch (error) {
    toast.error(error.message || "Terjadi kesalahan saat menghapus item.",
      {
        position: "bottom-right",
        autoClose: 2000,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        theme: "dark",
        className: "custom-toast"
      });
  }
};

const handleQuantityChange = (id, newQuantity) => {
  if (newQuantity === "") {
    newQuantity = 1;
  } else if (newQuantity < 1) {
    newQuantity = 1;
  } else if (newQuantity > 1000) {
    newQuantity = 1000;
  }

  setCart((prevCart) =>
    prevCart.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    )
  );
};


  const clearCart = () => {
    setCart([]);
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element:
        <MainLayout
          cart={cart}
          addItemToCart={addItemToCart}
          removeFromCart={removeFromCart}
          clearCart={clearCart}
          handleQuantityChange={handleQuantityChange}
        />
      ,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Main />,
        },
        {
          path: "menu",
          element: <Menus addItemToCart={addItemToCart} />,
        },
        {
          path: "about",
          element: <About />,
        },
        {
          path: "contact",
          element: <Contact />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
      ],
    },
    {
      path: "login-account",
      element: <Login />,
    },
    {
      path: "register-account",
      element: <CreateAcc />,
    },
    {
      path: "recovery-account",
      element: <Recover />,
    },
  ]);


  return (
    <div>
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;

