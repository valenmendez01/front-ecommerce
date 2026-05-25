const DatoPedido = ({ titulo, valor }) => (
  <div>
    <p className="font-bold uppercase tracking-widest text-slate-400">{titulo}</p>
    <p className="mt-1 font-semibold text-slate-800">{valor}</p>
  </div>
)

const ResumenPedido = ({ pedido }) => (
  <div className="rounded-md border border-dorado-primary/30 bg-white p-5">
    <h3 className="text-sm font-black uppercase tracking-widest text-green-primary">
      Información del pedido
    </h3>
    <div className="mt-4 space-y-4 text-sm">
      {pedido.metodoPago && <DatoPedido titulo="Método de pago" valor={pedido.metodoPago} />}
      {pedido.entrega && <DatoPedido titulo="Entrega" valor={pedido.entrega} />}
      <div>
        <p className="font-bold uppercase tracking-widest text-slate-400">Total del pedido</p>
        <p className="mt-1 text-xl font-black text-green-primary">{pedido.total}</p>
      </div>
    </div>
  </div>
)

export default ResumenPedido
