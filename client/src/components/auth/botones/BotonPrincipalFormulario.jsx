import { Button } from '@heroui/react'

const claseBotonPrincipal =
  'w-full bg-[#142b10] py-7 text-base font-black text-white shadow-lg shadow-[#142b10]/20'

const BotonPrincipalFormulario = ({ children, enviando, icono: Icono }) => (
  <Button
    className={claseBotonPrincipal}
    isLoading={enviando}
    radius="sm"
    startContent={<Icono size={20} />}
    type="submit"
  >
    {children}
  </Button>
)

export default BotonPrincipalFormulario
