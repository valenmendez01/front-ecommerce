import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchProductosDestacadosHome = createAsyncThunk(
    'home/fetchProductosDestacadosHome',
    async () => {
        const { data } = await axios('/productos/destacados?page=0&size=4')
        const productos = data.data

        if (Array.isArray(productos)) return productos
        return productos?.content || []
    }
)

const homeSlice = createSlice({
    name: 'home',
    initialState: {
        productosDestacados: [],
        loadingDestacados: false,
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
            })
            .addCase(fetchProductosDestacadosHome.rejected, (state, action) => {
                state.loadingDestacados = false
                state.productosDestacados = []
                state.errorDestacados = action.error.message
            })
    }
})

export default homeSlice.reducer
