import CampoDetalleProducto from './CampoDetalleProducto'

const CampoVendidosProducto = ({ producto }) => (
  <CampoDetalleProducto etiqueta="Vendidos">
    {producto.vendidos}
  </CampoDetalleProducto>
)

export default CampoVendidosProducto
