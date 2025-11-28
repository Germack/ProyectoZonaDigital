import React from 'react';

const ProductsTable = ({
    productos,
    filteredProductos,
    searchTerm,
    categoryFilter,
    onEditProduct,
    onDeleteProduct,
    currentPage,
    totalPages,
    indexOfFirstProduct,
    indexOfLastProduct,
    onPaginate
}) => {
    const formatearPrecio = (precio) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
        }).format(precio);
    };



    if (productos.length === 0) {
        return (
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 text-center">
                <div className="text-6xl mb-4">🚀</div>
                <h3 className="text-xl font-semibold text-white mb-2">
                    {searchTerm || categoryFilter !== "all"
                        ? "No se encontraron productos"
                        : "Tu catálogo está vacío"
                    }
                </h3>
                <p className="text-slate-400">
                    {searchTerm || categoryFilter !== "all"
                        ? "Intenta ajustar los filtros de búsqueda"
                        : "Comienza agregando tu primer producto tecnológico"
                    }
                </p>
            </div>
        );
    }

    return (
        <>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 overflow-hidden mb-6">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-700">
                        <thead className="bg-slate-700/50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                                    Producto
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                                    Categoría
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                                    Precio
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                                    Stock
                                </th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-300 uppercase tracking-wider">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700">
                            {productos.map((producto) => (
                                <tr key={producto.id} className="hover:bg-slate-700/30 transition duration-150 group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="shrink-0 h-12 w-12 bg-linear-to-br from-cyan-500 to-blue-600 rounded-lg overflow-hidden shadow-lg group-hover:scale-105 transition-transform duration-300">
                                                {producto.image_url ? (
                                                    <img
                                                        src={producto.image_url}
                                                        alt={producto.name}
                                                        className="h-12 w-12 object-cover"
                                                    />
                                                ) : (
                                                    <div className="h-12 w-12 bg-linear-to-br from-slate-600 to-slate-700 flex items-center justify-center">
                                                        <span className="text-white text-lg">📷</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors">
                                                    {producto.name}
                                                </div>
                                                <div className="text-sm text-slate-400 line-clamp-1">
                                                    {producto.description}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-slate-700 text-slate-300">
                                            {producto.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-cyan-400">
                                        {formatearPrecio(producto.price)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${(producto.stock || 0) > 0
                                            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                            : 'bg-red-500/20 text-red-400 border border-red-500/30'
                                            }`}>
                                            {producto.stock || 0} unidades
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end space-x-2">
                                            <button
                                                onClick={() => onEditProduct(producto)}
                                                className="inline-flex items-center px-3 py-2 rounded-lg text-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-500/50 transition duration-200 group"
                                            >
                                                <svg className="w-4 h-4 mr-1 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                                Editar
                                            </button>
                                            <button
                                                onClick={() => onDeleteProduct(producto.id)}
                                                className="inline-flex items-center px-3 py-2 rounded-lg text-red-400 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/50 transition duration-200 group"
                                            >
                                                <svg className="w-4 h-4 mr-1 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                                Eliminar
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            {filteredProductos.length > 0 && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-sm text-slate-400">
                        Mostrando {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, filteredProductos.length)} de {filteredProductos.length} productos
                    </div>

                    <div className="flex items-center space-x-2">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <button
                                key={page}
                                onClick={() => onPaginate(page)}
                                className={`px-3 py-2 text-sm font-medium rounded-lg transition duration-200 ${currentPage === page
                                    ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/25'
                                    : 'text-slate-400 bg-slate-700/50 hover:bg-slate-700 border border-slate-600 hover:border-slate-500'
                                    }`}
                            >
                                {page}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductsTable;