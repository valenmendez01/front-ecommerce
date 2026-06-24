import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const obtenerMensajeError = (error) => {
  const data = error.response?.data
  return data?.mensaje || data?.message || data?.error || error.message
}
export const crearOrdenPaypal = createAsyncThunk(
  'paypal/crearOrdenPaypal',
  async ({ cancelUrl, items, returnUrl, token }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        '/pagos/paypal/crear-orden',
        { cancelUrl, items, returnUrl },
        { headers: { Authorization: `Bearer ${token}` } },
      )
      return data
    } catch (error) {
      return rejectWithValue(obtenerMensajeError(error))
    }
  },
  {
    condition: (_, { getState }) => !getState().paypal.cargandoCrear,
  },
)
export const confirmarPedidoPaypal = createAsyncThunk(
  'paypal/confirmarPedidoPaypal',
  async ({ articulos, orderId, token, usuario }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `/pagos/paypal/confirmar-pedido/${orderId}`,
        {
          idUsuario: usuario.idUsuario,
          items: articulos.map((articulo) => ({
            idProducto: articulo.idProducto ?? articulo.id,
            cantidad: articulo.cantidad,
          })),
        },
        { headers: { Authorization: `Bearer ${token}` } },
      )
      return data?.mensaje || data?.message || 'Pedido confirmado'
    } catch (error) {
      return rejectWithValue(obtenerMensajeError(error))
    }
  },
  {
    condition: ({ orderId }, { getState }) => {
      const paypal = getState().paypal
      return !paypal.cargandoCaptura && paypal.orderIdCapturado !== orderId
    },
  },
)
const paypalSlice = createSlice({
  name: 'paypal',
  initialState: {
    cargandoCrear: false,
    cargandoCaptura: false,
    error: null,
    orderIdCapturado: null,
  },
  reducers: {
    limpiarPagoPaypal: (state) => Object.assign(state, {
      cargandoCrear: false,
      cargandoCaptura: false,
      error: null,
      orderIdCapturado: null,
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(crearOrdenPaypal.pending, (state) => {
        Object.assign(state, { cargandoCrear: true, error: null })
      })
      .addCase(crearOrdenPaypal.fulfilled, (state) => {
        state.cargandoCrear = false
      })
      .addCase(crearOrdenPaypal.rejected, (state, action) => Object.assign(state, {
        cargandoCrear: false,
        error: action.payload || 'No se pudo iniciar el pago con PayPal.',
      }))
      .addCase(confirmarPedidoPaypal.pending, (state) => {
        Object.assign(state, { cargandoCaptura: true, error: null })
      })
      .addCase(confirmarPedidoPaypal.fulfilled, (state, action) => {
        state.cargandoCaptura = false
        state.orderIdCapturado = action.meta.arg.orderId
      })
      .addCase(confirmarPedidoPaypal.rejected, (state, action) => Object.assign(state, {
        cargandoCaptura: false,
        error: action.payload || 'No se pudo confirmar el pago con PayPal.',
      }))
  },
})
export const { limpiarPagoPaypal } = paypalSlice.actions
export default paypalSlice.reducer
