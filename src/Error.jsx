import React from "react";
import { useNavigate } from "react-router-dom";

const Error = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
            <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
            <h2 className="text-2xl font-semibold mb-2">Oops! Page Not Found</h2>
            <p className="text-MAIN mb-6 text-center">
                We couldn't find the page you're looking for. <br />
                It might have been removed or the link is broken.
            </p>
            <button
                onClick={() => navigate("./")}
                className="px-6 py-3 bg-PrimFont text-black font-semibold rounded-lg shadow hover:bg-yellow-500 hover:text-white transition duration-300"
            >
                Back to Home
            </button>
        </div>
    );
};

export default Error;