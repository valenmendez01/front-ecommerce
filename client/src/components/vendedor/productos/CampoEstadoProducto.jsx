import { Chip } from '@heroui/react'
import { obtenerEstadoProducto } from '../../../data/reglasProducto'
import CampoDetalleProducto from './CampoDetalleProducto'
import { coloresEstadoProducto } from './estilosProducto'

const CampoEstadoProducto = ({ producto }) => {
  const estado = obtenerEstadoProducto(producto)

  return (
    <CampoDetalleProducto etiqueta="Estado">
      <Chip className={`${coloresEstadoProducto[estado]} font-bold`} radius="full" size="sm">
        {estado}
      </Chip>
    </CampoDetalleProducto>
  )
}

export default CampoEstadoProducto
