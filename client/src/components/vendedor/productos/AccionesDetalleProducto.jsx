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
    <h3 className="text-sm font-black uppercase tracking-widest text-green-primary">
      Detalle del producto
    </h3>
    {editando ? (
      <div className="flex gap-2">
        <Button
          isIconOnly
          aria-label="Guardar cambios"
          className="bg-dorado-primary/25 text-green-primary"
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
        className="bg-dorado-primary/25 text-green-primary"
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
