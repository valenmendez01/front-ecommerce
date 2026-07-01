import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { confirmarPedidoCompra } from './compraSlice'
import { confirmarPedidoPaypal } from './paypalSlice'

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

      return !pedidos.loading
        && (!mismoUsuario || pedidos.pedidosDesactualizados || !pedidos.pedidosCargados)
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
    pedidosDesactualizados: false,
    usuarioIdCargado: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    const agregarPedidoConfirmado = (state, action) => {
      const pedido = action.payload?.pedido
      const usuarioId = action.meta.arg.usuario?.idUsuario
      const mismoUsuario = state.usuarioIdCargado === usuarioId

      if (!pedido || !mismoUsuario || !state.pedidosCargados) {
        state.pedidosDesactualizados = true
        return
      }

      const idPedido = pedido.idPedido ?? pedido.id
      const yaExiste = state.pedidos.some((pedidoActual) => (
        (pedidoActual.idPedido ?? pedidoActual.id) === idPedido
      ))

      if (!yaExiste) {
        state.pedidos.unshift(pedido)
      }

      state.pedidosDesactualizados = false
    }

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
        state.pedidosDesactualizados = false
        state.usuarioIdCargado = action.meta.arg.usuarioId
      })
      .addCase(fetchPedidosComprador.rejected, (state, action) => {
        state.loading = false
        state.pedidosCargados = false
        state.error = action.error.message || 'No se pudieron cargar tus pedidos.'
      })
      .addCase(confirmarPedidoCompra.fulfilled, agregarPedidoConfirmado)
      .addCase(confirmarPedidoPaypal.fulfilled, agregarPedidoConfirmado)
  },
})

export default pedidosSlice.reducer
