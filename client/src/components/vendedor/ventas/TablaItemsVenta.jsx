import { formatearPesos } from '../../../data/reglasProducto'

const TablaItemsVenta = ({ venta }) => (
  <div className="mt-5 overflow-hidden rounded-md border border-dorado-primary/30 bg-white">
    <table className="w-full">
      <thead>
        <tr className="bg-slate-50 text-left text-xs font-bold uppercase text-slate-400">
          <th className="px-4 py-3">Producto</th>
          <th className="px-4 py-3">Cantidad</th>
          <th className="px-4 py-3">Precio unitario</th>
          <th className="px-4 py-3">Subtotal</th>
        </tr>
      </thead>
      <tbody>
        {venta.items.length === 0 && (
          <tr className="border-t border-slate-100">
            <td className="px-4 py-5 text-center font-semibold text-slate-500" colSpan="4">
              No hay productos asociados a esta venta.
            </td>
          </tr>
        )}
        {venta.items.map((item) => (
          <tr className="border-t border-slate-100" key={`${venta.idVenta}-${item.idProducto || item.nombreProducto}`}>
            <td className="px-4 py-3 font-semibold text-slate-800">{item.nombreProducto}</td>
            <td className="px-4 py-3">{item.cantidad}</td>
            <td className="px-4 py-3">{formatearPesos(item.precioUnitario)}</td>
            <td className="px-4 py-3 font-bold text-green-primary">{formatearPesos(item.subtotal)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

export default TablaItemsVenta
