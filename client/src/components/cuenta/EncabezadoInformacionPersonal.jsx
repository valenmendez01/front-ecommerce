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
  <div className="flex items-center justify-between bg-green-primary px-8 py-4">
    <h2 className="text-xl font-black text-white">INFORMACIóN PERSONAL</h2>

    {puedeEditar && estaEditando && (
      <div className="flex gap-2">
        <Button
          isDisabled={Boolean(errorEmail)}
          className="bg-dorado-primary/25 text-sm font-bold text-green-primary"
          radius="sm"
          size="sm"
          startContent={<Check size={16} />}
          onPress={onGuardar}
        >
          Guardar
        </Button>
        <Button
          className="bg-white/15 text-sm font-bold text-white"
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
        className="bg-white/15 text-sm font-bold text-white"
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
