const TablaDetallePedido = ({ pedido }) => (
  <div>
    <h3 className="text-sm font-black uppercase tracking-widest text-green-primary">
      Detalle del pedido
    </h3>
    <div className="mt-4 overflow-hidden rounded-md border border-dorado-primary/30 bg-white">
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
          {pedido.productos.length === 0 && (
            <tr className="border-t border-slate-100">
              <td className="px-4 py-5 text-center font-semibold text-green-primary/70" colSpan="4">
                No hay productos asociados a este pedido.
              </td>
            </tr>
          )}
          {pedido.productos.map((producto) => (
            <tr
              className="border-t border-slate-100"
              key={`${pedido.idPedido}-${producto.idProducto || producto.nombre}`}
            >
              <td className="px-4 py-3 font-semibold text-green-primary">{producto.nombre}</td>
              <td className="px-4 py-3 text-green-primary">{producto.cantidad}</td>
              <td className="px-4 py-3 text-green-primary">{producto.precioUnitarioTexto}</td>
              <td className="px-4 py-3 font-bold text-green-primary">{producto.subtotalTexto}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)

export default TablaDetallePedido
