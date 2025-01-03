import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AxiosMenus() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/menus')
            .then((response) => {
                setData(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-MAIN">
                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-PrimFont"></div>
                    <p className="text-white mt-4 text-lg font-lexend">Loading, please wait...</p>
                </div>
            </div>
        );
    }
    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-MAIN">
                <div className="text-center">
                    <div className="text-red-500 text-6xl mb-4">⚠️</div>
                    <h1 className="text-2xl font-bold text-red-700 mb-2">Oops! Something went wrong.</h1>
                    <p className="text-red-600 text-lg">Error: {error.message}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-6 px-4 py-2 bg-red-600 text-white rounded-md shadow hover:bg-red-700 transition font-bold">
                        Retry
                    </button>
                </div>
            </div>
        );
    }
    

    return (
        <div className="p-6 bg-MAIN min-h-screen">
            <div className="mb-10">
                <div className="flex justify-center items-center">
                    <h1 className="text-white font-lexend text-4xl mt-10 mb-10">
                    <span className="text-PrimFont">Best</span> Seller
                    </h1>
                </div>
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                    {data.slice(0, 3).map((menu) => (
                        <div
                            key={menu.id}
                            className="bg-FOURTH shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between w-96 h-104 mx-auto"
                        >
                            <img
                                src={`http://localhost:8000/${menu.foto_menu}`}
                                alt={menu.nama_menu}
                                className="w-full h-48 object-cover"
                            />
                            <div className="text-center p-4">
                                <h2 className="text-xl font-bold text-gray-800">{menu.nama_menu}</h2>
                                <p className="text-gray-700 font-semibold">IDR. {menu.harga_menu}</p>
                            </div>
                            <div className="p-4 text-center">
                                <button className="bg-MAIN text-PrimFont px-4 py-2 rounded-full shadow transition-colors duration-300 hover:bg-THIRD">
                                    Masukan Keranjang
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
    
            <div>
                <div className="flex justify-center items-center">
                    <h1 className="text-white font-lexend text-4xl mb-10">
                    <span className="text-PrimFont">Menu</span> Kami
                    </h1>
                </div>
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                    {data.slice(3).map((menu) => (
                        <div
                            key={menu.id}
                            className="bg-FOURTH shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between w-96 h-104 mx-auto"
                        >
                            <img
                                src={`http://localhost:8000/${menu.foto_menu}`}
                                alt={menu.nama_menu}
                                className="w-full h-48 object-cover"
                            />
                            <div className="text-center p-4">
                                <h2 className="text-xl font-bold text-gray-800">{menu.nama_menu}</h2>
                                <p className="text-gray-700 font-semibold">IDR. {menu.harga_menu}</p>
                            </div>
                            <div className="p-4 text-center">
                                <button className="bg-MAIN text-PrimFont px-4 py-2 rounded-full shadow transition-colors duration-300 hover:bg-THIRD">
                                    Masukan Keranjang
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
    
    
}

export default AxiosMenus;