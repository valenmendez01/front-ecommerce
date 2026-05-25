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

  const cargarImagenes = (event) => {
    const archivos = Array.from(event.target.files || [])
    if (guardadas.length + imagenesNuevas.length + archivos.length > MAXIMO_IMAGENES_PRODUCTO) {
      setErrorCarga(`Podes cargar como maximo ${MAXIMO_IMAGENES_PRODUCTO} imagenes por producto.`)
      event.target.value = ''
      return
    }

    setImagenesNuevas((actuales) => [...actuales, ...crearImagenesLocales(archivos, actuales.length)])
    setErrorCarga('')
    event.target.value = ''
  }

  const cancelar = () => {
    limpiarCambiosImagenes()
    onCancelar()
  }

  const guardar = async () => {
    if (errorCantidad || errorCarga) return
    const guardado = await onGuardar({ nuevas: imagenesNuevas, quitadas: imagenesQuitadas })
    if (guardado) limpiarCambiosImagenes()
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
