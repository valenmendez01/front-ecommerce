const DatoPedido = ({ titulo, valor }) => (
  <div>
    <p className="font-bold uppercase tracking-widest text-[#8d6f3e]">{titulo}</p>
    <p className="mt-1 font-semibold text-[#142b10]">{valor}</p>
  </div>
)

const ResumenPedido = ({ pedido }) => (
  <div className="rounded-md border border-[#d8c49a] bg-white p-5">
    <h3 className="text-sm font-black uppercase tracking-widest text-[#142b10]">
      Informacion del pedido
    </h3>
    <div className="mt-4 space-y-4 text-sm">
      {pedido.metodoPago && <DatoPedido titulo="Metodo de pago" valor={pedido.metodoPago} />}
      {pedido.entrega && <DatoPedido titulo="Entrega" valor={pedido.entrega} />}
      <div>
        <p className="font-bold uppercase tracking-widest text-[#8d6f3e]">Total del pedido</p>
        <p className="mt-1 text-xl font-black text-[#142b10]">{pedido.total}</p>
      </div>
    </div>
  </div>
)

export default ResumenPedido
