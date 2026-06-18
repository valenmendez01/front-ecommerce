import { Button } from '@heroui/react'
import { Bot, X } from 'lucide-react'

export const EncabezadoAsistente = ({ onCerrar }) => (
  <header className="flex items-center justify-between bg-[var(--color-green-primary)] px-5 py-4 text-white">
    <div className="flex items-center gap-3">
      <div className="grid h-12 w-12 place-items-center rounded-full bg-[var(--color-dorado-primary)] text-[var(--color-green-primary)]">
        <Bot size={24} />
      </div>
      <div>
        <p className="font-heading text-xs font-bold uppercase tracking-[0.28em] text-[var(--color-dorado-primary)]">
          FIGULLECT
        </p>
        <h2 className="font-display text-2xl leading-none">Asistente de colección</h2>
      </div>
    </div>

    <Button isIconOnly size="sm" variant="light" aria-label="Cerrar asistente" className="text-white" onPress={onCerrar}>
      <X size={22} />
    </Button>
  </header>
)
