import { useCallback, useEffect, useMemo, useState } from 'react'
import { apiRequest, clearStoredToken, getStoredToken, setStoredToken } from '../lib/api'
import { AuthContext } from './useAuth'

const formatearFecha = (fecha) => {
  if (!fecha) return ''

  const fechaNormalizada = new Date(`${fecha}T00:00:00`)

  if (Number.isNaN(fechaNormalizada.getTime())) {
    return fecha
  }

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

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null)
  const [token, setToken] = useState(() => getStoredToken())
  const [cargandoUsuario, setCargandoUsuario] = useState(Boolean(getStoredToken()))
  const [errorSesion, setErrorSesion] = useState('')

  const cerrarSesion = useCallback(() => {
    clearStoredToken()
    setToken(null)
    setUsuario(null)
    setErrorSesion('')
  }, [])

  const cargarUsuarioActual = useCallback(async () => {
    const tokenActual = getStoredToken()

    if (!tokenActual) {
      setCargandoUsuario(false)
      return null
    }

    setCargandoUsuario(true)
    setErrorSesion('')

    try {
      const usuarioActual = await apiRequest('/usuarios/me')
      const usuarioNormalizado = normalizarUsuario(usuarioActual)
      setUsuario(usuarioNormalizado)
      setToken(tokenActual)
      return usuarioNormalizado
    } catch (error) {
      cerrarSesion()
      setErrorSesion(error.message)
      return null
    } finally {
      setCargandoUsuario(false)
    }
  }, [cerrarSesion])

  const iniciarSesion = useCallback(async ({ email, contrasena }) => {
    setCargandoUsuario(true)

    try {
      const respuesta = await apiRequest('/api/v1/auth/authenticate', {
        auth: false,
        method: 'POST',
        body: { email, contrasena },
      })

      setStoredToken(respuesta.access_token)
      setToken(respuesta.access_token)

      const usuarioNormalizado = respuesta.usuario
        ? normalizarUsuario(respuesta.usuario)
        : await cargarUsuarioActual()

      if (!usuarioNormalizado) {
        throw new Error('No se pudo obtener el usuario autenticado.')
      }

      setUsuario(usuarioNormalizado)
      setErrorSesion('')
      return usuarioNormalizado
    } catch (error) {
      clearStoredToken()
      setToken(null)
      setUsuario(null)
      setErrorSesion(error.message)
      throw error
    } finally {
      setCargandoUsuario(false)
    }
  }, [cargarUsuarioActual])

  const registrarComprador = useCallback(async ({ nombre, apellido, email, contrasena }) => {
    setCargandoUsuario(true)

    try {
      const respuesta = await apiRequest('/api/v1/auth/register', {
        auth: false,
        method: 'POST',
        body: { nombre, apellido, email, contrasena },
      })

      setStoredToken(respuesta.access_token)
      setToken(respuesta.access_token)

      const usuarioNormalizado = respuesta.usuario
        ? normalizarUsuario(respuesta.usuario)
        : await cargarUsuarioActual()

      if (!usuarioNormalizado) {
        throw new Error('No se pudo obtener el usuario registrado.')
      }

      setUsuario(usuarioNormalizado)
      setErrorSesion('')
      return usuarioNormalizado
    } catch (error) {
      clearStoredToken()
      setToken(null)
      setUsuario(null)
      setErrorSesion(error.message)
      throw error
    } finally {
      setCargandoUsuario(false)
    }
  }, [cargarUsuarioActual])

  useEffect(() => {
    const tokenActual = getStoredToken()

    if (!tokenActual) {
      return undefined
    }

    let sigueMontado = true

    apiRequest('/usuarios/me')
      .then((usuarioActual) => {
        if (!sigueMontado) return

        setUsuario(normalizarUsuario(usuarioActual))
        setToken(tokenActual)
        setErrorSesion('')
      })
      .catch((error) => {
        if (!sigueMontado) return

        clearStoredToken()
        setToken(null)
        setUsuario(null)
        setErrorSesion(error.message)
      })
      .finally(() => {
        if (sigueMontado) {
          setCargandoUsuario(false)
        }
      })

    return () => {
      sigueMontado = false
    }
  }, [])

  const value = useMemo(
    () => ({
      cargandoUsuario,
      cerrarSesion,
      errorSesion,
      iniciarSesion,
      recargarUsuario: cargarUsuarioActual,
      registrarComprador,
      token,
      usuario,
    }),
    [
      cargandoUsuario,
      cerrarSesion,
      errorSesion,
      iniciarSesion,
      cargarUsuarioActual,
      registrarComprador,
      token,
      usuario,
    ],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
