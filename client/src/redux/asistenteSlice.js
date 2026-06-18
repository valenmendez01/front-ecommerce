import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit'
import { apiRequest } from '../lib/api'

const MENSAJE_INICIAL = '¡Hola! Soy el asistente de FIGULLECT. Puedo ayudarte a encontrar productos, completar tu colección, entender el carrito o revisar tus pedidos.'
const MENSAJE_ERROR = 'Ahora no pude responder la consulta. Probá de nuevo en unos segundos.'

const crearMensaje = ({ autor, texto, acciones = [], fueraDeTema = false }) => ({
  id: nanoid(),
  autor,
  texto,
  acciones: acciones.filter((accion) => accion?.texto && accion?.tipo !== 'ninguno'),
  fueraDeTema,
})

const mensajeInicial = {
  id: 'asistente-inicio',
  autor: 'asistente',
  texto: MENSAJE_INICIAL,
  acciones: [],
  fueraDeTema: false,
}

export const preguntarAsistente = createAsyncThunk(
  'asistente/preguntar',
  async ({ mensaje, contexto }, { rejectWithValue }) => {
    try {
      return await apiRequest('/api/v1/asistente/preguntar', {
        auth: false,
        method: 'POST',
        body: {
          mensaje,
          contexto,
        },
      })
    } catch (error) {
      return rejectWithValue({
        message: error.message,
        status: error.status,
        payload: error.payload,
      })
    }
  },
)

const asistenteSlice = createSlice({
  name: 'asistente',
  initialState: {
    abierto: false,
    mensajes: [mensajeInicial],
    cargando: false,
    error: null,
    flujoActivo: null,
  },
  reducers: {
    abrirAsistente: (state) => {
      state.abierto = true
    },
    cerrarAsistente: (state) => {
      state.abierto = false
    },
    alternarAsistente: (state) => {
      state.abierto = !state.abierto
    },
    limpiarConversacionAsistente: (state) => {
      state.mensajes = [mensajeInicial]
      state.error = null
      state.flujoActivo = null
      state.cargando = false
    },
    definirFlujoActivo: (state, action) => {
      state.flujoActivo = action.payload
    },
    agregarMensajeUsuario: {
      reducer: (state, action) => {
        state.mensajes.push(action.payload)
      },
      prepare: (texto) => ({
        payload: crearMensaje({ autor: 'usuario', texto }),
      }),
    },
    agregarMensajeAsistente: {
      reducer: (state, action) => {
        state.mensajes.push(action.payload)
      },
      prepare: ({ texto, acciones = [], fueraDeTema = false }) => ({
        payload: crearMensaje({
          autor: 'asistente',
          texto,
          acciones,
          fueraDeTema,
        }),
      }),
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(preguntarAsistente.pending, (state) => {
        state.cargando = true
        state.error = null
      })
      .addCase(preguntarAsistente.fulfilled, (state, action) => {
        state.cargando = false
        state.error = null
        state.mensajes.push(
          crearMensaje({
            autor: 'asistente',
            texto: action.payload?.respuesta || MENSAJE_ERROR,
            acciones: action.payload?.acciones || [],
            fueraDeTema: Boolean(action.payload?.fueraDeTema),
          }),
        )
      })
      .addCase(preguntarAsistente.rejected, (state, action) => {
        state.cargando = false
        state.error = action.payload?.message || action.error.message
        state.mensajes.push(
          crearMensaje({
            autor: 'asistente',
            texto: MENSAJE_ERROR,
          }),
        )
      })
  },
})

export const {
  abrirAsistente,
  cerrarAsistente,
  alternarAsistente,
  limpiarConversacionAsistente,
  definirFlujoActivo,
  agregarMensajeUsuario,
  agregarMensajeAsistente,
} = asistenteSlice.actions

export default asistenteSlice.reducer
