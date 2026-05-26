import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "../context/useAuth"
import PantallaCargandoSesion from "../components/login/PantallaCargandoSesion"

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