import { Button } from '@heroui/react'
import { Bot } from 'lucide-react'

export const AsistenteButton = ({ onPress }) => (
  <Button
    isIconOnly
    aria-label="Abrir asistente FIGULLECT"
    className="fixed bottom-6 right-6 z-[70] h-16 w-16 rounded-full bg-[var(--color-green-primary)] text-[var(--color-dorado-primary)] shadow-2xl ring-2 ring-[var(--color-dorado-primary)]/40"
    onPress={onPress}
  >
    <Bot size={30} />
  </Button>
)
