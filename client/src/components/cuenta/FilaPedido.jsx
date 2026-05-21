import { Button } from '@heroui/react'
import { Fragment } from 'react'
import DetallePedido from './DetallePedido'

const FilaPedido = ({ estaAbierto, onCambiarDetalle, pedido }) => (
  <Fragment>
    <tr className="border-t border-slate-100">
      <td className="px-8 py-5">
        <p className="text-lg font-black text-[#0b2b88]">#{pedido.idPedidoTexto}</p>
        <p className="text-xs text-slate-400">{pedido.detalle}</p>
      </td>
      <td className="px-8 py-5 font-medium">{pedido.fecha}</td>
      <td className="px-8 py-5 text-lg font-black text-[#0b2b88]">{pedido.total}</td>
      <td className="px-8 py-5 text-right">
        <Button
          className="bg-blue-50 text-sm font-bold text-[#0b2b88]"
          radius="sm"
          size="sm"
          onPress={onCambiarDetalle}
        >
          {estaAbierto ? 'Ocultar detalles' : 'Ver detalles'}
        </Button>
      </td>
    </tr>
    {estaAbierto && <DetallePedido pedido={pedido} />}
  </Fragment>
)

export default FilaPedido
