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

  if (usuario?.rol === 'VENDEDOR' && !esRutaPermitidaParaVendedor(pathname)) {
    return <Navigate replace to="/panel-vendedor" />
  }

  if (rutasPantallaCompleta.some((ruta) => pathname.startsWith(ruta))) {
    return <RutasPantallaCompleta auth={auth} />
  }

  return <RutasPublicas />
}

export default App