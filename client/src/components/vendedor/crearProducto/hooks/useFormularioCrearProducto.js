import { addToast } from '@heroui/react'
import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
import { crearProductoVendedor } from '../../../../redux/productosVendedorSlice'

const normalizarValorCampo = (campo, valor) => {
  const valorLimitado = campo === 'nombre' ? valor.slice(0, MAXIMO_CARACTERES_NOMBRE_PRODUCTO) : valor
  return ['stock', 'precio', 'descuento'].includes(campo) && valorLimitado !== '' ? Number(valorLimitado) : valorLimitado
}

export const useFormularioCrearProducto = ({ categorias, selecciones, token, usuario }) => {
  const dispatch = useDispatch()
  const publicando = useSelector((state) => state.productosVendedor.publicando)
  const [producto, setProducto] = useState(estadoInicialProducto)
  const [imagenes, setImagenes] = useState([])
  const [mensaje, setMensaje] = useState('')
  const [tipoMensaje, setTipoMensaje] = useState('exito')
  const [mostrarErrores, setMostrarErrores] = useState(false)
  const errores = useMemo(() => obtenerErroresProducto(producto, categorias, selecciones), [categorias, producto, selecciones])
  const puedePublicar = Object.values(errores).every((error) => !error) && !obtenerErrorCantidadImagenesProducto(imagenes.length)

  useEffect(() => {
    if (categorias.length > 0 && selecciones.length > 0) {
      setProducto((actual) => actualizarOpcionesProducto(actual, categorias, selecciones))
    }
  }, [categorias, selecciones])

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
      const respuesta = await dispatch(crearProductoVendedor({ imagenes, producto, token, usuarioId: usuario?.idUsuario })).unwrap()
      liberarImagenesLocales(imagenes)
      setProducto(estadoInicialProducto)
      setImagenes([])
      setMensaje('')
      setMostrarErrores(false)
      addToast({ color: 'success', title: respuesta.mensaje, description: respuesta.mensajeImagenes || undefined })
      return true
    } catch (error) {
      const mensajeError = error || 'No se pudo publicar el producto.'
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
    producto,
    publicando,
    publicarProducto,
    quitarImagen: (id) => setImagenes((actuales) => quitarImagenLocal(actuales, id)),
    tipoMensaje,
  }
}
