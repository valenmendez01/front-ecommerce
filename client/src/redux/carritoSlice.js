import { createSlice } from '@reduxjs/toolkit'
import { REHYDRATE } from 'redux-persist'
import { agregarProductoAlCarrito } from '../lib/reglasCarrito'

// ─── Helpers ────────────────────────────────────────────────────────────────

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

// ─── Slice ───────────────────────────────────────────────────────────────────

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

    imagenesCarritoActualizadas: (state, action) => {
      const clave = obtenerClaveUsuario(state.idUsuario)
      const imagenesPorId = action.payload || {}
      state.carritosPorUsuario[clave] = obtenerCarritoPorIdUsuario(state, state.idUsuario)
        .map((articulo) => ({
          ...articulo,
          imagen: articulo.imagen || imagenesPorId[articulo.idProducto] || '',
          imagenConsultada: true,
        }))
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
  extraReducers: (builder) => {
    builder.addCase(REHYDRATE, (state, action) => {
      if (action.payload?.carrito) {
        state.idUsuario = action.payload.carrito.idUsuario
        state.carritosPorUsuario = action.payload.carrito.carritosPorUsuario
      }
    })
  },
})

export const {
  carritoUsuarioCargado,
  productoAgregado,
  cantidadActualizada,
  productoEliminado,
  imagenesCarritoActualizadas,
  carritoVaciado,
  carritosLimpiados,
} = carritoSlice.actions

export const cargarCarritoUsuario = carritoUsuarioCargado
export const limpiarCarritosPersistidos = carritosLimpiados
export const vaciarCarritoRedux = carritoVaciado

// ─── Thunks ──────────────────────────────────────────────────────────────────

export const agregarAlCarrito =
  ({ cantidad, idUsuario, producto }) =>
  (dispatch, getState) => {
    const state = getState().carrito
    const usuarioActual = idUsuario ?? state.idUsuario ?? null
    const articulosActuales = obtenerCarritoPorIdUsuario(state, usuarioActual)

    const articulos = agregarProductoAlCarrito(articulosActuales, producto, cantidad)

    dispatch(productoAgregado({ articulos, idUsuario: usuarioActual }))
  }

export const actualizarCantidadCarrito =
  ({ id, nuevaCantidad }) =>
  (dispatch, getState) => {
    const state = getState().carrito
    const actuales = obtenerCarritoPorIdUsuario(state, state.idUsuario)

    const articulos =
      Number(nuevaCantidad) < 1
        ? actuales.filter((articulo) => articulo.id !== id)
        : actuales.map((articulo) =>
            articulo.id === id
              ? { ...articulo, cantidad: obtenerCantidadValida(articulo, nuevaCantidad) }
              : articulo
          )

    dispatch(cantidadActualizada(articulos))
  }

export const eliminarDelCarrito =
  ({ id }) =>
  (dispatch, getState) => {
    const state = getState().carrito
    const actuales = obtenerCarritoPorIdUsuario(state, state.idUsuario)

    dispatch(productoEliminado(actuales.filter((articulo) => articulo.id !== id)))
  }

// ─── Selectores ──────────────────────────────────────────────────────────────

export const seleccionarArticulosCarrito = (state) => {
  const clave = obtenerClaveUsuario(state.carrito.idUsuario)
  return state.carrito.carritosPorUsuario[clave] ?? []
}

export default carritoSlice.reducer
