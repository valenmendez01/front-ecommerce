import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiRequest, clearStoredToken, getStoredToken, setStoredToken } from '../lib/api'
import { limpiarCarritosPersistidos } from './carritoSlice'

const USUARIO_KEY = 'usuario'

const formatearFecha = (fecha) => {
    if (!fecha) return ''
    const fechaNormalizada = new Date(`${fecha}T00:00:00`)
    if (Number.isNaN(fechaNormalizada.getTime())) return fecha
    return new Intl.DateTimeFormat('es-AR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(fechaNormalizada)
}

const crearIdVisual = (usuario) => {
    const prefijo = usuario.rol === 'VENDEDOR' ? 'VD' : 'CL'
    return `${prefijo}-${String(usuario.idUsuario || 0).padStart(4, '0')}`
}

const normalizarUsuario = (usuario) => {
    if (!usuario) return null
    return {
        ...usuario,
        fechaCreacion: formatearFecha(usuario.fechaCreacion),
        idUsuarioVisual: crearIdVisual(usuario),
        rolVisible: usuario.rol === 'COMPRADOR' ? 'CLIENTE' : usuario.rol,
    }
}

const estaTokenExpirado = (token) => {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        return payload.exp && payload.exp * 1000 < Date.now()
    } catch {
        return true
    }
}

const guardarUsuarioLocal = (usuario) =>
    localStorage.setItem(USUARIO_KEY, JSON.stringify(usuario))

const leerUsuarioLocal = () => {
    try {
        return JSON.parse(localStorage.getItem(USUARIO_KEY))
    } catch {
        return null
    }
}

const limpiarUsuarioLocal = () => localStorage.removeItem(USUARIO_KEY)

const limpiarSesionLocal = () => {
    clearStoredToken()
    limpiarUsuarioLocal()
}

const resolverSesionInicial = () => {
    const tokenActual = getStoredToken()
    if (!tokenActual || estaTokenExpirado(tokenActual)) {
        limpiarSesionLocal()
        return { usuario: null, token: null }
    }

    const usuarioGuardado = leerUsuarioLocal()
    if (!usuarioGuardado) {
        limpiarSesionLocal()
        return { usuario: null, token: null }
    }

    return { usuario: usuarioGuardado, token: tokenActual }
}

const obtenerErrorRechazo = (error) => ({
    message: error.message,
    status: error.status,
    payload: error.payload,
})

const guardarSesion = (token, usuario) => {
    setStoredToken(token)
    guardarUsuarioLocal(usuario)
}

const autenticarUsuario = async ({ endpoint, body, usuarioActualId }, { dispatch, rejectWithValue }) => {
    try {
        const respuesta = await apiRequest(endpoint, {
            auth: false,
            method: 'POST',
            body,
        })

        const usuarioNormalizado = normalizarUsuario(respuesta.usuario)
        if (!usuarioNormalizado) throw new Error('No se pudo obtener el usuario autenticado.')

        if (usuarioActualId && usuarioActualId !== usuarioNormalizado.idUsuario) {
            dispatch(limpiarCarritosPersistidos())
        }

        guardarSesion(respuesta.access_token, usuarioNormalizado)
        return {
            token: respuesta.access_token,
            usuario: usuarioNormalizado,
        }
    } catch (error) {
        limpiarSesionLocal()
        dispatch(limpiarCarritosPersistidos())
        return rejectWithValue(obtenerErrorRechazo(error))
    }
}

export const iniciarSesion = createAsyncThunk(
    'user/iniciarSesion',
    async (credenciales, thunkApi) => {
        const usuarioActualId = thunkApi.getState().user.usuario?.idUsuario
        return autenticarUsuario({
            endpoint: '/api/v1/auth/authenticate',
            body: credenciales,
            usuarioActualId,
        }, thunkApi)
    }
)

export const registrarComprador = createAsyncThunk(
    'user/registrarComprador',
    async (datos, thunkApi) => {
        const usuarioActualId = thunkApi.getState().user.usuario?.idUsuario
        return autenticarUsuario({
            endpoint: '/api/v1/auth/register',
            body: datos,
            usuarioActualId,
        }, thunkApi)
    }
)

const sesionInicial = resolverSesionInicial()

const userSlice = createSlice({
    name: 'user',
    initialState: {
        usuario: sesionInicial.usuario,
        token: sesionInicial.token,
        cargandoUsuario: false,
        errorSesion: '',
    },
    reducers: {
        limpiarSesion: (state) => {
            state.usuario = null
            state.token = null
            state.errorSesion = ''
            state.cargandoUsuario = false
        },
        limpiarErrorSesion: (state) => {
            state.errorSesion = ''
        },
    },
    extraReducers: (builder) => {
        builder
            // iniciarSesion
            .addCase(iniciarSesion.pending, (state) => {
                state.cargandoUsuario = true
                state.errorSesion = ''
            })
            .addCase(iniciarSesion.fulfilled, (state, action) => {
                state.cargandoUsuario = false
                state.usuario = action.payload.usuario
                state.token = action.payload.token
                state.errorSesion = ''
            })
            .addCase(iniciarSesion.rejected, (state, action) => {
                state.cargandoUsuario = false
                state.usuario = null
                state.token = null
                state.errorSesion = action.payload?.message || action.error.message
            })

            // registrarComprador
            .addCase(registrarComprador.pending, (state) => {
                state.cargandoUsuario = true
                state.errorSesion = ''
            })
            .addCase(registrarComprador.fulfilled, (state, action) => {
                state.cargandoUsuario = false
                state.usuario = action.payload.usuario
                state.token = action.payload.token
                state.errorSesion = ''
            })
            .addCase(registrarComprador.rejected, (state, action) => {
                state.cargandoUsuario = false
                state.usuario = null
                state.token = null
                state.errorSesion = action.payload?.message || action.error.message
            })
    }
})

export const { limpiarErrorSesion, limpiarSesion } = userSlice.actions

export const cerrarSesion = () => (dispatch) => {
    limpiarSesionLocal()
    dispatch(limpiarCarritosPersistidos())
    dispatch(limpiarSesion())
}

export default userSlice.reducer
