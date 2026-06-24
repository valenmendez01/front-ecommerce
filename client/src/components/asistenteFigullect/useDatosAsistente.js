import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { seleccionarArticulosCarrito } from '../../redux/carritoSlice'
import { crearContextoAsistente } from './asistenteContexto'

export const useDatosAsistente = (filtrosActuales) => {
  const asistente = useSelector((state) => state.asistente)
  const catalogo = useSelector((state) => state.productos)
  const usuario = useSelector((state) => state.user.usuario)
  const carrito = useSelector(seleccionarArticulosCarrito)
  const { categorias, productos, selecciones } = catalogo

  const crearContextoActual = useCallback(() => crearContextoAsistente({
    productos,
    categorias,
    selecciones,
    usuario,
    carrito,
    filtros: filtrosActuales,
    mensajes: asistente.mensajes,
  }), [asistente.mensajes, carrito, categorias, filtrosActuales, productos, selecciones, usuario])

  return {
    asistente,
    carrito,
    categorias,
    crearContextoActual,
    productosReferencia: productos,
    selecciones,
    usuario,
  }
}
