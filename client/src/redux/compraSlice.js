import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const obtenerMensajeErrorPedido = (error) => {
  const estado = error.response?.status
  const data = error.response?.data
  const mensaje = typeof data === 'string'
    ? data
    : data?.mensaje || data?.message || data?.error || error.message
  const mensajeMinuscula = mensaje?.toLowerCase() || ''

  if ([502, 503, 504].includes(estado) || mensajeMinuscula.includes('bad gateway')) {
    return 'El servidor tardó demasiado en confirmar el pedido. Revisá tus pedidos antes de volver a intentarlo.'
  }

  return mensaje || 'No se pudo confirmar el pedido.'
}

export const confirmarPedidoCompra = createAsyncThunk(
  'compra/confirmarPedidoCompra',
  async ({ articulos, token, usuario }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        '/pedidos',
        {
          idUsuario: usuario.idUsuario,
          items: articulos.map((articulo) => ({
            idProducto: articulo.id,
            cantidad: articulo.cantidad,
          })),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      return data?.mensaje || data?.message || 'Pedido confirmado'
    } catch (error) {
      return rejectWithValue(obtenerMensajeErrorPedido(error))
    }
  },
  {
    condition: (_, { getState }) =>
      !getState().compra.cargandoConfirmar,
  },
)
const compraSlice = createSlice({
  name: 'compra',
  initialState: {
    cargandoConfirmar: false,
    confirmado: false,
    costoEnvio: null,
    envioGuardado: false,
    errorConfirmar: null,
    pagoGuardado: false,
  },
  reducers: {
    guardarEnvioCompra: (state, action) => {
      state.envioGuardado = true
      state.costoEnvio = action.payload?.costoEnvio ?? null
    },
    guardarPagoCompra: (state) => {
      state.pagoGuardado = true
    },
    registrarErrorCompra: (state, action) => {
      state.errorConfirmar = action.payload
    },
    reiniciarCompra: (state) => {
      state.cargandoConfirmar = false
      state.confirmado = false
      state.costoEnvio = null
      state.envioGuardado = false
      state.errorConfirmar = null
      state.pagoGuardado = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(confirmarPedidoCompra.pending, (state) => {
        state.cargandoConfirmar = true
        state.errorConfirmar = null
      })
      .addCase(confirmarPedidoCompra.fulfilled, (state) => {
        state.cargandoConfirmar = false
        state.confirmado = true
      })
      .addCase(confirmarPedidoCompra.rejected, (state, action) => {
        state.cargandoConfirmar = false
        const mensaje = action.payload || 'No se pudo confirmar el pedido.'
        state.errorConfirmar = `No se pudo confirmar el pedido: ${mensaje}`
      })
  },
})

export const {
  guardarEnvioCompra,
  guardarPagoCompra,
  registrarErrorCompra,
  reiniciarCompra,
} = compraSlice.actions

export default compraSlice.reducer
