import { Input } from '@heroui/react'
import { obtenerErrorNumeroProducto } from '../../../data/reglasProducto'
import CampoDetalleProducto from './CampoDetalleProducto'
import { clasesCampoProducto } from './estilosProducto'

const CampoStockProducto = ({ borrador, editando, onCambiar, producto }) => (
  <CampoDetalleProducto etiqueta="Stock">
    {editando ? (
      <Input
        isRequired
        aria-label="Stock del producto"
        classNames={clasesCampoProducto}
        errorMessage={obtenerErrorNumeroProducto(borrador.stock, 'stock')}
        isInvalid={Boolean(obtenerErrorNumeroProducto(borrador.stock, 'stock'))}
        min="0"
        radius="sm"
        size="sm"
        type="number"
        value={String(borrador.stock)}
        variant="bordered"
        onValueChange={(value) => onCambiar('stock', value)}
      />
    ) : (
      producto.stock
    )}
  </CampoDetalleProducto>
)

export default CampoStockProducto
