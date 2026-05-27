const DatoPedido = ({ titulo, valor }) => (
  <div className="rounded-md bg-[#f7f4ec] px-4 py-3">
    <p className="font-bold uppercase tracking-widest text-slate-400">{titulo}</p>
    <p className="mt-1 font-black text-green-primary">{valor}</p>
  </div>
)

const ResumenPedido = ({ pedido }) => {
  const cantidadProductos = pedido.productos.length
  const unidadesTotales = pedido.productos.reduce(
    (total, producto) => total + Number(producto.cantidad || 0),
    0,
  )

  return (
    <div className="rounded-md border border-dorado-primary/30 bg-white p-5">
      <h3 className="text-sm font-black uppercase tracking-widest text-green-primary">
        Información del pedido
      </h3>
      <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-1">
        <DatoPedido titulo="Productos" valor={cantidadProductos} />
        <DatoPedido titulo="Unidades" valor={unidadesTotales} />
        <DatoPedido titulo="Fecha" valor={pedido.fecha} />
      </div>
      <div className="mt-4 border-t border-dorado-primary/30 pt-4">
        <p className="font-bold uppercase tracking-widest text-slate-400">Total del pedido</p>
        <p className="mt-1 text-2xl font-black text-green-primary">{pedido.total}</p>
      </div>
    </div>
  )
}

export default ResumenPedido
