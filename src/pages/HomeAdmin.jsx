import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function HomeAdmin() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    activeOrders: 0
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    async function traerPerfil() {
      try {
        setLoading(true);
        const respuesta = await fetch(
          "https://api-funval-g6.onrender.com/auth/me",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!respuesta.ok) {
          throw new Error("Error al cargar el perfil");
        }

        const data = await respuesta.json();
        setUser(data);

        // Simular estadísticas (puedes reemplazar con llamadas reales a tu API)
        setStats({
          totalUsers: 150,
          totalProducts: 45,
          activeOrders: 23
        });

      } catch (error) {
        setError("No se pudo cargar la información del usuario");
      } finally {
        setLoading(false);
      }
    }
    traerPerfil();
  }, [navigate]);

  function cerrarSesion() {
    const confirmacion = window.confirm("¿Estás seguro de que deseas cerrar sesión?");
    if (confirmacion) {
      localStorage.clear();
      navigate("/");
    }
  }

  function goUsers() {
    navigate("/users");
  }

  function goClientView() {
    navigate("/cliente");
  }

  function goProducts() {
    navigate("/gestion-productos");
  }

  function goPerfil() {
    navigate("/perfil");
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
          <div className="text-lg font-medium text-white">Cargando dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo y título */}
            <div className="flex items-center">
              <div className="bg-blue-500 w-8 h-8 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <h1 className="text-xl font-bold text-white">TechStore Admin</h1>
            </div>

            {/* Información del usuario */}
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-300">{user.name}</p>
                <p className="text-xs text-gray-400">{user.email}</p>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${user.role === 'admin'
                ? 'bg-red-100 text-red-800'
                : 'bg-green-100 text-green-800'
                }`}>
                {user.role}
              </div>
              <button
                onClick={cerrarSesion}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition duration-200 flex items-center text-sm"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Salir
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            Bienvenido, {user.name}
          </h2>
          <p className="text-gray-400">
            Panel de administración de TechStore - Gestiona tu tienda desde aquí
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Usuarios</p>
                <p className="text-2xl font-bold text-white">{stats.totalUsers}</p>
              </div>
              <div className="bg-blue-500 p-3 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-green-500 transition duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Productos</p>
                <p className="text-2xl font-bold text-white">{stats.totalProducts}</p>
              </div>
              <div className="bg-green-500 p-3 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Órdenes Activas</p>
                <p className="text-2xl font-bold text-white">{stats.activeOrders}</p>
              </div>
              <div className="bg-purple-500 p-3 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-white mb-4">Acciones Rápidas</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={goPerfil}
              className="bg-purple-600 hover:bg-purple-700 text-white p-6 rounded-xl transition duration-200 text-left group"
            >
              <div className="flex items-center justify-between mb-3">
                <svg className="w-8 h-8 text-purple-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <svg className="w-5 h-5 text-purple-200 opacity-0 group-hover:opacity-100 transition duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <h4 className="font-semibold text-lg mb-1">Ver Perfil</h4>
              <p className="text-purple-200 text-sm">Ver mi Perfil de Usuario</p>
            </button>
            <button
              onClick={goUsers}
              className="bg-blue-600 hover:bg-blue-700 text-white p-6 rounded-xl transition duration-200 text-left group"
            >
              <div className="flex items-center justify-between mb-3">
                <svg className="w-8 h-8 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
                <svg className="w-5 h-5 text-blue-200 opacity-0 group-hover:opacity-100 transition duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <h4 className="font-semibold text-lg mb-1">Gestión de Usuarios</h4>
              <p className="text-blue-200 text-sm">Administrar usuarios del sistema</p>
            </button>

            <button
              onClick={goProducts}
              className="bg-green-600 hover:bg-green-700 text-white p-6 rounded-xl transition duration-200 text-left group"
            >
              <div className="flex items-center justify-between mb-3">
                <svg className="w-8 h-8 text-green-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <svg className="w-5 h-5 text-green-200 opacity-0 group-hover:opacity-100 transition duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <h4 className="font-semibold text-lg mb-1">Productos</h4>
              <p className="text-green-200 text-sm">Gestionar catálogo de productos</p>
            </button>

            <button
              onClick={goClientView}
              className="bg-purple-600 hover:bg-purple-700 text-white p-6 rounded-xl transition duration-200 text-left group"
            >
              <div className="flex items-center justify-between mb-3">
                <svg className="w-8 h-8 text-purple-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <svg className="w-5 h-5 text-purple-200 opacity-0 group-hover:opacity-100 transition duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <h4 className="font-semibold text-lg mb-1">Vista Cliente</h4>
              <p className="text-purple-200 text-sm">Ver tienda como cliente</p>
            </button>


          </div>
        </div>


      </main>

      {/* Error Message */}
      {error && (
        <div className="fixed bottom-4 right-4 bg-red-600 text-white p-4 rounded-lg shadow-lg max-w-sm">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        </div>
      )}
    </div>
  );
}