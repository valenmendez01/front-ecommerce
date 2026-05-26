import { Button } from '@heroui/react'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

const BotonVolver = () => (
  <Button
    as={Link}
    className="mb-8 w-fit border border-[#d8c49a] bg-white/80 font-semibold text-[#142b10] shadow-sm"
    radius="sm"
    startContent={<ArrowLeft size={18} />}
    to="/"
    variant="bordered"
  >
    Volver
  </Button>
)

export default BotonVolver
