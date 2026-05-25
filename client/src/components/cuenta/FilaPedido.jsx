import { Button } from '@heroui/react'

const FilaPedido = ({ onVerDetalle, pedido }) => (
  <tr className="border-t border-slate-100">
    <td className="px-8 py-5">
      <p className="text-lg font-black text-green-primary">#{pedido.idPedidoTexto}</p>
      <p className="text-xs text-slate-400">{pedido.detalle}</p>
    </td>
    <td className="px-8 py-5 font-medium">{pedido.fecha}</td>
    <td className="px-8 py-5 text-lg font-black text-green-primary">{pedido.total}</td>
    <td className="px-8 py-5 text-right">
      <Button
        className="bg-dorado-primary/20 text-sm font-bold text-green-primary"
        radius="sm"
        size="sm"
        onPress={onVerDetalle}
      >
        Ver detalle
      </Button>
    </td>
  </tr>
)

export default FilaPedido
