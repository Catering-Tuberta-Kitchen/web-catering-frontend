import React, { useEffect, useState } from "react";
import { MainAPI } from "../API/BaseURL";
import { auth } from "../API/Firebase";
import { useLocation } from "react-router-dom";

const Menus = ({ addItemToCart }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [alertMessage, setAlertMessage] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [user, setUser] = useState(null);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const selectedCategory = queryParams.get("category"); // Ambil kategori dari URL query

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await MainAPI.get("/products");
                const data = response.data;
                const productsArray = Array.isArray(data) ? data : data.data || [];
                const filteredProducts = selectedCategory
                    ? productsArray.filter(
                        (product) => product.category.id === selectedCategory
                    )
                    : productsArray;

                const mappedProducts = filteredProducts
                    .filter((product) => product.isFeatured && !product.isArchived)
                    .map((product) => ({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        description: product.description,
                        imageUrl: product.images?.[0]?.url || "",
                        category: product.category.name,
                        categoryId: product.category.id, // Tambahkan categoryId
                    }));
                setProducts(mappedProducts);
            } catch (err) {
                console.error("Error fetching products:", err.message);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [selectedCategory]);

    const groupedProducts = products.reduce((acc, product) => {
        const category = product.category;
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(product);
        return acc;
    }, {});

    useEffect(() => {
        if (selectedCategory && !loading) {
            const element = document.getElementById(selectedCategory);
            if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }
    }, [selectedCategory, loading]);

    const handleAddToCart = (product) => {
        if (!user) {
            setAlertMessage("Mohon login untuk melanjutkan pembelian");
            setShowAlert(true);
            return;
        }

        addItemToCart(product);
        setAlertMessage(`${product.name} berhasil ditambahkan ke keranjang`);
        setShowAlert(true);

        setTimeout(() => {
            setShowAlert(false);
        }, 1000);
    };

    const handleCloseAlert = () => {
        setShowAlert(false);
    };

    const handleLoginRedirect = () => {
        window.location.href = "/login-account";
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-MAIN pt-24">
                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-PrimFont"></div>
                    <p className="text-white mt-4 text-lg font-lexend">
                        Loading, please wait...
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-MAIN pt-24">
                <div className="text-center">
                    <div className="text-red-500 text-6xl mb-4">⚠️</div>
                    <h1 className="text-2xl font-bold text-red-700 mb-2">
                        Oops! Something went wrong.
                    </h1>
                    <p className="text-red-600 text-lg">Error: {error.message}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-6 px-4 py-2 bg-red-600 text-white rounded-md shadow hover:bg-red-700 transition font-bold"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 bg-MAIN relative pt-24 pb-20">
            {showAlert && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
                    <div
                        className={`bg-white p-4 rounded-md shadow-lg text-center ${
                            !user ? "max-w-sm" : "max-w-3xl"
                        } w-72 md:w-full`}
                    >
                        <p className="text-md md:text-xl font-bold text-gray-800">
                            {alertMessage}
                        </p>

                        {!user && (
                            <div>
                                <button
                                    onClick={handleLoginRedirect}
                                    className="w-full bg-MAIN text-PrimFont py-2 rounded-md hover:bg-HOVER hover:text-MAIN transition mb-4 mt-4 font-lexend"
                                >
                                    Login Sekarang
                                </button>
                                <button
                                    onClick={handleCloseAlert}
                                    className="w-full text-THIRD py-2 rounded-md hover:text-black transition font-lexend"
                                >
                                    Tutup
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {Object.entries(groupedProducts)
                .sort(([categoryA], [categoryB]) => {
                    if (categoryA === "Best Seller") return -1;
                    if (categoryB === "Best Seller") return 1;
                    return 0;
                })
                .map(([category, products]) => (
                    <div key={category} id={products[0].categoryId}>
                        <h2 className="flex justify-center text-PrimFont text-3xl md:text-4xl font-lexend mt-8 mb-4">
                            {category}
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                            {products.map((product) => (
                                <div
                                    key={product.id}
                                    className="bg-white rounded-lg shadow-lg p-4 flex flex-col justify-between h-full hover:shadow-xl transition"
                                >
                                    <div>
                                        <img
                                            src={product.imageUrl}
                                            alt={product.name}
                                            className="h-36 w-full sm:h-48 md:h-60 object-cover rounded-md mb-4"
                                        />
                                        <h2 className="text-lg sm:text-xl font-jockey text-gray-800">
                                            {product.name}
                                        </h2>
                                        <p className="text-sm sm:text-base text-gray-600 mt-2">
                                            {product.description}
                                        </p>
                                        <p className="text-black font-bold mt-4 text-sm sm:text-base">
                                            Rp {parseInt(product.price).toLocaleString()}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => handleAddToCart(product)}
                                        className="mt-4 w-full bg-MAIN text-PrimFont py-2 rounded-md hover:bg-HOVER hover:text-MAIN transition font-lexend text-sm sm:text-base"
                                    >
                                        Masukkan Keranjang
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default Menus;
