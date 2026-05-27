import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "./context/useAuth"
import PantallaCargandoSesion from "./components/login/PantallaCargandoSesion"
import RutasPantallaCompleta from "./router/RutasPantallaCompleta"
import RutasPublicas from "./router/RutasPublicas"
import { rutasPantallaCompleta, esRutaPermitidaParaVendedor } from "./router/constants"

function App() {
  const { pathname } = useLocation()
  const auth = useAuth()
  const { cargandoUsuario, usuario } = auth

  if (cargandoUsuario) {
    return <PantallaCargandoSesion />
  }

  // Si el usuario es vendedor y la ruta no es permitida para vendedores, redirige a su panel
  if (usuario?.rol === 'VENDEDOR' && !esRutaPermitidaParaVendedor(pathname)) {
    return <Navigate replace to="/panel-vendedor" />
  }

  // Si la ruta es de pantalla completa (sin navbar o banner), renderiza las rutas de pantalla completa
  if (rutasPantallaCompleta.some((ruta) => pathname.startsWith(ruta))) {
    return <RutasPantallaCompleta auth={auth} />
  }

  return <RutasPublicas />
}

export default App