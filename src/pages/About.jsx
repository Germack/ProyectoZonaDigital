import React from "react";
import Nav from "../components/Nav";

export default function About() {



    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 to-gray-100">
            <Nav />

            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                        Sobre <span className="text-blue-600">Nosotros</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
                        Impulsando la innovación tecnológica con soluciones de vanguardia
                        para transformar tu experiencia digital
                    </p>
                </div>

                {/* Mission Section */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Nuestra Misión</h2>
                            <p className="text-lg text-gray-600 mb-6">
                                En nuestra tienda de tecnología, nos dedicamos a brindar los mejores
                                productos tecnológicos con calidad, innovación y un servicio excepcional.
                                Creemos que la tecnología debe ser accesible y mejorar la vida de las personas.
                            </p>
                            <div className="flex items-center space-x-4">
                                <div className="bg-blue-100 p-3 rounded-lg">
                                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Innovación Constante</h3>
                                    <p className="text-gray-600">Siempre a la vanguardia tecnológica</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-linear-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
                            <h3 className="text-2xl font-bold mb-4">Visión 2024</h3>
                            <p className="text-blue-100 mb-6">
                                Ser la tienda de tecnología de referencia, reconocida por nuestra
                                calidad, innovación y compromiso con la satisfacción del cliente.
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-center">
                                    <div className="text-2xl font-bold">100%</div>
                                    <div className="text-sm">Clientes Satisfechos</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold">24/7</div>
                                    <div className="text-sm">Soporte Técnico</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Team Section */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Nuestro Equipo</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto mb-12">
                        Dos apasionados de la tecnología unidos para crear la mejor experiencia
                        de compra en productos tecnológicos
                    </p>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {/* Gerardo */}
                        <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition duration-300">
                            <div className="w-32 h-32 bg-linear-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                                <span className="text-white text-3xl font-bold">G</span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Gerardo</h3>
                            <p className="text-blue-600 font-medium mb-4">Co-Fundador & Desarrollador Frontend</p>
                            <p className="text-gray-600 mb-6">
                                Especialista en interfaces de usuario y experiencia del cliente.
                                Apasionado por crear soluciones elegantes y funcionales que
                                mejoren la interacción humano-tecnología.
                            </p>
                            <div className="flex justify-center space-x-4">
                                <div className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">
                                    React
                                </div>
                                <div className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">
                                    UI/UX
                                </div>
                                <div className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">
                                    JavaScript
                                </div>
                            </div>
                        </div>

                        {/* Emanuel */}
                        <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition duration-300">
                            <div className="w-32 h-32 bg-linear-to-br from-green-400 to-green-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                                <span className="text-white text-3xl font-bold">E</span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Emanuel</h3>
                            <p className="text-green-600 font-medium mb-4">Co-Fundador & Desarrollador FullStack</p>
                            <p className="text-gray-600 mb-6">
                                Experto en arquitectura de sistemas y bases de datos.
                                Dedica su tiempo a construir infraestructuras robustas
                                y escalables que soporten nuestra plataforma.
                            </p>
                            <div className="flex justify-center space-x-4">
                                <div className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">
                                    Node.js
                                </div>
                                <div className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">
                                    APIs
                                </div>
                                <div className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">
                                    Database
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Values Section */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Nuestros Valores</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Confianza</h3>
                            <p className="text-gray-600">
                                Construimos relaciones basadas en la transparencia y la honestidad con nuestros clientes.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Innovación</h3>
                            <p className="text-gray-600">
                                Siempre buscamos las últimas tendencias y tecnologías para ofrecer lo mejor.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="bg-purple-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Comunidad</h3>
                            <p className="text-gray-600">
                                Creemos en el poder de la comunidad tecnológica y crecemos juntos.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Contact CTA */}
                <div className="bg-linear-to-r from-blue-600 to-purple-700 rounded-2xl p-8 text-center text-white">
                    <h2 className="text-3xl font-bold mb-4">¿Tienes alguna pregunta?</h2>
                    <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                        Estamos aquí para ayudarte. Contáctanos y te responderemos a la brevedad.
                    </p>
                    <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-200">
                        Contáctanos
                    </button>
                </div>
            </div>

            {/* Footer */}

        </div>
    );
}