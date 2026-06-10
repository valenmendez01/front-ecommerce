import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { obtenerImagenProducto } from '../lib/reglasCarrito'

const obtenerId = (producto) => producto?.idProducto ?? producto?.id

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
    const { data } = await axios('/productos?page=0&size=1000')
    const productos = (data.data?.content || data.content || [])
      .filter((producto) => {
        const id = obtenerId(producto)
        return id && !excluidos.has(Number(id)) && Number(producto.stock ?? 0) > 0
      })
      .map(normalizar)
    return elegirVariados(productos)
  },
)

const recomendadosCarritoSlice = createSlice({
  name: 'recomendadosCarrito',
  initialState: { cargando: false, productos: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecomendadosCarrito.pending, (state) => {
        state.cargando = true
      })
      .addCase(fetchRecomendadosCarrito.fulfilled, (state, action) => {
        state.cargando = false
        state.productos = action.payload
      })
      .addCase(fetchRecomendadosCarrito.rejected, (state) => {
        state.cargando = false
        state.productos = []
      })
  },
})

export default recomendadosCarritoSlice.reducer
