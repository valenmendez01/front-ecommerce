import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom"
import Navigation from "./components/Navigation"
import { Catalogo } from "./views/Catalogo"
import { DetalleCatalogo } from "./views/DetalleCatalogo"
import CrearProducto from "./views/CrearProducto"
import MiCuenta from "./views/MiCuenta"
import PanelVendedor from "./views/PanelVendedor"
import VentasVendedor from "./views/VentasVendedor"
import CarritoView from "./views/carritoView"
import CompraView from "./views/compraView"
import { productosIniciales } from "./data/productosMock"
import { usuarioInicial } from "./data/usuarioMock"
import { ventasIniciales } from "./data/ventasMock"
import { useState } from "react"

const rutasPantallaCompleta = ['/mi-cuenta', '/panel-vendedor', '/crear-producto', '/ventas', '/carrito', '/compra']

const crearIniciales = (nombre) => {
  const iniciales = nombre
    .trim()
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((palabra) => palabra[0])
    .join('')
    .toUpperCase()

  return iniciales || 'PR'
}

const crearIdProducto = (productos) => {
  const ultimoNumero = productos.reduce((mayorId, producto) => {
    const numero = Number(String(producto.idProducto).replace(/\D/g, ''))
    return Number.isNaN(numero) ? mayorId : Math.max(mayorId, numero)
  }, 0)

  return `PROD-${String(ultimoNumero + 1).padStart(4, '0')}`
}

function App() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [usuario, setUsuario] = useState(usuarioInicial)
  const [productos, setProductos] = useState(productosIniciales)
  const [ventas] = useState(ventasIniciales)
  const [metaMensualUnidades, setMetaMensualUnidades] = useState(100)

  const publicarProducto = (productoNuevo) => {
    setProductos((productosActuales) => [
      {
        idProducto: crearIdProducto(productosActuales),
        idUsuario: productoNuevo.idUsuario,
        nombre: productoNuevo.nombre,
        description: productoNuevo.description,
        imagen: crearIniciales(productoNuevo.nombre),
        imagenUrl: productoNuevo.imagenUrl,
        categoria: productoNuevo.categoria,
        precio: Number(productoNuevo.precio),
        stock: Number(productoNuevo.stock),
        descuento: Number(productoNuevo.descuento),
        activo: true,
      },
      ...productosActuales,
    ])
  }

  const actualizarProducto = (productoActualizado) => {
    setProductos((productosActuales) =>
      productosActuales.map((producto) =>
        producto.idProducto === productoActualizado.idProducto
          ? {
              ...producto,
              categoria: productoActualizado.categoria,
              precio: Number(productoActualizado.precio),
              stock: Number(productoActualizado.stock),
              descuento: Number(productoActualizado.descuento),
              activo: productoActualizado.activo,
            }
          : producto,
      ),
    )
  }

  const eliminarProducto = (idProducto) => {
    setProductos((productosActuales) =>
      productosActuales.filter((producto) => producto.idProducto !== idProducto),
    )
  }

  const actualizarUsuario = (usuarioActualizado) => {
    setUsuario((usuarioActual) => ({
      ...usuarioActual,
      email: usuarioActualizado.email,
    }))
  }

  const usuarioCliente = { ...usuario, idUsuarioVisual: usuario.idCliente, rol: 'CLIENTE' }
  const usuarioVendedor = { ...usuario, idUsuarioVisual: usuario.idVendedor, rol: 'VENDEDOR' }

  if (rutasPantallaCompleta.some((ruta) => pathname.startsWith(ruta))) {
    return (
      <Routes>
        <Route path="/carrito" element={<CarritoView />} />
        <Route path="/compra" element={<CompraView />} />
        <Route
          path="/mi-cuenta"
          element={
            <MiCuenta
              usuario={usuarioCliente}
              onActualizarUsuario={actualizarUsuario}
            />
          }
        />
        <Route
          path="/panel-vendedor"
          element={
            <PanelVendedor
              metaMensualUnidades={metaMensualUnidades}
              productosBaseActuales={productos}
              ventas={ventas}
              usuario={usuarioVendedor}
              onActualizarUsuario={actualizarUsuario}
              onActualizarMetaMensual={setMetaMensualUnidades}
              onActualizarProducto={actualizarProducto}
              onEliminarProducto={eliminarProducto}
              onCrearProducto={() => navigate('/crear-producto')}
            />
          }
        />
        <Route
          path="/crear-producto"
          element={
            <CrearProducto
              usuario={usuarioVendedor}
              onPublicarProducto={publicarProducto}
              onVolverPanel={() => navigate('/panel-vendedor')}
            />
          }
        />
        <Route
          path="/ventas"
          element={<VentasVendedor usuario={usuarioVendedor} ventas={ventas} />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    )
  }

  return (
    <div className="min-h-screen flex flex-col max-w-400 mx-auto">

      <Navigation />

      <main className="w-full px-6">
        <Routes>
          <Route path="/" element={<h1>Vista Home</h1>} />
          <Route path="/productos" element={<Catalogo />} />
          <Route path="/productos/:id" element={<DetalleCatalogo />} />
          <Route path="/catalogo" element={<Navigate to="/productos" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
