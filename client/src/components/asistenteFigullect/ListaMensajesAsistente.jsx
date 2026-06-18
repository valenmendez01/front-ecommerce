import { useEffect, useRef } from 'react'
import { Spinner } from '@heroui/react'
import { AsistenteMessage } from './AsistenteMessage.jsx'

const IndicadorCarga = () => (
  <div className="flex items-center gap-3 pl-12 text-sm font-semibold text-[var(--color-green-primary)]">
    <Spinner size="sm" color="warning" />
    Pensando la mejor respuesta...
  </div>
)

export const ListaMensajesAsistente = ({ cargando, mensajes, onAccion }) => {
  const finMensajesRef = useRef(null)

  useEffect(() => {
    finMensajesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [mensajes, cargando])

  return (
    <div className="flex-1 space-y-4 overflow-y-auto px-4 py-5">
      {mensajes.map((mensaje) => (
        <AsistenteMessage key={mensaje.id} mensaje={mensaje} onAccion={onAccion} />
      ))}
      {cargando && <IndicadorCarga />}
      <div ref={finMensajesRef} />
    </div>
  )
}
