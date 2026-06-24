import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { confirmarPedidoCompra } from './compraSlice'
import { confirmarPedidoPaypal } from './paypalSlice'
import {
    actualizarProductoVendedor,
    crearProductoVendedor,
    guardarImagenesProductoVendedor,
} from './productosVendedorSlice'

const invalidarDestacados = (state) => {
    state.productosDestacados = []
    state.destacadosCargados = false
    state.errorDestacados = null
}

export const fetchProductosDestacadosHome = createAsyncThunk(
    'home/fetchProductosDestacadosHome',
    async () => {
        const { data } = await axios('/productos/destacados?page=0&size=4')
        const productos = data.data

        if (Array.isArray(productos)) return productos
        return productos?.content || []
    },
    {
        condition: (_, { getState }) => {
            const { home } = getState()
            return !home.loadingDestacados && !home.destacadosCargados
        },
    }
)

const homeSlice = createSlice({
    name: 'home',
    initialState: {
        productosDestacados: [],
        loadingDestacados: false,
        destacadosCargados: false,
        errorDestacados: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductosDestacadosHome.pending, (state) => {
                state.loadingDestacados = true
                state.errorDestacados = null
            })
            .addCase(fetchProductosDestacadosHome.fulfilled, (state, action) => {
                state.loadingDestacados = false
                state.productosDestacados = action.payload
                state.destacadosCargados = true
            })
            .addCase(fetchProductosDestacadosHome.rejected, (state, action) => {
                state.loadingDestacados = false
                state.destacadosCargados = false
                state.productosDestacados = []
                state.errorDestacados = action.error.message
            })
            .addCase(confirmarPedidoCompra.fulfilled, invalidarDestacados)
            .addCase(confirmarPedidoPaypal.fulfilled, invalidarDestacados)
            .addCase(crearProductoVendedor.fulfilled, invalidarDestacados)
            .addCase(actualizarProductoVendedor.fulfilled, invalidarDestacados)
            .addCase(guardarImagenesProductoVendedor.fulfilled, invalidarDestacados)
    }
})

export default homeSlice.reducer
