import { Navigate, useLocation } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import PantallaCargandoSesion from "./components/login/PantallaCargandoSesion"
import RutasPantallaCompleta from "./router/RutasPantallaCompleta"
import RutasPublicas from "./router/RutasPublicas"
import { rutasPantallaCompleta, esRutaPermitidaParaVendedor } from "./router/constants"
import { cargarCarritoUsuario } from "./redux/carritoSlice"
import { validarSesionPersistida } from "./redux/userSlice"

function App() {
  const { pathname } = useLocation()
  const dispatch = useDispatch()
  const { cargandoUsuario, usuario } = useSelector((state) => state.user)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  useEffect(() => {
    dispatch(validarSesionPersistida())
  }, [dispatch])

  useEffect(() => {
    if (usuario?.rol === 'VENDEDOR') return
    dispatch(cargarCarritoUsuario(usuario?.idUsuario))
  }, [dispatch, usuario?.idUsuario, usuario?.rol])

  if (cargandoUsuario) {
    return <PantallaCargandoSesion />
  }

  // Si el usuario es vendedor y la ruta no es permitida para vendedores, redirige a su panel
  if (usuario?.rol === 'VENDEDOR' && !esRutaPermitidaParaVendedor(pathname)) {
    return <Navigate replace to="/panel-vendedor" />
  }

  // Si la ruta es de pantalla completa (sin navbar o banner), renderiza las rutas de pantalla completa
  if (rutasPantallaCompleta.some((ruta) => pathname.startsWith(ruta))) {
    return <RutasPantallaCompleta />
  }

  return <RutasPublicas />
}

export default App
