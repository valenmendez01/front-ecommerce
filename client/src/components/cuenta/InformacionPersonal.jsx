import { Card } from '@heroui/react'
import { useState } from 'react'
import DatosInformacionPersonal from './DatosInformacionPersonal'
import EncabezadoInformacionPersonal from './EncabezadoInformacionPersonal'

const dominiosPermitidos = [
  'gmail.com',
  'hotmail.com',
  'outlook.com',
  'yahoo.com',
  'yahoo.com.ar',
  'icloud.com',
  'live.com',
  'live.com.ar',
  'proton.me',
  'protonmail.com',
]

const obtenerErrorEmail = (email) => {
  const emailLimpio = email.trim().toLowerCase()

  if (!emailLimpio) return 'El correo electronico es obligatorio.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailLimpio)) {
    return 'Ingresa un correo electronico valido.'
  }

  if (!dominiosPermitidos.includes(emailLimpio.split('@')[1])) {
    return 'Usa un dominio valido, como gmail.com, hotmail.com u outlook.com.'
  }

  return ''
}

const InformacionPersonal = ({ usuario, onActualizarUsuario }) => {
  const [estaEditando, setEstaEditando] = useState(false)
  const [borrador, setBorrador] = useState({ email: usuario.email })
  const puedeEditar = Boolean(onActualizarUsuario)
  const errorEmail = estaEditando ? obtenerErrorEmail(borrador.email) : ''

  const cancelarEdicion = () => {
    setBorrador({ email: usuario.email })
    setEstaEditando(false)
  }

  const guardarEdicion = () => {
    if (errorEmail) return
    onActualizarUsuario(borrador)
    setEstaEditando(false)
  }

  return (
    <Card className="overflow-hidden shadow-xl" radius="sm">
      <EncabezadoInformacionPersonal
        errorEmail={errorEmail}
        estaEditando={estaEditando}
        onCancelar={cancelarEdicion}
        onEditar={() => setEstaEditando(true)}
        onGuardar={guardarEdicion}
        puedeEditar={puedeEditar}
      />
      <DatosInformacionPersonal
        email={borrador.email}
        errorEmail={errorEmail}
        estaEditando={estaEditando}
        onCambiarEmail={(email) => setBorrador({ email })}
        usuario={usuario}
      />
    </Card>
  )
}

export default InformacionPersonal
