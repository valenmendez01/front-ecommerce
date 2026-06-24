import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { seleccionarArticulosCarrito } from "../redux/carritoSlice"
import { cerrarSesion } from "../redux/userSlice"
import { NavBody, Navbar } from "./ui/resizable-navbar"
import { BotonCarritoNav } from "./navigation/BotonCarritoNav"
import { BotonSesionNav } from "./navigation/BotonSesionNav"
import { LinksNav } from "./navigation/LinksNav"
import { LogoNav } from "./navigation/LogoNav"

export default function Navigation() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { cargandoUsuario, usuario } = useSelector((state) => state.user)
  const articulosCarrito = useSelector(seleccionarArticulosCarrito)
  const esVendedor = usuario?.rol === "VENDEDOR"
  const esComprador = usuario?.rol === "COMPRADOR"
  const carritoActivo = pathname === "/carrito" || pathname === "/compra"

  const cantidadCarrito = articulosCarrito.reduce(
    (total, articulo) => total + articulo.cantidad,
    0,
  )

  const manejarCierreSesion = () => {
    dispatch(cerrarSesion())
    navigate("/iniciar-sesion")
  }

  const navItems = esVendedor ? [] : [
    { name: "Home", link: "/" },
    { name: "Catálogo", link: "/productos" },
    ...(esComprador ? [{ name: "Mi cuenta", link: "/mi-cuenta" }] : []),
  ]

  return (
    <div className="relative z-50 w-full">
      <Navbar>
        <NavBody className="bg-green-primary">
          <LogoNav />
          <LinksNav items={navItems} pathname={pathname} />

          <div className="flex items-center gap-2">
            {esComprador && (
              <BotonCarritoNav activo={carritoActivo} cantidad={cantidadCarrito} />
            )}
            <BotonSesionNav
              cargandoUsuario={cargandoUsuario}
              onCerrarSesion={manejarCierreSesion}
              usuario={usuario}
            />
          </div>
        </NavBody>
      </Navbar>
    </div>
  )
}
