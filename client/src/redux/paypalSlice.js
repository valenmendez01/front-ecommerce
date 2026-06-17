import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const obtenerMensajeError = (error) => {
  const data = error.response?.data
  return data?.mensaje || data?.message || data?.error || error.message
}

export const crearOrdenPaypal = createAsyncThunk(
  'paypal/crearOrdenPaypal',
  async ({ cancelUrl, returnUrl, token, totalPesos }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        '/pagos/paypal/crear-orden',
        { cancelUrl, returnUrl, totalPesos },
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

export const capturarOrdenPaypal = createAsyncThunk(
  'paypal/capturarOrdenPaypal',
  async ({ orderId, token }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `/pagos/paypal/capturar-orden/${orderId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      )

      return data
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
    limpiarPagoPaypal: (state) => {
      state.cargandoCrear = false
      state.cargandoCaptura = false
      state.error = null
      state.orderIdCapturado = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(crearOrdenPaypal.pending, (state) => {
        state.cargandoCrear = true
        state.error = null
      })
      .addCase(crearOrdenPaypal.fulfilled, (state) => {
        state.cargandoCrear = false
      })
      .addCase(crearOrdenPaypal.rejected, (state, action) => {
        state.cargandoCrear = false
        state.error = action.payload || 'No se pudo iniciar el pago con PayPal.'
      })
      .addCase(capturarOrdenPaypal.pending, (state) => {
        state.cargandoCaptura = true
        state.error = null
      })
      .addCase(capturarOrdenPaypal.fulfilled, (state, action) => {
        state.cargandoCaptura = false
        state.orderIdCapturado = action.payload.orderId
      })
      .addCase(capturarOrdenPaypal.rejected, (state, action) => {
        state.cargandoCaptura = false
        state.error = action.payload || 'No se pudo confirmar el pago con PayPal.'
      })
  },
})

export const { limpiarPagoPaypal } = paypalSlice.actions

export default paypalSlice.reducer
