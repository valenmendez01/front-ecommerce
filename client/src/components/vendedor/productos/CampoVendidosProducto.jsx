import CampoDetalleProducto from './CampoDetalleProducto'

const CampoVendidosProducto = ({ producto }) => (
  <CampoDetalleProducto etiqueta="Vendidos">
    <p>{producto.vendidos}</p>
    <p className="mt-1 text-xs font-bold text-slate-400">Calculado desde ventas</p>
  </CampoDetalleProducto>
)

export default CampoVendidosProducto
