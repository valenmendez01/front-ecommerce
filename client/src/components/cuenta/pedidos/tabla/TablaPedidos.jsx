import { Card } from '@heroui/react'
import { useState } from 'react'
import EncabezadoPedidos from '../encabezado/EncabezadoPedidos'
import FilaPedido from './FilaPedido'
import FilasPedidosCargando from './FilasPedidosCargando'
import ModalDetallePedido from '../detalle/ModalDetallePedido'

const MensajeTablaPedidos = ({ children }) => (
  <tr className="border-t border-[#d8c49a]">
    <td className="px-8 py-10 text-center font-semibold text-[#5f6d5a]" colSpan="4">
      {children}
    </td>
  </tr>
)

const TablaPedidos = ({ cargando = false, error = '', pedidos }) => {
  const [mostrarHistorial, setMostrarHistorial] = useState(false)
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null)
  const pedidosVisibles = mostrarHistorial ? pedidos : pedidos.slice(0, 3)

  const cambiarVista = (vista) => {
    setMostrarHistorial(vista === 'historial')
    setPedidoSeleccionado(null)
  }

  return (
    <>
      <Card className="overflow-hidden border border-[#d8c49a] bg-[#fffdf8] shadow-xl shadow-[#142b10]/5" radius="lg">
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
              <tr className="bg-[#f7f4ec] text-left text-xs font-bold uppercase text-[#8d6f3e]">
                <th className="px-8 py-4">ID pedido</th>
                <th className="px-8 py-4">Fecha</th>
                <th className="px-8 py-4">Total</th>
                <th className="px-8 py-4 text-right">Acción</th>
              </tr>
            </thead>
            <tbody>
              {cargando && <FilasPedidosCargando />}
              {!cargando && pedidosVisibles.length === 0 && (
                <MensajeTablaPedidos>Todavía no hay pedidos para mostrar.</MensajeTablaPedidos>
              )}
              {!cargando && pedidosVisibles.map((pedido) => (
                <FilaPedido
                  key={pedido.idPedido}
                  pedido={pedido}
                  onVerDetalle={() => setPedidoSeleccionado(pedido)}
                />
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <ModalDetallePedido pedido={pedidoSeleccionado} onCerrar={() => setPedidoSeleccionado(null)} />
    </>
  )
}

export default TablaPedidos
