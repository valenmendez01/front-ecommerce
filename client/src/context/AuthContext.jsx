import { useCallback, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'

import { apiRequest, clearStoredToken, getStoredToken, setStoredToken } from '../lib/api'
import { limpiarCarritosPersistidos } from '../redux/carritoSlice'
import { AuthContext } from './useAuth'

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

// Normaliza el usuario recibido del backend para agregarle campos útiles para la UI
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

// Revisa si hay un token, si NO está expirado y si hay un usuario guardado.
const resolverSesionInicial = () => {
  const tokenActual = getStoredToken()
  if (!tokenActual || estaTokenExpirado(tokenActual)) {
    clearStoredToken()
    limpiarUsuarioLocal()
    return { usuario: null, token: null }
  }
  const usuarioGuardado = leerUsuarioLocal()
  if (!usuarioGuardado) {
    clearStoredToken()
    limpiarUsuarioLocal()
    return { usuario: null, token: null }
  }
  return { usuario: usuarioGuardado, token: tokenActual }
}

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch()
  const [usuario, setUsuario] = useState(() => resolverSesionInicial().usuario)
  const [token, setToken] = useState(() => resolverSesionInicial().token)
  const [cargandoUsuario, setCargandoUsuario] = useState(false)
  const [errorSesion, setErrorSesion] = useState('')
  const usuarioIdActual = usuario?.idUsuario ?? null

  // Borra los tokens del disco, limpia el LocalStorage y los carritos persistidos
  const cerrarSesion = useCallback(() => {
    clearStoredToken()
    limpiarUsuarioLocal()
    dispatch(limpiarCarritosPersistidos())
    setToken(null)
    setUsuario(null)
    setErrorSesion('')
  }, [dispatch])

  const guardarSesion = useCallback((tokenNuevo, usuarioNormalizado) => {
    setStoredToken(tokenNuevo)
    guardarUsuarioLocal(usuarioNormalizado)
    setToken(tokenNuevo)
    setUsuario(usuarioNormalizado)
    setErrorSesion('')
  }, [])

  // Login COMPRADOR - VENDEDOR
  const iniciarSesion = useCallback(async ({ email, contrasena }) => {
    setCargandoUsuario(true)
    try {
      const respuesta = await apiRequest('/api/v1/auth/authenticate', {
        auth: false,
        method: 'POST',
        body: { email, contrasena },
      })
      const usuarioNormalizado = normalizarUsuario(respuesta.usuario)
      if (!usuarioNormalizado) throw new Error('No se pudo obtener el usuario autenticado.')

      if (usuarioIdActual && usuarioIdActual !== usuarioNormalizado.idUsuario) {
        dispatch(limpiarCarritosPersistidos())
      }

      guardarSesion(respuesta.access_token, usuarioNormalizado)
      return usuarioNormalizado
    } catch (error) {
      cerrarSesion()
      setErrorSesion(error.message)
      throw error
    } finally {
      setCargandoUsuario(false)
    }
  }, [cerrarSesion, dispatch, guardarSesion, usuarioIdActual])

  // Registro COMPRADOR
  const registrarComprador = useCallback(async ({ nombre, apellido, email, contrasena }) => {
    setCargandoUsuario(true)
    try {
      const respuesta = await apiRequest('/api/v1/auth/register', {
        auth: false,
        method: 'POST',
        body: { nombre, apellido, email, contrasena },
      })
      const usuarioNormalizado = normalizarUsuario(respuesta.usuario)
      if (!usuarioNormalizado) throw new Error('No se pudo obtener el usuario registrado.')

      if (usuarioIdActual && usuarioIdActual !== usuarioNormalizado.idUsuario) {
        dispatch(limpiarCarritosPersistidos())
      }

      guardarSesion(respuesta.access_token, usuarioNormalizado)
      return usuarioNormalizado
    } catch (error) {
      cerrarSesion()
      setErrorSesion(error.message)
      throw error
    } finally {
      setCargandoUsuario(false)
    }
  }, [cerrarSesion, dispatch, guardarSesion, usuarioIdActual])

  const value = useMemo(
    () => ({
      cargandoUsuario,
      cerrarSesion,
      errorSesion,
      iniciarSesion,
      registrarComprador,
      token,
      usuario,
    }),
    [cargandoUsuario, cerrarSesion, errorSesion, iniciarSesion, registrarComprador, token, usuario],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
