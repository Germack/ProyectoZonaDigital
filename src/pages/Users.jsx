import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Users() {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(10);
    const navigate = useNavigate();

    useEffect(() => {
        verificarAutenticacion();
    }, []);

    const verificarAutenticacion = () => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/");
            return;
        }
        cargarUsuarios(token);
    };

    const cargarUsuarios = async (token) => {
        try {
            setLoading(true);
            setError(null);
            const respuesta = await fetch("https://api-funval-g6.onrender.com/users/", {
                method: "GET",
                headers: {
                    "accept": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (!respuesta.ok) {
                throw new Error(`Error ${respuesta.status}: No se pudieron cargar los usuarios`);
            }

            const data = await respuesta.json();
            setUsuarios(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Filtrar usuarios basado en búsqueda y filtro de rol
    const filteredUsuarios = usuarios.filter(usuario => {
        const matchesSearch = usuario.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            usuario.email?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = roleFilter === "all" || usuario.role === roleFilter;
        return matchesSearch && matchesRole;
    });

    // Calcular paginación
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsuarios.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(filteredUsuarios.length / usersPerPage);

    // Cambiar página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };
    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Resetear página cuando se cambian los filtros
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, roleFilter]);

    const handleEditar = (usuario) => {
        navigate(`/editar-usuario/${usuario.id}`);
    };

    const handleVer = (usuario) => {
        navigate(`/editar-usuario/${usuario.id}`);
    };

    const handleInicio = () => {
        navigate("/homeAdmin");
    };

    const handleCrearUsuario = () => {
        navigate("/newuser");
    };

    const getRoleBadge = (role) => {
        const roleStyles = {
            admin: "bg-red-500/10 text-red-400 border-red-400/30",
            user: "bg-green-500/10 text-green-400 border-green-400/30",
            cliente: "bg-blue-500/10 text-blue-400 border-blue-400/30",
            moderator: "bg-purple-500/10 text-purple-400 border-purple-400/30"
        };

        return (
            <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${roleStyles[role] || roleStyles.user}`}>
                {role?.charAt(0).toUpperCase() + role?.slice(1) || 'User'}
            </span>
        );
    };

    const getStatusBadge = (usuario) => {
        return (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-400/30">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-1"></span>
                Activo
            </span>
        );
    };

    const formatFecha = (fechaString) => {
        if (!fechaString) return 'No disponible';
        try {
            return new Date(fechaString).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        } catch {
            return 'Fecha inválida';
        }
    };

    // Estadísticas
    const stats = {
        total: usuarios.length,
        admins: usuarios.filter(u => u.role === 'admin').length,
        clients: usuarios.filter(u => u.role === 'cliente').length
    };

    // Generar números de página para la paginación
    const getPageNumbers = () => {
        const pageNumbers = [];
        const maxPagesToShow = 5;

        if (totalPages <= maxPagesToShow) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            const startPage = Math.max(1, currentPage - 2);
            const endPage = Math.min(totalPages, currentPage + 2);

            if (startPage > 1) {
                pageNumbers.push(1);
                if (startPage > 2) pageNumbers.push('...');
            }

            for (let i = startPage; i <= endPage; i++) {
                pageNumbers.push(i);
            }

            if (endPage < totalPages) {
                if (endPage < totalPages - 1) pageNumbers.push('...');
                pageNumbers.push(totalPages);
            }
        }

        return pageNumbers;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-linear-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mb-4"></div>
                    <div className="text-lg font-medium text-white">Cargando usuarios...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-900 via-blue-900 to-slate-900">
            {/* Header */}
            <div className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <button
                            onClick={handleInicio}
                            className="flex items-center text-slate-300 hover:text-white transition-all duration-200 group bg-slate-700/50 hover:bg-slate-700 px-4 py-2 rounded-lg border border-slate-600"
                        >
                            <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Volver al Dashboard
                        </button>
                        <div className="flex items-center space-x-3">
                            <div className="p-3 bg-linear-to-r from-cyan-500 to-blue-600 rounded-xl shadow-lg">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-white">Gestión de Usuarios</h1>
                                <p className="text-slate-400">Administra los usuarios del sistema</p>
                            </div>
                        </div>
                        <button
                            onClick={handleCrearUsuario}
                            className="bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center shadow-lg hover:shadow-cyan-500/25"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Nuevo Usuario
                        </button>
                    </div>
                </div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-300 font-medium">Total Usuarios</p>
                                <p className="text-3xl font-bold text-white mt-2">{stats.total}</p>
                            </div>
                            <div className="p-3 bg-cyan-500/20 rounded-lg">
                                <span className="text-2xl">👥</span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-300 font-medium">Administradores</p>
                                <p className="text-3xl font-bold text-white mt-2">{stats.admins}</p>
                            </div>
                            <div className="p-3 bg-red-500/20 rounded-lg">
                                <span className="text-2xl">🔐</span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-300 font-medium">Clientes</p>
                                <p className="text-3xl font-bold text-white mt-2">{stats.clients}</p>
                            </div>
                            <div className="p-3 bg-blue-500/20 rounded-lg">
                                <span className="text-2xl">👤</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search and Filters */}
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6 mb-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <svg className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Buscar usuarios por nombre o email..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-slate-400 transition duration-200"
                                />
                            </div>
                        </div>
                        <div className="sm:w-48">
                            <select
                                value={roleFilter}
                                onChange={(e) => setRoleFilter(e.target.value)}
                                className="w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white transition duration-200"
                            >
                                <option value="all" className="bg-slate-800">Todos los roles</option>
                                <option value="admin" className="bg-slate-800">Administradores</option>
                                <option value="cliente" className="bg-slate-800">Clientes</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl backdrop-blur-sm">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                                <span className="text-red-300 font-medium">{error}</span>
                            </div>
                            <button
                                onClick={() => verificarAutenticacion()}
                                className="text-sm bg-red-500/20 hover:bg-red-500/30 text-red-300 px-3 py-1 rounded-lg transition duration-200"
                            >
                                Reintentar
                            </button>
                        </div>
                    </div>
                )}

                {/* Users Table */}
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 overflow-hidden mb-6">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-700">
                            <thead className="bg-slate-700/50">
                                <tr>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                                        Usuario
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                                        Estado
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                                        Rol
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                                        Fecha de Registro
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-slate-300 uppercase tracking-wider">
                                        Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700">
                                {currentUsers.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center">
                                            <div className="flex flex-col items-center text-slate-400">
                                                <svg className="w-16 h-16 mb-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                                </svg>
                                                <p className="text-lg font-medium">No se encontraron usuarios</p>
                                                <p className="text-sm mt-1">
                                                    {searchTerm || roleFilter !== "all"
                                                        ? "Intenta ajustar los filtros de búsqueda"
                                                        : "Los usuarios aparecerán aquí una vez que se agreguen al sistema"
                                                    }
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    currentUsers.map((usuario) => (
                                        <tr key={usuario.id} className="hover:bg-slate-700/30 transition duration-150">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="shrink-0 h-10 w-10 bg-linear-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center shadow-sm">
                                                        <span className="text-white font-medium text-sm">
                                                            {(usuario.name || usuario.email).charAt(0).toUpperCase()}
                                                        </span>
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-semibold text-white">
                                                            {usuario.name || 'Nombre no disponible'}
                                                        </div>
                                                        <div className="text-sm text-slate-300">{usuario.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {getStatusBadge(usuario)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {getRoleBadge(usuario.role)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                                                {formatFecha(usuario.createdAt || usuario.created_at || usuario.fecha_creacion)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex justify-end space-x-2">
                                                    <button
                                                        onClick={() => handleVer(usuario)}
                                                        className="inline-flex items-center px-3 py-1.5 border border-slate-600 text-xs font-medium rounded-lg text-slate-300 bg-slate-700/50 hover:bg-slate-600 hover:text-white transition duration-200"
                                                    >
                                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                        </svg>
                                                        Ver
                                                    </button>
                                                    <button
                                                        onClick={() => handleEditar(usuario)}
                                                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-lg text-cyan-700 bg-cyan-500/20 hover:bg-cyan-500/30 transition duration-200"
                                                    >
                                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                        </svg>
                                                        Editar
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination */}
                {filteredUsuarios.length > 0 && (
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="text-sm text-slate-300">
                            Mostrando {indexOfFirstUser + 1}-{Math.min(indexOfLastUser, filteredUsuarios.length)} de {filteredUsuarios.length} usuarios
                        </div>

                        <div className="flex items-center space-x-1">
                            {/* Botón Anterior */}
                            <button
                                onClick={prevPage}
                                disabled={currentPage === 1}
                                className="flex items-center px-3 py-2 text-sm font-medium text-slate-300 bg-slate-800/50 border border-slate-600 rounded-lg hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
                            >
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                Anterior
                            </button>

                            {/* Números de página */}
                            <div className="flex items-center space-x-1">
                                {getPageNumbers().map((number, index) => (
                                    number === '...' ? (
                                        <span key={`ellipsis-${index}`} className="px-3 py-2 text-sm text-slate-400">
                                            ...
                                        </span>
                                    ) : (
                                        <button
                                            key={number}
                                            onClick={() => paginate(number)}
                                            className={`px-3 py-2 text-sm font-medium rounded-lg transition duration-200 ${currentPage === number
                                                ? 'bg-cyan-500 text-white'
                                                : 'text-slate-300 bg-slate-800/50 border border-slate-600 hover:bg-slate-700'
                                                }`}
                                        >
                                            {number}
                                        </button>
                                    )
                                ))}
                            </div>

                            {/* Botón Siguiente */}
                            <button
                                onClick={nextPage}
                                disabled={currentPage === totalPages}
                                className="flex items-center px-3 py-2 text-sm font-medium text-slate-300 bg-slate-800/50 border border-slate-600 rounded-lg hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
                            >
                                Siguiente
                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}