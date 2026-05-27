import { Input } from '@heroui/react'
import { Percent } from 'lucide-react'
import CampoDetalleProducto from './CampoDetalleProducto'
import { obtenerErrorNumeroProductoVendedor } from '../datos/reglasProductoVendedor'

const clasesCampoProducto = {
  errorMessage: 'font-semibold',
  input: 'font-bold text-green-primary',
  inputWrapper:
    'border border-dorado-primary/35 bg-slate-50 shadow-none data-[hover=true]:bg-slate-50 group-data-[focus=true]:border-dorado-primary group-data-[focus=true]:bg-white',
}

const CampoDescuentoProducto = ({ borrador, editando, onCambiar, producto }) => (
  <CampoDetalleProducto etiqueta="Descuento">
    {editando ? (
      <Input
        isRequired
        aria-label="Descuento del producto"
        classNames={clasesCampoProducto}
        endContent={<Percent className="text-green-primary" size={16} />}
        errorMessage={obtenerErrorNumeroProductoVendedor(borrador.descuento, 'descuento')}
        isInvalid={Boolean(obtenerErrorNumeroProductoVendedor(borrador.descuento, 'descuento'))}
        max="100"
        min="0"
        radius="sm"
        size="sm"
        type="number"
        value={String(borrador.descuento)}
        variant="bordered"
        onValueChange={(value) => onCambiar('descuento', value)}
      />
    ) : (
      `${producto.descuento}%`
    )}
  </CampoDetalleProducto>
)

export default CampoDescuentoProducto
