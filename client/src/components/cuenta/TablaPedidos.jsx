import { Button, Card } from '@heroui/react'
import { Fragment, useState } from 'react'

const TablaPedidos = ({ pedidos }) => {
  const [mostrarHistorial, setMostrarHistorial] = useState(false)
  const [pedidoAbierto, setPedidoAbierto] = useState(null)
  const pedidosVisibles = mostrarHistorial ? pedidos : pedidos.slice(0, 3)

  const cambiarPedidoAbierto = (idPedido) => {
    setPedidoAbierto(pedidoAbierto === idPedido ? null : idPedido)
  }

  return (
    <Card className="overflow-hidden shadow-lg" radius="sm">
      <div className="flex items-center justify-between px-8 py-6">
        <div>
          <h2 className="text-2xl font-black text-[#0b2b88]">
            {mostrarHistorial ? 'HISTORIAL DE PEDIDOS' : 'PEDIDOS RECIENTES'}
          </h2>
          {mostrarHistorial && (
            <p className="mt-1 text-sm text-slate-500">
              Mostrando todos los pedidos registrados.
            </p>
          )}
        </div>

        <Button
          className="bg-transparent text-sm font-bold text-[#0b2b88]"
          radius="sm"
          size="sm"
          onPress={() => {
            setMostrarHistorial(!mostrarHistorial)
            setPedidoAbierto(null)
          }}
        >
          {mostrarHistorial ? 'Ver pedidos recientes' : 'Ver todo el historial'}
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-50 text-left text-xs font-bold uppercase text-slate-400">
              <th className="px-8 py-4">ID pedido</th>
              <th className="px-8 py-4">Fecha</th>
              <th className="px-8 py-4">Total</th>
              <th className="px-8 py-4 text-right">Acción</th>
            </tr>
          </thead>
          <tbody>
            {pedidosVisibles.map((pedido) => {
              const estaAbierto = pedidoAbierto === pedido.idPedido

              return (
                <Fragment key={pedido.idPedido}>
                  <tr className="border-t border-slate-100">
                    <td className="px-8 py-5">
                      <p className="text-lg font-black text-[#0b2b88]">#{pedido.idPedido}</p>
                      <p className="text-xs text-slate-400">{pedido.detalle}</p>
                    </td>
                    <td className="px-8 py-5 font-medium">{pedido.fecha}</td>
                    <td className="px-8 py-5 text-lg font-black text-[#0b2b88]">
                      {pedido.total}
                    </td>
                    <td className="px-8 py-5 text-right">
                      <Button
                        className="bg-blue-50 text-sm font-bold text-[#0b2b88]"
                        radius="sm"
                        size="sm"
                        onPress={() => cambiarPedidoAbierto(pedido.idPedido)}
                      >
                        {estaAbierto ? 'Ocultar detalles' : 'Ver detalles'}
                      </Button>
                    </td>
                  </tr>

                  {estaAbierto && (
                    <tr className="border-t border-blue-100 bg-blue-50/50">
                      <td colSpan="4" className="px-8 py-6">
                        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
                          <div>
                            <h3 className="text-sm font-black uppercase tracking-widest text-[#0b2b88]">
                              Detalle del pedido
                            </h3>
                            <div className="mt-4 overflow-hidden rounded-md border border-blue-100 bg-white">
                              <table className="w-full">
                                <thead>
                                  <tr className="bg-slate-50 text-left text-xs font-bold uppercase text-slate-400">
                                    <th className="px-4 py-3">Producto</th>
                                    <th className="px-4 py-3">Cantidad</th>
                                    <th className="px-4 py-3">Precio</th>
                                    <th className="px-4 py-3">Subtotal</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {pedido.productos.map((producto) => (
                                    <tr className="border-t border-slate-100" key={producto.nombre}>
                                      <td className="px-4 py-3 font-semibold text-slate-800">
                                        {producto.nombre}
                                      </td>
                                      <td className="px-4 py-3">{producto.cantidad}</td>
                                      <td className="px-4 py-3">{producto.precioUnitarioTexto}</td>
                                      <td className="px-4 py-3 font-bold text-[#0b2b88]">
                                        {producto.subtotalTexto}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>

                          <div className="rounded-md border border-blue-100 bg-white p-5">
                            <h3 className="text-sm font-black uppercase tracking-widest text-[#0b2b88]">
                              Información del pedido
                            </h3>
                            <div className="mt-4 space-y-4 text-sm">
                              <div>
                                <p className="font-bold uppercase tracking-widest text-slate-400">
                                  Método de pago
                                </p>
                                <p className="mt-1 font-semibold text-slate-800">{pedido.metodoPago}</p>
                              </div>
                              <div>
                                <p className="font-bold uppercase tracking-widest text-slate-400">
                                  Entrega
                                </p>
                                <p className="mt-1 font-semibold text-slate-800">{pedido.entrega}</p>
                              </div>
                              <div>
                                <p className="font-bold uppercase tracking-widest text-slate-400">
                                  Total del pedido
                                </p>
                                <p className="mt-1 text-xl font-black text-green-700">{pedido.total}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              )
            })}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

export default TablaPedidos
