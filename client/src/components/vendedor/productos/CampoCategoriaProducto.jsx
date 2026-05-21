import { Select, SelectItem } from '@heroui/react'
import {
  formatearEtiquetaCategoria,
  obtenerPrimerValor,
} from '../../../data/reglasProducto'
import CampoDetalleProducto from './CampoDetalleProducto'
import { clasesCampoProducto } from './estilosProducto'

const CampoCategoriaProducto = ({ borrador, categorias, editando, onCambiar, producto }) => (
  <CampoDetalleProducto etiqueta="Categoria">
    {editando ? (
      <Select
        aria-label="Categoria del producto"
        classNames={clasesCampoProducto}
        selectedKeys={[borrador.categoria]}
        size="sm"
        variant="bordered"
        onSelectionChange={(keys) => onCambiar('categoria', obtenerPrimerValor(keys))}
      >
        {categorias.map((categoria) => (
          <SelectItem key={categoria.valor}>{categoria.etiqueta}</SelectItem>
        ))}
      </Select>
    ) : (
      formatearEtiquetaCategoria(producto.categoria)
    )}
  </CampoDetalleProducto>
)

export default CampoCategoriaProducto
