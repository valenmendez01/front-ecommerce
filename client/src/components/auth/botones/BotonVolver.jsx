import { Button } from '@heroui/react'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

const BotonVolver = ({ className = 'mb-8', onPress, to = '/' }) => {
  const navegacion = onPress ? { onPress } : { as: Link, to }

  return (
    <Button
      {...navegacion}
      className={`${className} w-fit border border-[#d8c49a] bg-white/80 font-body font-semibold text-[#142b10] shadow-sm`}
      radius="sm"
      startContent={<ArrowLeft size={18} />}
      variant="bordered"
    >
      Volver
    </Button>
  )
}

export default BotonVolver
