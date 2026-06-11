import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import EncabezadoGeneral from "../components/EncabezadoGeneral"
import { Footer } from "../components/Footer"
import PantallaCargandoSesion from "../components/login/PantallaCargandoSesion"
import useRequiereSesion from "./useRequiereSesion"
import CrearProducto from "../views/CrearProducto"
import IniciarSesion from "../views/IniciarSesion"
import MiCuenta from "../views/MiCuenta"
import PanelVendedor from "../views/PanelVendedor"
import RegistroComprador from "../views/RegistroComprador"
import VentasVendedor from "../views/VentasVendedor"
import Carrito from "../views/Carrito"
import Compra from "../views/Compra"
import { cerrarSesion } from "../redux/userSlice"

const RutasPantallaCompleta = () => {
  const { pathname } = useLocation()
  const dispatch = useDispatch()
  const { token, usuario, cargandoUsuario } = useSelector((state) => state.user)
  const { requerirSesion } = useRequiereSesion()
  const mostrarNavegacionGeneral = pathname === '/carrito' || pathname === '/compra'
  const destinoUsuarioAutenticado = usuario?.rol === 'VENDEDOR' ? '/panel-vendedor' : '/mi-cuenta'
  const cerrarSesionUsuario = () => dispatch(cerrarSesion())

  const redirectSiAutenticado = (elemento) => {
    if (cargandoUsuario) return <PantallaCargandoSesion />
    if (usuario) return <Navigate replace to={destinoUsuarioAutenticado} />
    return elemento
  }

  return (
    <>
      {mostrarNavegacionGeneral && <EncabezadoGeneral />}

      <Routes>
        <Route
          path="/carrito"
          element={requerirSesion(<Carrito />, { requiereComprador: true })}
        />
        <Route
          path="/compra"
          element={requerirSesion(<Compra />, { requiereComprador: true })}
        />
        <Route
          path="/iniciar-sesion"
          element={redirectSiAutenticado(<IniciarSesion />)}
        />
        <Route
          path="/registro"
          element={redirectSiAutenticado(<RegistroComprador />)}
        />
        <Route
          path="/mi-cuenta"
          element={requerirSesion(
            <MiCuenta token={token} usuario={usuario} onCerrarSesion={cerrarSesionUsuario} />
          )}
        />
        <Route
          path="/panel-vendedor"
          element={requerirSesion(
            <PanelVendedor token={token} usuario={usuario} onCerrarSesion={cerrarSesionUsuario} />,
            { requiereVendedor: true }
          )}
        />
        <Route
          path="/crear-producto"
          element={requerirSesion(
            <CrearProducto token={token} usuario={usuario} onCerrarSesion={cerrarSesionUsuario} />,
            { requiereVendedor: true }
          )}
        />
        <Route
          path="/ventas"
          element={requerirSesion(
            <VentasVendedor token={token} usuario={usuario} onCerrarSesion={cerrarSesionUsuario} />,
            { requiereVendedor: true }
          )}
        />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
      <Footer />
    </>
  )
}

export default RutasPantallaCompleta
