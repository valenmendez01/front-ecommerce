import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { obtenerImagenProducto } from '../lib/reglasCarrito'
import { confirmarPedidoCompra } from './compraSlice'
import { confirmarPedidoPaypal } from './paypalSlice'
import {
  actualizarProductoVendedor,
  crearProductoVendedor,
  guardarImagenesProductoVendedor,
} from './productosVendedorSlice'

const obtenerId = (producto) => producto?.idProducto ?? producto?.id
const RECOMENDADOS_PAGE_SIZE = 30

const invalidarRecomendados = (state) => {
  state.cargando = false
  state.clave = null
  state.claveSolicitada = null
  state.error = null
  state.productos = []
  state.requestId = null
}

const mezclar = (productos) => {
  const copia = [...productos]
  for (let indice = copia.length - 1; indice > 0; indice -= 1) {
    const aleatorio = Math.floor(Math.random() * (indice + 1))
    ;[copia[indice], copia[aleatorio]] = [copia[aleatorio], copia[indice]]
  }
  return copia
}

const elegirVariados = (productos) => {
  const grupos = mezclar(productos).reduce((resultado, producto) => {
    const grupo = producto.seleccion || producto.categoria || 'SIN_GRUPO'
    resultado[grupo] = [...(resultado[grupo] || []), producto]
    return resultado
  }, {})
  const elegidos = mezclar(Object.values(grupos)).map((grupo) => grupo[0]).slice(0, 3)
  const idsElegidos = new Set(elegidos.map(obtenerId))
  const faltantes = mezclar(productos.filter((producto) => !idsElegidos.has(obtenerId(producto))))
    .slice(0, 3 - elegidos.length)
  return [...elegidos, ...faltantes]
}

const normalizar = (producto) => ({
  ...producto,
  id: obtenerId(producto),
  idProducto: obtenerId(producto),
  precio: Number(producto.precio ?? 0),
  descuento: Number(producto.descuento ?? 0),
  stock: Number(producto.stock ?? 0),
  subtitulo: producto.categoria || 'RECOMENDADO',
  imagen: obtenerImagenProducto(producto),
})

export const fetchRecomendadosCarrito = createAsyncThunk(
  'recomendadosCarrito/fetch',
  async (idsCarrito) => {
    const excluidos = new Set(String(idsCarrito || '').split(',').filter(Boolean).map(Number))
    const { data } = await axios(`/productos?page=0&size=${RECOMENDADOS_PAGE_SIZE}`)
    const productos = (data.data?.content || data.content || [])
      .filter((producto) => {
        const id = obtenerId(producto)
        return id && !excluidos.has(Number(id)) && Number(producto.stock ?? 0) > 0
      })
      .map(normalizar)
    return {
      clave: idsCarrito || '',
      productos: elegirVariados(productos),
    }
  },
  {
    condition: (idsCarrito, { getState }) => {
      const recomendados = getState().recomendadosCarrito
      const clave = idsCarrito || ''

      if (
        recomendados.cargando &&
        recomendados.claveSolicitada === clave
      ) {
        return false
      }

      return recomendados.clave !== clave
    },
  },
)

const recomendadosCarritoSlice = createSlice({
  name: 'recomendadosCarrito',
  initialState: {
    cargando: false,
    clave: null,
    claveSolicitada: null,
    error: null,
    productos: [],
    requestId: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecomendadosCarrito.pending, (state, action) => {
        state.cargando = true
        state.error = null
        state.claveSolicitada = action.meta.arg || ''
        state.requestId = action.meta.requestId
      })
      .addCase(fetchRecomendadosCarrito.fulfilled, (state, action) => {
        if (state.requestId !== action.meta.requestId) return

        state.cargando = false
        state.clave = action.payload.clave
        state.claveSolicitada = null
        state.productos = action.payload.productos
        state.requestId = null
      })
      .addCase(fetchRecomendadosCarrito.rejected, (state, action) => {
        if (state.requestId !== action.meta.requestId) return

        state.cargando = false
        state.claveSolicitada = null
        state.error = action.error.message || 'No se pudieron cargar los recomendados.'
        state.productos = []
        state.requestId = null
      })
      .addCase(confirmarPedidoCompra.fulfilled, invalidarRecomendados)
      .addCase(confirmarPedidoPaypal.fulfilled, invalidarRecomendados)
      .addCase(crearProductoVendedor.fulfilled, invalidarRecomendados)
      .addCase(actualizarProductoVendedor.fulfilled, invalidarRecomendados)
      .addCase(guardarImagenesProductoVendedor.fulfilled, invalidarRecomendados)
  },
})

export default recomendadosCarritoSlice.reducer
