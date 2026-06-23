import CampoCategoriaProducto from './CampoCategoriaProducto'
import CampoDescuentoProducto from './CampoDescuentoProducto'
import CampoDestacadoProducto from './CampoDestacadoProducto'
import CampoPrecioProducto from './CampoPrecioProducto'
import CampoStockProducto from './CampoStockProducto'

const CamposDetalleProducto = ({ borrador, categorias, editando, onCambiar, producto }) => (
  <div className="grid gap-3 md:grid-cols-2">
    <CampoCategoriaProducto borrador={borrador} categorias={categorias} editando={editando} onCambiar={onCambiar} producto={producto} />
    <CampoPrecioProducto borrador={borrador} editando={editando} onCambiar={onCambiar} producto={producto} />
    <CampoStockProducto borrador={borrador} editando={editando} onCambiar={onCambiar} producto={producto} />
    <CampoDescuentoProducto borrador={borrador} editando={editando} onCambiar={onCambiar} producto={producto} />
    <CampoDestacadoProducto editando={editando} onCambiar={onCambiar} producto={producto} />
  </div>
)

export default CamposDetalleProducto
