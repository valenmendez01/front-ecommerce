import { Button, Card, CardBody } from '@heroui/react'
import { ChevronDown, ChevronUp, ReceiptText, ShoppingBag, WalletCards } from 'lucide-react'
import { useState } from 'react'
import BarraSuperior from '../components/layout/BarraSuperior'
import Footer from '../components/layout/Footer'
import MenuLateral from '../components/layout/MenuLateral'
import TarjetaMetrica from '../components/vendedor/TarjetaMetrica'

const formatearPesos = (monto) => `$${Number(monto || 0).toLocaleString('es-AR')}`

const VentasVendedor = ({
  cargandoVentas = false,
  errorVentas = '',
  usuario,
  ventas = [],
  onCerrarSesion,
}) => {
  const [mostrarTodas, setMostrarTodas] = useState(false)
  const [ventaAbierta, setVentaAbierta] = useState(null)
  const ventasVisibles = mostrarTodas ? ventas : ventas.slice(0, 3)
  const puedeVerHistorial = ventas.length > 3

  const totalVendido = ventas.reduce((total, venta) => total + venta.total, 0)
  const productosVendidos = ventas.reduce((total, venta) => total + venta.cantidad, 0)

  const metricas = [
    {
      titulo: 'Total vendido',
      valor: formatearPesos(totalVendido),
      descripcion: 'Importe generado por ventas registradas',
      Icono: WalletCards,
      destacar: true,
    },
    {
      titulo: 'Ventas realizadas',
      valor: ventas.length,
      descripcion: 'Operaciones registradas',
      Icono: ReceiptText,
    },
    {
      titulo: 'Productos vendidos',
      valor: productosVendidos,
      descripcion: 'Unidades vendidas en total',
      Icono: ShoppingBag,
    },
  ]

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <BarraSuperior />

      <div className="flex min-h-[calc(100vh-4rem)]">
        <MenuLateral usuario={usuario} onCerrarSesion={onCerrarSesion} />

        <main className="flex-1">
          <div className="mx-auto max-w-7xl px-8 py-10">
            <section>
              <h2 className="text-6xl font-black uppercase leading-none text-[#061d58] md:text-7xl">
                Ventas
              </h2>
              <p className="mt-5 max-w-2xl text-xl leading-relaxed text-slate-700">
                Consulta las ventas realizadas y el detalle de cada operacion.
              </p>
            </section>

            <section className="mt-10 grid gap-5 xl:grid-cols-3 md:grid-cols-2">
              {metricas.map((metrica) => (
                <TarjetaMetrica
                  Icono={metrica.Icono}
                  descripcion={metrica.descripcion}
                  destacar={metrica.destacar}
                  key={metrica.titulo}
                  titulo={metrica.titulo}
                  valor={metrica.valor}
                />
              ))}
            </section>

            <Card className="mt-12 overflow-hidden shadow-lg" radius="sm">
              <div className="flex items-center justify-between px-8 py-6">
                <div>
                  <h3 className="text-2xl font-black text-[#0b2b88]">
                    {mostrarTodas ? 'HISTORIAL DE VENTAS' : 'VENTAS RECIENTES'}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    {mostrarTodas
                      ? 'Todas las ventas registradas.'
                      : 'Ultimas ventas realizadas.'}
                  </p>
                </div>

                {puedeVerHistorial && (
                  <Button
                    className="bg-transparent text-sm font-bold text-[#0b2b88]"
                    radius="sm"
                    size="sm"
                    onPress={() => {
                      setMostrarTodas(!mostrarTodas)
                      setVentaAbierta(null)
                    }}
                  >
                    {mostrarTodas ? 'Ver ventas recientes' : 'Ver todo el historial'}
                  </Button>
                )}
              </div>

              {errorVentas && (
                <div className="mx-8 mb-6 rounded-md border border-red-100 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
                  {errorVentas}
                </div>
              )}

              <div className="border-t border-slate-100">
                {cargandoVentas && (
                  <div className="px-8 py-10 text-center font-semibold text-slate-500">
                    Cargando ventas...
                  </div>
                )}

                {!cargandoVentas && ventasVisibles.length === 0 && (
                  <div className="px-8 py-10 text-center font-semibold text-slate-500">
                    Todavia no hay ventas para mostrar.
                  </div>
                )}

                {!cargandoVentas && ventasVisibles.map((venta) => {
                  const estaAbierta = ventaAbierta === venta.idVenta

                  return (
                    <article className="border-b border-slate-100" key={venta.idVenta}>
                      <div className="grid gap-4 px-8 py-5 lg:grid-cols-[1fr_1fr_120px_160px_130px] lg:items-center">
                        <div>
                          <p className="text-lg font-black text-[#0b2b88]">#{venta.idVentaTexto}</p>
                          <p className="mt-1 text-sm text-slate-500">{venta.fecha}</p>
                        </div>

                        <div>
                          <p className="font-bold text-slate-950">{venta.producto}</p>
                          <p className="mt-1 text-sm text-slate-500">
                            Comprador: {venta.comprador}
                          </p>
                        </div>

                        <p className="font-bold text-slate-700">{venta.cantidad} u.</p>

                        <p className="text-lg font-black text-[#0b2b88]">
                          {formatearPesos(venta.total)}
                        </p>

                        <Button
                          className="bg-blue-50 text-sm font-bold text-[#0b2b88]"
                          endContent={estaAbierta ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                          radius="sm"
                          size="sm"
                          onPress={() => setVentaAbierta(estaAbierta ? null : venta.idVenta)}
                        >
                          Detalle
                        </Button>
                      </div>

                      {estaAbierta && (
                        <CardBody className="border-t border-blue-100 bg-blue-50/50 px-8 py-5">
                          <div className="grid gap-4 md:grid-cols-3">
                            <div className="rounded-md bg-white p-4">
                              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                                Comprador
                              </p>
                              <p className="mt-2 font-black text-[#0b2b88]">{venta.comprador}</p>
                            </div>
                            <div className="rounded-md bg-white p-4">
                              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                                Cantidad total
                              </p>
                              <p className="mt-2 font-black text-[#0b2b88]">{venta.cantidad} u.</p>
                            </div>
                            <div className="rounded-md bg-white p-4">
                              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                                Total de la venta
                              </p>
                              <p className="mt-2 font-black text-[#0b2b88]">
                                {formatearPesos(venta.total)}
                              </p>
                            </div>
                          </div>

                          <div className="mt-5 overflow-hidden rounded-md border border-blue-100 bg-white">
                            <table className="w-full">
                              <thead>
                                <tr className="bg-slate-50 text-left text-xs font-bold uppercase text-slate-400">
                                  <th className="px-4 py-3">Producto</th>
                                  <th className="px-4 py-3">Cantidad</th>
                                  <th className="px-4 py-3">Precio unitario</th>
                                  <th className="px-4 py-3">Subtotal</th>
                                </tr>
                              </thead>
                              <tbody>
                                {venta.items.length === 0 && (
                                  <tr className="border-t border-slate-100">
                                    <td
                                      className="px-4 py-5 text-center font-semibold text-slate-500"
                                      colSpan="4"
                                    >
                                      No hay productos asociados a esta venta.
                                    </td>
                                  </tr>
                                )}

                                {venta.items.map((item) => (
                                  <tr
                                    className="border-t border-slate-100"
                                    key={`${venta.idVenta}-${item.idProducto || item.nombreProducto}`}
                                  >
                                    <td className="px-4 py-3 font-semibold text-slate-800">
                                      {item.nombreProducto}
                                    </td>
                                    <td className="px-4 py-3">{item.cantidad}</td>
                                    <td className="px-4 py-3">
                                      {formatearPesos(item.precioUnitario)}
                                    </td>
                                    <td className="px-4 py-3 font-bold text-[#0b2b88]">
                                      {formatearPesos(item.subtotal)}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </CardBody>
                      )}
                    </article>
                  )
                })}
              </div>
            </Card>
          </div>

          <Footer />
        </main>
      </div>
    </div>
  )
}

export default VentasVendedor
