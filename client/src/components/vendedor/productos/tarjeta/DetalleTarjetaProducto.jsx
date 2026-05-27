import DetalleProducto from '../detalle/DetalleProducto'

const DetalleTarjetaProducto = ({
  abierto,
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
}) => {
  if (!abierto) return null

  return (
    <DetalleProducto
      borrador={borrador}
      categorias={categorias}
      editando={editando}
      eliminando={eliminando}
      guardando={guardando}
      hayErrores={hayErrores}
      onCambiar={onCambiar}
      onCancelar={onCancelar}
      onEditar={onEditar}
      onGuardar={onGuardar}
      producto={producto}
    />
  )
}

export default DetalleTarjetaProducto
