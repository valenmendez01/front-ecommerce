import {
  Button,
  Divider,
  Image,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/react"
import { LogIn, LogOut, ShoppingCart } from "lucide-react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import logo from "../assets/logoHorizontal.png"
import { useAuth } from "../context/useAuth"

export default function Navigation() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { cargandoUsuario, cerrarSesion, usuario } = useAuth()
  const esVendedor = usuario?.rol === 'VENDEDOR'

  const manejarCierreSesion = () => {
    cerrarSesion()
    navigate('/iniciar-sesion')
  }

  return (
    <Navbar maxWidth="full">
      <NavbarBrand>
        <Image src={logo} width={150} />
      </NavbarBrand>

      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        {esVendedor ? (
          <>
            <NavbarItem isActive={pathname.startsWith("/panel-vendedor")}>
              <Link color="foreground" to="/panel-vendedor">
                Panel vendedor
              </Link>
            </NavbarItem>
            <Divider orientation="vertical" className="mx-2 h-5 self-center opacity-50" />
            <NavbarItem isActive={pathname.startsWith("/crear-producto")}>
              <Link color="foreground" to="/crear-producto">
                Crear producto
              </Link>
            </NavbarItem>
            <Divider orientation="vertical" className="mx-2 h-5 self-center opacity-50" />
            <NavbarItem isActive={pathname.startsWith("/ventas")}>
              <Link color="foreground" to="/ventas">
                Ventas
              </Link>
            </NavbarItem>
          </>
        ) : (
          <>
            <NavbarItem isActive={pathname === "/"}>
              <Link color="foreground" to="/">
                Home
              </Link>
            </NavbarItem>

            <Divider orientation="vertical" className="mx-2 h-5 self-center opacity-50" />

            <NavbarItem isActive={pathname.startsWith("/productos")}>
              <Link aria-current="page" to="/productos">
                Catalogo
              </Link>
            </NavbarItem>

            {usuario && (
              <>
                <Divider orientation="vertical" className="mx-2 h-5 self-center opacity-50" />

                <NavbarItem isActive={pathname.startsWith("/mi-cuenta")}>
                  <Link color="foreground" to="/mi-cuenta">
                    Mi cuenta
                  </Link>
                </NavbarItem>
              </>
            )}
          </>
        )}
      </NavbarContent>

      <NavbarContent justify="end">
        {!esVendedor && (
          <NavbarItem>
            <Button as={Link} to="/carrito" variant="light" isIconOnly aria-label="Carrito">
              <ShoppingCart size={20} />
            </Button>
          </NavbarItem>
        )}

        <NavbarItem>
          {usuario ? (
            <Button
              variant="light"
              isIconOnly
              aria-label="Cerrar sesion"
              onPress={manejarCierreSesion}
            >
              <LogOut size={20} />
            </Button>
          ) : (
            <Button
              as={Link}
              className="font-semibold"
              isDisabled={cargandoUsuario}
              startContent={<LogIn size={18} />}
              to="/iniciar-sesion"
              variant="light"
            >
              Iniciar sesion
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
