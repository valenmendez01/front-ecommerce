import InformacionPersonal from '../components/cuenta/InformacionPersonal'
import TablaPedidos from '../components/cuenta/TablaPedidos'
import TarjetaResumen from '../components/cuenta/TarjetaResumen'
import BarraSuperior from '../components/layout/BarraSuperior'
import Footer from '../components/layout/Footer'
import MenuLateral from '../components/layout/MenuLateral'

const formatearPesos = (monto) => `$${monto.toLocaleString('es-AR')}`

const pedidosBase = [
  {
    idPedido: 'P-0001',
    detalle: 'Pack Leyendas Premium',
    fecha: '10 de Mayo, 2026',
    monto: 45000,
    productos: [
      { nombre: 'Pack Leyendas Premium', cantidad: 1, precioUnitario: 45000 },
    ],
    metodoPago: 'Tarjeta de crédito',
    entrega: 'Retiro en sucursal',
  },
  {
    idPedido: 'P-0002',
    detalle: 'Álbum Mundial 2026',
    fecha: '14 de Mayo, 2026',
    monto: 82000,
    productos: [
      { nombre: 'Álbum Mundial 2026', cantidad: 1, precioUnitario: 52000 },
      { nombre: 'Pack de 10 sobres', cantidad: 1, precioUnitario: 30000 },
    ],
    metodoPago: 'Mercado Pago',
    entrega: 'Envío a domicilio',
  },
  {
    idPedido: 'P-0003',
    detalle: 'Combo inicial de figuritas',
    fecha: '20 de Mayo, 2026',
    monto: 33000,
    productos: [
      { nombre: 'Combo inicial de figuritas', cantidad: 1, precioUnitario: 33000 },
    ],
    metodoPago: 'Tarjeta de débito',
    entrega: 'Retiro en sucursal',
  },
  {
    idPedido: 'P-0004',
    detalle: 'Caja de sobres mundialistas',
    fecha: '24 de Mayo, 2026',
    monto: 150000,
    productos: [
      { nombre: 'Caja de sobres mundialistas', cantidad: 1, precioUnitario: 150000 },
    ],
    metodoPago: 'Transferencia bancaria',
    entrega: 'Envío a domicilio',
  },
  {
    idPedido: 'P-0005',
    detalle: 'Figurita especial Argentina',
    fecha: '28 de Mayo, 2026',
    monto: 72500,
    productos: [
      { nombre: 'Figurita especial Argentina', cantidad: 1, precioUnitario: 72500 },
    ],
    metodoPago: 'Mercado Pago',
    entrega: 'Retiro en punto de entrega',
  },
]

const totalGastado = pedidosBase.reduce((acumulado, pedido) => acumulado + pedido.monto, 0)

const resumen = [
  { titulo: 'Total de pedidos', valor: pedidosBase.length },
  { titulo: 'Gasto total', valor: formatearPesos(totalGastado), destacar: true },
]

const pedidos = pedidosBase.map((pedido) => ({
  ...pedido,
  total: formatearPesos(pedido.monto),
  productos: pedido.productos.map((producto) => ({
    ...producto,
    precioUnitarioTexto: formatearPesos(producto.precioUnitario),
    subtotalTexto: formatearPesos(producto.precioUnitario * producto.cantidad),
  })),
}))

const MiCuenta = ({ usuario, onActualizarUsuario }) => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <BarraSuperior />

      <div className="flex min-h-[calc(100vh-4rem)]">
        <MenuLateral usuario={usuario} />

        <main className="flex-1">
          <div className="mx-auto max-w-7xl px-8 py-10">
            <section className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-6xl font-black uppercase leading-none text-[#061d58] md:text-7xl">
                  Hola,
                  <br />
                  {usuario.nombre}
                </h2>
                <p className="mt-5 max-w-xl text-xl leading-relaxed text-slate-700">
                  Gestioná tus datos y pedidos.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {resumen.map((item) => (
                  <TarjetaResumen
                    destacar={item.destacar}
                    key={item.titulo}
                    titulo={item.titulo}
                    valor={item.valor}
                  />
                ))}
              </div>
            </section>

            <div className="mt-10">
              <InformacionPersonal
                usuario={usuario}
                onActualizarUsuario={onActualizarUsuario}
              />
            </div>

            <div className="mt-12">
              <TablaPedidos pedidos={pedidos} />
            </div>
          </div>

          <Footer />
        </main>
      </div>
    </div>
  )
}

export default MiCuenta
