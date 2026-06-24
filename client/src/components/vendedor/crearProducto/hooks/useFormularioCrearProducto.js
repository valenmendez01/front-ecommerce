import { addToast } from '@heroui/react'
import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { crearErrorDesdeAccion } from '../../../../lib/resultadoThunk'
import { crearProductoVendedor } from '../../../../redux/productosVendedorSlice'
import { actualizarOpcionesProducto } from '../datos/opcionesCrearProducto'
import {
  MAXIMO_CARACTERES_NOMBRE_PRODUCTO,
  MAXIMO_IMAGENES_PRODUCTO,
  estadoInicialProducto,
  obtenerErrorCantidadImagenesProducto,
  obtenerErrorTamanioImagenesProducto,
  obtenerErroresProducto,
} from '../datos/reglasCrearProducto'
import { crearImagenesLocales, liberarImagenesLocales, quitarImagenLocal } from '../imagenes/imagenesCrearProducto'
const normalizarValorCampo = (campo, valor) => {
  const valorLimitado = campo === 'nombre' ? valor.slice(0, MAXIMO_CARACTERES_NOMBRE_PRODUCTO) : valor
  if (['stock', 'precio', 'descuento'].includes(campo) && (valorLimitado === '' || Number(valorLimitado) < 0)) return ''
  return ['stock', 'precio', 'descuento'].includes(campo) ? Number(valorLimitado) : valorLimitado
}
export const useFormularioCrearProducto = ({ categorias, selecciones, token, usuario }) => {
  const dispatch = useDispatch()
  const publicando = useSelector((state) => state.productosVendedor.publicando)
  const [producto, setProducto] = useState(estadoInicialProducto)
  const [imagenes, setImagenes] = useState([])
  const [mensaje, setMensaje] = useState('')
  const [tipoMensaje, setTipoMensaje] = useState('exito')
  const [mostrarErrores, setMostrarErrores] = useState(false)
  const productoConOpciones = useMemo(
    () => categorias.length > 0 && selecciones.length > 0
      ? actualizarOpcionesProducto(producto, categorias, selecciones)
      : producto,
    [categorias, producto, selecciones],
  )
  const errores = useMemo(
    () => obtenerErroresProducto(productoConOpciones, categorias, selecciones),
    [categorias, productoConOpciones, selecciones],
  )
  const puedePublicar = Object.values(errores).every((error) => !error) && !obtenerErrorCantidadImagenesProducto(imagenes.length)
  const mostrarError = (texto) => {
    setTipoMensaje('error')
    setMensaje(texto)
    return false
  }

  const cambiarCampo = (campo, valor) => {
    setProducto((actual) => ({ ...actual, [campo]: normalizarValorCampo(campo, valor) }))
    setMensaje('')
  }
  const cargarImagenes = (archivos) => {
    const errorTamanio = obtenerErrorTamanioImagenesProducto(archivos)
    if (errorTamanio) return mostrarError(errorTamanio)

    if (imagenes.length + archivos.length > MAXIMO_IMAGENES_PRODUCTO) {
      return mostrarError(`Podés cargar como máximo ${MAXIMO_IMAGENES_PRODUCTO} imágenes por producto.`)
    }

    setImagenes((actuales) => [...actuales, ...crearImagenesLocales(archivos, actuales.length)])
    setMensaje('')
  }

  const publicarProducto = async () => {
    setMostrarErrores(true)
    if (!puedePublicar) return mostrarError('Revisá los campos obligatorios antes de publicar el producto.')

    try {
      const accion = await dispatch(crearProductoVendedor({
        imagenes,
        producto: productoConOpciones,
        token,
        usuarioId: usuario?.idUsuario,
      }))
      if (crearProductoVendedor.rejected.match(accion)) {
        throw crearErrorDesdeAccion(accion, 'No se pudo publicar el producto.')
      }
      const respuesta = accion.payload
      liberarImagenesLocales(imagenes)
      setProducto(estadoInicialProducto)
      setImagenes([])
      setMensaje('')
      setMostrarErrores(false)
      addToast({ color: 'success', title: respuesta.mensaje, description: respuesta.mensajeImagenes || undefined })
      return true
    } catch (error) {
      const mensajeError = error?.message || 'No se pudo publicar el producto.'
      mostrarError(mensajeError)
      addToast({ color: 'danger', title: mensajeError })
      return false
    }
  }

  return {
    cambiarCampo,
    cargarImagenes,
    errores,
    imagenes,
    mensaje,
    mostrarErrores,
    producto: productoConOpciones,
    publicando,
    publicarProducto,
    quitarImagen: (id) => setImagenes((actuales) => quitarImagenLocal(actuales, id)),
    tipoMensaje,
  }
}
