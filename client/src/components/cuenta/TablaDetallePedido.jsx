const TablaDetallePedido = ({ pedido }) => (
  <div>
    <h3 className="text-sm font-black uppercase tracking-widest text-[#142b10]">
      Detalle del pedido
    </h3>
    <div className="mt-4 overflow-hidden rounded-md border border-[#d8c49a] bg-white">
      <table className="w-full">
        <thead>
          <tr className="bg-[#f7f4ec] text-left text-xs font-bold uppercase text-[#8d6f3e]">
            <th className="px-4 py-3">Producto</th>
            <th className="px-4 py-3">Cantidad</th>
            <th className="px-4 py-3">Precio</th>
            <th className="px-4 py-3">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {pedido.productos.length === 0 && (
            <tr className="border-t border-[#d8c49a]">
              <td className="px-4 py-5 text-center font-semibold text-[#5f6d5a]" colSpan="4">
                No hay productos asociados a este pedido.
              </td>
            </tr>
          )}
          {pedido.productos.map((producto) => (
            <tr
              className="border-t border-[#d8c49a]"
              key={`${pedido.idPedido}-${producto.idProducto || producto.nombre}`}
            >
              <td className="px-4 py-3 font-semibold text-[#142b10]">{producto.nombre}</td>
              <td className="px-4 py-3">{producto.cantidad}</td>
              <td className="px-4 py-3">{producto.precioUnitarioTexto}</td>
              <td className="px-4 py-3 font-bold text-[#142b10]">{producto.subtotalTexto}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)

export default TablaDetallePedido
