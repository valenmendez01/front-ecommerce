import { Button } from '@heroui/react'
import { Check, Pencil, X } from 'lucide-react'

const AccionesDetalleProducto = ({
  editando,
  eliminando,
  guardando,
  hayErrores,
  onCancelar,
  onEditar,
  onGuardar,
  producto,
}) => (
  <div className="mb-4 flex items-center justify-between gap-3">
    <div>
      <h3 className="text-sm font-black uppercase tracking-widest text-[#0b2b88]">
        Detalle del producto
      </h3>
      <p className="mt-1 text-sm text-slate-500">
        Estos datos se actualizan contra el backend del vendedor.
      </p>
    </div>
    {editando ? (
      <div className="flex gap-2">
        <Button
          isIconOnly
          aria-label="Guardar cambios"
          className="bg-green-100 text-green-700"
          isDisabled={Boolean(hayErrores) || eliminando}
          isLoading={guardando}
          radius="sm"
          size="sm"
          onPress={onGuardar}
        >
          <Check size={18} />
        </Button>
        <Button
          isIconOnly
          aria-label="Cancelar edicion"
          className="bg-slate-100 text-slate-600"
          radius="sm"
          size="sm"
          onPress={onCancelar}
        >
          <X size={18} />
        </Button>
      </div>
    ) : (
      <Button
        isIconOnly
        aria-label={`Editar ${producto.nombre}`}
        className="bg-blue-100 text-[#0b2b88]"
        radius="sm"
        size="sm"
        onPress={onEditar}
      >
        <Pencil size={18} />
      </Button>
    )}
  </div>
)

export default AccionesDetalleProducto
