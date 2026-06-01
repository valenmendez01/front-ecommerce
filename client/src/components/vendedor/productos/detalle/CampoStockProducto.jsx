import { Input } from '@heroui/react'
import CampoDetalleProducto from './CampoDetalleProducto'
import { MAXIMO_STOCK_PRODUCTO, obtenerErrorNumeroProductoVendedor } from '../datos/reglasProductoVendedor'

const clasesCampoProducto = {
  errorMessage: 'font-semibold',
  input: 'font-bold text-green-primary',
  inputWrapper:
    'border border-dorado-primary/35 bg-slate-50 shadow-none data-[hover=true]:bg-slate-50 group-data-[focus=true]:border-dorado-primary group-data-[focus=true]:bg-white',
}

const CampoStockProducto = ({ borrador, editando, onCambiar, producto }) => (
  <CampoDetalleProducto etiqueta="Stock">
    {editando ? (
      <Input
        isRequired
        aria-label="Stock del producto"
        classNames={clasesCampoProducto}
        errorMessage={obtenerErrorNumeroProductoVendedor(borrador.stock, 'stock')}
        isInvalid={Boolean(obtenerErrorNumeroProductoVendedor(borrador.stock, 'stock'))}
        max={String(MAXIMO_STOCK_PRODUCTO)}
        min="0"
        radius="sm"
        size="sm"
        step="1"
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
