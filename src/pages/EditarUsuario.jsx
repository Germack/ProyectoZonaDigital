import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditarUsuario() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);
    const [guardando, setGuardando] = useState(false);
    const [error, setError] = useState(null);
    const [modoEdicion, setModoEdicion] = useState(false);

    // Estados del formulario
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: "user"
    });

    useEffect(() => {
        cargarUsuario();
    }, [id]);

    const cargarUsuario = async () => {
        try {
            setLoading(true);
            setError(null);
            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/");
                return;
            }

            const respuesta = await fetch(`https://api-funval-g6.onrender.com/users/${id}`, {
                method: "GET",
                headers: {
                    "accept": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (!respuesta.ok) {
                if (respuesta.status === 401) {
                    localStorage.removeItem("token");
                    navigate("/");
                    return;
                }
                throw new Error(`Error ${respuesta.status}: No se pudo cargar el usuario`);
            }

            const data = await respuesta.json();
            localStorage.setItem("token", data.access_token);
            setUsuario(data);
            setFormData({
                name: data.name || "",
                email: data.email || "",
                role: data.role || "user"
            });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setGuardando(true);
            setError(null);
            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/");
                return;
            }

            const respuesta = await fetch(`https://api-funval-g6.onrender.com/users/${id}`, {
                method: "PUT",
                headers: {
                    "accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(formData)
            });

            if (!respuesta.ok) {
                if (respuesta.status === 401) {
                    localStorage.removeItem("token");
                    navigate("/");
                    return;
                }
                const errorData = await respuesta.json();
                throw new Error(errorData.message || "Error al actualizar el usuario");
            }

            alert("Usuario actualizado correctamente");
            setModoEdicion(false); // Volver al modo ver después de guardar
            await cargarUsuario(); // Recargar los datos actualizados

        } catch (err) {
            // Solo muestra error si no es un error de autenticación (que ya redirige)
            if (!err.message.includes("401")) {
                setError(err.message);
            }
        } finally {
            setGuardando(false);
        }
    };

    const handleCancelar = () => {
        if (modoEdicion) {
            if (window.confirm("¿Estás seguro de que deseas cancelar la edición? Los cambios no guardados se perderán.")) {
                // Restaurar los datos originales del usuario
                setFormData({
                    name: usuario.name || "",
                    email: usuario.email || "",
                    role: usuario.role || "user"
                });
                setModoEdicion(false);
            }
        } else {
            navigate("/users");
        }
    };

    const handleEditar = () => {
        setModoEdicion(true);
    };

    const getRoleDisplayName = (role) => {
        const roleMap = {
            'admin': 'Administrador',
            'cliente': 'Cliente',
            'user': 'Usuario'
        };
        return roleMap[role] || role;
    };

    const getRoleBadge = (role) => {
        const roleStyles = {
            admin: "bg-red-500/10 text-red-700 border-red-200",
            user: "bg-green-500/10 text-green-700 border-green-200",
            cliente: "bg-blue-500/10 text-blue-700 border-blue-200"
        };

        return (
            <span className={`px-3 py-1 text-sm font-semibold rounded-full border ${roleStyles[role] || roleStyles.user}`}>
                {getRoleDisplayName(role)}
            </span>
        );
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-linear-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mb-4"></div>
                    <div className="text-lg font-medium text-white">Cargando usuario...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-900 via-blue-900 to-slate-900 py-8">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-white">
                                {modoEdicion ? 'Editar Usuario' : 'Detalles del Usuario'}
                            </h1>
                            <p className="mt-2 text-sm text-slate-300">
                                {modoEdicion
                                    ? 'Modifica la información del usuario seleccionado'
                                    : 'Información detallada del usuario'
                                }
                            </p>
                        </div>
                        <div className="flex items-center space-x-3">
                            {!modoEdicion && (
                                <button
                                    onClick={handleEditar}
                                    className="bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center shadow-lg hover:shadow-cyan-500/25"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    Editar
                                </button>
                            )}
                            <button
                                onClick={handleCancelar}
                                className="text-slate-300 hover:text-white bg-slate-800/50 border border-slate-600 hover:border-slate-500 px-4 py-3 rounded-lg font-medium transition duration-200 flex items-center"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                {modoEdicion ? 'Cancelar' : 'Volver'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl backdrop-blur-sm">
                        <div className="flex items-center">
                            <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            <span className="text-red-300 font-medium">{error}</span>
                        </div>
                    </div>
                )}

                {/* Formulario */}
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 overflow-hidden shadow-2xl">
                    <form onSubmit={handleSubmit} className="p-6">
                        {/* Información de solo lectura cuando no está en modo edición */}
                        {!modoEdicion && (
                            <div className="mb-6 p-4 bg-slate-700/30 rounded-lg border border-slate-600">
                                <div className="flex items-center space-x-4">
                                    <div className="shrink-0 h-16 w-16 bg-linear-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                                        <span className="text-white font-bold text-xl">
                                            {(usuario.name || usuario.email).charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-white">{usuario.name || 'Nombre no disponible'}</h3>
                                        <p className="text-slate-300">{usuario.email}</p>
                                        <div className="mt-2">
                                            {getRoleBadge(usuario.role)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Campo Nombre */}
                        <div className="mb-6">
                            <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                                Nombre Completo {modoEdicion && '*'}
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                disabled={!modoEdicion}
                                className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 transition duration-200 ${modoEdicion
                                    ? 'border-slate-600 bg-slate-700/50 text-white focus:ring-cyan-500 focus:border-cyan-500'
                                    : 'border-slate-700 bg-slate-800/30 text-slate-300 cursor-not-allowed'
                                    }`}
                                placeholder="Ingresa el nombre completo"
                                required={modoEdicion}
                            />
                        </div>

                        {/* Campo Email */}
                        <div className="mb-6">
                            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                                Correo Electrónico {modoEdicion && '*'}
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                disabled={!modoEdicion}
                                className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 transition duration-200 ${modoEdicion
                                    ? 'border-slate-600 bg-slate-700/50 text-white focus:ring-cyan-500 focus:border-cyan-500'
                                    : 'border-slate-700 bg-slate-800/30 text-slate-300 cursor-not-allowed'
                                    }`}
                                placeholder="Ingresa el correo electrónico"
                                required={modoEdicion}
                            />
                        </div>

                        {/* Campo Rol */}
                        <div className="mb-8">
                            <label htmlFor="role" className="block text-sm font-medium text-slate-300 mb-2">
                                Rol del Usuario {modoEdicion && '*'}
                            </label>
                            <select
                                id="role"
                                name="role"
                                value={formData.role}
                                onChange={handleInputChange}
                                disabled={!modoEdicion}
                                className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 transition duration-200 ${modoEdicion
                                    ? 'border-slate-600 bg-slate-700/50 text-white focus:ring-cyan-500 focus:border-cyan-500'
                                    : 'border-slate-700 bg-slate-800/30 text-slate-300 cursor-not-allowed'
                                    }`}
                            >
                                <option value="admin">Administrador</option>
                                <option value="cliente">Cliente</option>
                            </select>
                            {modoEdicion && (
                                <p className="mt-1 text-sm text-slate-400">
                                    Los administradores tienen acceso completo al sistema
                                </p>
                            )}
                        </div>

                        {/* Botones de acción - Solo se muestran en modo edición */}
                        {modoEdicion && (
                            <div className="flex justify-end space-x-4 pt-6 border-t border-slate-700">
                                <button
                                    type="button"
                                    onClick={handleCancelar}
                                    className="px-6 py-3 border border-slate-600 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white font-medium transition duration-200"
                                    disabled={guardando}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={guardando}
                                    className="px-6 py-3 bg-linear-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:from-cyan-600 hover:to-blue-700 font-medium transition duration-200 flex items-center disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-cyan-500/25"
                                >
                                    {guardando ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                            Guardando...
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            Guardar Cambios
                                        </>
                                    )}
                                </button>
                            </div>
                        )}
                    </form>
                </div>


            </div>
        </div>
    );
}