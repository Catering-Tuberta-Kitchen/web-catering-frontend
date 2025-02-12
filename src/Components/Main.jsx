import React, { useEffect, useState, useRef } from "react";
import { MainAPI } from '../API/BaseURL';
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import BgUtama from "../assets/bg-utama.jpg";

const Main = () => {
    const [banners, setBanners] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [fetchError, setFetchError] = useState(false); // State untuk menyimpan status error
    const timeoutRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [bannersResponse, categoriesResponse] = await Promise.all([
                    MainAPI.get('/banners'),
                    MainAPI.get('/categories')
                ]);

                setBanners(bannersResponse.data);
                setCategories(categoriesResponse.data);
                setFetchError(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setFetchError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentIndex((prevIndex) => prevIndex + 1);
        }, 3000);

        return () => clearTimeout(timer);
    }, [currentIndex]);

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? banners.length * 2 - 1 : prevIndex - 1));
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) => prevIndex + 1);
    };

    const actualIndex = currentIndex % banners.length;

    if (fetchError) {
        return (
            <div className="h-screen bg-MAIN pt-20 md:pt-20 pb-10 md:pb-10 flex items-center justify-center"
                 style={{
                     backgroundImage: `linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.5)), url(${BgUtama})`,
                     backgroundSize: "cover",
                     backgroundPosition: "center"
                 }}
            >
                <div className="text-center text-white">
                    <div className="text-6xl">⚠️</div>
                    <h1 className="text-2xl md:text-3xl font-lexend mt-4">Tidak ada Internet</h1>
                    <p className="text-md md:text-lg mt-2">Silakan periksa koneksi internet Anda dan coba lagi.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full bg-MAIN pt-20 md:pt-20 pb-10 md:pb-10"
             // style={{
             //     backgroundImage: `linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.5)), url(${BgUtama})`,
             //     backgroundSize: "cover",
             //     backgroundPosition: "center"
             // }}
        >
            <div
                className="relative w-full h-[120px] md:h-[400px] overflow-hidden mt-6 border-b-4 border-t-4 border-PrimFont md:border-b-4 md:border-t-4 md:border-PrimFont">
                {loading ? (
                    <div className="flex">
                        {Array(3).fill(0).map((_, index) => (
                            <div key={index}
                                 className="flex-shrink-0 w-[250px] md:w-[525px] h-[200px] md:h-[400px] bg-THIRD animate-pulse"></div>
                        ))}
                    </div>
                ) : (
                    <div className="flex transition-transform duration-500 ease-in-out"
                         style={{transform: `translateX(-${actualIndex * 100}%)`}}>
                        {[...banners, ...banners, ...banners].map((banner, index) => (
                            <div key={index} className="flex-shrink-0 w-full relative" style={{aspectRatio: "16/4.4"}}>
                                <img
                                    src={banner.imageUrl}
                                    alt={banner.label}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                )}

                <button
                    onClick={goToPrevious}
                    className="absolute top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-r-md hover:bg-opacity-70 transition-all md:left-0"
                >
                    <ChevronLeft />
                </button>
                <button
                    onClick={goToNext}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-l-md hover:bg-opacity-70 transition-all md:right-0"
                >
                    <ChevronRight />
                </button>
            </div>

            <div className="flex flex-col items-center md:mt-32">
                <div
                    className="p-6 rounded-lg shadow-lg w-[95%] sm:w-[90%] max-w-4xl bg-MAIN bg-opacity-70 backdrop-blur-sm">
                        <h2 className="text-center text-white text-xl md:text-2xl font-lexend mb-6">Category</h2>
                    <div
                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 font-jockey text-xl">
                        {loading
                            ? Array(8).fill(0).map((_, index) => (
                                <div key={index} className="bg-THIRD animate-pulse h-[96px] rounded-lg"></div>
                            ))
                            : categories.sort((a, b) => (a.name === "Best Seller" ? -1 : b.name === "Best Seller" ? 1 : 0)).map((category) => (
                                <Link
                                    to={`/menu?category=${category.id}`}
                                    key={category.id}
                                    className="bg-yellow-400 flex flex-col items-center justify-center text-center p-4 rounded-lg text-black hover:bg-yellow-300 transition-all"
                                >
                                    {category.name === "Best Seller" &&
                                        <Star size={24} className="text-red-800 fill-red-500 mb-1"/>}
                                    <span className="text-md md:text-2xl">{category.name}</span>
                                </Link>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;