import { Select, SelectItem } from '@heroui/react'
import { obtenerPrimerValor } from '../../../data/reglasProducto'
import CampoDetalleProducto from './CampoDetalleProducto'
import { clasesCampoProducto, estadosPublicacion } from './estilosProducto'

const CampoPublicacionProducto = ({ borrador, editando, onCambiar, producto }) => (
  <CampoDetalleProducto etiqueta="Publicacion">
    {editando ? (
      <Select
        aria-label="Estado de publicacion"
        classNames={clasesCampoProducto}
        selectedKeys={[borrador.activo ? 'activa' : 'inactiva']}
        size="sm"
        variant="bordered"
        onSelectionChange={(keys) => onCambiar('activo', obtenerPrimerValor(keys) === 'activa')}
      >
        {estadosPublicacion.map((estado) => (
          <SelectItem key={estado.key}>{estado.label}</SelectItem>
        ))}
      </Select>
    ) : producto.activo ? (
      'Activa'
    ) : (
      'Inactiva'
    )}
  </CampoDetalleProducto>
)

export default CampoPublicacionProducto
