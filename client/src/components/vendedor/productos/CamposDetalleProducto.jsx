import CampoCategoriaProducto from './CampoCategoriaProducto'
import CampoDescuentoProducto from './CampoDescuentoProducto'
import CampoEstadoProducto from './CampoEstadoProducto'
import CampoPrecioProducto from './CampoPrecioProducto'
import CampoStockProducto from './CampoStockProducto'
import CampoVendidosProducto from './CampoVendidosProducto'

const CamposDetalleProducto = ({ borrador, categorias, editando, onCambiar, producto }) => (
  <div className="grid gap-4 md:grid-cols-2">
    <CampoCategoriaProducto borrador={borrador} categorias={categorias} editando={editando} onCambiar={onCambiar} producto={producto} />
    <CampoPrecioProducto borrador={borrador} editando={editando} onCambiar={onCambiar} producto={producto} />
    <CampoStockProducto borrador={borrador} editando={editando} onCambiar={onCambiar} producto={producto} />
    <CampoVendidosProducto producto={producto} />
    <CampoDescuentoProducto borrador={borrador} editando={editando} onCambiar={onCambiar} producto={producto} />
    <CampoEstadoProducto producto={producto} />
  </div>
)

export default CamposDetalleProducto
