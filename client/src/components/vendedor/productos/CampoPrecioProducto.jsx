import { Input } from '@heroui/react'
import { DollarSign } from 'lucide-react'
import { obtenerErrorNumeroProducto } from '../../../data/reglasProducto'
import CampoDetalleProducto from './CampoDetalleProducto'
import { clasesCampoProducto } from './estilosProducto'
import PrecioConDescuento from './PrecioConDescuento'

const CampoPrecioProducto = ({ borrador, editando, onCambiar, producto }) => (
  <CampoDetalleProducto etiqueta="Precio">
    {editando ? (
      <div className="space-y-3">
        <Input
          isRequired
          aria-label="Precio del producto"
          classNames={clasesCampoProducto}
          errorMessage={obtenerErrorNumeroProducto(borrador.precio, 'precio')}
          isInvalid={Boolean(obtenerErrorNumeroProducto(borrador.precio, 'precio'))}
          min="0"
          radius="sm"
          size="sm"
          startContent={<DollarSign className="text-slate-400" size={16} />}
          type="number"
          value={String(borrador.precio)}
          variant="bordered"
          onValueChange={(value) => onCambiar('precio', value)}
        />
        <PrecioConDescuento producto={borrador} />
      </div>
    ) : (
      <PrecioConDescuento producto={producto} />
    )}
  </CampoDetalleProducto>
)

export default CampoPrecioProducto
