import { addToast } from '@heroui/react'
import { useState } from 'react'
import DetalleTarjetaProducto from './DetalleTarjetaProducto'
import ErrorAccionProducto from './ErrorAccionProducto'
import ResumenProducto from './ResumenProducto'
import { obtenerErrorNumeroProductoVendedor } from './reglasProductoVendedor'
const tieneErroresNumericos = (producto) =>
  obtenerErrorNumeroProductoVendedor(producto.precio, 'precio') ||
  obtenerErrorNumeroProductoVendedor(producto.stock, 'stock') ||
  obtenerErrorNumeroProductoVendedor(producto.descuento, 'descuento')
const TarjetaProducto = ({ abierto, categorias, onAbrir, onActualizarProducto, onCambiarVisibilidadProducto, producto }) => {
  const [editando, setEditando] = useState(false)
  const [borrador, setBorrador] = useState({ ...producto })
  const [guardando, setGuardando] = useState(false)
  const [cambiandoVisibilidad, setCambiandoVisibilidad] = useState(false)
  const [errorAccion, setErrorAccion] = useState('')
  const hayErrores = editando && tieneErroresNumericos(borrador)

  const cambiarCampo = (campo, valor) => {
    const esNumero = ['precio', 'stock', 'descuento'].includes(campo) && valor !== ''
    setBorrador((actual) => ({ ...actual, [campo]: esNumero ? Number(valor) : valor }))
  }
  const guardarEdicion = async (cambiosImagenes) => {
    if (tieneErroresNumericos(borrador)) return false
    setGuardando(true)
    setErrorAccion('')
    try {
      const respuesta = await onActualizarProducto(borrador, cambiosImagenes)
      setEditando(false)
      addToast({
        color: 'success',
        title: respuesta?.mensaje || 'Producto actualizado correctamente',
        description: respuesta?.mensajeImagenes || producto.nombre,
      })
      return true
    } catch (error) {
      const mensaje = error.message || 'No se pudo actualizar el producto.'
      addToast({ color: 'danger', title: mensaje })
      setErrorAccion(mensaje)
      return false
    } finally {
      setGuardando(false)
    }
  }
  const cambiarVisibilidadProducto = async () => {
    setCambiandoVisibilidad(true)
    setErrorAccion('')
    try {
      const respuesta = await onCambiarVisibilidadProducto(producto)
      addToast({
        color: 'success',
        title: respuesta?.mensaje || 'Producto actualizado correctamente',
        description: producto.nombre,
      })
    } catch (error) {
      const mensaje = error.message || 'No se pudo cambiar la visibilidad del producto.'
      addToast({ color: 'danger', title: mensaje })
      setErrorAccion(mensaje)
    } finally {
      setCambiandoVisibilidad(false)
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
      <ResumenProducto abierto={abierto} cambiandoVisibilidad={cambiandoVisibilidad} guardando={guardando} onAbrir={cambiarDetalle} onCambiarVisibilidad={cambiarVisibilidadProducto} producto={producto} />
      <ErrorAccionProducto mensaje={errorAccion} />
      <DetalleTarjetaProducto
        abierto={abierto}
        borrador={borrador}
        categorias={categorias}
        editando={editando}
        eliminando={cambiandoVisibilidad}
        guardando={guardando}
        hayErrores={hayErrores}
        onCambiar={cambiarCampo}
        onCancelar={() => setEditando(false)}
        onEditar={() => { setBorrador({ ...producto }); setEditando(true) }}
        onGuardar={guardarEdicion}
        producto={producto}
      />
    </article>
  )
}
export default TarjetaProducto
