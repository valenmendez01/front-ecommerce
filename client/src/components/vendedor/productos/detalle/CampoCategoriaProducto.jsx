import { Select, SelectItem } from '@heroui/react'
import {
  formatearEtiquetaCategoriaProducto,
  obtenerPrimerValorProducto,
} from '../datos/reglasProductoVendedor'
import CampoDetalleProducto from './CampoDetalleProducto'

const clasesCampoProducto = {
  errorMessage: 'font-semibold',
  trigger:
    'border border-dorado-primary/35 bg-slate-50 shadow-none data-[hover=true]:bg-slate-50 data-[open=true]:border-dorado-primary',
  value: 'font-bold text-green-primary',
}

const CampoCategoriaProducto = ({ borrador, categorias, editando, onCambiar, producto }) => (
  <CampoDetalleProducto etiqueta="Categoría">
    {editando ? (
      <Select
        aria-label="Categoría del producto"
        classNames={clasesCampoProducto}
        selectedKeys={[borrador.categoria]}
        size="sm"
        variant="bordered"
        onSelectionChange={(keys) => onCambiar('categoria', obtenerPrimerValorProducto(keys))}
      >
        {categorias.map((categoria) => (
          <SelectItem key={categoria.valor}>{categoria.etiqueta}</SelectItem>
        ))}
      </Select>
    ) : (
      formatearEtiquetaCategoriaProducto(producto.categoria)
    )}
  </CampoDetalleProducto>
)

export default CampoCategoriaProducto
