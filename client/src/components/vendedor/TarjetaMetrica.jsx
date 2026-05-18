import { Card, CardBody } from '@heroui/react'

const TarjetaMetrica = ({ titulo, valor, descripcion, Icono, destacar }) => {
  return (
    <Card className="border border-slate-200 shadow-lg" radius="sm">
      <CardBody className="flex min-h-32 flex-row items-center justify-between gap-4 px-6 py-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">{titulo}</p>
          <p className={`mt-2 text-3xl font-black ${destacar ? 'text-green-700' : 'text-[#0b2b88]'}`}>
            {valor}
          </p>
          <p className="mt-1 text-sm text-slate-500">{descripcion}</p>
        </div>
        {Icono && (
          <div className="flex h-12 w-12 items-center justify-center rounded-md bg-blue-50 text-[#0b2b88]">
            <Icono size={26} strokeWidth={2.4} />
          </div>
        )}
      </CardBody>
    </Card>
  )
}

export default TarjetaMetrica
