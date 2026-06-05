import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchVentasVendedor = createAsyncThunk('ventas/fetchVentasVendedor', async (token) => {
  const { data } = await axios('/ventas/vendedor', {
    headers: { Authorization: `Bearer ${token}` },
  })
  return data.data
})

const ventasSlice = createSlice({
  name: 'ventas',
  initialState: {
    ventas: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVentasVendedor.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchVentasVendedor.fulfilled, (state, action) => {
        state.loading = false
        state.ventas = action.payload
      })
      .addCase(fetchVentasVendedor.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'No se pudieron cargar tus ventas.'
      })
  },
})

export default ventasSlice.reducer
