import AccionesDetalleProducto from './AccionesDetalleProducto'
import CamposDetalleProducto from './CamposDetalleProducto'

const DetalleProducto = ({
  borrador,
  categorias,
  editando,
  eliminando,
  guardando,
  hayErrores,
  onCambiar,
  onCancelar,
  onEditar,
  onGuardar,
  producto,
}) => (
  <div className="border-t border-blue-100 bg-blue-50/50 px-5 py-5">
    <AccionesDetalleProducto
      editando={editando}
      eliminando={eliminando}
      guardando={guardando}
      hayErrores={hayErrores}
      onCancelar={onCancelar}
      onEditar={onEditar}
      onGuardar={onGuardar}
      producto={producto}
    />
    <CamposDetalleProducto
      borrador={borrador}
      categorias={categorias}
      editando={editando}
      onCambiar={onCambiar}
      producto={editando ? borrador : producto}
    />
  </div>
)

export default DetalleProducto
