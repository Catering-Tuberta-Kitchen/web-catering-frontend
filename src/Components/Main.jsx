import React, { useEffect, useState } from "react";
import { MainAPI } from '../API/BaseURL';
import { Link } from "react-router-dom";
import { Star } from "lucide-react";

const Main = () => {
    const [banners, setBanners] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const response = await MainAPI.get('/banners');
                setBanners(response.data);
            } catch (error) {
                console.error("Error fetching banners:", error);
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await MainAPI.get('/categories');
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBanners();
        fetchCategories();
    }, []);

    return (
        <div className="h-full bg-MAIN p-6 md:p-10 pt-16 md:pt-20">
            <div className="relative w-full h-[246px] md:h-[246px] overflow-hidden mt-6">
                <div className="flex space-x-6 md:space-x-10 animate-scroll cursor-default">
                    {loading ? (
                        <div className="flex space-x-6 md:space-x-10">
                            {Array(3).fill(0).map((_, index) => (
                                <div key={index}
                                     className="flex-shrink-0 w-[250px] md:w-[525px] h-[200px] md:h-[246px] bg-THIRD animate-pulse rounded-md"></div>
                            ))}
                        </div>
                    ) : (
                        [...banners, ...banners].map((banner, index) => (
                            <div
                                key={index}
                                className="flex-shrink-0 w-[250px] md:w-[525px] h-[200px] md:h-[246px] relative"
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                <img
                                    src={banner.imageUrl}
                                    alt={banner.label}
                                    className="w-full h-full object-cover rounded-md"
                                />
                                <div
                                    className={`absolute inset-0 bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 flex items-center justify-center ${
                                        hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                                    }`}
                                >
                                    <h2 className="text-white text-xl font-semibold">{banner.label}</h2>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <div className="flex flex-col items-center md:mt-32">
                <div className="p-6 rounded-lg shadow-lg w-[95%] sm:w-[90%] max-w-4xl border-2 border-white">
                    <h2 className="text-center text-white text-xl md:text-2xl font-lexend mb-6">Category</h2>
                    <div
                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 font-jockey text-xl">
                        {loading
                            ? Array(8)
                                .fill(0)
                                .map((_, index) => (
                                    <div key={index} className="bg-THIRD animate-pulse h-[96px] rounded-lg"></div>
                                ))
                            : categories
                                .sort((a, b) =>
                                    (a.name === "Best Seller" ? -1 : b.name === "Best Seller" ? 1 : 0))
                                .map((category) => (
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
