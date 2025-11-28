import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CardsProducts() {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [paginaActual, setPaginaActual] = useState(0);
    const [totalProductos, setTotalProductos] = useState(0);
    const navigate = useNavigate();

    const productosPorPagina = 10;

    const [categoryFilter, setCategoryFilter] = useState("all");
    const categories = ["technology", "audio", "celulares", "computadoras", "laptops",  "videojuegos"]; // o las que tengas
    const categoryIcons = {
        all: "📦",
        technology: "💻",
        audio: "🎧",
        celulares: "",
        computadoras: "🖥️",
        laptops: "💻",
        videojuegos: "🎮"
    };

    const getCategoryDisplayName = (category) => {
    const names = {
        technology: "Tecnologia",
        audio: "Audio",
        celulares: "Celulares",
        computadoras: "Computadoras",
        laptops: "Laptops",
        videojuegos: "Videojuegos"
    };
    return names[category] || category;
    };



    useEffect(() => {

    cargarProductos();
}, [paginaActual, categoryFilter]);


    const cargarProductos = async () => {
        try {
            setLoading(true);
            setError(null);

            const skip = paginaActual * productosPorPagina;
            const categoriaQuery = categoryFilter === "all" ? "" : `&category=${categoryFilter}`;


            const respuesta = await fetch(
                `https://api-funval-g6.onrender.com/products/?skip=${skip}&limit=${productosPorPagina}${categoriaQuery}`,
                {
                    method: "GET",
                    headers: {
                        "accept": "application/json",
                    },
                }
            );


            if (!respuesta.ok) {
                throw new Error(`Error ${respuesta.status}: No se pudieron cargar los productos`);
            }

            const data = await respuesta.json();
            setProductos(data);

            if (paginaActual === 0) {
                setTotalProductos(data.length >= productosPorPagina ? 100 : data.length);
            }

            console.log("Productos cargados:", data);
        } catch (err) {
            setError(err.message);
            console.error("Error cargando productos:", err);
        } finally {
            setLoading(false);
        }
    };

    const formatearPrecio = (precio) => {
        if (!precio) return "$ 0";
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(precio);
    };

    const handleVerDetalles = (productoId) => {
        navigate(`/producto/${productoId}`);
    };

    const handleAgregarCarrito = (producto) => {
        console.log("Agregar al carrito:", producto);
        alert(`"${producto.name}" agregado al carrito`);
    };

    const handlePaginaSiguiente = () => {
        setPaginaActual(paginaActual + 1);
    };

    const handlePaginaAnterior = () => {
        if (paginaActual > 0) {
            setPaginaActual(paginaActual - 1);
        }
    };

    const totalPaginas = Math.ceil(totalProductos / productosPorPagina);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                    <div className="text-lg font-medium text-gray-600">Cargando productos...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-red-500 text-xl font-semibold mb-4">Error al cargar productos</div>
                    <div className="text-gray-600 mb-4">{error}</div>
                    <button
                        onClick={cargarProductos}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition duration-200"
                    >
                        Reintentar
                    </button>
                </div>
            </div>
        );
    }

    if (categoryFilter === "all") {
    return (
        <div className="min-h-screen bg-gray-50 py-8 flex flex-col items-center justify-start">
            
            {/* Select visible */}
            <div className="mb-6 w-full flex justify-center">
                <select
                    value={categoryFilter}
                    onChange={(e) => {
                        setCategoryFilter(e.target.value);
                        setPaginaActual(0);
                    }}
                    className="px-6 py-4 bg-white text-black border border-slate-600 rounded-2xl
                               focus:ring-2 focus:ring-gray-600 transition-all duration-300"
                >
                    <option value="all">📦 Selecciona una categoría</option>

                    {categories.map(category => (
                        <option key={category} value={category}>
                            {categoryIcons[category]} {getCategoryDisplayName(category)}
                        </option>
                    ))}
                </select>
            </div>

            {/* Mensaje */}
            <p className="text-gray-600 text-lg mt-10">
                Por favor, elige una categoría para ver los productos.
            </p>
        </div>
        );
    }



    return (
        
        <div className="min-h-screen bg-gray-50 py-8">

        {/* 🔹 SEARCH & FILTERS: solo el div del select que pediste */}
        <div className="mb-6 flex gap-4 w-full lg:w-auto">
            <select
                value={categoryFilter}
                onChange={(e) => {
                    setCategoryFilter(e.target.value);
                    setPaginaActual(0);
                }}
                className="px-6 py-4 bg-white text-black border border-slate-600 rounded-2xl 
                           focus:ring-2 focus:ring-gray-600 focus:border-gray-600
                            transition-all duration-300"
            >
                <option value="all" className="bg-gray-200">
                    {categoryIcons.all} Todas las categorías
                </option>

                {categories.map(category => (
                    <option key={category} value={category} className="bg-gray-200">
                        {categoryIcons[category]} {getCategoryDisplayName(category)}
                    </option>
                ))}
            </select>
        </div>



            {/* Información de paginación */}
            <div className="mb-6 flex justify-between items-center">
                <div className="text-sm text-gray-600">
                    Mostrando {productos.length} productos de tecnología
                </div>
                <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600">
                        Página {paginaActual + 1} {totalPaginas > 0 && `de ${totalPaginas}`}
                    </span>
                </div>
            </div>

            {/* Grid de productos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {productos.map((producto) => (
                    <div
                        key={producto.id}
                        className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300 border border-gray-200"
                    >
                        {/* Imagen del producto */}
                        <div className="h-48 bg-gray-200 flex items-center justify-center">
                            {producto.image_url ? (
                                <img
                                    src={producto.image_url}
                                    alt={producto.name}
                                    className="h-full w-full object-cover"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'flex';
                                    }}
                                />
                            ) : null}
                            <div className={`text-gray-400 text-center ${producto.image_url ? 'hidden' : 'flex flex-col items-center justify-center'}`}>
                                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <p className="text-sm mt-2">Sin imagen</p>
                            </div>
                        </div>

                        {/* Contenido del producto */}
                        <div className="p-6">
                            {/* Categoría */}
                            {producto.category && (
                                <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full mb-2">
                                    {producto.category}
                                </span>
                            )}

                            {/* Nombre del producto */}
                            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                                {producto.name || 'Producto sin nombre'}
                            </h3>

                            {/* Descripción */}
                            {producto.description && (
                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                    {producto.description}
                                </p>
                            )}

                            {/* Precio */}
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-2xl font-bold text-green-600">
                                    {formatearPrecio(producto.price)}
                                </span>
                                <span className={`text-sm font-medium px-2 py-1 rounded-full ${(producto.stock || 0) > 0
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                                    }`}>
                                    {(producto.stock || 0) > 0 ? `${producto.stock} en stock` : 'Agotado'}
                                </span>
                            </div>

                            {/* Rating */}
                            {producto.rating && (
                                <div className="flex items-center mb-4">
                                    <div className="flex text-yellow-400">
                                        {[...Array(5)].map((_, i) => (
                                            <svg
                                                key={i}
                                                className={`w-4 h-4 ${i < Math.floor(producto.rating || 0)
                                                    ? 'fill-current'
                                                    : 'text-gray-300'
                                                    }`}
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <span className="ml-2 text-sm text-gray-600">
                                        {producto.rating} ({producto.review_count || 0} reviews)
                                    </span>
                                </div>
                            )}

                            {/* Botones de acción */}
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => handleVerDetalles(producto.id)}
                                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg transition duration-200 text-sm"
                                >
                                    Ver detalles
                                </button>
                                <button
                                    onClick={() => handleAgregarCarrito(producto)}
                                    disabled={(producto.stock || 0) === 0}
                                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {(producto.stock || 0) === 0 ? 'Agotado' : 'Agregar'}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Mensaje si no hay productos */}
            {productos.length === 0 && (
                <div className="text-center py-12">
                    <div className="text-gray-500 text-lg">No se encontraron productos de tecnología</div>
                    <p className="text-gray-400 mt-2">Intenta cambiar de página</p>
                </div>
            )}

            {/* Controles de paginación */}
            {productos.length > 0 && (
                <div className="flex justify-center items-center space-x-4">
                    <button
                        onClick={handlePaginaAnterior}
                        disabled={paginaActual === 0}
                        className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Anterior
                    </button>

                    <span className="text-sm text-gray-600">
                        Página {paginaActual + 1} {totalPaginas > 0 && `de ${totalPaginas}`}
                    </span>

                    <button
                        onClick={handlePaginaSiguiente}
                        disabled={productos.length < productosPorPagina}
                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Siguiente
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );
}