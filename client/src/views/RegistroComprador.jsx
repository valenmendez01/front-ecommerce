import { addToast } from '@heroui/react'
import { HeartHandshake, PackageCheck, ShieldCheck } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ContenedorAuth from '../components/auth/estructura/ContenedorAuth'
import LayoutAuth from '../components/auth/estructura/LayoutAuth'
import TarjetaFormularioAuth from '../components/auth/estructura/TarjetaFormularioAuth'
import FormularioRegistro from '../components/auth/formularios/FormularioRegistro'
import PanelPresentacionAuth from '../components/auth/presentacion/PanelPresentacionAuth'
import { useDispatch } from 'react-redux'
import { registrarComprador } from '../redux/userSlice'

const obtenerMensajeRegistro = (error) => {
  if (error?.status === 409) {
    return 'Ya existe una cuenta con ese email.'
  }

  if (error instanceof TypeError) {
    return 'No se pudo conectar en este momento. Intentá nuevamente.'
  }

  return error?.message || 'No se pudo crear la cuenta.'
}

const beneficiosRegistro = [
  { icono: ShieldCheck, texto: 'Tus datos quedan protegidos' },
  { icono: PackageCheck, texto: 'Seguí tus compras y pedidos' },
  { icono: HeartHandshake, texto: 'Una experiencia simple y amigable' },
]

const RegistroComprador = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [datos, setDatos] = useState({ nombre: '', apellido: '', email: '', contrasena: '' })
  const [error, setError] = useState('')
  const [enviando, setEnviando] = useState(false)

  const actualizarCampo = (campo, valor) => {
    setDatos((actuales) => ({ ...actuales, [campo]: valor }))
    setError('')
  }

  const manejarEnvio = async (event) => {
    event.preventDefault()
    setEnviando(true)
    setError('')

    try {
      await dispatch(registrarComprador(datos)).unwrap()
      navigate('/', { replace: true })
    } catch (registroError) {
      const mensaje = obtenerMensajeRegistro(registroError)
      setError(mensaje)
      addToast({ title: 'No pudimos crear tu cuenta', description: mensaje, color: 'danger' })
    } finally {
      setEnviando(false)
    }
  }

  return (
    <LayoutAuth>
      <ContenedorAuth columnas="lg:grid-cols-[0.95fr_1.05fr]">
        <PanelPresentacionAuth
          etiqueta="Nuevo coleccionista"
          titulo={<>Crea tu<br />cuenta</>}
          descripcion="Registrate para guardar tu progreso, comprar figuritas y armar tu álbum con confianza."
          beneficios={beneficiosRegistro}
          variante="registro"
        />
        <TarjetaFormularioAuth alto="min-h-[620px]">
          <FormularioRegistro
            datos={datos}
            error={error}
            enviando={enviando}
            onCampoChange={actualizarCampo}
            onSubmit={manejarEnvio}
          />
        </TarjetaFormularioAuth>
      </ContenedorAuth>
    </LayoutAuth>
  )
}

export default RegistroComprador
