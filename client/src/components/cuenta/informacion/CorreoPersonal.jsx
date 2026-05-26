import { Input } from '@heroui/react'
import { Mail } from 'lucide-react'

const CorreoPersonal = ({ email, errorEmail, estaEditando, onCambiarEmail }) => {
  if (!estaEditando) {
    return (
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
          Correo electrónico
        </p>
        <p className="mt-2 text-xl font-bold text-green-primary">{email}</p>
      </div>
    )
  }

  return (
    <Input
      isRequired
      className="mt-1"
      classNames={{
        errorMessage: 'font-semibold',
        input: 'font-bold text-green-primary',
        inputWrapper:
          'border border-dorado-primary/35 bg-slate-100 shadow-none data-[hover=true]:bg-slate-100 group-data-[focus=true]:border-dorado-primary group-data-[focus=true]:bg-white',
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
      value={email}
      variant="flat"
      onValueChange={onCambiarEmail}
    />
  )
}

export default CorreoPersonal
