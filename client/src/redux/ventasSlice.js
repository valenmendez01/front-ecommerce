import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchVentasVendedor = createAsyncThunk(
  'ventas/fetchVentasVendedor',
  async ({ token }) => {
    const { data } = await axios('/ventas/vendedor', {
      headers: { Authorization: `Bearer ${token}` },
    })
    return data.data
  },
  {
    condition: ({ token, usuarioId }, { getState }) => {
      if (!token || !usuarioId) return false

      const { ventas } = getState()
      const mismoUsuario = ventas.usuarioIdCargado === usuarioId

      if (ventas.loading) return false
      return !mismoUsuario || !ventas.ventasCargadas
    },
  },
)

const ventasSlice = createSlice({
  name: 'ventas',
  initialState: {
    ventas: null,
    loading: false,
    error: null,
    ventasCargadas: false,
    usuarioIdCargado: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVentasVendedor.pending, (state, action) => {
        state.loading = true
        state.error = null
        if (state.usuarioIdCargado !== action.meta.arg.usuarioId) {
          state.ventas = null
        }
      })
      .addCase(fetchVentasVendedor.fulfilled, (state, action) => {
        state.loading = false
        state.ventas = action.payload
        state.ventasCargadas = true
        state.usuarioIdCargado = action.meta.arg.usuarioId
      })
      .addCase(fetchVentasVendedor.rejected, (state, action) => {
        state.loading = false
        state.ventasCargadas = false
        state.error = action.error.message || 'No se pudieron cargar tus ventas.'
      })
  },
})

export default ventasSlice.reducer
