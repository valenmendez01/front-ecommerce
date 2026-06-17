import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

// ─── Thunks ──────────────────────────────────────────────────────────────────

export const fetchProductosVendedor = createAsyncThunk(
  'productosVendedor/fetchProductosVendedor',
  async (token) => {
    const { data } = await axios('/productos/vendedor', {
      headers: { Authorization: `Bearer ${token}` },
    })

    if (Array.isArray(data.data)) return data.data
    return data.data?.content || []
  },
)

export const fetchProductoVendedorPorId = createAsyncThunk(
  'productosVendedor/fetchProductoVendedorPorId',
  async ({ idProducto, token }) => {
    const { data } = await axios(`/productos/${idProducto}`, {
      headers: { Authorization: `Bearer ${token}` },
    })

    return data.data
  },
)

// ─── Slice ───────────────────────────────────────────────────────────────────

const productosVendedorSlice = createSlice({
  name: 'productosVendedor',
  initialState: {
    productos: [],
    loading: false,
    loadingDetalle: false,
    error: null,
  },
  reducers: {
    actualizarProductoVendedorGuardado: (state, action) => {
      state.productos = state.productos.map((producto) =>
        producto.idProducto === action.payload.idProducto ? action.payload : producto,
      )
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchProductosVendedor
      .addCase(fetchProductosVendedor.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProductosVendedor.fulfilled, (state, action) => {
        state.loading = false
        state.productos = action.payload
      })
      .addCase(fetchProductosVendedor.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'No se pudo cargar el panel.'
      })

      // fetchProductoVendedorPorId
      .addCase(fetchProductoVendedorPorId.pending, (state) => {
        state.loadingDetalle = true
        state.error = null
      })
      .addCase(fetchProductoVendedorPorId.fulfilled, (state, action) => {
        state.loadingDetalle = false
        state.productos = state.productos.map((producto) =>
          producto.idProducto === action.payload.idProducto ? action.payload : producto,
        )
      })
      .addCase(fetchProductoVendedorPorId.rejected, (state, action) => {
        state.loadingDetalle = false
        state.error = action.error.message || 'No se pudo cargar el producto.'
      })
  },
})

export const { actualizarProductoVendedorGuardado } = productosVendedorSlice.actions
export default productosVendedorSlice.reducer