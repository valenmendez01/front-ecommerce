import TablaItemsVenta from './TablaItemsVenta'
import { formatearPesosVenta } from '../datos/formatoVentasVendedor'

const DatoVenta = ({ titulo, valor }) => (
  <div className="rounded-md bg-white p-4">
    <p className="text-xs font-bold uppercase tracking-widest text-slate-400">{titulo}</p>
    <p className="mt-2 font-black text-green-primary">{valor}</p>
  </div>
)

const DetalleVenta = ({ venta }) => (
  <div className="rounded-md border border-dorado-primary/30 bg-dorado-primary/10 px-6 py-5">
    <div className="grid gap-4 md:grid-cols-3">
      <DatoVenta titulo="Comprador" valor={venta.comprador} />
      <DatoVenta titulo="Cantidad total" valor={`${venta.cantidad} u.`} />
      <DatoVenta titulo="Total de la venta" valor={formatearPesosVenta(venta.total)} />
    </div>
    <TablaItemsVenta venta={venta} />
  </div>
)

export default DetalleVenta
