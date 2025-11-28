import React, { useState } from "react";
import Footer from "../components/Footer";
import Nav from "../components/Nav";

export default function Contact() {
    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        asunto: "",
        mensaje: ""
    });
    const [enviando, setEnviando] = useState(false);
    const [enviado, setEnviado] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEnviando(true);

        // Simular envío del formulario
        setTimeout(() => {
            setEnviando(false);
            setEnviado(true);
            setFormData({
                nombre: "",
                email: "",
                asunto: "",
                mensaje: ""
            });
        }, 2000);
    };

    if (enviado) {
        return (
            <div className="min-h-screen bg-linear-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">¡Mensaje Enviado!</h2>
                    <p className="text-gray-600 mb-6">
                        Gracias por contactarnos. Te responderemos a la brevedad posible.
                    </p>
                    <button
                        onClick={() => setEnviado(false)}
                        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
                    >
                        Enviar otro mensaje
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="">
            <Nav />

            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Contáctanos
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        ¿Tienes preguntas sobre nuestros productos? Estamos aquí para ayudarte.
                        Envíanos un mensaje y te responderemos pronto.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Information */}
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Información de Contacto</h2>

                        <div className="space-y-6">
                            <div className="flex items-start">
                                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-1">Teléfono</h3>
                                    <p className="text-gray-600">+1 (555) 123-4567</p>
                                    <p className="text-sm text-gray-500">Lunes a Viernes, 9:00 - 18:00</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="bg-green-100 p-3 rounded-lg mr-4">
                                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                                    <p className="text-gray-600">soporte@techstore.com</p>
                                    <p className="text-sm text-gray-500">Respondemos en menos de 24 horas</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="bg-purple-100 p-3 rounded-lg mr-4">
                                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-1">Oficina Principal</h3>
                                    <p className="text-gray-600">Av. Tecnología 123</p>
                                    <p className="text-gray-600">Ciudad Innovación, CP 45678</p>
                                </div>
                            </div>
                        </div>

                        {/* Team Info */}
                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <h3 className="font-semibold text-gray-900 mb-3">Equipo de Desarrollo</h3>
                            <div className="flex items-center space-x-4">
                                <div className="flex-1 text-center p-3 bg-blue-50 rounded-lg">
                                    <div className="font-medium text-blue-700">Gerardo</div>
                                    <div className="text-sm text-blue-600">Frontend Developer</div>
                                </div>
                                <div className="flex-1 text-center p-3 bg-green-50 rounded-lg">
                                    <div className="font-medium text-green-700">Emanuel</div>
                                    <div className="text-sm text-green-600">Backend Developer</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Envíanos un Mensaje</h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
                                    Nombre Completo *
                                </label>
                                <input
                                    type="text"
                                    id="nombre"
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                                    placeholder="Tu nombre completo"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Correo Electrónico *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                                    placeholder="tu@email.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="asunto" className="block text-sm font-medium text-gray-700 mb-2">
                                    Asunto *
                                </label>
                                <select
                                    id="asunto"
                                    name="asunto"
                                    value={formData.asunto}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 bg-white"
                                >
                                    <option value="">Selecciona un asunto</option>
                                    <option value="soporte">Soporte Técnico</option>
                                    <option value="ventas">Consulta de Ventas</option>
                                    <option value="productos">Información de Productos</option>
                                    <option value="colaboracion">Propuesta de Colaboración</option>
                                    <option value="otros">Otros</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 mb-2">
                                    Mensaje *
                                </label>
                                <textarea
                                    id="mensaje"
                                    name="mensaje"
                                    value={formData.mensaje}
                                    onChange={handleChange}
                                    required
                                    rows="5"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 resize-none"
                                    placeholder="Describe tu consulta o mensaje..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={enviando}
                                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {enviando ? (
                                    <div className="flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                        Enviando...
                                    </div>
                                ) : (
                                    "Enviar Mensaje"
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Additional Info */}
                <div className="mt-12 text-center">
                    <div className="bg-white rounded-2xl shadow-lg p-6 inline-block">
                        <p className="text-gray-600">
                            <span className="font-semibold text-gray-900">Tiempo de respuesta:</span>
                            Normalmente respondemos en menos de 24 horas durante días hábiles.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />

        </div>
    );
}