import { Navigate, Route, Routes, useLocation } from "react-router-dom"
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

const RutasPantallaCompleta = ({ auth }) => {
  const { pathname } = useLocation()
  const { token, usuario, cerrarSesion, cargandoUsuario } = auth
  const { requerirSesion } = useRequiereSesion()
  const mostrarNavegacionGeneral = pathname === '/carrito' || pathname === '/compra'
  const destinoUsuarioAutenticado = usuario?.rol === 'VENDEDOR' ? '/panel-vendedor' : '/mi-cuenta'

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
            <MiCuenta token={token} usuario={usuario} onCerrarSesion={cerrarSesion} />
          )}
        />
        <Route
          path="/panel-vendedor"
          element={requerirSesion(
            <PanelVendedor token={token} usuario={usuario} onCerrarSesion={cerrarSesion} />,
            { requiereVendedor: true }
          )}
        />
        <Route
          path="/crear-producto"
          element={requerirSesion(
            <CrearProducto token={token} usuario={usuario} onCerrarSesion={cerrarSesion} />,
            { requiereVendedor: true }
          )}
        />
        <Route
          path="/ventas"
          element={requerirSesion(
            <VentasVendedor token={token} usuario={usuario} onCerrarSesion={cerrarSesion} />,
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
