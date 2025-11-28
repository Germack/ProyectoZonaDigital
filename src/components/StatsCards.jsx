import React from 'react';

const StatsCards = ({ productos, categories }) => {
    // Filtrar productos solo por las categorías permitidas
    const filteredProducts = productos.filter(producto =>
        categories.includes(producto.category)
    );

    const stats = {
        total: filteredProducts.length,
        inStock: filteredProducts.filter(p => (p.stock || 0) > 0).length,
        outOfStock: filteredProducts.filter(p => (p.stock || 0) === 0).length,
        technology: filteredProducts.filter(p => p.category === 'technology').length,
        audio: filteredProducts.filter(p => p.category === 'audio').length,
        celulares: filteredProducts.filter(p => p.category === 'celulares').length,
        computadoras: filteredProducts.filter(p => p.category === 'computadoras').length,
        videojuegos: filteredProducts.filter(p => p.category === 'videojuegos').length
    };

    const statCards = [
        {
            title: "Total Productos",
            value: stats.total,
            color: "from-blue-500 to-cyan-500",
            bgColor: "bg-linear-to-r from-blue-500/10 to-cyan-500/10",
            description: "En categorías especializadas"
        },
        {
            title: "En Stock",
            value: stats.inStock,
            color: "from-green-500 to-emerald-500",
            bgColor: "bg-linear-to-r from-green-500/10 to-emerald-500/10",
            description: "Disponibles para venta"
        },
        {
            title: "Audio",
            value: stats.audio,
            color: "from-purple-500 to-pink-500",
            bgColor: "bg-linear-to-r from-purple-500/10 to-pink-500/10",
            description: "Equipos de sonido"
        },
        {
            title: "Videojuegos",
            value: stats.videojuegos,
            color: "from-orange-500 to-red-500",
            bgColor: "bg-linear-to-r from-orange-500/10 to-red-500/10",
            description: "Gaming y entretenimiento"
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statCards.map((stat, index) => (
                <div
                    key={index}
                    className={`${stat.bgColor} backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition duration-300 group`}
                >
                    <div className="flex items-center justify-between mb-3">
                        <div>
                            <p className="text-slate-400 text-sm font-medium mb-1">{stat.title}</p>
                            <p className="text-3xl font-bold text-white">{stat.value}</p>
                        </div>

                    </div>
                    <p className="text-slate-400 text-xs">{stat.description}</p>
                    <div className="mt-3 h-1 bg-white/10 rounded-full overflow-hidden">
                        <div
                            className={`h-full bg-linear-to-r ${stat.color} rounded-full transition-all duration-1000`}
                            style={{ width: `${(stat.value / Math.max(stats.total, 1)) * 100}%` }}
                        ></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StatsCards;