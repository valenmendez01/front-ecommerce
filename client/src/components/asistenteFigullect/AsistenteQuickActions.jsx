import { Button } from '@heroui/react'
import { ACCIONES_RAPIDAS_ASISTENTE } from './asistenteConfig.jsx'

export const AsistenteQuickActions = ({ onSeleccionar, deshabilitado }) => (
  <div className="border-t border-[var(--color-dorado-primary)]/20 bg-[#fbf7ef] px-4 py-4">
    <div className="flex flex-wrap gap-2">
      {ACCIONES_RAPIDAS_ASISTENTE.map((accion) => (
        <Button
          key={accion.id}
          size="sm"
          variant="bordered"
          className="h-9 rounded-full border-[var(--color-dorado-primary)]/45 bg-white/55 px-4 font-heading text-sm font-semibold text-[var(--color-green-primary)]"
          isDisabled={deshabilitado}
          onPress={() => onSeleccionar(accion.id)}
        >
          {accion.texto}
        </Button>
      ))}
    </div>
  </div>
)
