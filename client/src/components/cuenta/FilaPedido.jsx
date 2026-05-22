import { Button } from '@heroui/react'
import { Fragment } from 'react'
import DetallePedido from './DetallePedido'

const FilaPedido = ({ estaAbierto, onCambiarDetalle, pedido }) => (
  <Fragment>
    <tr className="border-t border-[#d8c49a] bg-white">
      <td className="px-8 py-5">
        <p className="text-lg font-black text-[#142b10]">#{pedido.idPedidoTexto}</p>
        <p className="text-xs text-[#5f6d5a]">{pedido.detalle}</p>
      </td>
      <td className="px-8 py-5 font-medium">{pedido.fecha}</td>
      <td className="px-8 py-5 text-lg font-black text-[#142b10]">{pedido.total}</td>
      <td className="px-8 py-5 text-right">
        <Button
          className="border border-[#d8c49a] bg-[#fffdf8] text-sm font-bold text-[#142b10]"
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
