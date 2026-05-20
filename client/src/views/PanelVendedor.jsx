import { Package, PackageCheck, PackageX, TriangleAlert } from 'lucide-react'
import InformacionPersonal from '../components/cuenta/InformacionPersonal'
import BarraSuperior from '../components/layout/BarraSuperior'
import Footer from '../components/layout/Footer'
import MenuLateral from '../components/layout/MenuLateral'
import TablaProductos from '../components/vendedor/TablaProductos'
import TarjetaMetrica from '../components/vendedor/TarjetaMetrica'

const formatearPesos = (monto) => `$${monto.toLocaleString('es-AR')}`

const calcularPrecioFinal = (precio, descuento) => Math.round(precio * (1 - descuento / 100))

const calcularVendidosProducto = (ventas, idProducto) =>
  ventas.reduce(
    (total, venta) =>
      total +
      (venta.items || [])
        .filter((item) => item.idProducto === idProducto)
        .reduce((subtotal, item) => subtotal + item.cantidad, 0),
    0,
  )

const PanelVendedor = ({
  cargandoProductos = false,
  errorProductos = '',
  productosBaseActuales = [],
  ventas = [],
  usuario,
  onCerrarSesion,
  onActualizarProducto,
  onEliminarProducto,
}) => {
  const productos = productosBaseActuales.map((producto) => ({
    ...producto,
    vendidos: calcularVendidosProducto(ventas, producto.idProducto),
    precioTexto: formatearPesos(producto.precio),
    precioFinal: calcularPrecioFinal(producto.precio, producto.descuento),
    precioFinalTexto: formatearPesos(calcularPrecioFinal(producto.precio, producto.descuento)),
  }))

  const productosActivos = productos.filter((producto) => producto.activo)
  const productosConStockBajo = productosActivos.filter((producto) => producto.stock > 0 && producto.stock <= 5)
  const productosSinStock = productosActivos.filter((producto) => producto.stock === 0)

  const metricas = [
    {
      titulo: 'Productos publicados',
      valor: productos.length,
      descripcion: 'Total de productos cargados',
      Icono: Package,
      destacar: true,
    },
    {
      titulo: 'Productos activos',
      valor: productosActivos.length,
      descripcion: 'Publicados aunque alguno no tenga stock',
      Icono: PackageCheck,
    },
    {
      titulo: 'Stock bajo',
      valor: productosConStockBajo.length,
      descripcion: 'Productos activos con 1 a 5 unidades',
      Icono: TriangleAlert,
    },
    {
      titulo: 'Sin stock',
      valor: productosSinStock.length,
      descripcion: 'Productos activos sin unidades',
      Icono: PackageX,
    },
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
                  Panel de
                  <br />
                  vendedor
                </h2>
                <p className="mt-5 max-w-2xl text-xl leading-relaxed text-slate-700">
                  Revisá tus productos publicados y controlá el stock con datos del backend.
                </p>
              </div>

            </section>

            <div className="mt-10">
              <InformacionPersonal usuario={usuario} />
            </div>

            <section className="mt-10 grid gap-5 xl:grid-cols-4 md:grid-cols-2">
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

            <div className="mt-12">
              <TablaProductos
                cargando={cargandoProductos}
                error={errorProductos}
                productos={productos}
                onActualizarProducto={onActualizarProducto}
                onEliminarProducto={onEliminarProducto}
              />
            </div>

          </div>

          <Footer />
        </main>
      </div>
    </div>
  )
}

export default PanelVendedor
