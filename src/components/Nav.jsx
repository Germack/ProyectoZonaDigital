import React from 'react'
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Nav() {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [error, setError] = useState(null);
    const location = useLocation();

    const navItems = [
        { path: '/Cliente', label: 'Inicio' },
        { path: '/contact', label: 'Contacto' },
        { path: '/about', label: 'About' },
    ];
    function logout() {
        localStorage.clear();
        navigate("/");
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/");
        }

        async function traerPerfil() {
            try {
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
                const data = await respuesta.json();
                setUser(data);
            } catch (error) { }
        }
        traerPerfil();
    }, []);

    return (
        <nav className="bg-blue-600 text-white shadow-lg">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    <div className="flex space-x-8">
                        {navItems.map(item => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${location.pathname === item.path
                                    ? 'bg-blue-700 text-white'
                                    : 'text-purple-100 hover:bg-blue-500'
                                    }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center space-x-4">
                        <span className="text-sm">Hola, {user?.name}</span>
                        <button
                            onClick={logout}
                            className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-md text-sm transition-colors"
                        >
                            Cerrar Sesión
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}
