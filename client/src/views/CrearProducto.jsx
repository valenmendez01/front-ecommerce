import { addToast } from '@heroui/react'
import { useEffect, useState } from 'react'
import PaginaGestion from '../components/layout/PaginaGestion'
import EncabezadoCrearProducto from '../components/vendedor/crearProducto/EncabezadoCrearProducto'
import FormularioCrearProducto from '../components/vendedor/crearProducto/FormularioCrearProducto'
import { guardarProducto } from '../components/vendedor/crearProducto/guardarProducto'
import { crearImagenesLocales, liberarImagenesLocales, quitarImagenLocal } from '../data/imagenesProducto'
import { MAXIMO_IMAGENES_PRODUCTO, obtenerErrorCantidadImagenesProducto } from '../data/reglasImagenesProducto'
import { MAXIMO_CARACTERES_NOMBRE_PRODUCTO, calcularPrecioFinal, estadoInicialProducto, normalizarCategorias, normalizarSelecciones, obtenerErroresProducto } from '../data/reglasProducto'
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
    let sigueActivo = true
    Promise.all([fetch('/categorias'), fetch('/selecciones')])
      .then(async ([respuestaCategorias, respuestaSelecciones]) => {
        const jsonCategorias = await respuestaCategorias.json()
        const jsonSelecciones = await respuestaSelecciones.json()
        if (!sigueActivo) return
        const categoriasNuevas = normalizarCategorias(jsonCategorias.data)
        const seleccionesNuevas = normalizarSelecciones(jsonSelecciones.data)
        setCategorias(categoriasNuevas)
        setSelecciones(seleccionesNuevas)
        setProducto((actual) =>
          categoriasNuevas.some((categoria) => categoria.valor === actual.categoria)
            ? { ...actual, seleccion: seleccionesNuevas.some((seleccion) => seleccion.valor === actual.seleccion) ? actual.seleccion : seleccionesNuevas[0]?.valor || actual.seleccion }
            : { ...actual, categoria: categoriasNuevas[0]?.valor || actual.categoria, seleccion: seleccionesNuevas[0]?.valor || actual.seleccion },
        )
      })
      .catch(() => {
        if (!sigueActivo) return
        setCategorias([])
        setSelecciones([])
      })
    return () => {
      sigueActivo = false
    }
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
      const respuesta = await guardarProducto(producto, imagenes, token)
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
    <PaginaGestion usuario={usuario} onCerrarSesion={onCerrarSesion}>
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
    </PaginaGestion>
  )
}

export default CrearProducto
