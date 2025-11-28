import React from 'react';

const SearchFilters = ({
    searchTerm,
    setSearchTerm,
    categoryFilter,
    setCategoryFilter,
    categories
}) => {

    const getCategoryDisplayName = (category) => {
        const displayNames = {
            technology: "Tecnología",
            audio: "Audio",
            celulares: "Celulares",
            computadoras: "Computadoras",
            videojuegos: "Videojuegos"
        };
        return displayNames[category] || category;
    };

    return (
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-6 mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                    <div className="relative">
                        <svg className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder=" Buscar en tecnología, audio, celulares, computadoras, videojuegos..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-slate-400 transition duration-200 backdrop-blur-sm"
                        />
                    </div>
                </div>
                <div className="lg:w-64">
                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white transition duration-200 backdrop-blur-sm"
                    >
                        <option value="all" className="bg-slate-800"> Todas las categorías</option>
                        {categories.map(category => (
                            <option key={category} value={category} className="bg-slate-800">
                                {getCategoryDisplayName(category)}
                            </option>
                        ))}
                    </select>
                </div>
            </div>


        </div>
    );
};



export default SearchFilters;