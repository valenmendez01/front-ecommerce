import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchPedidosComprador = createAsyncThunk(
  'pedidos/fetchPedidosComprador',
  async ({ token }) => {
    const { data } = await axios('/pedidos/comprador', {
      headers: { Authorization: `Bearer ${token}` },
    })
    return data.data?.content || []
  },
  {
    condition: ({ token, usuarioId }, { getState }) => {
      if (!token || !usuarioId) return false

      const { pedidos } = getState()
      const mismoUsuario = pedidos.usuarioIdCargado === usuarioId

      return !mismoUsuario || (!pedidos.loading && !pedidos.pedidosCargados)
    },
  },
)

const pedidosSlice = createSlice({
  name: 'pedidos',
  initialState: {
    pedidos: [],
    loading: false,
    error: null,
    pedidosCargados: false,
    usuarioIdCargado: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPedidosComprador.pending, (state, action) => {
        state.loading = true
        state.error = null
        if (state.usuarioIdCargado !== action.meta.arg.usuarioId) {
          state.pedidos = []
        }
      })
      .addCase(fetchPedidosComprador.fulfilled, (state, action) => {
        state.loading = false
        state.pedidos = action.payload
        state.pedidosCargados = true
        state.usuarioIdCargado = action.meta.arg.usuarioId
      })
      .addCase(fetchPedidosComprador.rejected, (state, action) => {
        state.loading = false
        state.pedidosCargados = false
        state.error = action.error.message || 'No se pudieron cargar tus pedidos.'
      })
  },
})

export default pedidosSlice.reducer
