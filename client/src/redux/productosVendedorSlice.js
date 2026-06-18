import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { crearDatosProducto, obtenerMensajeRespuesta } from '../components/vendedor/crearProducto/datos/reglasCrearProducto'
import { crearFormularioImagenes } from '../components/vendedor/crearProducto/imagenes/imagenesCrearProducto'

const obtenerMensajeErrorProducto = (error, mensaje) => {
  const data = error.response?.data
  return data?.mensaje || data?.message || error.message || mensaje
}

const PRODUCTOS_VENDEDOR_PAGE_SIZE = 100

const insertarOActualizarProducto = (productos, productoActualizado) => {
  const existeProducto = productos.some(
    (producto) => producto.idProducto === productoActualizado.idProducto,
  )

  if (!existeProducto) return [...productos, productoActualizado]

  return productos.map((producto) =>
    producto.idProducto === productoActualizado.idProducto ? productoActualizado : producto,
  )
}

export const fetchProductosVendedor = createAsyncThunk(
  'productosVendedor/fetchProductosVendedor',
  async ({ token }) => {
    const { data } = await axios(`/productos/vendedor?page=0&size=${PRODUCTOS_VENDEDOR_PAGE_SIZE}`, {
      headers: { Authorization: `Bearer ${token}` },
    })

    if (Array.isArray(data.data)) return data.data
    return data.data?.content || []
  },
  {
    condition: ({ token, usuarioId }, { getState }) => {
      if (!token || !usuarioId) return false

      const { productosVendedor } = getState()
      const mismoUsuario = productosVendedor.usuarioIdCargado === usuarioId

      if (productosVendedor.loading) return false
      return !mismoUsuario || !productosVendedor.productosCargados
    },
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

export const crearProductoVendedor = createAsyncThunk(
  'productosVendedor/crearProductoVendedor',
  async ({ imagenes = [], producto, token }, { rejectWithValue }) => {
    try {
      const headers = { Authorization: `Bearer ${token}` }
      const { data: respuestaProducto } = await axios.post('/productos', crearDatosProducto(producto), {
        headers,
      })

      const productoCreado = respuestaProducto.data
      let productoFinal = productoCreado
      let respuestaImagenes = null

      if (imagenes.length > 0) {
        const { data } = await axios.post(
          `/productos/${productoCreado.idProducto}/imagenes`,
          crearFormularioImagenes(imagenes),
          {
            headers,
          },
        )
        respuestaImagenes = data

        const { data: respuestaProductoConImagenes } = await axios(
          `/productos/${productoCreado.idProducto}`,
          { headers },
        )
        productoFinal = respuestaProductoConImagenes.data
      }

      return {
        mensaje: obtenerMensajeRespuesta(respuestaProducto, 'Producto creado exitosamente'),
        mensajeImagenes: obtenerMensajeRespuesta(respuestaImagenes, ''),
        producto: productoFinal,
      }
    } catch (error) {
      return rejectWithValue(obtenerMensajeErrorProducto(error, 'No se pudo crear el producto.'))
    }
  },
)

export const guardarImagenesProductoVendedor = createAsyncThunk(
  'productosVendedor/guardarImagenesProductoVendedor',
  async ({ cambios, idProducto, token }, { rejectWithValue }) => {
    const nuevas = cambios?.nuevas || []
    const quitadas = cambios?.quitadas || []
    const mensajes = []
    const headers = { Authorization: `Bearer ${token}` }

    if (nuevas.length === 0 && quitadas.length === 0) return null

    try {
      for (const idImagen of quitadas) {
        const { data } = await axios.delete(`/productos/${idProducto}/imagenes/${idImagen}`, {
          headers,
        })
        mensajes.push(obtenerMensajeRespuesta(data, 'Imagen eliminada correctamente'))
      }

      if (nuevas.length > 0) {
        const { data } = await axios.post(
          `/productos/${idProducto}/imagenes`,
          crearFormularioImagenes(nuevas),
          {
            headers,
          },
        )
        mensajes.push(obtenerMensajeRespuesta(data, 'Imagenes guardadas correctamente'))
      }

      const { data: respuestaProducto } = await axios(`/productos/${idProducto}`, { headers })

      return {
        mensaje: mensajes[mensajes.length - 1],
        producto: respuestaProducto.data,
      }
    } catch (error) {
      return rejectWithValue(obtenerMensajeErrorProducto(error, 'No se pudieron guardar las imagenes.'))
    }
  },
)

export const actualizarProductoVendedor = createAsyncThunk(
  'productosVendedor/actualizarProductoVendedor',
  async ({ producto, token }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/productos/${producto.idProducto}`, crearDatosProducto(producto), {
        headers: { Authorization: `Bearer ${token}` },
      })

      return {
        mensaje: obtenerMensajeRespuesta(data, 'Producto actualizado correctamente'),
        producto: data.data,
      }
    } catch (error) {
      return rejectWithValue(obtenerMensajeErrorProducto(error, 'No se pudo actualizar el producto.'))
    }
  },
)

const productosVendedorSlice = createSlice({
  name: 'productosVendedor',
  initialState: {
    productos: [],
    loading: false,
    loadingDetalle: false,
    error: null,
    productosCargados: false,
    usuarioIdCargado: null,
    publicando: false,
    errorPublicar: null,
    guardandoImagenes: false,
    errorImagenes: null,
    actualizando: false,
    errorActualizar: null,
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
      .addCase(fetchProductosVendedor.pending, (state, action) => {
        state.loading = true
        state.error = null
        if (state.usuarioIdCargado !== action.meta.arg.usuarioId) {
          state.productos = []
        }
      })
      .addCase(fetchProductosVendedor.fulfilled, (state, action) => {
        state.loading = false
        state.productos = action.payload
        state.productosCargados = true
        state.usuarioIdCargado = action.meta.arg.usuarioId
      })
      .addCase(fetchProductosVendedor.rejected, (state, action) => {
        state.loading = false
        state.productosCargados = false
        state.error = action.error.message || 'No se pudo cargar el panel.'
      })
      .addCase(fetchProductoVendedorPorId.pending, (state) => {
        state.loadingDetalle = true
        state.error = null
      })
      .addCase(fetchProductoVendedorPorId.fulfilled, (state, action) => {
        state.loadingDetalle = false
        state.productos = insertarOActualizarProducto(state.productos, action.payload)
      })
      .addCase(fetchProductoVendedorPorId.rejected, (state, action) => {
        state.loadingDetalle = false
        state.error = action.error.message || 'No se pudo cargar el producto.'
      })
      .addCase(crearProductoVendedor.pending, (state) => {
        state.publicando = true
        state.errorPublicar = null
      })
      .addCase(crearProductoVendedor.fulfilled, (state, action) => {
        state.publicando = false
        state.errorPublicar = null
        if (!action.payload.producto) return

        const usuarioId = action.meta.arg.usuarioId
        if (usuarioId && state.usuarioIdCargado && state.usuarioIdCargado !== usuarioId) {
          state.productos = []
          state.productosCargados = false
          state.usuarioIdCargado = usuarioId
        }

        state.productos = insertarOActualizarProducto(state.productos, action.payload.producto)
      })
      .addCase(crearProductoVendedor.rejected, (state, action) => {
        state.publicando = false
        state.errorPublicar = action.payload || action.error.message || 'No se pudo crear el producto.'
      })
      .addCase(guardarImagenesProductoVendedor.pending, (state) => {
        state.guardandoImagenes = true
        state.errorImagenes = null
      })
      .addCase(guardarImagenesProductoVendedor.fulfilled, (state, action) => {
        state.guardandoImagenes = false
        state.errorImagenes = null
        if (action.payload?.producto) {
          state.productos = insertarOActualizarProducto(state.productos, action.payload.producto)
        }
      })
      .addCase(guardarImagenesProductoVendedor.rejected, (state, action) => {
        state.guardandoImagenes = false
        state.errorImagenes = action.payload || action.error.message || 'No se pudieron guardar las imagenes.'
      })
      .addCase(actualizarProductoVendedor.pending, (state) => {
        state.actualizando = true
        state.errorActualizar = null
      })
      .addCase(actualizarProductoVendedor.fulfilled, (state, action) => {
        state.actualizando = false
        state.errorActualizar = null
        if (!action.payload.producto) return

        state.productos = insertarOActualizarProducto(state.productos, action.payload.producto)
      })
      .addCase(actualizarProductoVendedor.rejected, (state, action) => {
        state.actualizando = false
        state.errorActualizar = action.payload || action.error.message || 'No se pudo actualizar el producto.'
      })
  },
})

export const { actualizarProductoVendedorGuardado } = productosVendedorSlice.actions
export default productosVendedorSlice.reducer
