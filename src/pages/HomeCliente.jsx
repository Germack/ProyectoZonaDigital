import React from "react";

import CardsProducts from "../components/CardsProducts";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
export default function HomeCliente() {



  return (

    <div className="min-h-screen bg-gray-50">
      <header className="bg-orange-600 text-white shadow-lg">

        <Nav />
      </header >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header></header>
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Productos Destacados</h1>
          <p className="mt-2 text-lg text-gray-600">
            Descubre nuestros productos más populares
          </p>
        </div>
      </div>
      <div className="p-8">
        <CardsProducts />
      </div>
      <Footer />
    </div >
  );
}
