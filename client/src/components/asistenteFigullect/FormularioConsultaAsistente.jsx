import { useState } from 'react'
import { Button, Input } from '@heroui/react'
import { Send } from 'lucide-react'

export const FormularioConsultaAsistente = ({ cargando, onEnviar }) => {
  const [texto, setTexto] = useState('')

  const enviar = (event) => {
    event.preventDefault()
    const consulta = texto.trim()
    if (!consulta || cargando) return

    setTexto('')
    onEnviar(consulta)
  }

  return (
    <form className="flex items-center gap-3 border-t border-[var(--color-dorado-primary)]/20 bg-white px-4 py-4" onSubmit={enviar}>
      <Input
        aria-label="Consulta para el asistente"
        classNames={{
          inputWrapper: 'rounded-full border border-[var(--color-dorado-primary)]/35 bg-[#fbf7ef]',
          input: 'font-body font-semibold text-[var(--color-green-primary)]',
        }}
        isDisabled={cargando}
        onValueChange={setTexto}
        placeholder="Escribí tu consulta..."
        value={texto}
      />
      <Button
        isIconOnly
        type="submit"
        aria-label="Enviar consulta"
        className="h-12 w-12 shrink-0 rounded-full bg-[var(--color-dorado-primary)] text-[var(--color-green-primary)]"
        isDisabled={!texto.trim() || cargando}
      >
        <Send size={20} />
      </Button>
    </form>
  )
}
