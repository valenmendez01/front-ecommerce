import ResumenPedido from './ResumenPedido'
import TablaDetallePedido from './TablaDetallePedido'

const DetallePedido = ({ pedido }) => (
  <div className="grid items-start gap-6 lg:grid-cols-[1.5fr_1fr]">
    <TablaDetallePedido pedido={pedido} />
    <ResumenPedido pedido={pedido} />
  </div>
)

export default DetallePedido
