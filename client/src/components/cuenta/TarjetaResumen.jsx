import { Card, CardBody } from '@heroui/react'

const TarjetaResumen = ({ titulo, valor, destacar }) => {
  return (
    <Card className="h-28 min-w-40 border border-white/10 bg-white/10 shadow-none" radius="sm">
      <CardBody className="flex flex-col items-center justify-center px-5">
        <h3 className="text-center text-xs font-bold uppercase tracking-widest text-white/60">
          {titulo}
        </h3>
        <p className={`mt-2 text-3xl font-black ${destacar ? 'text-[#caa56e]' : 'text-white'}`}>
          {valor}
        </p>
      </CardBody>
    </Card>
  )
}

export default TarjetaResumen
