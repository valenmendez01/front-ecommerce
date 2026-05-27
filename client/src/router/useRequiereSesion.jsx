import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "../context/useAuth"
import PantallaCargandoSesion from "../components/login/PantallaCargandoSesion"

// Es un custom Hook que devuelve una función (requerirSesion) que actúa como un guardia de rutas
// Si el usuario no está logueado, lo patea a /iniciar-sesion.
// Recibe parámetros de configuración como { requiereComprador: true } o { requiereVendedor: true } para asegurar que nadie sin los permisos correctos acceda. Por ejemplo, impide que un comprador entre al /panel-vendedor.

const useRequiereSesion = () => {
  const { pathname } = useLocation()
  const { cargandoUsuario, usuario } = useAuth()

  const requerirSesion = (
    elemento,
    { requiereComprador = false, requiereVendedor = false } = {}
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

  return { requerirSesion }
}

export default useRequiereSesion