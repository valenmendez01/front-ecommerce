import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import Navigation from "./components/Navigation"
import { StickyBanner } from "./components/ui/sticky-banner"
import { useAuth } from "./context/useAuth"
import { Catalogo } from "./views/Catalogo"
import CrearProducto from "./views/CrearProducto"
import { DetalleCatalogo } from "./views/DetalleCatalogo"
import IniciarSesion from "./views/IniciarSesion"
import MiCuenta from "./views/MiCuenta"
import PanelVendedor from "./views/PanelVendedor"
import RegistroComprador from "./views/RegistroComprador"
import VentasVendedor from "./views/VentasVendedor"
import CarritoView from "./views/carritoView"
import CompraView from "./views/compraView"
import { Footer } from "./components/Footer"
import Home from "./views/Home"

const rutasPantallaCompleta = [
  '/mi-cuenta',
  '/panel-vendedor',
  '/crear-producto',
  '/ventas',
  '/carrito',
  '/compra',
  '/iniciar-sesion',
  '/registro',
]

const rutasPermitidasVendedor = [
  '/panel-vendedor',
  '/crear-producto',
  '/ventas',
]

const esRutaPermitidaParaVendedor = (pathname) =>
  rutasPermitidasVendedor.some((ruta) => pathname === ruta || pathname.startsWith(`${ruta}/`))

const PantallaCargandoSesion = () => (
  <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6 text-slate-950">
    <div className="text-center">
      <p className="text-sm font-black uppercase tracking-widest text-green-700">FIGULLECT</p>
      <h1 className="mt-3 text-3xl font-black text-[#061d58]">Cargando sesion...</h1>
    </div>
  </div>
)

function App() {
  const { pathname } = useLocation()
  const { cargandoUsuario, cerrarSesion, token, usuario } = useAuth()

  const requerirSesion = (
    elemento,
    { requiereComprador = false, requiereVendedor = false } = {},
  ) => {
    if (cargandoUsuario) {
      return <PantallaCargandoSesion />
    }

    if (!usuario) {
      return <Navigate replace state={{ from: pathname }} to="/iniciar-sesion" />
    }

    if (requiereVendedor && usuario.rol !== 'VENDEDOR') {
      return <Navigate replace to="/mi-cuenta" />
    }

    if (requiereComprador && usuario.rol !== 'COMPRADOR') {
      return <Navigate replace to="/panel-vendedor" />
    }

    return elemento
  }

  const destinoUsuarioAutenticado = usuario?.rol === 'VENDEDOR' ? '/panel-vendedor' : '/mi-cuenta'

  if (cargandoUsuario) {
    return <PantallaCargandoSesion />
  }

  if (usuario?.rol === 'VENDEDOR' && !esRutaPermitidaParaVendedor(pathname)) {
    return <Navigate replace to="/panel-vendedor" />
  }

  if (rutasPantallaCompleta.some((ruta) => pathname.startsWith(ruta))) {
    return (
      <>
        <Routes>
          <Route
            path="/carrito"
            element={requerirSesion(<CarritoView />, { requiereComprador: true })}
          />
          <Route
            path="/compra"
            element={requerirSesion(<CompraView />, { requiereComprador: true })}
          />
          <Route
            path="/iniciar-sesion"
            element={
              cargandoUsuario ? (
                <PantallaCargandoSesion />
              ) : usuario ? (
                <Navigate replace to={destinoUsuarioAutenticado} />
              ) : (
                <IniciarSesion />
              )
            }
          />
          <Route
            path="/registro"
            element={
              cargandoUsuario ? (
                <PantallaCargandoSesion />
              ) : usuario ? (
                <Navigate replace to={destinoUsuarioAutenticado} />
              ) : (
                <RegistroComprador />
              )
            }
          />
          <Route
            path="/mi-cuenta"
            element={requerirSesion(
              <MiCuenta
                token={token}
                usuario={usuario}
                onCerrarSesion={cerrarSesion}
              />,
            )}
          />
          <Route
            path="/panel-vendedor"
            element={requerirSesion(
              <PanelVendedor
                token={token}
                usuario={usuario}
                onCerrarSesion={cerrarSesion}
              />,
              { requiereVendedor: true },
            )}
          />
          <Route
            path="/crear-producto"
            element={requerirSesion(
              <CrearProducto
                token={token}
                usuario={usuario}
                onCerrarSesion={cerrarSesion}
              />,
              { requiereVendedor: true },
            )}
          />
          <Route
            path="/ventas"
            element={requerirSesion(
              <VentasVendedor
                token={token}
                usuario={usuario}
                onCerrarSesion={cerrarSesion}
              />,
              { requiereVendedor: true },
            )}
          />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
        <Footer />
      </>
    )
  }

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

export default App
