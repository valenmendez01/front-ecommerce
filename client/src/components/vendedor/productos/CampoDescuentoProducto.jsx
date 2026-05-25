import { Input } from '@heroui/react'
import { Percent } from 'lucide-react'
import { obtenerErrorNumeroProducto } from '../../../data/reglasProducto'
import CampoDetalleProducto from './CampoDetalleProducto'
import { clasesCampoProducto } from './estilosProducto'

const CampoDescuentoProducto = ({ borrador, editando, onCambiar, producto }) => (
  <CampoDetalleProducto etiqueta="Descuento">
    {editando ? (
      <div className="space-y-2">
        <Input
          isRequired
          aria-label="Descuento del producto"
          classNames={clasesCampoProducto}
          endContent={<Percent className="text-green-primary" size={16} />}
          errorMessage={obtenerErrorNumeroProducto(borrador.descuento, 'descuento')}
          isInvalid={Boolean(obtenerErrorNumeroProducto(borrador.descuento, 'descuento'))}
          max="100"
          min="0"
          radius="sm"
          size="sm"
          type="number"
          value={String(borrador.descuento)}
          variant="bordered"
          onValueChange={(value) => onCambiar('descuento', value)}
        />
        {Number(borrador.descuento) > 0 && (
          <p className="text-xs font-bold text-red-700">
            Precio con descuento aplicado automáticamente.
          </p>
        )}
      </div>
    ) : (
      `${producto.descuento}%`
    )}
  </CampoDetalleProducto>
)

export default CampoDescuentoProducto
