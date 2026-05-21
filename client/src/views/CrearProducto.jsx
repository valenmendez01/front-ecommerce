import { useEffect, useState } from 'react'
import PaginaGestion from '../components/layout/PaginaGestion'
import EncabezadoCrearProducto from '../components/vendedor/crearProducto/EncabezadoCrearProducto'
import FormularioCrearProducto from '../components/vendedor/crearProducto/FormularioCrearProducto'
import { crearImagenesLocales, liberarImagenesLocales, quitarImagenLocal } from '../data/imagenesProducto'
import { obtenerErrorCantidadImagenesProducto } from '../data/reglasImagenesProducto'
import { calcularPrecioFinal, estadoInicialProducto, normalizarCategorias, obtenerErroresProducto } from '../data/reglasProducto'
const CrearProducto = ({ usuario, onCerrarSesion, onVolverPanel, onPublicarProducto }) => {
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

  const cargarImagenes = (event) => {
    const archivos = Array.from(event.target.files || [])
    setImagenes((actuales) => [...actuales, ...crearImagenesLocales(archivos, actuales.length)])
    setMensaje('')
    event.target.value = ''
  }

  const publicarProducto = async () => {
    setMostrarErrores(true)
    if (!puedePublicar) {
      setTipoMensaje('error')
      setMensaje('Revisa los campos obligatorios antes de publicar el producto.')
      return
    }
    setPublicando(true)
    setMensaje('')

    try {
      await onPublicarProducto({ ...producto, imagenes: imagenes.map((imagen) => imagen.archivo) })
      liberarImagenesLocales(imagenes)
      setProducto(estadoInicialProducto)
      setImagenes([])
      setMostrarErrores(false)
      setTipoMensaje('exito')
      setMensaje('Producto publicado correctamente con datos del backend.')
    } catch (error) {
      setTipoMensaje('error')
      setMensaje(error.message || 'No se pudo publicar el producto.')
    } finally {
      setPublicando(false)
    }
  }

  return (
    <PaginaGestion usuario={usuario} onCerrarSesion={onCerrarSesion}>
      <EncabezadoCrearProducto onVolverPanel={onVolverPanel} />
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
