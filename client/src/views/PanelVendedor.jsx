import { Button } from '@heroui/react'
import { Package, PackageCheck, PackageX, Plus, TriangleAlert } from 'lucide-react'
import InformacionPersonal from '../components/cuenta/InformacionPersonal'
import BarraSuperior from '../components/layout/BarraSuperior'
import Footer from '../components/layout/Footer'
import MenuLateral from '../components/layout/MenuLateral'
import MetaVentas from '../components/vendedor/MetaVentas'
import TablaProductos from '../components/vendedor/TablaProductos'
import TarjetaMetrica from '../components/vendedor/TarjetaMetrica'

const formatearPesos = (monto) => `$${monto.toLocaleString('es-AR')}`

const calcularPrecioFinal = (precio, descuento) => Math.round(precio * (1 - descuento / 100))

const PanelVendedor = ({
  metaMensualUnidades,
  productosBaseActuales,
  ventas,
  usuario,
  onActualizarUsuario,
  onActualizarMetaMensual,
  onActualizarProducto,
  onEliminarProducto,
  onCrearProducto,
}) => {
  const productos = productosBaseActuales.map((producto) => ({
    ...producto,
    vendidos: ventas
      .filter((venta) => venta.idProducto === producto.idProducto)
      .reduce((total, venta) => total + venta.cantidad, 0),
    precioTexto: formatearPesos(producto.precio),
    precioFinal: calcularPrecioFinal(producto.precio, producto.descuento),
    precioFinalTexto: formatearPesos(calcularPrecioFinal(producto.precio, producto.descuento)),
  }))

  const productosActivos = productos.filter((producto) => producto.activo)
  const productosConStockBajo = productosActivos.filter((producto) => producto.stock > 0 && producto.stock <= 5)
  const productosSinStock = productosActivos.filter((producto) => producto.stock === 0)
  const unidadesVendidas = ventas.reduce((total, venta) => total + venta.cantidad, 0)

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
        <MenuLateral usuario={usuario} />

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
                  Revisá tus productos publicados, controlá el stock y ajustá tu meta mensual.
                </p>
              </div>

              <Button
                className="w-fit bg-[#031039] px-8 py-7 text-lg font-black text-white shadow-lg"
                radius="sm"
                startContent={<Plus size={22} strokeWidth={2.5} />}
                onPress={onCrearProducto}
              >
                Crear producto
              </Button>
            </section>

            <div className="mt-10">
              <InformacionPersonal
                usuario={usuario}
                onActualizarUsuario={onActualizarUsuario}
              />
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
                productos={productos}
                onActualizarProducto={onActualizarProducto}
                onEliminarProducto={onEliminarProducto}
              />
            </div>

            <div className="mt-10">
              <MetaVentas
                metaMensual={metaMensualUnidades}
                unidadesVendidas={unidadesVendidas}
                onActualizarMetaMensual={onActualizarMetaMensual}
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
