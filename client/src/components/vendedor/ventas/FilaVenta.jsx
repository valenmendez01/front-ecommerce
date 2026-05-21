import { Button } from '@heroui/react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { formatearPesos } from '../../../data/reglasProducto'
import DetalleVenta from './DetalleVenta'

const FilaVenta = ({ estaAbierta, onCambiarDetalle, venta }) => (
  <article className="border-b border-slate-100">
    <div className="grid gap-4 px-8 py-5 lg:grid-cols-[1fr_1fr_120px_160px_130px] lg:items-center">
      <div>
        <p className="text-lg font-black text-[#0b2b88]">#{venta.idVentaTexto}</p>
        <p className="mt-1 text-sm text-slate-500">{venta.fecha}</p>
      </div>
      <div>
        <p className="font-bold text-slate-950">{venta.producto}</p>
        <p className="mt-1 text-sm text-slate-500">Comprador: {venta.comprador}</p>
      </div>
      <p className="font-bold text-slate-700">{venta.cantidad} u.</p>
      <p className="text-lg font-black text-[#0b2b88]">{formatearPesos(venta.total)}</p>
      <Button
        className="bg-blue-50 text-sm font-bold text-[#0b2b88]"
        endContent={estaAbierta ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        radius="sm"
        size="sm"
        onPress={onCambiarDetalle}
      >
        Detalle
      </Button>
    </div>
    {estaAbierta && <DetalleVenta venta={venta} />}
  </article>
)

export default FilaVenta
