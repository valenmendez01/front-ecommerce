import { useState } from 'react'
import { crearImagenesLocales, liberarImagenesLocales, quitarImagenLocal } from '../../../data/imagenesProducto'
import { MAXIMO_IMAGENES_PRODUCTO, obtenerErrorCantidadImagenesProducto } from '../../../data/reglasImagenesProducto'
import AccionesDetalleProducto from './AccionesDetalleProducto'
import CamposDetalleProducto from './CamposDetalleProducto'
import ImagenesDetalleProducto from './ImagenesDetalleProducto'

const DetalleProducto = ({
  borrador,
  categorias,
  editando,
  eliminando,
  guardando,
  hayErrores,
  onCambiar,
  onCancelar,
  onEditar,
  onGuardar,
  producto,
}) => {
  const [imagenesNuevas, setImagenesNuevas] = useState([])
  const [imagenesQuitadas, setImagenesQuitadas] = useState([])
  const [errorCarga, setErrorCarga] = useState('')
  const guardadas = (producto.imagenes || []).filter(Boolean).filter((imagen) => !imagenesQuitadas.includes(imagen.idImagen))
  const errorCantidad = editando ? obtenerErrorCantidadImagenesProducto(guardadas.length + imagenesNuevas.length) : ''

  const limpiarCambiosImagenes = () => {
    liberarImagenesLocales(imagenesNuevas)
    setImagenesNuevas([])
    setImagenesQuitadas([])
    setErrorCarga('')
  }

  const cargarImagenes = (archivos) => {
    if (guardadas.length + imagenesNuevas.length + archivos.length > MAXIMO_IMAGENES_PRODUCTO) {
      setErrorCarga(`Podés cargar como máximo ${MAXIMO_IMAGENES_PRODUCTO} imágenes por producto.`)
      return
    }

    setImagenesNuevas((actuales) => [...actuales, ...crearImagenesLocales(archivos, actuales.length)])
    setErrorCarga('')
  }

  const cancelar = () => {
    limpiarCambiosImagenes()
    onCancelar()
  }

  const guardar = async () => {
    if (errorCantidad || errorCarga) return false
    const guardado = await onGuardar({ nuevas: imagenesNuevas, quitadas: imagenesQuitadas })
    if (guardado) limpiarCambiosImagenes()
    return guardado
  }

  return (
    <div className="border-t border-dorado-primary/30 bg-dorado-primary/10 px-6 py-6">
      <AccionesDetalleProducto editando={editando} eliminando={eliminando} guardando={guardando} hayErrores={hayErrores || errorCantidad || errorCarga} onCancelar={cancelar} onEditar={onEditar} onGuardar={guardar} producto={producto} />
      <CamposDetalleProducto borrador={borrador} categorias={categorias} editando={editando} onCambiar={onCambiar} producto={editando ? borrador : producto} />
      <ImagenesDetalleProducto
        editando={editando}
        error={errorCarga || errorCantidad}
        imagenes={producto.imagenes}
        imagenesNuevas={imagenesNuevas}
        imagenesQuitadas={imagenesQuitadas}
        onCargar={cargarImagenes}
        onQuitarActual={(id) => { setImagenesQuitadas((actuales) => [...actuales, id]); setErrorCarga('') }}
        onQuitarNueva={(id) => { setImagenesNuevas((actuales) => quitarImagenLocal(actuales, id)); setErrorCarga('') }}
      />
    </div>
  )
}

export default DetalleProducto
