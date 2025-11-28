import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CuentaNueva() {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [rol, setRol] = useState("cliente");
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [creando, setCreando] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Verificar si hay token y si el usuario es admin
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role === "admin") {
      setIsAdmin(true);
    }
    setLoading(false);
  }, []);

  async function enviarFormulario(e) {
    e.preventDefault();
    setError(null);
    setCreando(true);

    try {
      const userData = {
        email: correo,
        password: password,
        name: nombre,
      };

      // Si es admin, agregar el rol seleccionado
      if (isAdmin) {
        userData.role = rol;
      }

      const respuesta = await fetch(
        "https://api-funval-g6.onrender.com/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      const data = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(data.detail || data.message || "Error al crear el usuario");
      }

      alert("Usuario registrado con éxito");

      // Redirigir según el tipo de usuario
      if (isAdmin) {
        navigate("/users");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setCreando(false);
    }
  }

  const handleRegresar = () => {
    if (isAdmin) {
      navigate("/users");
    } else {
      navigate("/");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mb-4"></div>
          <div className="text-lg font-medium text-white">Verificando permisos...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-linear(ellipse_at_center,var(--tw-linear-stops))] from-cyan-500/10 via-transparent to-transparent"></div>

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-linear-to-r from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              {isAdmin ? "Crear Nuevo Usuario" : "Crear Cuenta"}
            </h1>
            <p className="text-slate-400">
              {isAdmin ? "Agrega un nuevo usuario al sistema" : "Completa tus datos para registrarte"}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl backdrop-blur-sm">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span className="text-red-300 text-sm font-medium">{error}</span>
              </div>
            </div>
          )}

          <form onSubmit={enviarFormulario} className="space-y-6">
            {/* Nombre Field */}
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium text-slate-300 mb-2">
                Nombre Completo *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  onChange={(e) => setNombre(e.target.value)}
                  value={nombre}
                  type="text"
                  id="nombre"
                  className="block w-full pl-10 pr-3 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition duration-200"
                  placeholder="Ingresa tu nombre completo"
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="correo" className="block text-sm font-medium text-slate-300 mb-2">
                Correo Electrónico *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
                <input
                  onChange={(e) => setCorreo(e.target.value)}
                  value={correo}
                  type="email"
                  id="correo"
                  className="block w-full pl-10 pr-3 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition duration-200"
                  placeholder="tu@email.com"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                Contraseña *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  id="password"
                  className="block w-full pl-10 pr-3 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition duration-200"
                  placeholder="Mínimo 6 caracteres"
                  required
                  minLength="6"
                />
              </div>
            </div>

            {/* Campo de rol SOLO para administradores */}
            {isAdmin && (
              <div>
                <label htmlFor="rol" className="block text-sm font-medium text-slate-300 mb-2">
                  Rol del Usuario *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <select
                    id="rol"
                    value={rol}
                    onChange={(e) => setRol(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition duration-200 appearance-none"
                  >
                    <option value="cliente" className="bg-slate-800">Cliente</option>
                    <option value="admin" className="bg-slate-800">Administrador</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                <p className="mt-2 text-xs text-slate-400">
                  Los administradores tienen acceso completo al sistema
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={creando}
              className="w-full bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-800 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-cyan-500/25"
            >
              {creando ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  {isAdmin ? "Creando usuario..." : "Creando cuenta..."}
                </div>
              ) : (
                isAdmin ? "Crear Usuario" : "Crear Cuenta"
              )}
            </button>

            {/* Botón "¿Ya tienes cuenta?" SOLO para usuarios NO admin */}
            {!isAdmin && (
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="text-cyan-400 hover:text-cyan-300 text-sm font-medium transition duration-200"
                >
                  ¿Ya tienes cuenta? Inicia sesión
                </button>
              </div>
            )}

            {/* Botón Cancelar para admin */}
            {isAdmin && (
              <div className="text-center">
                <button
                  type="button"
                  onClick={handleRegresar}
                  className="text-slate-400 hover:text-slate-300 text-sm font-medium transition duration-200"
                >
                  ← Volver a la gestión de usuarios
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}