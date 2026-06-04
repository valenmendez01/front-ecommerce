import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchCategorias = createAsyncThunk('catalogo/fetchCategorias', async () => {
    const { data } = await axios('/categorias')
    return data.data
})

export const fetchSelecciones = createAsyncThunk('catalogo/fetchSelecciones', async () => {
    const { data } = await axios('/selecciones')
    return data.data
})

export const fetchProductos = createAsyncThunk('catalogo/fetchProductos', async (params) => {
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
        productos: [],
        error: null,
        loading: false,
        categorias: [],
        selecciones: [],
        totalPaginas: 1,
        productoDetalle: null,
        loadingDetalle: false,
    },
    reducers: {},
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

            // fetchCategorias
            .addCase(fetchCategorias.pending, (state) => {
                state.error = null
            })
            .addCase(fetchCategorias.fulfilled, (state, action) => {
                state.categorias = action.payload
            })
            .addCase(fetchCategorias.rejected, (state, action) => {
                state.error = action.error.message
            })

            // fetchSelecciones
            .addCase(fetchSelecciones.pending, (state) => {
                state.error = null
            })
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
            })
            .addCase(fetchProductoDetalle.rejected, (state, action) => {
                state.loadingDetalle = false
                state.error = action.error.message
            })
    }
})

export default catalogoSlice.reducer