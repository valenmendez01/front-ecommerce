import { useCallback, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { seleccionarArticulosCarrito } from '../../redux/carritoSlice'
import { crearContextoAsistente } from './asistenteUtils.jsx'

export const useDatosAsistente = (filtrosActuales) => {
  const asistente = useSelector((state) => state.asistente)
  const catalogo = useSelector((state) => state.productos)
  const usuario = useSelector((state) => state.user.usuario)
  const carrito = useSelector(seleccionarArticulosCarrito)
  const { productos, categorias, selecciones, productoDetalle } = catalogo

  const productosReferencia = useMemo(
    () => productoDetalle ? [productoDetalle, ...productos] : productos,
    [productoDetalle, productos],
  )

  const crearContextoActual = useCallback(() => crearContextoAsistente({
    productos,
    categorias,
    selecciones,
    usuario,
    carrito,
    filtros: filtrosActuales,
  }), [carrito, categorias, filtrosActuales, productos, selecciones, usuario])

  return {
    asistente,
    carrito,
    categorias,
    crearContextoActual,
    productosReferencia,
    selecciones,
    usuario,
  }
}
