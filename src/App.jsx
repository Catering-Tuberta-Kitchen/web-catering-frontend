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

  const removeItemFromCart = (id) => {
    setCart((prevCart) =>
      prevCart.map((i) =>
        i.id === id && i.quantity > 1
          ? { ...i, quantity: i.quantity - 1 }
          : i
      ).filter((i) => i.quantity > 0)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <MainLayout
          cart={cart}
          addItemToCart={addItemToCart}
          removeItemFromCart={removeItemFromCart}
          clearCart={clearCart}
        />
      ),
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

