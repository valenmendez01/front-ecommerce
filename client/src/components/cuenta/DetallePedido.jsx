import ResumenPedido from './ResumenPedido'
import TablaDetallePedido from './TablaDetallePedido'

const DetallePedido = ({ pedido }) => (
  <tr className="border-t border-blue-100 bg-blue-50/50">
    <td className="px-8 py-6" colSpan="4">
      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <TablaDetallePedido pedido={pedido} />
        <ResumenPedido pedido={pedido} />
      </div>
    </td>
  </tr>
)

export default DetallePedido
