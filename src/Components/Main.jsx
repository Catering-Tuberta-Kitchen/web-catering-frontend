import React, { useEffect, useState } from "react";
import { MainAPI } from '../API/BaseURL';
import { Link } from "react-router-dom";
import iconAyam from '../assets/ayam_icon.png';
import iconDaging from '../assets/daging_icon.png';
import iconSayur from '../assets/sayur_icon.png';
import iconNasi from '../assets/nasi_icon.png';

const Main = () => {
    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(true);  // Add loading state
    const [hoveredIndex, setHoveredIndex] = useState(null);

    useEffect(() => {
        // API BANNER
        const fetchBanners = async () => {
            try {
                const response = await MainAPI.get('/banners');
                setBanners(response.data);
            } catch (error) {
                console.error("Error fetching banners:", error);
            } finally {
                setLoading(false);  // Set loading to false after the data is fetched
            }
        };

        fetchBanners();
    }, []);

    const categories = [
        { name: "Menu Harian", link: "/menu-harian" },
        { name: "Ayam", link: "/ayam", icon: iconAyam },
        { name: "Daging", link: "/daging", icon: iconDaging },
        { name: "Sayur", link: "/sayur", icon: iconSayur },
        { name: "Nasi", link: "/nasi", icon: iconNasi },
        { name: "Menu Tambahan", link: "/menu-tambahan"},
    ];

    return (
        <div className="h-full bg-MAIN p-6 md:p-10 pt-16 md:pt-20">
            {/* Banner Section */}
            <div className="relative w-full h-[246px] md:h-[246px] overflow-hidden mt-6">
                <div className="flex space-x-6 md:space-x-10 animate-scroll cursor-default">
                    {loading ? (
                        <div className="w-full h-[246px] flex items-center justify-center">
                            <span className="text-white text-xl font-semibold animate-pulse">Loading Banners...</span>
                        </div>
                    ) : (
                        [...banners, ...banners].map((banner, index) => (
                            <div
                                key={index}
                                className="flex-shrink-0 w-[200px] md:w-[525px] h-[200px] md:h-[246px] relative"
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

            {/* section kategori */}
            <div className="flex flex-col items-center md:mt-32">
                <div className="p-6 rounded-lg shadow-lg w-[95%] sm:w-[90%] max-w-4xl border-2 border-white">
                    <h2 className="text-center text-white text-xl md:text-2xl font-lexend mb-6">Category</h2>
                    <div
                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 font-jockey text-xl">
                        {categories.map((category, index) => (
                            <Link
                                to={category.link}
                                key={index}
                                className="bg-yellow-400 flex flex-col items-center justify-center text-center p-4 rounded-lg text-black hover:bg-yellow-300 transition-all"
                            >
                                {category.icon && (
                                    <img
                                        src={category.icon}
                                        alt={category.name}
                                        className="w-12 h-12 md:w-20 md:h-20 object-contain mb-2"
                                    />
                                )}
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
