import { Card } from '@heroui/react'
import { useEffect, useState } from 'react'
import { normalizarCategorias } from '../../../data/reglasProducto'
import EncabezadoProductos from '../productos/EncabezadoProductos'
import TarjetaProducto from '../productos/TarjetaProducto'
import TarjetasProductosCargando from '../productos/TarjetasProductosCargando'

const MensajeProductos = ({ children }) => (
  <div className="rounded-md border border-slate-200 bg-slate-50 px-6 py-12 text-center font-semibold text-slate-500 xl:col-span-2">
    {children}
  </div>
)

const TablaProductos = ({ cargando = false, error = '', productos, onActualizarProducto, onCambiarVisibilidadProducto }) => {
  const [mostrarTodos, setMostrarTodos] = useState(false)
  const [productoAbierto, setProductoAbierto] = useState(null)
  const [categorias, setCategorias] = useState([])
  const productosVisibles = mostrarTodos ? productos : productos.slice(0, 2)

  useEffect(() => {
    let sigueActivo = true
    fetch('/categorias')
      .then((respuesta) => respuesta.json())
      .then((json) => sigueActivo && setCategorias(normalizarCategorias(json.data)))
      .catch(() => sigueActivo && setCategorias([]))

    return () => {
      sigueActivo = false
    }
  }, [])

  const cambiarVista = () => {
    setMostrarTodos(!mostrarTodos)
    setProductoAbierto(null)
  }

  return (
    <Card className="overflow-hidden shadow-lg" radius="sm">
      <EncabezadoProductos mostrarTodos={mostrarTodos} onCambiarVista={cambiarVista} puedeVerTodos={productos.length > 2} />
      {error && (
        <div className="mx-8 mb-6 rounded-md border border-red-100 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
          {error}
        </div>
      )}
      <div className="grid gap-6 px-8 pb-8 xl:grid-cols-2">
        {cargando && <TarjetasProductosCargando />}
        {!cargando && productosVisibles.length === 0 && (
          <MensajeProductos>Todavia no tenes productos publicados.</MensajeProductos>
        )}
        {!cargando && productosVisibles.map((producto) => (
          <TarjetaProducto
            abierto={productoAbierto === producto.idProducto}
            categorias={categorias}
            key={producto.idProducto}
            onAbrir={() => setProductoAbierto(productoAbierto === producto.idProducto ? null : producto.idProducto)}
            onActualizarProducto={onActualizarProducto}
            onCambiarVisibilidadProducto={onCambiarVisibilidadProducto}
            producto={producto}
          />
        ))}
      </div>
    </Card>
  )
}

export default TablaProductos
