import { Input } from '@heroui/react'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

const clasesInputAuth = {
  inputWrapper: 'border-[#d8c49a] bg-white shadow-sm group-data-[focus=true]:border-[#caa56e]',
  label: 'text-[#52614d]',
  input: 'text-[#142b10]',
}

const CampoFormularioAuth = ({ icono: Icono, label, mostrarTogglePassword = false, type = 'text', value, onChange }) => {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const esPassword = type === 'password'
  const tipoInput = esPassword && passwordVisible ? 'text' : type

  return (
    <Input
      isRequired
      classNames={clasesInputAuth}
      endContent={mostrarTogglePassword && esPassword ? (
        <button
          aria-label={passwordVisible ? 'Ocultar contrasena' : 'Mostrar contrasena'}
          className="text-[#8d6f3e] transition-colors hover:text-[#142b10]"
          type="button"
          onClick={() => setPasswordVisible((visible) => !visible)}
        >
          {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      ) : null}
      label={label}
      radius="sm"
      size="lg"
      startContent={<Icono className="text-[#8d6f3e]" size={20} />}
      type={tipoInput}
      value={value}
      variant="bordered"
      onValueChange={onChange}
    />
  )
}

export default CampoFormularioAuth
