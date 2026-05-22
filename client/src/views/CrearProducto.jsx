import { addToast } from '@heroui/react'
import { useEffect, useState } from 'react'
import PaginaGestion from '../components/layout/PaginaGestion'
import EncabezadoCrearProducto from '../components/vendedor/crearProducto/EncabezadoCrearProducto'
import FormularioCrearProducto from '../components/vendedor/crearProducto/FormularioCrearProducto'
import { guardarProducto } from '../components/vendedor/crearProducto/guardarProducto'
import { crearImagenesLocales, liberarImagenesLocales, quitarImagenLocal } from '../data/imagenesProducto'
import { MAXIMO_IMAGENES_PRODUCTO, obtenerErrorCantidadImagenesProducto } from '../data/reglasImagenesProducto'
import { calcularPrecioFinal, estadoInicialProducto, normalizarCategorias, obtenerErroresProducto } from '../data/reglasProducto'
const CrearProducto = ({ token, usuario, onCerrarSesion }) => {
  const [producto, setProducto] = useState(estadoInicialProducto)
  const [imagenes, setImagenes] = useState([])
  const [mensaje, setMensaje] = useState('')
  const [tipoMensaje, setTipoMensaje] = useState('exito')
  const [mostrarErrores, setMostrarErrores] = useState(false)
  const [publicando, setPublicando] = useState(false)
  const [categorias, setCategorias] = useState([])
  useEffect(() => {
    let sigueActivo = true
    fetch('/categorias')
      .then((respuesta) => respuesta.json())
      .then((json) => {
        if (!sigueActivo) return
        const categoriasNuevas = normalizarCategorias(json.data)
        setCategorias(categoriasNuevas)
        setProducto((actual) =>
          categoriasNuevas.some((categoria) => categoria.valor === actual.categoria)
            ? actual
            : { ...actual, categoria: categoriasNuevas[0]?.valor || actual.categoria },
        )
      })
      .catch(() => sigueActivo && setCategorias([]))
    return () => {
      sigueActivo = false
    }
  }, [])
  const errores = obtenerErroresProducto(producto, categorias)
  const errorImagenes = obtenerErrorCantidadImagenesProducto(imagenes.length)
  const puedePublicar = Object.values(errores).every((error) => !error) && !errorImagenes
  const cambiarCampo = (campo, valor) => {
    const esNumero = ['stock', 'precio', 'descuento'].includes(campo) && valor !== ''
    setProducto((actual) => ({ ...actual, [campo]: esNumero ? Number(valor) : valor }))
    setMensaje('')
  }
  const cargarImagenes = (archivos) => {
    if (imagenes.length + archivos.length > MAXIMO_IMAGENES_PRODUCTO) {
      setTipoMensaje('error')
      setMensaje(`Podes cargar como maximo ${MAXIMO_IMAGENES_PRODUCTO} imagenes por producto.`)
      return
    }
    setImagenes((actuales) => [...actuales, ...crearImagenesLocales(archivos, actuales.length)])
    setMensaje('')
  }
  const publicarProducto = async () => {
    setMostrarErrores(true)
    if (!puedePublicar) {
      setTipoMensaje('error')
      setMensaje('Revisa los campos obligatorios antes de publicar el producto.')
      return false
    }
    setPublicando(true)
    setMensaje('')

    try {
      await guardarProducto(producto, imagenes, token)
      liberarImagenesLocales(imagenes)
      setProducto(estadoInicialProducto)
      setImagenes([])
      setMostrarErrores(false)
      addToast({ color: 'success', title: 'Producto publicado', description: 'Ya forma parte de tu catalogo.' })
      return true
    } catch (error) {
      const mensajeError = error.message || 'No se pudo publicar el producto.'
      addToast({ color: 'danger', title: 'No se pudo publicar el producto', description: mensajeError })
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
        producto={producto} publicando={publicando} tipoMensaje={tipoMensaje}
      />
    </PaginaGestion>
  )
}

export default CrearProducto
