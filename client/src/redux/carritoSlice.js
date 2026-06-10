import { createSlice } from '@reduxjs/toolkit'
import {
  agregarProductoAlCarrito,
  obtenerArticulosCarrito,
  reemplazarArticulosCarrito,
  vaciarCarrito,
} from '../lib/reglasCarrito'

const obtenerCantidadValida = (articulo, nuevaCantidad) => {
  const stock = Number(articulo.stock ?? nuevaCantidad)
  return Math.min(Math.max(1, Number(nuevaCantidad)), stock)
}

const carritoSlice = createSlice({
  name: 'carrito',
  initialState: {
    articulos: [],
    idUsuario: null,
  },
  reducers: {
    carritoInicializado: (state, action) => {
      state.articulos = action.payload.articulos
      state.idUsuario = action.payload.idUsuario
    },
    productoAgregado: (state, action) => {
      state.articulos = action.payload.articulos
      state.idUsuario = action.payload.idUsuario
    },
    cantidadActualizada: (state, action) => {
      state.articulos = action.payload
    },
    productoEliminado: (state, action) => {
      state.articulos = action.payload
    },
    carritoVaciado: (state) => {
      state.articulos = []
    },
  },
})

const {
  cantidadActualizada,
  carritoInicializado,
  carritoVaciado,
  productoAgregado,
  productoEliminado,
} = carritoSlice.actions

export const cargarCarritoUsuario = (idUsuario) => (dispatch) => {
  dispatch(carritoInicializado({
    articulos: obtenerArticulosCarrito(idUsuario),
    idUsuario: idUsuario ?? null,
  }))
}

export const agregarAlCarrito = ({ cantidad, idUsuario, producto }) => (dispatch) => {
  const articulos = agregarProductoAlCarrito(producto, cantidad, idUsuario)
  dispatch(productoAgregado({ articulos, idUsuario: idUsuario ?? null }))
}

export const actualizarCantidadCarrito =
  ({ id, idUsuario, nuevaCantidad }) =>
  (dispatch, getState) => {
    const actuales = getState().carrito.articulos
    const articulos = Number(nuevaCantidad) < 1
      ? actuales.filter((articulo) => articulo.id !== id)
      : actuales.map((articulo) =>
          articulo.id === id
            ? { ...articulo, cantidad: obtenerCantidadValida(articulo, nuevaCantidad) }
            : articulo,
        )
    dispatch(cantidadActualizada(reemplazarArticulosCarrito(articulos, idUsuario)))
  }

export const eliminarDelCarrito = ({ id, idUsuario }) => (dispatch, getState) => {
  const articulos = getState().carrito.articulos.filter((articulo) => articulo.id !== id)
  dispatch(productoEliminado(reemplazarArticulosCarrito(articulos, idUsuario)))
}

export const vaciarCarritoRedux = (idUsuario) => (dispatch) => {
  vaciarCarrito(idUsuario)
  dispatch(carritoVaciado())
}

export default carritoSlice.reducer
