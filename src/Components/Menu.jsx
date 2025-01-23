import React, { useEffect, useState } from 'react';
import { MainAPI } from '../API/BaseURL';

const Menus = ({ addItemToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await MainAPI.get('/products');
        const data = response.data;
        const productsArray = Array.isArray(data) ? data : data.data || [];
        const mappedProducts = productsArray.map((product) => ({
          id: product.id,
          name: product.name,
          price: product.price,
          description: product.description,
          imageUrl: product.images?.[0]?.url || '',
        }));
        setProducts(mappedProducts);
      } catch (err) {
        console.error('Error fetching products:', err.message);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    addItemToCart(product);
    setAlertMessage(`${product.name} berhasil ditambahkan ke keranjang`);
    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
    }, 1000);
  };

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
    <div className="p-6 bg-MAIN relative">
      {/* Alert */}
      {showAlert && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md shadow-lg text-center">
            <p className="text-xl font-bold text-gray-800">{alertMessage}</p>
          </div>
        </div>
      )}

      <div className="flex justify-center items-center">
        <h1 className="text-white font-lexend text-4xl mt-5 mb-10">
          <span className="text-PrimFont">Menu</span> Kami
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
          key={product.id}
          className="bg-white rounded-lg shadow-lg p-4 flex flex-col justify-between h-full hover:shadow-xl transition">
          <div>
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-60 object-cover rounded-md mb-4"
            />
            <h2 className="text-xl font-jockey text-gray-800">{product.name}</h2>
            <p className="text-gray-600 mt-2">{product.description}</p>
            <p className="text-black font-bold mt-4">
              Rp {parseInt(product.price).toLocaleString()}
            </p>
          </div>
          <button
            onClick={() => handleAddToCart(product)}
            className="mt-4 w-full bg-MAIN text-PrimFont py-2 rounded-md hover:bg-HOVER hover:text-MAIN transition font-lexend">
            Masukkan Keranjang
          </button>
        </div>
        ))}
      </div>
    </div>
  );
};

export default Menus;