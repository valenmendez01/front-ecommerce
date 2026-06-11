import { createSlice } from '@reduxjs/toolkit'
import { agregarProductoAlCarrito } from '../lib/reglasCarrito'

const obtenerCantidadValida = (articulo, nuevaCantidad) => {
  const stock = Number(articulo.stock ?? nuevaCantidad)
  return Math.min(Math.max(1, Number(nuevaCantidad)), stock)
}

const obtenerClaveUsuario = (idUsuario) =>
  idUsuario ? String(idUsuario) : 'invitado'

const obtenerCarritoPorIdUsuario = (state, idUsuario) => {
  const clave = obtenerClaveUsuario(idUsuario)
  return state.carritosPorUsuario[clave] ?? []
}

const carritoSlice = createSlice({
  name: 'carrito',
  initialState: {
    idUsuario: null,
    carritosPorUsuario: {},
  },
  reducers: {
    carritoUsuarioCargado: (state, action) => {
      const idUsuario = action.payload ?? null
      const clave = obtenerClaveUsuario(idUsuario)

      state.idUsuario = idUsuario

      if (!state.carritosPorUsuario[clave]) {
        state.carritosPorUsuario[clave] = []
      }
    },

    productoAgregado: (state, action) => {
      const idUsuario = action.payload.idUsuario ?? state.idUsuario
      const clave = obtenerClaveUsuario(idUsuario)

      state.idUsuario = idUsuario
      state.carritosPorUsuario[clave] = action.payload.articulos
    },

    cantidadActualizada: (state, action) => {
      const clave = obtenerClaveUsuario(state.idUsuario)
      state.carritosPorUsuario[clave] = action.payload
    },

    productoEliminado: (state, action) => {
      const clave = obtenerClaveUsuario(state.idUsuario)
      state.carritosPorUsuario[clave] = action.payload
    },

    carritoVaciado: (state) => {
      const clave = obtenerClaveUsuario(state.idUsuario)
      state.carritosPorUsuario[clave] = []
    },
    carritosLimpiados: (state) => {
      state.idUsuario = null
      state.carritosPorUsuario = {}
    },
  },
})

const {
  cantidadActualizada,
  carritosLimpiados,
  carritoUsuarioCargado,
  carritoVaciado,
  productoAgregado,
  productoEliminado,
} = carritoSlice.actions

export const cargarCarritoUsuario = (idUsuario) => (dispatch) => {
  dispatch(carritoUsuarioCargado(idUsuario ?? null))
}

export const agregarAlCarrito =
  ({ cantidad, idUsuario, producto }) =>
  (dispatch, getState) => {
    const state = getState().carrito
    const usuarioActual = idUsuario ?? state.idUsuario ?? null

    const articulosActuales = obtenerCarritoPorIdUsuario(
      state,
      usuarioActual,
    )

    const articulos = agregarProductoAlCarrito(
      articulosActuales,
      producto,
      cantidad,
    )

    dispatch(
      productoAgregado({
        articulos,
        idUsuario: usuarioActual,
      }),
    )
  }

export const actualizarCantidadCarrito =
  ({ id, nuevaCantidad }) =>
  (dispatch, getState) => {
    const state = getState().carrito
    const actuales = obtenerCarritoPorIdUsuario(state, state.idUsuario)

    const articulos = Number(nuevaCantidad) < 1
      ? actuales.filter((articulo) => articulo.id !== id)
      : actuales.map((articulo) =>
          articulo.id === id
            ? {
                ...articulo,
                cantidad: obtenerCantidadValida(articulo, nuevaCantidad),
              }
            : articulo,
        )

    dispatch(cantidadActualizada(articulos))
  }

export const eliminarDelCarrito =
  ({ id }) =>
  (dispatch, getState) => {
    const state = getState().carrito
    const actuales = obtenerCarritoPorIdUsuario(state, state.idUsuario)

    const articulos = actuales.filter((articulo) => articulo.id !== id)

    dispatch(productoEliminado(articulos))
  }

export const vaciarCarritoRedux = () => (dispatch) => {
  dispatch(carritoVaciado())
}

export const limpiarCarritosPersistidos = () => (dispatch) => {
  dispatch(carritosLimpiados())
}

export const seleccionarArticulosCarrito = (state) => {
  const carrito = state.carrito
  const clave = obtenerClaveUsuario(carrito.idUsuario)

  return carrito.carritosPorUsuario[clave] ?? []
}

export default carritoSlice.reducer
