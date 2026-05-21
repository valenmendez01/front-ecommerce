import { useEffect, useState } from "react"
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom"
import Navigation from "./components/Navigation"
import { useAuth } from "./context/useAuth"
import {
  actualizarProducto as actualizarProductoBackend,
  crearProducto,
  desactivarProducto,
  normalizarProductoVendedor,
  obtenerProductoPorId,
  obtenerProductosMios,
  subirImagenesProducto,
} from "./lib/productosApi"
import { obtenerPedidosMios } from "./lib/pedidosApi"
import { obtenerVentasMias } from "./lib/ventasApi"
import { Catalogo } from "./views/Catalogo"
import CrearProducto from "./views/CrearProducto"
import { DetalleCatalogo } from "./views/DetalleCatalogo"
import IniciarSesion from "./views/IniciarSesion"
import MiCuenta from "./views/MiCuenta"
import PanelVendedor from "./views/PanelVendedor"
import VentasVendedor from "./views/VentasVendedor"
import CarritoView from "./views/carritoView"
import CompraView from "./views/compraView"
import { Home } from "./views/Home"

const rutasPantallaCompleta = [
  '/mi-cuenta',
  '/panel-vendedor',
  '/crear-producto',
  '/ventas',
  '/carrito',
  '/compra',
  '/iniciar-sesion',
]

const rutasPermitidasVendedor = [
  '/panel-vendedor',
  '/crear-producto',
  '/ventas',
]

const esRutaPermitidaParaVendedor = (pathname) =>
  rutasPermitidasVendedor.some((ruta) => pathname === ruta || pathname.startsWith(`${ruta}/`))

const PantallaCargandoSesion = () => (
  <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6 text-slate-950">
    <div className="text-center">
      <p className="text-sm font-black uppercase tracking-widest text-green-700">FIGULLECT</p>
      <h1 className="mt-3 text-3xl font-black text-[#061d58]">Cargando sesion...</h1>
    </div>
  </div>
)

