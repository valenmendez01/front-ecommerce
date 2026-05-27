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

  if (!emailLimpio) return 'El correo electrónico es obligatorio.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailLimpio)) {
    return 'Ingresá un correo electrónico válido.'
  }

  if (!dominiosPermitidos.includes(emailLimpio.split('@')[1])) {
    return 'Usá un dominio válido, como gmail.com, hotmail.com u outlook.com.'
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
    <Card className="overflow-hidden border border-[#d8c49a] bg-[#fffdf8] shadow-xl shadow-[#142b10]/5" radius="lg">
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
