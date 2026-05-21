import { useState } from 'react'
import { obtenerErrorNumeroProducto } from '../../../data/reglasProducto'
import DetalleProducto from './DetalleProducto'
import ResumenProducto from './ResumenProducto'

const tieneErroresNumericos = (producto) =>
  obtenerErrorNumeroProducto(producto.precio, 'precio') ||
  obtenerErrorNumeroProducto(producto.stock, 'stock') ||
  obtenerErrorNumeroProducto(producto.descuento, 'descuento')

const TarjetaProducto = ({
  abierto,
  categorias,
  onAbrir,
  onActualizarProducto,
  onEliminarProducto,
  producto,
}) => {
  const [editando, setEditando] = useState(false)
  const [borrador, setBorrador] = useState({ ...producto })
  const [guardando, setGuardando] = useState(false)
  const [eliminando, setEliminando] = useState(false)
  const [errorAccion, setErrorAccion] = useState('')
  const hayErrores = editando && tieneErroresNumericos(borrador)

  const cambiarCampo = (campo, valor) => {
    const esNumero = ['precio', 'stock', 'descuento'].includes(campo) && valor !== ''
    setBorrador((actual) => ({ ...actual, [campo]: esNumero ? Number(valor) : valor }))
  }

  const guardarEdicion = async () => {
    if (tieneErroresNumericos(borrador)) return
    setGuardando(true)
    setErrorAccion('')
    try {
      await onActualizarProducto(borrador)
      setEditando(false)
    } catch (error) {
      setErrorAccion(error.message || 'No se pudo actualizar el producto.')
    } finally {
      setGuardando(false)
    }
  }

  const eliminarProducto = async () => {
    setEliminando(true)
    setErrorAccion('')
    try {
      await onEliminarProducto(producto.idProducto)
    } catch (error) {
      setErrorAccion(error.message || 'No se pudo desactivar el producto.')
    } finally {
      setEliminando(false)
    }
  }

  const cambiarDetalle = () => {
    if (abierto) {
      setEditando(false)
      setBorrador({ ...producto })
      setErrorAccion('')
    }

    onAbrir()
  }

  return (
    <article className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <ResumenProducto abierto={abierto} eliminando={eliminando} guardando={guardando} onAbrir={cambiarDetalle} onEliminar={eliminarProducto} producto={producto} />
      {errorAccion && <p className="mx-5 mb-5 rounded-md bg-red-50 px-4 py-3 text-sm font-bold text-red-700">{errorAccion}</p>}
      {abierto && (
        <DetalleProducto
          borrador={borrador}
          categorias={categorias}
          editando={editando}
          eliminando={eliminando}
          guardando={guardando}
          hayErrores={hayErrores}
          onCambiar={cambiarCampo}
          onCancelar={() => setEditando(false)}
          onEditar={() => { setBorrador({ ...producto }); setEditando(true) }}
          onGuardar={guardarEdicion}
          producto={producto}
        />
      )}
    </article>
  )
}

export default TarjetaProducto