function App() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { cargandoUsuario, cerrarSesion, usuario } = useAuth()
  const [productos, setProductos] = useState([])
  const [cargandoProductos, setCargandoProductos] = useState(false)
  const [errorProductos, setErrorProductos] = useState('')
  const [ventas, setVentas] = useState([])
  const [cargandoVentas, setCargandoVentas] = useState(false)
  const [errorVentas, setErrorVentas] = useState('')
  const [pedidos, setPedidos] = useState([])
  const [cargandoPedidos, setCargandoPedidos] = useState(false)
  const [errorPedidos, setErrorPedidos] = useState('')

  useEffect(() => {
    let sigueActivo = true
    const esVendedor = usuario?.rol === 'VENDEDOR'

    Promise.resolve().then(async () => {
      if (!sigueActivo) return

      if (!esVendedor) {
        setProductos([])
        setErrorProductos('')
        setCargandoProductos(false)
        return
      }

      setCargandoProductos(true)
      setErrorProductos('')

      try {
        const productosDelVendedor = await obtenerProductosMios()

        if (sigueActivo) {
          setProductos(productosDelVendedor)
        }
      } catch (error) {
        if (sigueActivo) {
          setErrorProductos(error.message || 'No se pudieron cargar tus productos.')
        }
      } finally {
        if (sigueActivo) {
          setCargandoProductos(false)
        }
      }
    })

    return () => {
      sigueActivo = false
    }
  }, [usuario?.idUsuario, usuario?.rol])

  useEffect(() => {
    let sigueActivo = true
    const esVendedor = usuario?.rol === 'VENDEDOR'

    Promise.resolve().then(async () => {
      if (!sigueActivo) return

      if (!esVendedor) {
        setVentas([])
        setErrorVentas('')
        setCargandoVentas(false)
        return
      }

      setCargandoVentas(true)
      setErrorVentas('')

      try {
        const ventasDelVendedor = await obtenerVentasMias()

        if (sigueActivo) {
          setVentas(ventasDelVendedor)
        }
      } catch (error) {
        if (sigueActivo) {
          setErrorVentas(error.message || 'No se pudieron cargar tus ventas.')
        }
      } finally {
        if (sigueActivo) {
          setCargandoVentas(false)
        }
      }
    })

    return () => {
      sigueActivo = false
    }
  }, [usuario?.idUsuario, usuario?.rol])

  useEffect(() => {
    let sigueActivo = true
    const esComprador = usuario?.rol === 'COMPRADOR'

    Promise.resolve().then(async () => {
      if (!sigueActivo) return

      if (!esComprador) {
        setPedidos([])
        setErrorPedidos('')
        setCargandoPedidos(false)
        return
      }

      setCargandoPedidos(true)
      setErrorPedidos('')

      try {
        const pedidosDelUsuario = await obtenerPedidosMios()

        if (sigueActivo) {
          setPedidos(pedidosDelUsuario)
        }
      } catch (error) {
        if (sigueActivo) {
          setErrorPedidos(error.message || 'No se pudieron cargar tus pedidos.')
        }
      } finally {
        if (sigueActivo) {
          setCargandoPedidos(false)
        }
      }
    })

    return () => {
      sigueActivo = false
    }
  }, [usuario?.idUsuario, usuario?.rol])

  const publicarProducto = async (productoNuevo) => {
    const { imagenes = [], ...datosProducto } = productoNuevo
    const productoCreado = await crearProducto(datosProducto)
    let productoFinal = productoCreado

    if (imagenes.length) {
      await subirImagenesProducto(productoCreado.idProducto, imagenes)
      productoFinal = await obtenerProductoPorId(productoCreado.idProducto)
    }

    const productoNormalizado = normalizarProductoVendedor(productoFinal)

    setProductos((productosActuales) => [
      productoNormalizado,
      ...productosActuales.filter(
        (producto) => producto.idProducto !== productoNormalizado.idProducto,
      ),
    ])

    return productoNormalizado
  }

  const actualizarProducto = async (productoActualizado) => {
    const productoGuardado = await actualizarProductoBackend(productoActualizado)

    setProductos((productosActuales) =>
      productosActuales.map((producto) =>
        producto.idProducto === productoGuardado.idProducto ? productoGuardado : producto,
      ),
    )

    return productoGuardado
  }

  const eliminarProducto = async (idProducto) => {
    await desactivarProducto(idProducto)

    setProductos((productosActuales) =>
      productosActuales.map((producto) =>
        producto.idProducto === idProducto ? { ...producto, activo: false } : producto,
      ),
    )
  }

  const requerirSesion = (elemento, { requiereVendedor = false } = {}) => {
    if (cargandoUsuario) {
      return <PantallaCargandoSesion />
    }

    if (!usuario) {
      return <Navigate replace state={{ from: pathname }} to="/iniciar-sesion" />
    }

    if (requiereVendedor && usuario.rol !== 'VENDEDOR') {
      return <Navigate replace to="/mi-cuenta" />
    }

    return elemento
  }

  const destinoUsuarioAutenticado = usuario?.rol === 'VENDEDOR' ? '/panel-vendedor' : '/mi-cuenta'

  if (cargandoUsuario) {
    return <PantallaCargandoSesion />
  }

  if (usuario?.rol === 'VENDEDOR' && !esRutaPermitidaParaVendedor(pathname)) {
    return <Navigate replace to="/panel-vendedor" />
  }

  if (rutasPantallaCompleta.some((ruta) => pathname.startsWith(ruta))) {
    return (
      <Routes>
        <Route path="/carrito" element={<CarritoView />} />
        <Route path="/compra" element={<CompraView />} />
        <Route
          path="/iniciar-sesion"
          element={
            cargandoUsuario ? (
              <PantallaCargandoSesion />
            ) : usuario ? (
              <Navigate replace to={destinoUsuarioAutenticado} />
            ) : (
              <IniciarSesion />
            )
          }
        />
        <Route
          path="/mi-cuenta"
          element={requerirSesion(
            <MiCuenta
              cargandoPedidos={cargandoPedidos}
              errorPedidos={errorPedidos}
              pedidos={pedidos}
              usuario={usuario}
              onCerrarSesion={cerrarSesion}
            />,
          )}
        />
        <Route
          path="/panel-vendedor"
          element={requerirSesion(
            <PanelVendedor
              cargandoProductos={cargandoProductos}
              errorProductos={errorProductos}
              productosBaseActuales={productos}
              ventas={ventas}
              usuario={usuario}
              onActualizarProducto={actualizarProducto}
              onCerrarSesion={cerrarSesion}
              onEliminarProducto={eliminarProducto}
            />,
            { requiereVendedor: true },
          )}
        />
        <Route
          path="/crear-producto"
          element={requerirSesion(
            <CrearProducto
              usuario={usuario}
              onCerrarSesion={cerrarSesion}
              onPublicarProducto={publicarProducto}
              onVolverPanel={() => navigate('/panel-vendedor')}
            />,
            { requiereVendedor: true },
          )}
        />
        <Route
          path="/ventas"
          element={requerirSesion(
            <VentasVendedor
              cargandoVentas={cargandoVentas}
              errorVentas={errorVentas}
              usuario={usuario}
              ventas={ventas}
              onCerrarSesion={cerrarSesion}
            />,
            { requiereVendedor: true },
          )}
        />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    )
  }

  return (
    <>
      <Navigation />

      <div className="mx-auto flex min-h-screen max-w-400 flex-col">
        
        <main className="w-full px-6 pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<Catalogo />} />
            <Route path="/productos/:id" element={<DetalleCatalogo />} />
            <Route path="/catalogo" element={<Navigate replace to="/productos" />} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
        </main>
      </div>
    </>
  )
}

export default App
