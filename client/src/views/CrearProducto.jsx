import { addToast } from '@heroui/react'
import { useEffect, useState } from 'react'
import PaginaPanelUsuario from '../components/panelUsuario/estructura/PaginaPanelUsuario'
import EncabezadoCrearProducto from '../components/vendedor/crearProducto/encabezado/EncabezadoCrearProducto'
import FormularioCrearProducto from '../components/vendedor/crearProducto/formulario/FormularioCrearProducto'
import { crearImagenesLocales, liberarImagenesLocales, quitarImagenLocal } from '../components/vendedor/crearProducto/imagenes/imagenesCrearProducto'
import { cargarOpcionesProducto } from '../components/vendedor/crearProducto/datos/opcionesCrearProducto'
import { publicarProducto as publicarProductoEnBackend } from '../components/vendedor/crearProducto/datos/publicarProducto'
import {
  MAXIMO_CARACTERES_NOMBRE_PRODUCTO,
  MAXIMO_IMAGENES_PRODUCTO,
  calcularPrecioFinal,
  estadoInicialProducto,
  obtenerErrorCantidadImagenesProducto,
  obtenerErrorTamanioImagenesProducto,
  obtenerErroresProducto,
} from '../components/vendedor/crearProducto/datos/reglasCrearProducto'

const CrearProducto = ({ token, usuario, onCerrarSesion }) => {
  const [producto, setProducto] = useState(estadoInicialProducto)
  const [imagenes, setImagenes] = useState([])
  const [mensaje, setMensaje] = useState('')
  const [tipoMensaje, setTipoMensaje] = useState('exito')
  const [mostrarErrores, setMostrarErrores] = useState(false)
  const [publicando, setPublicando] = useState(false)
  const [categorias, setCategorias] = useState([])
  const [selecciones, setSelecciones] = useState([])

  useEffect(() => {
    return cargarOpcionesProducto(setCategorias, setSelecciones, setProducto)
  }, [])

  const errores = obtenerErroresProducto(producto, categorias, selecciones)
  const errorImagenes = obtenerErrorCantidadImagenesProducto(imagenes.length)
  const puedePublicar = Object.values(errores).every((error) => !error) && !errorImagenes
  const cambiarCampo = (campo, valor) => {
    const esNumero = ['stock', 'precio', 'descuento'].includes(campo) && valor !== ''
    const nuevoValor = campo === 'nombre' ? valor.slice(0, MAXIMO_CARACTERES_NOMBRE_PRODUCTO) : valor
    setProducto((actual) => ({ ...actual, [campo]: esNumero ? Number(nuevoValor) : nuevoValor }))
    setMensaje('')
  }
  const cargarImagenes = (archivos) => {
    const errorTamanio = obtenerErrorTamanioImagenesProducto(archivos)
    if (errorTamanio) {
      setTipoMensaje('error')
      setMensaje(errorTamanio)
      return
    }

    if (imagenes.length + archivos.length > MAXIMO_IMAGENES_PRODUCTO) {
      setTipoMensaje('error')
      setMensaje(`Podés cargar como máximo ${MAXIMO_IMAGENES_PRODUCTO} imágenes por producto.`)
      return
    }
    setImagenes((actuales) => [...actuales, ...crearImagenesLocales(archivos, actuales.length)])
    setMensaje('')
  }
  const publicarProducto = async () => {
    setMostrarErrores(true)
    if (!puedePublicar) {
      setTipoMensaje('error')
      setMensaje('Revisá los campos obligatorios antes de publicar el producto.')
      return false
    }
    setPublicando(true)
    setMensaje('')

    try {
      const respuesta = await publicarProductoEnBackend(producto, imagenes, token)
      liberarImagenesLocales(imagenes)
      setProducto(estadoInicialProducto)
      setImagenes([])
      setMostrarErrores(false)
      addToast({
        color: 'success',
        title: respuesta.mensaje,
        description: respuesta.mensajeImagenes || undefined,
      })
      return true
    } catch (error) {
      const mensajeError = error.message || 'No se pudo publicar el producto.'
      addToast({ color: 'danger', title: mensajeError })
      setTipoMensaje('error')
      setMensaje(mensajeError)
      return false
    } finally {
      setPublicando(false)
    }
  }
  return (
    <PaginaPanelUsuario usuario={usuario} onCerrarSesion={onCerrarSesion}>
      <EncabezadoCrearProducto />
      <FormularioCrearProducto
        categorias={categorias}
        errores={errores}
        imagenes={imagenes}
        mensaje={mensaje}
        mostrarErrores={mostrarErrores}
        onCambiar={cambiarCampo} onCargarImagenes={cargarImagenes} onPublicar={publicarProducto}
        onQuitarImagen={(id) => setImagenes((actuales) => quitarImagenLocal(actuales, id))}
        precioFinal={calcularPrecioFinal(producto.precio, producto.descuento)}
        producto={producto} publicando={publicando} selecciones={selecciones} tipoMensaje={tipoMensaje}
      />
    </PaginaPanelUsuario>
  )
}

export default CrearProducto
