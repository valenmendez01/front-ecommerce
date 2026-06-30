import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import {
  actualizarCantidadCarrito,
  eliminarDelCarrito,
  imagenesCarritoActualizadas,
  seleccionarArticulosCarrito,
} from '../redux/carritoSlice'
import { calcularResumenCarrito, obtenerImagenProducto } from './reglasCarrito'

export const useCarrito = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const articulos = useSelector(seleccionarArticulosCarrito)

  useEffect(() => {
    const articulosSinImagen = articulos.filter(
      (articulo) => !articulo.imagen && !articulo.imagenConsultada && articulo.idProducto,
    )
    if (articulosSinImagen.length === 0) return

    Promise.all(
      articulosSinImagen.map((articulo) =>
        axios(`/productos/${articulo.idProducto}`)
          .then(({ data }) => [articulo.idProducto, obtenerImagenProducto(data.data)])
          .catch(() => [articulo.idProducto, '']),
      ),
    ).then((imagenes) => {
      dispatch(imagenesCarritoActualizadas(Object.fromEntries(imagenes)))
    })
  }, [articulos, dispatch])

  const volverPaginaAnterior = () => {
    if (window.history.state?.idx > 0) {
      navigate(-1)
      return
    }

    navigate('/')
  }

  return {
    articulos,
    resumen: calcularResumenCarrito(articulos),
    actualizarCantidad: (id, nuevaCantidad) =>
      dispatch(actualizarCantidadCarrito({ id, nuevaCantidad })),
    eliminarArticulo: (id) =>
      dispatch(eliminarDelCarrito({ id })),
    irAlPago: () => navigate('/compra'),
    volverPaginaAnterior,
  }
}
