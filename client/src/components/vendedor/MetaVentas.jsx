import { Button, Card, CardBody } from '@heroui/react'
import { Check, Pencil, X } from 'lucide-react'
import { useState } from 'react'

const metasSugeridas = [25, 30, 50, 100]

const MetaVentas = ({ unidadesVendidas, metaMensual, onActualizarMetaMensual }) => {
  const [estaEditando, setEstaEditando] = useState(false)
  const [borradorMeta, setBorradorMeta] = useState(metaMensual)
  const porcentaje = metaMensual > 0 ? Math.min(Math.round((unidadesVendidas / metaMensual) * 100), 100) : 0

  const iniciarEdicion = () => {
    setBorradorMeta(metaMensual)
    setEstaEditando(true)
  }

  const cancelarEdicion = () => {
    setBorradorMeta(metaMensual)
    setEstaEditando(false)
  }

  const guardarMeta = () => {
    const nuevaMeta = Number(borradorMeta)

    if (nuevaMeta <= 0) {
      return
    }

    onActualizarMetaMensual(nuevaMeta)
    setEstaEditando(false)
  }

  return (
    <Card className="border border-[#0b2b88] bg-[#263f98] text-white shadow-xl" radius="sm">
      <CardBody className="px-8 py-7">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h2 className="text-2xl font-black">META MENSUAL DE UNIDADES</h2>
            <p className="mt-2 text-blue-100">
              Vendiste {unidadesVendidas} de {metaMensual} unidades este mes.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {estaEditando ? (
              <>
                <input
                  className="h-11 w-32 rounded-md border border-white/30 bg-white px-3 text-base font-black text-[#0b2b88] outline-none"
                  min="1"
                  type="number"
                  value={borradorMeta}
                  onChange={(event) => setBorradorMeta(event.target.value)}
                />
                <Button
                  isIconOnly
                  aria-label="Guardar meta mensual"
                  className="bg-green-100 text-green-700"
                  radius="sm"
                  onPress={guardarMeta}
                >
                  <Check size={18} />
                </Button>
                <Button
                  isIconOnly
                  aria-label="Cancelar edición de meta"
                  className="bg-white/15 text-white"
                  radius="sm"
                  onPress={cancelarEdicion}
                >
                  <X size={18} />
                </Button>
              </>
            ) : (
              <Button
                className="bg-white/15 text-sm font-bold text-white"
                radius="sm"
                startContent={<Pencil size={16} />}
                onPress={iniciarEdicion}
              >
                Editar meta
              </Button>
            )}

            <p className="text-3xl font-black text-yellow-300">{porcentaje}%</p>
          </div>
        </div>

        {estaEditando && (
          <div className="mt-5 flex flex-wrap gap-2">
            {metasSugeridas.map((meta) => (
              <Button
                className="bg-white/15 text-sm font-bold text-white"
                key={meta}
                radius="sm"
                size="sm"
                onPress={() => setBorradorMeta(meta)}
              >
                {meta} unidades
              </Button>
            ))}
          </div>
        )}

        <div className="mt-6 h-4 overflow-hidden rounded-full bg-white/25">
          <div className="h-full rounded-full bg-green-500" style={{ width: `${porcentaje}%` }} />
        </div>
      </CardBody>
    </Card>
  )
}

export default MetaVentas
