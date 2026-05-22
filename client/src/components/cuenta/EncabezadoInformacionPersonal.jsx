import { Button } from '@heroui/react'
import { Check, X } from 'lucide-react'

const EncabezadoInformacionPersonal = ({
  errorEmail,
  estaEditando,
  onCancelar,
  onEditar,
  onGuardar,
  puedeEditar,
}) => (
  <div className="flex items-center justify-between border-b border-[#d8c49a] bg-[#fffdf8] px-8 py-5">
    <div>
      <p className="text-xs font-black uppercase tracking-[0.25em] text-[#8d6f3e]">Perfil</p>
      <h2 className="mt-1 text-2xl font-black text-[#142b10]">Informacion personal</h2>
    </div>

    {puedeEditar && estaEditando && (
      <div className="flex gap-2">
        <Button
          isDisabled={Boolean(errorEmail)}
          className="bg-[#142b10] text-sm font-bold text-white"
          radius="sm"
          size="sm"
          startContent={<Check size={16} />}
          onPress={onGuardar}
        >
          Guardar
        </Button>
        <Button
          className="border border-[#d8c49a] bg-white text-sm font-bold text-[#142b10]"
          radius="sm"
          size="sm"
          startContent={<X size={16} />}
          onPress={onCancelar}
        >
          Cancelar
        </Button>
      </div>
    )}

    {puedeEditar && !estaEditando && (
      <Button
        className="border border-[#d8c49a] bg-white text-sm font-bold text-[#142b10]"
        radius="sm"
        size="sm"
        onPress={onEditar}
      >
        Editar perfil
      </Button>
    )}
  </div>
)

export default EncabezadoInformacionPersonal
