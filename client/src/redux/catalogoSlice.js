import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const crearClaveProductos = ({ page, size }) => `page=${page}&size=${size}`

const normalizarPaginaProductos = (payload) => ({
    productos: payload?.content || [],
    totalPaginas: payload?.totalPages ?? 1,
})

export const fetchProductos = createAsyncThunk('catalogo/fetchProductos', async ({ page, size }) => {
    const { data } = await axios(`/productos?page=${page}&size=${size}`)
    return {
        clave: crearClaveProductos({ page, size }),
        ...normalizarPaginaProductos(data.data),
    }
}, {
    condition: ({ page, size }, { getState }) => {
        const { productos } = getState()
        const clave = crearClaveProductos({ page, size })
        const mismaConsultaEnCurso = productos.loading && productos.consultaActual === clave
        return !mismaConsultaEnCurso && !productos.productosPorConsulta[clave]
    },
})

export const fetchCategorias = createAsyncThunk('catalogo/fetchCategorias', async () => {
    const { data } = await axios('/categorias')
    return data.data
}, {
    condition: (_, { getState }) => {
        const { productos } = getState()
        return !productos.categoriasCargadas && productos.categorias.length === 0
    },
})

export const fetchSelecciones = createAsyncThunk('catalogo/fetchSelecciones', async () => {
    const { data } = await axios('/selecciones')
    return data.data
}, {
    condition: (_, { getState }) => {
        const { productos } = getState()
        return !productos.seleccionesCargadas && productos.selecciones.length === 0
    },
})

export const fetchProductosFiltrados = createAsyncThunk('catalogo/fetchProductosFiltrados', async (params) => {
    const { data } = await axios(`/productos/filtrar?${params}`)
    return {
        clave: params,
        ...normalizarPaginaProductos(data.data),
    }
}, {
    condition: (params, { getState }) => {
        const { productos } = getState()
        const mismoFiltroEnCurso = productos.filtro.loading && productos.filtro.lastParams === params
        return !mismoFiltroEnCurso && !productos.filtro.productosPorConsulta[params]
    },
})

export const fetchProductoDetalle = createAsyncThunk('catalogo/fetchProductoDetalle', async (id) => {
    const { data } = await axios(`/productos/${id}`)
    if (!data.data) throw new Error(data.mensaje || "Producto no encontrado.")
    return data.data
}, {
    condition: (id, { getState }) => {
        const { productos } = getState()
        const idProducto = String(id)
        const mismoDetalleEnCurso = productos.loadingDetalle && productos.productoDetalleId === idProducto
        return !mismoDetalleEnCurso && !productos.detallesPorId[idProducto]
    },
})

const catalogoSlice = createSlice({
    name: 'catalogo',
    initialState: {
        categorias: [],
        categoriasCargadas: false,
        selecciones: [],
        seleccionesCargadas: false,
        productos: [],
        productosPorConsulta: {},
        consultaActual: null,
        totalPaginas: 1,
        loading: false,
        filtro: {
            productos: [],
            productosPorConsulta: {},
            totalPaginas: 1,
            loading: false,
            error: null,
            lastParams: null,
        },
        productoDetalle: null,
        productoDetalleId: null,
        detallesPorId: {},
        loadingDetalle: false,
        error: null,
    },
    reducers: {
        limpiarFiltro(state) {
            state.filtro.productos = []
            state.filtro.totalPaginas = 1
            state.filtro.error = null
            state.filtro.lastParams = null
            state.filtro.productosPorConsulta = {}
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductos.pending, (state, action) => {
                state.loading = true
                state.error = null
                state.consultaActual = crearClaveProductos(action.meta.arg)
            })
            .addCase(fetchProductos.fulfilled, (state, action) => {
                state.loading = false
                state.productos = action.payload.productos
                state.totalPaginas = action.payload.totalPaginas
                state.consultaActual = action.payload.clave
                state.productosPorConsulta[action.payload.clave] = {
                    productos: action.payload.productos,
                    totalPaginas: action.payload.totalPaginas,
                }
            })
            .addCase(fetchProductos.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(fetchProductosFiltrados.pending, (state, action) => {
                state.filtro.loading = true
                state.filtro.error = null
                state.filtro.lastParams = action.meta.arg
            })
            .addCase(fetchProductosFiltrados.fulfilled, (state, action) => {
                state.filtro.loading = false
                state.filtro.productos = action.payload.productos
                state.filtro.totalPaginas = action.payload.totalPaginas
                state.filtro.lastParams = action.payload.clave
                state.filtro.productosPorConsulta[action.payload.clave] = {
                    productos: action.payload.productos,
                    totalPaginas: action.payload.totalPaginas,
                }
            })
            .addCase(fetchProductosFiltrados.rejected, (state, action) => {
                state.filtro.loading = false
                state.filtro.error = action.error.message
            })

            .addCase(fetchCategorias.pending, (state) => { state.error = null })
            .addCase(fetchCategorias.fulfilled, (state, action) => {
                state.categorias = action.payload
                state.categoriasCargadas = true
            })
            .addCase(fetchCategorias.rejected, (state, action) => {
                state.error = action.error.message
            })

            .addCase(fetchSelecciones.pending, (state) => { state.error = null })
            .addCase(fetchSelecciones.fulfilled, (state, action) => {
                state.selecciones = action.payload
                state.seleccionesCargadas = true
            })
            .addCase(fetchSelecciones.rejected, (state, action) => {
                state.error = action.error.message
            })

            .addCase(fetchProductoDetalle.pending, (state, action) => {
                state.loadingDetalle = true
                state.error = null
                state.productoDetalleId = String(action.meta.arg)
            })
            .addCase(fetchProductoDetalle.fulfilled, (state, action) => {
                state.loadingDetalle = false
                state.productoDetalle = action.payload
                state.productoDetalleId = String(action.meta.arg)
                state.detallesPorId[String(action.meta.arg)] = action.payload
            })
            .addCase(fetchProductoDetalle.rejected, (state, action) => {
                state.loadingDetalle = false
                state.error = action.error.message
            })
    }
})

export const { limpiarFiltro } = catalogoSlice.actions
export default catalogoSlice.reducer
