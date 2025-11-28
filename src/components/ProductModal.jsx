import React, { useState, useEffect } from 'react';

export default function ProductModal({ show, onClose, product, onSave, categories }) {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "technology",
        image_url: ""
    });
    const [uploadingImage, setUploadingImage] = useState(false);
    const [error, setError] = useState(null);

    // Actualizar formData cuando el producto cambie
    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name || "",
                description: product.description || "",
                price: product.price?.toString() || "",
                stock: product.stock?.toString() || "",
                category: product.category || "technology",
                image_url: product.image_url || ""
            });
        } else {
            // Resetear formData si no hay producto (modo crear)
            setFormData({
                name: "",
                description: "",
                price: "",
                stock: "",
                category: "technology",
                image_url: ""
            });
        }
    }, [product]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError(null);
            const token = localStorage.getItem("token");

            // Validar que los campos numéricos sean válidos
            const priceValue = parseFloat(formData.price);
            const stockValue = parseInt(formData.stock);

            if (isNaN(priceValue) || priceValue < 0) {
                throw new Error("El precio debe ser un número válido mayor o igual a 0");
            }

            if (isNaN(stockValue) || stockValue < 0) {
                throw new Error("El stock debe ser un número válido mayor o igual a 0");
            }

            const productoData = {
                name: formData.name,
                description: formData.description,
                price: priceValue,
                stock: stockValue,
                category: formData.category,
                image_url: formData.image_url
            };

            const url = product
                ? `https://api-funval-g6.onrender.com/products/${product.id}`
                : "https://api-funval-g6.onrender.com/products/";

            const method = product ? "PUT" : "POST";

            const respuesta = await fetch(url, {
                method,
                headers: {
                    "accept": "application/json",
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(productoData)
            });

            if (!respuesta.ok) {
                const errorData = await respuesta.json().catch(() => ({}));
                throw new Error(errorData.detail || errorData.message || `Error al ${product ? 'actualizar' : 'crear'} el producto`);
            }

            onSave();
        } catch (err) {
            setError(err.message);
        }
    };

    const subirImagen = async (file) => {
        try {
            setUploadingImage(true);
            const token = localStorage.getItem("token");
            const formData = new FormData();
            formData.append('file', file);

            const respuesta = await fetch("https://api-funval-g6.onrender.com/upload/", {
                method: "POST",
                headers: {
                    "accept": "application/json",
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
                body: formData
            });

            if (!respuesta.ok) {
                const errorData = await respuesta.json().catch(() => ({}));
                throw new Error(errorData.detail || errorData.message || "Error al subir la imagen");
            }

            const data = await respuesta.json();
            return data.url;
        } catch (err) {
            throw new Error(err.message);
        } finally {
            setUploadingImage(false);
        }
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validar tipo de archivo
            if (!file.type.startsWith('image/')) {
                setError("Por favor, selecciona un archivo de imagen válido");
                return;
            }

            // Validar tamaño (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setError("La imagen no debe superar los 5MB");
                return;
            }

            try {
                setError(null);
                const imageUrl = await subirImagen(file);
                setFormData(prev => ({ ...prev, image_url: imageUrl }));
            } catch (err) {
                setError(err.message);
            }
        }
    };

    const getCategoryDisplayName = (category) => {
        const categoryMap = {
            'technology': '🖥️ Tecnología',
            'audio': '🎧 Audio',
            'celulares': '📱 Celulares',
            'computadoras': '💻 Computadoras',
            'videojuegos': '🎮 Videojuegos'
        };
        return categoryMap[category] || category.charAt(0).toUpperCase() + category.slice(1);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-white">
                            {product ? '✏️ Editar Producto' : '🚀 Nuevo Producto'}
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-slate-400 hover:text-white transition duration-200 p-2 hover:bg-slate-700 rounded-lg"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                            <div className="flex items-center text-red-400 text-sm">
                                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                                {error}
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                📝 Nombre del Producto *
                            </label>
                            <input
                                type="text"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-slate-400 transition duration-200"
                                placeholder="Ej: MacBook Pro M2"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                📄 Descripción *
                            </label>
                            <textarea
                                name="description"
                                required
                                value={formData.description}
                                onChange={handleInputChange}
                                rows="3"
                                className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-slate-400 transition duration-200 resize-none"
                                placeholder="Describe las características del producto..."
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    💰 Precio (COP) *
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    required
                                    min="0"
                                    step="0.01"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-slate-400 transition duration-200"
                                    placeholder="0.00"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    📊 Stock *
                                </label>
                                <input
                                    type="number"
                                    name="stock"
                                    required
                                    min="0"
                                    value={formData.stock}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-slate-400 transition duration-200"
                                    placeholder="0"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                🗂️ Categoría *
                            </label>
                            <select
                                name="category"
                                required
                                value={formData.category}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white transition duration-200"
                            >
                                {categories.map(category => (
                                    <option key={category} value={category} className="bg-slate-800">
                                        {getCategoryDisplayName(category)}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                🖼️ Imagen del Producto
                            </label>
                            <div className="space-y-3">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-cyan-500 file:text-white hover:file:bg-cyan-600 transition duration-200"
                                />
                                {uploadingImage && (
                                    <div className="flex items-center text-cyan-400">
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-cyan-400 mr-2"></div>
                                        Subiendo imagen...
                                    </div>
                                )}
                                {formData.image_url && (
                                    <div className="flex items-center space-x-4 mt-2">
                                        <img
                                            src={formData.image_url}
                                            alt="Vista previa"
                                            className="h-24 w-24 object-cover rounded-lg border-2 border-cyan-500/50 shadow-lg"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setFormData(prev => ({ ...prev, image_url: "" }))}
                                            className="text-sm text-red-400 hover:text-red-300 transition duration-200"
                                        >
                                            Eliminar imagen
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-end space-x-3 pt-6 border-t border-slate-700">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-6 py-3 text-sm font-medium text-slate-300 bg-slate-700/50 border border-slate-600 rounded-xl hover:bg-slate-700 hover:text-white transition duration-200"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-3 text-sm font-medium text-white bg-linear-to-r from-cyan-500 to-blue-600 rounded-xl hover:from-cyan-600 hover:to-blue-700 transition duration-200 shadow-lg hover:shadow-cyan-500/25"
                            >
                                {product ? 'Actualizar' : 'Crear'} Producto
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}