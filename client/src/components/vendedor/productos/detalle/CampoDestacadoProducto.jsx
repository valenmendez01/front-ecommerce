import { Chip } from '@heroui/react'
import CampoDetalleProducto from './CampoDetalleProducto'

const CampoDestacadoProducto = ({ editando, onCambiar, producto }) => (
  <CampoDetalleProducto etiqueta="Destacado">
    {editando ? (
      <label className="flex items-center justify-between gap-3 rounded-md border border-dorado-primary/35 bg-dorado-primary/10 px-3 py-2">
        <span className="text-sm font-bold text-green-primary">
          Mostrar en Home
        </span>
        <input
          checked={Boolean(producto.destacado)}
          className="h-5 w-5 accent-green-primary"
          type="checkbox"
          onChange={(event) => onCambiar('destacado', event.target.checked)}
        />
      </label>
    ) : (
      <Chip
        className={
          producto.destacado
            ? 'bg-dorado-primary text-green-primary font-bold'
            : 'bg-slate-100 text-slate-500 font-bold'
        }
        radius="full"
        size="sm"
      >
        {producto.destacado ? 'DESTACADO' : 'NO DESTACADO'}
      </Chip>
    )}
  </CampoDetalleProducto>
)

export default CampoDestacadoProducto
