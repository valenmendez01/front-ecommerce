import { Card, CardBody } from '@heroui/react'

const TarjetaResumen = ({ titulo, valor, destacar }) => {
  return (
    <Card className="h-24 min-w-36 border border-dorado-primary/30 shadow-lg" radius="sm">
      <CardBody className="flex flex-col items-center justify-center px-5">
        <h3 className="text-center text-xs font-bold uppercase tracking-widest text-slate-400">
          {titulo}
        </h3>
        <p className={`mt-1 text-3xl font-black ${destacar ? 'text-dorado-primary' : 'text-green-primary'}`}>
          {valor}
        </p>
      </CardBody>
    </Card>
  )
}

export default TarjetaResumen
