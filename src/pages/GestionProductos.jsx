import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StatsCards from "../components/StatsCards";
import SearchFilters from "../components/SearchFilters";
import ProductsTable from "../components/ProductsTable";
import ProductModal from "../components/ProductModal";

export default function GestionProductos() {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [productsPerPage] = useState(10);
    const [stats, setStats] = useState({
        total: 0,
        totalValue: 0,
        lowStock: 0
    });
    const navigate = useNavigate();

    const categories = [
        "technology",
        "audio",
        "celulares",
        "computadoras",
        "videojuegos",
    ];

    const categoryIcons = {
        'technology': '💻',
        'audio': '🎧',
        'celulares': '📱',
        'computadoras': '🖥️',
        'videojuegos': '🎮',
        'all': '📦'
    };

    const getCategoryDisplayName = (category) => {
        const categoryMap = {
            'technology': 'Tecnología',
            'audio': 'Audio',
            'celulares': 'Celulares',
            'computadoras': 'Computadoras',
            'videojuegos': 'Videojuegos'
        };
        return categoryMap[category] || category;
    };

    useEffect(() => {
        verificarAutenticacion();
    }, []);

    useEffect(() => {
        calculateStats();
    }, [productos]);

    const calculateStats = () => {
        const total = productos.length;
        const totalValue = productos.reduce((sum, product) => sum + (product.price * product.stock), 0);
        const lowStock = productos.filter(product => product.stock < 10).length;

        setStats({ total, totalValue, lowStock });
    };

    const verificarAutenticacion = () => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/");
            return;
        }
        cargarProductos(token);
    };

    const cargarProductos = async (token) => {
        try {
            setLoading(true);
            setError(null);
            const respuesta = await fetch("https://api-funval-g6.onrender.com/products/?skip=0", {
                method: "GET",
                headers: {
                    "accept": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (!respuesta.ok) {
                throw new Error(`Error ${respuesta.status}: No se pudieron cargar los productos`);
            }

            const data = await respuesta.json();
            setProductos(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Filtrar productos - Solo mostrar productos de las categorías especificadas
    const filteredProductos = productos.filter(producto => {
        const matchesSearch = producto.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            producto.description?.toLowerCase().includes(searchTerm.toLowerCase());

        // Si el filtro es "all", mostrar solo productos de las categorías permitidas
        const allowedCategories = categories;
        const matchesAllowedCategory = allowedCategories.includes(producto.category);

        // Aplicar filtro de categoría seleccionada
        const matchesSelectedCategory = categoryFilter === "all" || producto.category === categoryFilter;

        return matchesSearch && matchesAllowedCategory && matchesSelectedCategory;
    });

    // Paginación
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProductos.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProductos.length / productsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, categoryFilter]);

    const handleInicio = () => {
        navigate("/homeAdmin");
    };

    const abrirCrearModal = () => {
        setEditingProduct(null);
        setShowModal(true);
    };

    const abrirEditarModal = (producto) => {
        setEditingProduct(producto);
        setShowModal(true);
    };

    const cerrarModal = () => {
        setShowModal(false);
        setEditingProduct(null);
    };

    const onProductoGuardado = () => {
        const token = localStorage.getItem("token");
        cargarProductos(token);
        cerrarModal();
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-linear-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
                <div className="flex flex-col items-center">
                    <div className="relative">
                        <div className="w-16 h-16 border-4 border-cyan-400/30 rounded-full"></div>
                        <div className="w-16 h-16 border-4 border-transparent border-t-cyan-400 rounded-full absolute top-0 left-0 animate-spin"></div>
                    </div>
                    <div className="mt-4 text-lg font-medium text-white">Cargando catálogo...</div>
                    <div className="text-cyan-300 text-sm mt-2">TechStore Pro</div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-900 via-blue-900 to-purple-900">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[radial-linear(ellipse_at_center,var(--tw-linear-stops))] from-cyan-500/10 via-transparent to-transparent"></div>

            {/* Header */}
            <div className="relative bg-slate-900/80 backdrop-blur-xl border-b border-cyan-500/20 shadow-2xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div className="flex items-center space-x-6">
                            <button
                                onClick={handleInicio}
                                className="flex items-center text-cyan-300 hover:text-white transition-all duration-300 group bg-cyan-500/10 hover:bg-cyan-500/20 px-4 py-2 rounded-xl border border-cyan-500/20"
                            >
                                <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Dashboard
                            </button>
                            <div className="flex items-center space-x-3">
                                <div className="p-3 bg-linear-to-r from-cyan-500 to-blue-600 rounded-2xl shadow-lg">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                    </svg>
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                                        Gestión de Productos
                                    </h1>
                                    <p className="text-cyan-200/80 font-light">Catálogo exclusivo de tecnología</p>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={abrirCrearModal}
                            className="group relative bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center shadow-2xl hover:shadow-cyan-500/30 transform hover:-translate-y-1"
                        >
                            <div className="absolute inset-0 bg-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <svg className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Nuevo Producto
                        </button>
                    </div>
                </div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/20 shadow-xl">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-cyan-300 font-light">Total Productos</p>
                                <p className="text-3xl font-bold text-white mt-2">{stats.total}</p>
                            </div>
                            <div className="p-3 bg-cyan-500/20 rounded-xl">
                                <span className="text-2xl">📦</span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl p-6 border border-blue-500/20 shadow-xl">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-blue-300 font-light">Valor Total</p>
                                <p className="text-3xl font-bold text-white mt-2">
                                    ${stats.totalValue.toLocaleString()}
                                </p>
                            </div>
                            <div className="p-3 bg-blue-500/20 rounded-xl">
                                <span className="text-2xl">💰</span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl p-6 border border-orange-500/20 shadow-xl">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-orange-300 font-light">Stock Bajo</p>
                                <p className="text-3xl font-bold text-white mt-2">{stats.lowStock}</p>
                            </div>
                            <div className="p-3 bg-orange-500/20 rounded-xl">
                                <span className="text-2xl">⚠️</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search and Filters */}
                <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 shadow-xl mb-8">
                    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                        <div className="flex-1 w-full">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="🔍 Buscar productos por nombre o descripción..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full px-6 py-4 bg-slate-700/50 border border-slate-600 rounded-2xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-slate-400 transition-all duration-300 text-lg"
                                />
                            </div>
                        </div>
                        <div className="flex gap-4 w-full lg:w-auto">
                            <select
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                                className="px-6 py-4 bg-slate-700/50 border border-slate-600 rounded-2xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white transition-all duration-300"
                            >
                                <option value="all" className="bg-slate-800">
                                    {categoryIcons.all} Todas las categorías
                                </option>
                                {categories.map(category => (
                                    <option key={category} value={category} className="bg-slate-800">
                                        {categoryIcons[category]} {getCategoryDisplayName(category)}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-6 p-6 bg-red-500/10 border border-red-500/30 rounded-2xl backdrop-blur-xl shadow-lg">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="p-2 bg-red-500/20 rounded-lg mr-4">
                                    <svg className="w-6 h-6 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <span className="text-red-300 font-medium block">{error}</span>
                                    <span className="text-red-400/70 text-sm">No se pudieron cargar los productos</span>
                                </div>
                            </div>
                            <button
                                onClick={() => verificarAutenticacion()}
                                className="bg-red-500/20 hover:bg-red-500/30 text-red-300 px-6 py-3 rounded-xl transition duration-300 border border-red-500/30"
                            >
                                Reintentar
                            </button>
                        </div>
                    </div>
                )}

                {/* Products Table */}
                <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden">
                    <ProductsTable
                        productos={currentProducts}
                        filteredProductos={filteredProductos}
                        searchTerm={searchTerm}
                        categoryFilter={categoryFilter}
                        onEditProduct={abrirEditarModal}
                        onDeleteProduct={(id) => {
                            const token = localStorage.getItem("token");
                            eliminarProducto(id, token);
                        }}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        indexOfFirstProduct={indexOfFirstProduct}
                        indexOfLastProduct={indexOfLastProduct}
                        onPaginate={paginate}
                    />
                </div>

                {/* Footer Info */}
                <div className="mt-8 text-center">
                    <p className="text-cyan-300/60 text-sm">
                        💻 TechStore Pro - Sistema de Gestión de Inventario
                        <span className="mx-2">•</span>
                        {new Date().getFullYear()}
                    </p>
                </div>
            </div>

            {/* Modal */}
            <ProductModal
                show={showModal}
                onClose={cerrarModal}
                product={editingProduct}
                onSave={onProductoGuardado}
                categories={categories}
            />
        </div>
    );

    async function eliminarProducto(productoId, token) {
        if (!window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
            return;
        }

        try {
            setError(null);
            const respuesta = await fetch(`https://api-funval-g6.onrender.com/products/${productoId}`, {
                method: "DELETE",
                headers: {
                    "accept": "*/*",
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (!respuesta.ok) {
                throw new Error("Error al eliminar el producto");
            }

            await cargarProductos(token);
        } catch (err) {
            setError(err.message);
        }
    }
}