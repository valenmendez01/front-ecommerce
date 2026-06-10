import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import FranjaBanderasCatalogo from "../components/catalogo/FranjaBanderasCatalogo"
import Navigation from "../components/Navigation"
import { StickyBanner } from "../components/ui/sticky-banner"
import { Footer } from "../components/Footer"
import { Catalogo } from "../views/Catalogo"
import { DetalleCatalogo } from "../views/DetalleCatalogo"
import Home from "../views/Home"

const RutasPublicas = () => {
  const { pathname } = useLocation()

  return (
    <>
      <div className="sticky top-0 z-50 grid" style={{ gridTemplateRows: "auto auto" }}>
        <StickyBanner className="bg-linear-to-b from-dorado-primary to-dorado-primary/90">
          <p className="text-white text-sm drop-shadow-md">
            ⚡ ¡Comprá hoy y recibí tu pedido <b>en menos de 24 hs</b>!
          </p>
        </StickyBanner>
        <Navigation />
      </div>

      {pathname === "/productos" && <FranjaBanderasCatalogo />}

      <div className="mx-auto flex max-w-400 flex-col">
        <main className="w-full px-6 pt-4">
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
