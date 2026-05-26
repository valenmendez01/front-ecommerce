import { Input } from '@heroui/react'

const clasesInputAuth = {
  inputWrapper: 'border-[#d8c49a] bg-white shadow-sm group-data-[focus=true]:border-[#caa56e]',
  label: 'text-[#52614d]',
  input: 'text-[#142b10]',
}

const CampoFormularioAuth = ({ icono: Icono, label, type = 'text', value, onChange }) => (
  <Input
    isRequired
    classNames={clasesInputAuth}
    label={label}
    radius="sm"
    size="lg"
    startContent={<Icono className="text-[#8d6f3e]" size={20} />}
    type={type}
    value={value}
    variant="bordered"
    onValueChange={onChange}
  />
)

export default CampoFormularioAuth
