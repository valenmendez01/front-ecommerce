import { Button, Card, CardBody, Chip, Input } from '@heroui/react'
import { Check, Mail, X } from 'lucide-react'
import { useState } from 'react'

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

  if (!emailLimpio) {
    return 'El correo electrónico es obligatorio.'
  }

  const formatoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailLimpio)

  if (!formatoValido) {
    return 'Ingresá un correo electrónico válido.'
  }

  const dominio = emailLimpio.split('@')[1]

  if (!dominiosPermitidos.includes(dominio)) {
    return 'Usá un dominio válido, como gmail.com, hotmail.com u outlook.com.'
  }

  return ''
}

const InformacionPersonal = ({ usuario, onActualizarUsuario }) => {
  const [estaEditando, setEstaEditando] = useState(false)
  const [borrador, setBorrador] = useState({ email: usuario.email })
  const errorEmail = estaEditando ? obtenerErrorEmail(borrador.email) : ''

  const iniciarEdicion = () => {
    setBorrador({ email: usuario.email })
    setEstaEditando(true)
  }

  const cancelarEdicion = () => {
    setBorrador({ email: usuario.email })
    setEstaEditando(false)
  }

  const guardarEdicion = () => {
    if (errorEmail) {
      return
    }

    onActualizarUsuario(borrador)
    setEstaEditando(false)
  }

  return (
    <Card className="overflow-hidden shadow-xl" radius="sm">
      <div className="flex items-center justify-between bg-[#263f98] px-8 py-4">
        <h2 className="text-xl font-black text-white">INFORMACIÓN PERSONAL</h2>
        {estaEditando ? (
          <div className="flex gap-2">
            <Button
              isDisabled={Boolean(errorEmail)}
              className="bg-green-100 text-sm font-bold text-green-700"
              radius="sm"
              size="sm"
              startContent={<Check size={16} />}
              onPress={guardarEdicion}
            >
              Guardar
            </Button>
            <Button
              className="bg-white/15 text-sm font-bold text-white"
              radius="sm"
              size="sm"
              startContent={<X size={16} />}
              onPress={cancelarEdicion}
            >
              Cancelar
            </Button>
          </div>
        ) : (
          <Button
            className="bg-white/15 text-sm font-bold text-white"
            radius="sm"
            size="sm"
            onPress={iniciarEdicion}
          >
            Editar perfil
          </Button>
        )}
      </div>

      <CardBody className="grid gap-8 px-8 py-8 md:grid-cols-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Nombre</p>
          <p className="mt-2 text-xl font-bold text-[#0b2b88]">{usuario.nombre}</p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Apellido</p>
          <p className="mt-2 text-xl font-bold text-[#0b2b88]">{usuario.apellido}</p>
        </div>
        <div>
          {estaEditando ? (
            <Input
              isRequired
              className="mt-1"
              classNames={{
                errorMessage: 'font-semibold',
                input: 'font-bold text-[#0b2b88]',
                inputWrapper:
                  'border border-slate-200 bg-slate-100 shadow-none data-[hover=true]:bg-slate-100 group-data-[focus=true]:border-[#0b2b88] group-data-[focus=true]:bg-white',
                label: 'font-bold text-slate-500',
              }}
              color={errorEmail ? 'danger' : 'primary'}
              errorMessage={errorEmail}
              isInvalid={Boolean(errorEmail)}
              label="Correo electrónico"
              radius="lg"
              size="lg"
              startContent={<Mail className="text-slate-400" size={20} strokeWidth={2.4} />}
              type="email"
              value={borrador.email}
              variant="flat"
              onValueChange={(value) => setBorrador({ email: value })}
            />
          ) : (
            <>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                Correo electrónico
              </p>
              <p className="mt-2 text-xl font-bold text-[#0b2b88]">{usuario.email}</p>
            </>
          )}
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
            Rol de cuenta
          </p>
          <Chip className="mt-2 bg-green-100 font-bold text-green-700" radius="full" size="sm">
            {usuario.rol}
          </Chip>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
            Fecha de registro
          </p>
          <p className="mt-2 text-xl font-bold text-[#0b2b88]">{usuario.fechaCreacion}</p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
            ID de usuario
          </p>
          <p className="mt-2 text-lg text-slate-600">{usuario.idUsuarioVisual}</p>
        </div>
      </CardBody>
    </Card>
  )
}

export default InformacionPersonal
