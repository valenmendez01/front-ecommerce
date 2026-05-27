import { Input } from '@heroui/react'
import { DollarSign } from 'lucide-react'
import CampoDetalleProducto from './CampoDetalleProducto'
import PrecioConDescuento from './PrecioConDescuento'
import { obtenerErrorNumeroProductoVendedor } from '../datos/reglasProductoVendedor'

const clasesCampoProducto = {
  errorMessage: 'font-semibold',
  input: 'font-bold text-green-primary',
  inputWrapper:
    'border border-dorado-primary/35 bg-slate-50 shadow-none data-[hover=true]:bg-slate-50 group-data-[focus=true]:border-dorado-primary group-data-[focus=true]:bg-white',
}

const CampoPrecioProducto = ({ borrador, editando, onCambiar, producto }) => (
  <CampoDetalleProducto etiqueta="Precio">
    {editando ? (
      <div className="space-y-2">
        <Input
          isRequired
          aria-label="Precio del producto"
          classNames={clasesCampoProducto}
          errorMessage={obtenerErrorNumeroProductoVendedor(borrador.precio, 'precio')}
          isInvalid={Boolean(obtenerErrorNumeroProductoVendedor(borrador.precio, 'precio'))}
          min="0"
          radius="sm"
          size="sm"
          startContent={<DollarSign className="text-slate-400" size={16} />}
          type="number"
          value={String(borrador.precio)}
          variant="bordered"
          onValueChange={(value) => onCambiar('precio', value)}
        />
        <PrecioConDescuento compacto producto={borrador} />
      </div>
    ) : (
      <PrecioConDescuento compacto producto={producto} />
    )}
  </CampoDetalleProducto>
)

export default CampoPrecioProducto
