import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

// Carga inicial sin filtros
export const fetchProductos = createAsyncThunk('catalogo/fetchProductos', async ({ page, size }) => {
    const { data } = await axios(`/productos?page=${page}&size=${size}`)
    return data.data
})

export const fetchCategorias = createAsyncThunk('catalogo/fetchCategorias', async () => {
    const { data } = await axios('/categorias')
    return data.data
})

export const fetchSelecciones = createAsyncThunk('catalogo/fetchSelecciones', async () => {
    const { data } = await axios('/selecciones')
    return data.data
})

export const fetchProductosFiltrados = createAsyncThunk('catalogo/fetchProductosFiltrados', async (params) => {
    const { data } = await axios(`/productos/filtrar?${params}`)
    return data.data
})

export const fetchProductoDetalle = createAsyncThunk('catalogo/fetchProductoDetalle', async (id) => {
    const { data } = await axios(`/productos/${id}`)
    if (!data.data) throw new Error(data.mensaje || "Producto no encontrado.")
    return data.data
})

const catalogoSlice = createSlice({
    name: 'catalogo',
    initialState: {
        categorias: [],
        selecciones: [],
        productos: [],
        totalPaginas: 1,
        loading: false,
        // Rama separada para resultados del filtro
        filtro: {
            productos: [],
            totalPaginas: 1,
            loading: false,
            error: null,
            lastParams: null,
        },
        productoDetalle: null,
        productoDetalleId: null,
        loadingDetalle: false,
        error: null,
    },
    reducers: {
        limpiarFiltro(state) {
            state.filtro.productos = []
            state.filtro.totalPaginas = 1
            state.filtro.error = null
            state.filtro.lastParams = null
        }
    },
    extraReducers: (builder) => {
        builder
            // fetchProductos
            .addCase(fetchProductos.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchProductos.fulfilled, (state, action) => {
                state.loading = false
                state.productos = action.payload.content || []
                state.totalPaginas = action.payload.totalPages ?? 1
            })
            .addCase(fetchProductos.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            // fetchProductosFiltrados
            .addCase(fetchProductosFiltrados.pending, (state) => {
                state.filtro.loading = true
                state.filtro.error = null
            })
            .addCase(fetchProductosFiltrados.fulfilled, (state, action) => {
                state.filtro.loading = false
                state.filtro.productos = action.payload.content || []
                state.filtro.totalPaginas = action.payload.totalPages ?? 1
                state.filtro.lastParams = action.meta.arg  // ← registra los params usados
            })
            .addCase(fetchProductosFiltrados.rejected, (state, action) => {
                state.filtro.loading = false
                state.filtro.error = action.error.message
            })

            // fetchCategorias
            .addCase(fetchCategorias.pending, (state) => { state.error = null })
            .addCase(fetchCategorias.fulfilled, (state, action) => {
                state.categorias = action.payload
            })
            .addCase(fetchCategorias.rejected, (state, action) => {
                state.error = action.error.message
            })

            // fetchSelecciones
            .addCase(fetchSelecciones.pending, (state) => { state.error = null })
            .addCase(fetchSelecciones.fulfilled, (state, action) => {
                state.selecciones = action.payload
            })
            .addCase(fetchSelecciones.rejected, (state, action) => {
                state.error = action.error.message
            })

            // fetchProductoDetalle
            .addCase(fetchProductoDetalle.pending, (state) => {
                state.loadingDetalle = true
                state.error = null
                state.productoDetalle = null
            })
            .addCase(fetchProductoDetalle.fulfilled, (state, action) => {
                state.loadingDetalle = false
                state.productoDetalle = action.payload
                state.productoDetalleId = String(action.meta.arg)  // ← registra el id cargado
            })
            .addCase(fetchProductoDetalle.rejected, (state, action) => {
                state.loadingDetalle = false
                state.error = action.error.message
            })
    }
})

export const { limpiarFiltro } = catalogoSlice.actions
export default catalogoSlice.reducer