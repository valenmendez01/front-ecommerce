import {
  Navbar,
  NavBody
} from "./ui/resizable-navbar"
import { LogIn, LogOut, ShoppingCart } from "lucide-react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import logo from "../assets/logoHorizontal.png"
import { useAuth } from "../context/useAuth"
import { motion } from "framer-motion"
import { Button } from "@heroui/react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { cargarCarritoUsuario } from "../redux/carritoSlice"

export default function Navigation() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { cargandoUsuario, cerrarSesion, usuario } = useAuth()
  const esVendedor = usuario?.rol === "VENDEDOR"
  const esComprador = usuario?.rol === "COMPRADOR"
  const dispatch = useDispatch()
  const cantidadCarrito = useSelector((state) =>
    state.carrito.articulos.reduce((total, articulo) => total + articulo.cantidad, 0),
  )

  useEffect(() => {
    dispatch(cargarCarritoUsuario(usuario?.idUsuario))
  }, [dispatch, usuario?.idUsuario])

  const manejarCierreSesion = () => {
    cerrarSesion()
    navigate("/iniciar-sesion")
  }

  const navItemsComprador = [
    { name: "Home", link: "/" },
    { name: "Catálogo", link: "/productos" },
    ...(esComprador ? [{ name: "Mi cuenta", link: "/mi-cuenta" }] : []),
  ]

  const navItems = esVendedor ? [] : navItemsComprador

  return (
    <div className="relative z-50 w-full">
      <Navbar>
        {/* Desktop */}
        <NavBody className="bg-green-primary">
          {/* Logo */}
          <Link to="/" className="relative z-20 mr-4 flex items-center px-2 py-1 transition-all duration-300 hover:filter-[drop-shadow(0_0_6px_rgba(184,134,11,0.6))_drop-shadow(0_0_12px_rgba(184,134,11,0.3))]">
            <img src={logo} alt="Logo" width={150} />
          </Link>

          {/* Nav links con React Router */}
          <div className="absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium lg:flex">
            {navItems.map((item) => {
              const isActive = pathname === item.link || pathname.startsWith(item.link + "/")
              return (
                <Link
                  key={item.link}
                  to={item.link}
                  className="relative px-4 py-2 transition-colors duration-200 text-white/80 hover:text-white"
                >
                  <span className={isActive ? "font-semibold text-white" : ""}>
                    {item.name}
                  </span>
                  <motion.span
                    className="absolute bottom-0 left-1/2 h-0.5 bg-dorado-primary rounded-full"
                    initial={{ width: "0%", x: "-50%" }}
                    animate={{
                      width: isActive ? "100%" : "0%",
                      x: "-50%",
                      filter: isActive
                        ? "drop-shadow(0 0 4px #b8860b) drop-shadow(0 0 8px #b8860b)"
                        : "drop-shadow(0 0 0px transparent)",
                    }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  />
                </Link>
              )
            })}
          </div>

          {/* Acciones */}
          <div className="flex items-center gap-2">
            {esComprador && (
              <div className="relative z-20 mr-4 flex overflow-visible">
                <Button as={Link} to="/carrito" className="flex items-center overflow-visible px-2 py-1 transition-colors duration-300 text-white/80 hover:text-white" variant="outline" isIconOnly aria-label="Carrito">
                  <ShoppingCart size={20} />
                </Button>
                {cantidadCarrito > 0 && (
                  <span className="pointer-events-none absolute right-1 top-1 z-30 flex h-5 min-w-5 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-dorado-primary px-1 text-[10px] font-black text-black">
                    {cantidadCarrito > 99 ? "99+" : cantidadCarrito}
                  </span>
                )}
              </div>
            )}

            {esVendedor ? (
              <Button
                className="relative z-20 mr-4 flex items-center px-2 py-1 text-white/80 transition-colors duration-300 hover:text-white"
                isIconOnly
                aria-label="Cerrar sesión"
                onPress={manejarCierreSesion}
                variant="outline"
              >
                <LogOut size={20} />
              </Button>
            ) : usuario ? (
              <Button
                variant="outline"
                className="relative z-20 mr-4 flex items-center px-2 py-1 transition-colors duration-300 text-white/80 hover:text-white"
                isIconOnly
                aria-label="Cerrar sesión"
                onPress={manejarCierreSesion}
              >
                <LogOut size={20} />
              </Button>
            ) : (
              <Button
                as={Link}
                className="relative z-20 mr-4 flex items-center px-2 py-1 transition-colors duration-300 text-white/90 hover:text-white"
                isDisabled={cargandoUsuario}
                startContent={<LogIn size={18} />}
                to="/iniciar-sesion"
                variant="outline"
              >
                Iniciar sesión
              </Button>
            )}
          </div>
        </NavBody>
      </Navbar>
    </div>
  )
}
