import { CheckCircle2, X } from 'lucide-react'
import { useEffect, useState } from 'react'

const MENSAJE_BIENVENIDA_KEY = 'figullect_mensaje_bienvenida'

export const Home = () => {
  const [mensajeBienvenida, setMensajeBienvenida] = useState('')

  useEffect(() => {
    const mensajeGuardado = sessionStorage.getItem(MENSAJE_BIENVENIDA_KEY)

    if (mensajeGuardado) {
      setMensajeBienvenida(mensajeGuardado)
      sessionStorage.removeItem(MENSAJE_BIENVENIDA_KEY)
    }
  }, [])

  return (
    <div className="p-6 space-y-4">
      {mensajeBienvenida && (
        <div
          aria-live="polite"
          className="mx-auto flex max-w-5xl items-start justify-between gap-4 rounded-xl border border-[#d8c49a] bg-[#fffdf8] px-5 py-4 text-[#142b10] shadow-lg shadow-[#142b10]/10"
        >
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 shrink-0 text-[#8d6f3e]" size={22} />
            <div>
              <p className="font-black">Todo listo</p>
              <p className="mt-1 text-sm font-semibold text-[#5f6d5a]">{mensajeBienvenida}</p>
            </div>
          </div>

          <button
            aria-label="Cerrar mensaje"
            className="rounded-md p-1 text-[#5f6d5a] transition hover:bg-[#142b10]/5 hover:text-[#142b10]"
            type="button"
            onClick={() => setMensajeBienvenida('')}
          >
            <X size={18} />
          </button>
        </div>
      )}

      {Array.from({ length: 100 }).map((_, i) => (
        <div
          key={i}
          className="h-24 rounded-xl bg-gray-200 flex items-center justify-center"
        >
          Card {i + 1}
        </div>
      ))}
    </div>
  )
}
