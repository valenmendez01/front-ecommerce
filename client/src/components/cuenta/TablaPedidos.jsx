import { Card } from '@heroui/react'
import { useState } from 'react'
import EncabezadoPedidos from './EncabezadoPedidos'
import FilaPedido from './FilaPedido'
import FilasPedidosCargando from './FilasPedidosCargando'

const MensajeTablaPedidos = ({ children }) => (
  <tr className="border-t border-slate-100">
    <td className="px-8 py-10 text-center font-semibold text-slate-500" colSpan="4">
      {children}
    </td>
  </tr>
)

const TablaPedidos = ({ cargando = false, error = '', pedidos }) => {
  const [mostrarHistorial, setMostrarHistorial] = useState(false)
  const [pedidoAbierto, setPedidoAbierto] = useState(null)
  const pedidosVisibles = mostrarHistorial ? pedidos : pedidos.slice(0, 3)

  const cambiarVista = (vista) => {
    setMostrarHistorial(vista === 'historial')
    setPedidoAbierto(null)
  }

  return (
    <Card className="overflow-hidden shadow-lg" radius="sm">
      <EncabezadoPedidos
        mostrarHistorial={mostrarHistorial}
        onCambiarVista={cambiarVista}
      />
      {error && (
        <div className="mx-8 mb-6 rounded-md border border-red-100 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
          {error}
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-50 text-left text-xs font-bold uppercase text-slate-400">
              <th className="px-8 py-4">ID pedido</th>
              <th className="px-8 py-4">Fecha</th>
              <th className="px-8 py-4">Total</th>
              <th className="px-8 py-4 text-right">Accion</th>
            </tr>
          </thead>
          <tbody>
            {cargando && <FilasPedidosCargando />}
            {!cargando && pedidosVisibles.length === 0 && (
              <MensajeTablaPedidos>Todavia no hay pedidos para mostrar.</MensajeTablaPedidos>
            )}
            {!cargando && pedidosVisibles.map((pedido) => (
              <FilaPedido
                estaAbierto={pedidoAbierto === pedido.idPedido}
                key={pedido.idPedido}
                pedido={pedido}
                onCambiarDetalle={() =>
                  setPedidoAbierto(pedidoAbierto === pedido.idPedido ? null : pedido.idPedido)
                }
              />
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

export default TablaPedidos
