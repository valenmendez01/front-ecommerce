import { Button } from "@heroui/react"
import { LogIn, LogOut } from "lucide-react"
import { Link } from "react-router-dom"

export const BotonSesionNav = ({ cargandoUsuario, onCerrarSesion, usuario }) => {
  if (usuario) {
    return (
      <Button
        className="relative z-20 mr-4 flex items-center px-2 py-1 text-white/80 transition-colors duration-300 hover:text-white"
        isIconOnly
        aria-label="Cerrar sesión"
        onPress={onCerrarSesion}
        variant="outline"
      >
        <LogOut size={20} />
      </Button>
    )
  }

  return (
    <Button
      as={Link}
      className="relative z-20 mr-4 flex items-center px-2 py-1 text-white/90 transition-colors duration-300 hover:text-white"
      isDisabled={cargandoUsuario}
      startContent={<LogIn size={18} />}
      to="/iniciar-sesion"
      variant="outline"
    >
      Iniciar sesión
    </Button>
  )
}
