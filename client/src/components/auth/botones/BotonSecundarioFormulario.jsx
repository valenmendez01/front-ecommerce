import { Button } from '@heroui/react'
import { Link } from 'react-router-dom'

const claseBotonSecundario =
  'w-full border border-[#d8c49a] bg-white font-bold text-[#142b10]'

const BotonSecundarioFormulario = ({ children, icono: Icono, state, to }) => (
  <Button
    as={Link}
    className={claseBotonSecundario}
    radius="sm"
    startContent={<Icono size={18} />}
    state={state}
    to={to}
    variant="bordered"
  >
    {children}
  </Button>
)

export default BotonSecundarioFormulario
