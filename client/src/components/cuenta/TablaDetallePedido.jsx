const TablaDetallePedido = ({ pedido }) => (
  <div>
    <h3 className="text-sm font-black uppercase tracking-widest text-[#0b2b88]">
      Detalle del pedido
    </h3>
    <div className="mt-4 overflow-hidden rounded-md border border-blue-100 bg-white">
      <table className="w-full">
        <thead>
          <tr className="bg-slate-50 text-left text-xs font-bold uppercase text-slate-400">
            <th className="px-4 py-3">Producto</th>
            <th className="px-4 py-3">Cantidad</th>
            <th className="px-4 py-3">Precio</th>
            <th className="px-4 py-3">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {pedido.productos.length === 0 && (
            <tr className="border-t border-slate-100">
              <td className="px-4 py-5 text-center font-semibold text-slate-500" colSpan="4">
                No hay productos asociados a este pedido.
              </td>
            </tr>
          )}
          {pedido.productos.map((producto) => (
            <tr
              className="border-t border-slate-100"
              key={`${pedido.idPedido}-${producto.idProducto || producto.nombre}`}
            >
              <td className="px-4 py-3 font-semibold text-slate-800">{producto.nombre}</td>
              <td className="px-4 py-3">{producto.cantidad}</td>
              <td className="px-4 py-3">{producto.precioUnitarioTexto}</td>
              <td className="px-4 py-3 font-bold text-[#0b2b88]">{producto.subtotalTexto}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)

export default TablaDetallePedido
