import { useCallback, useMemo, useState } from 'react'
import { apiRequest, clearStoredToken, getStoredToken, setStoredToken } from '../lib/api'
import { vaciarCarrito } from '../utils/reglasCarrito'
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

// Resuelve el estado inicial de sesión una sola vez, sin necesidad de un efecto.
// Toda la lógica que antes vivía en useEffect ahora ocurre aquí, sincrónicamente
// durante el primer render, evitando los setCargandoUsuario() dentro de un efecto.
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
  const [usuario, setUsuario] = useState(() => resolverSesionInicial().usuario)
  const [token, setToken] = useState(() => resolverSesionInicial().token)
  const [cargandoUsuario, setCargandoUsuario] = useState(false)
  const [errorSesion, setErrorSesion] = useState('')

  // Extraído como primitivo para que el React Compiler pueda razonar
  // la dependencia sin ambigüedad (evita inferir el objeto `usuario` completo)
  const usuarioIdActual = usuario?.idUsuario ?? null

  const cerrarSesion = useCallback(() => {
    clearStoredToken()
    limpiarUsuarioLocal()
    vaciarCarrito()
    setToken(null)
    setUsuario(null)
    setErrorSesion('')
  }, [])

  const guardarSesion = useCallback((tokenNuevo, usuarioNormalizado) => {
    setStoredToken(tokenNuevo)
    guardarUsuarioLocal(usuarioNormalizado)
    setToken(tokenNuevo)
    setUsuario(usuarioNormalizado)
    setErrorSesion('')
  }, [])

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
        vaciarCarrito()
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
  }, [cerrarSesion, guardarSesion, usuarioIdActual])

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
        vaciarCarrito()
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
  }, [cerrarSesion, guardarSesion, usuarioIdActual])

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
