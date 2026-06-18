import { Button } from '@heroui/react'
import { Bot, UserRound } from 'lucide-react'

const AvatarMensaje = ({ autor }) => {
  const esUsuario = autor === 'usuario'

  return (
    <div className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ${esUsuario ? 'bg-[var(--color-dorado-primary)] text-[var(--color-green-primary)]' : 'bg-[var(--color-green-primary)] text-[var(--color-dorado-primary)]'}`}>
      {esUsuario ? <UserRound size={18} /> : <Bot size={18} />}
    </div>
  )
}

export const AsistenteMessage = ({ mensaje, onAccion }) => {
  const esUsuario = mensaje.autor === 'usuario'

  return (
    <div className={`flex items-start gap-3 ${esUsuario ? 'justify-end' : 'justify-start'}`}>
      {!esUsuario && <AvatarMensaje autor={mensaje.autor} />}

      <div className={`max-w-[78%] ${esUsuario ? 'items-end' : 'items-start'} flex flex-col gap-2`}>
        <div
          className={`rounded-2xl px-4 py-3 font-body text-[15px] font-semibold leading-7 shadow-sm ${
            esUsuario
              ? 'rounded-tr-sm bg-[var(--color-green-primary)] text-white'
              : 'rounded-tl-sm border border-[var(--color-dorado-primary)]/20 bg-white text-[var(--color-green-primary)]'
          }`}
        >
          {mensaje.texto}
        </div>

        {!esUsuario && mensaje.acciones?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {mensaje.acciones.map((accion, index) => (
              <Button
                key={`${mensaje.id}-${accion.texto}-${index}`}
                size="sm"
                variant="bordered"
                className="h-8 rounded-full border-[var(--color-dorado-primary)]/60 bg-white px-3 font-heading text-xs font-bold text-[var(--color-green-primary)]"
                onPress={() => onAccion(accion)}
              >
                {accion.texto}
              </Button>
            ))}
          </div>
        )}
      </div>

      {esUsuario && <AvatarMensaje autor={mensaje.autor} />}
    </div>
  )
}
