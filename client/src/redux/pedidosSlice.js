import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchPedidosComprador = createAsyncThunk('pedidos/fetchPedidosComprador', async (token) => {
  const { data } = await axios('/pedidos/comprador', {
    headers: { Authorization: `Bearer ${token}` },
  })
  return data.data?.content || []
})

const pedidosSlice = createSlice({
  name: 'pedidos',
  initialState: {
    pedidos: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPedidosComprador.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchPedidosComprador.fulfilled, (state, action) => {
        state.loading = false
        state.pedidos = action.payload
      })
      .addCase(fetchPedidosComprador.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'No se pudieron cargar tus pedidos.'
      })
  },
})

export default pedidosSlice.reducer
