import { addToast } from '@heroui/react'
import { BadgeCheck, ShieldCheck } from 'lucide-react'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import BotonVolver from '../components/auth/botones/BotonVolver'
import ContenedorAuth from '../components/auth/estructura/ContenedorAuth'
import LayoutAuth from '../components/auth/estructura/LayoutAuth'
import TarjetaFormularioAuth from '../components/auth/estructura/TarjetaFormularioAuth'
import FormularioLogin from '../components/auth/formularios/FormularioLogin'
import PanelPresentacionAuth from '../components/auth/presentacion/PanelPresentacionAuth'
import { useAuth } from '../context/useAuth'

const obtenerMensajeLogin = (error) => {
  if (error?.status === 401 || error?.status === 403 || error?.status === 404) {
    return 'Email o contraseña incorrectos.'
  }

  if (error instanceof TypeError) {
    return 'No se pudo conectar en este momento. Intentá nuevamente.'
  }

  return error?.message || 'No se pudo iniciar sesión.'
}

const beneficiosLogin = [
  { icono: ShieldCheck, texto: 'Acceso seguro' },
  { icono: BadgeCheck, texto: 'Compra protegida' },
]

const IniciarSesion = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { iniciarSesion } = useAuth()
  const [credenciales, setCredenciales] = useState({ email: '', contrasena: '' })
  const [error, setError] = useState('')
  const [enviando, setEnviando] = useState(false)

  const actualizarCampo = (campo, valor) => {
    setCredenciales((actuales) => ({ ...actuales, [campo]: valor }))
    setError('')
  }

  const manejarEnvio = async (event) => {
    event.preventDefault()
    setEnviando(true)
    setError('')

    try {
      const usuario = await iniciarSesion(credenciales)
      navigate(usuario.rol === 'VENDEDOR' ? '/panel-vendedor' : '/', { replace: true })
    } catch (loginError) {
      const mensaje = obtenerMensajeLogin(loginError)
      setError(mensaje)
      addToast({ title: 'No pudimos iniciar sesión', description: mensaje, color: 'danger' })
    } finally {
      setEnviando(false)
    }
  }

  return (
    <LayoutAuth>
      <BotonVolver />
      <ContenedorAuth>
        <PanelPresentacionAuth
          etiqueta="Cuenta Figullect"
          titulo={<>Inicia<br />sesion</>}
          descripcion="¡Empezá el camino de coleccionar tu álbum ahora mismo! Comprá figuritas y accedé a combos imperdibles."
          beneficios={beneficiosLogin}
        />
        <TarjetaFormularioAuth>
          <FormularioLogin
            credenciales={credenciales}
            error={error}
            enviando={enviando}
            locationState={location.state}
            onCampoChange={actualizarCampo}
            onSubmit={manejarEnvio}
          />
        </TarjetaFormularioAuth>
      </ContenedorAuth>
    </LayoutAuth>
  )
}

export default IniciarSesion
