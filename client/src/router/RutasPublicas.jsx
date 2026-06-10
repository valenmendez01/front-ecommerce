import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import FranjaBanderasCatalogo from "../components/catalogo/FranjaBanderasCatalogo"
import EncabezadoGeneral from "../components/EncabezadoGeneral"
import { Footer } from "../components/Footer"
import { Catalogo } from "../views/Catalogo"
import { DetalleCatalogo } from "../views/DetalleCatalogo"
import Home from "../views/Home"

const RutasPublicas = () => {
  const { pathname } = useLocation()

  return (
    <>
      <EncabezadoGeneral />

      {pathname === "/productos" && <FranjaBanderasCatalogo />}

      <div className="mx-auto flex max-w-400 flex-col">
        <main className={`w-full px-6 ${pathname === "/productos" ? "pt-0" : "pt-4"}`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<Catalogo />} />
            <Route path="/productos/:id" element={<DetalleCatalogo />} />
            <Route path="/catalogo" element={<Navigate replace to="/productos" />} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
        </main>
      </div>

      <Footer />
    </>
  )
}

export default RutasPublicas
