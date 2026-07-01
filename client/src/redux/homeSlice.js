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

const obtenerIdProducto = (producto) => producto?.idProducto ?? producto?.id

const descontarStockDestacados = (state, action) => {
    const cantidadesCompradas = new Map(
        (action.meta.arg.articulos || []).map((articulo) => [
            Number(obtenerIdProducto(articulo)),
            Number(articulo.cantidad || 0),
        ]),
    )

    state.productosDestacados.forEach((producto) => {
        const cantidad = cantidadesCompradas.get(Number(obtenerIdProducto(producto)))

        if (cantidad && producto.stock != null) {
            producto.stock = Math.max(0, Number(producto.stock) - cantidad)
        }
    })
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
            .addCase(confirmarPedidoCompra.fulfilled, descontarStockDestacados)
            .addCase(confirmarPedidoPaypal.fulfilled, descontarStockDestacados)
            .addCase(crearProductoVendedor.fulfilled, invalidarDestacados)
            .addCase(actualizarProductoVendedor.fulfilled, invalidarDestacados)
            .addCase(guardarImagenesProductoVendedor.fulfilled, invalidarDestacados)
    }
})

export default homeSlice.reducer
