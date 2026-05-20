import InformacionPersonal from '../components/cuenta/InformacionPersonal'
import TablaPedidos from '../components/cuenta/TablaPedidos'
import TarjetaResumen from '../components/cuenta/TarjetaResumen'
import BarraSuperior from '../components/layout/BarraSuperior'
import Footer from '../components/layout/Footer'
import MenuLateral from '../components/layout/MenuLateral'

const formatearPesos = (monto) => `$${Number(monto || 0).toLocaleString('es-AR')}`

const formatearFecha = (fecha) => {
  if (!fecha) return 'Sin fecha'

  const fechaNormalizada = new Date(`${fecha}T00:00:00`)

  if (Number.isNaN(fechaNormalizada.getTime())) {
    return fecha
  }

  return new Intl.DateTimeFormat('es-AR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(fechaNormalizada)
}

const normalizarProductosPedido = (pedido) => {
  const productos = pedido.items || pedido.productos || []

  return productos.map((producto) => {
    const cantidad = Number(producto.cantidad || 0)
    const precioUnitario = Number(producto.precioUnitario || producto.precio || 0)
    const subtotal = Number(producto.subtotal || precioUnitario * cantidad)

    return {
      idProducto: producto.idProducto,
      nombre: producto.nombreProducto || producto.nombre || 'Producto sin nombre',
      cantidad,
      precioUnitario,
      precioUnitarioTexto: formatearPesos(precioUnitario),
      subtotal,
      subtotalTexto: formatearPesos(subtotal),
    }
  })
}

const normalizarPedido = (pedido, indice) => {
  const productos = normalizarProductosPedido(pedido)
  const montoProductos = productos.reduce((total, producto) => total + producto.subtotal, 0)
  const monto = Number(pedido.total || pedido.monto || montoProductos)

  return {
    idPedido: pedido.idPedido || pedido.id || `sin-id-${indice}`,
    idPedidoTexto: pedido.idPedido || pedido.id || 'Sin ID',
    detalle: productos.length
      ? productos.map((producto) => producto.nombre).join(', ')
      : 'Sin productos registrados',
    fecha: formatearFecha(pedido.fechaPedido || pedido.fecha),
    monto,
    total: formatearPesos(monto),
    productos,
    metodoPago: pedido.metodoPago,
    entrega: pedido.entrega,
  }
}

const MiCuenta = ({
  cargandoPedidos = false,
  errorPedidos = '',
  pedidos = [],
  usuario,
  onCerrarSesion,
}) => {
  const pedidosNormalizados = pedidos.map(normalizarPedido)
  const totalGastado = pedidosNormalizados.reduce(
    (acumulado, pedido) => acumulado + pedido.monto,
    0,
  )
  const resumen = [
    { titulo: 'Total de pedidos', valor: pedidosNormalizados.length },
    { titulo: 'Gasto total', valor: formatearPesos(totalGastado), destacar: true },
  ]

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <BarraSuperior />

      <div className="flex min-h-[calc(100vh-4rem)]">
        <MenuLateral usuario={usuario} onCerrarSesion={onCerrarSesion} />

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
                  Gestiona tus datos y pedidos.
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
              <InformacionPersonal usuario={usuario} />
            </div>

            <div className="mt-12">
              <TablaPedidos
                cargando={cargandoPedidos}
                error={errorPedidos}
                pedidos={pedidosNormalizados}
              />
            </div>
          </div>

          <Footer />
        </main>
      </div>
    </div>
  )
}

export default MiCuenta
