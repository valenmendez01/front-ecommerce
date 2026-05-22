import { Input } from '@heroui/react'
import { Mail } from 'lucide-react'

const CorreoPersonal = ({ email, errorEmail, estaEditando, onCambiarEmail }) => {
  if (!estaEditando) {
    return (
      <div className="rounded-lg border border-[#d8c49a] bg-white px-4 py-4">
        <p className="text-xs font-bold uppercase tracking-widest text-[#8d6f3e]">
          Correo electronico
        </p>
        <p className="mt-2 text-xl font-bold text-[#142b10]">{email}</p>
      </div>
    )
  }

  return (
    <Input
      isRequired
      className="mt-1"
      classNames={{
        errorMessage: 'font-semibold',
        input: 'font-bold text-[#142b10]',
        inputWrapper:
          'border border-[#d8c49a] bg-white shadow-none group-data-[focus=true]:border-[#caa56e]',
        label: 'font-bold text-[#5f6d5a]',
      }}
      color={errorEmail ? 'danger' : 'primary'}
      errorMessage={errorEmail}
      isInvalid={Boolean(errorEmail)}
      label="Correo electronico"
      radius="lg"
      size="lg"
      startContent={<Mail className="text-[#8d6f3e]" size={20} strokeWidth={2.4} />}
      type="email"
      value={email}
      variant="flat"
      onValueChange={onCambiarEmail}
    />
  )
}

export default CorreoPersonal
