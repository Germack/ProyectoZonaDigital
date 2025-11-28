import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import HomeAdmin from "./pages/HomeAdmin";
import Users from "./pages/Users";
import CuentaNueva from "./pages/CuentaNueva";
import EditarUsuario from "./pages/EditarUsuario";
import ProtectedRoute from "./components/ProtectedRoute";
import HomeCliente from "./pages/HomeCliente";
import About from "./pages/About";
import Contact from "./pages/Contact";
import GestionProductos from "./pages/GestionProductos";
import PerfilUsuario from "./pages/PerfilUsuario";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/newuser" element={<CuentaNueva />} />
        <Route path="/perfil" element={<PerfilUsuario />} />
        <Route element={<ProtectedRoute RolUSer={["admin"]} />}>
          <Route path="/homeAdmin" element={<HomeAdmin />} />
          <Route path="/users" element={<Users />} />
          <Route path="/editar-usuario/:id" element={<EditarUsuario />} />
          <Route path="/gestion-productos" element={<GestionProductos />} />
        </Route>
        <Route element={<ProtectedRoute RolUser={["cliente", "admin"]} />}>
          <Route path="/Cliente" element={<HomeCliente />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
        </Route>


        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}