import { Package, PackageCheck, PackageX, TriangleAlert } from 'lucide-react'
import InformacionPersonal from '../components/cuenta/InformacionPersonal'
import PaginaGestion from '../components/layout/PaginaGestion'
import EncabezadoPanelVendedor from '../components/vendedor/EncabezadoPanelVendedor'
import MetricasPanelVendedor from '../components/vendedor/MetricasPanelVendedor'
import TablaProductos from '../components/vendedor/TablaProductos'
import { calcularPrecioFinal, formatearPesos } from '../data/reglasProducto'

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
    precioFinalTexto: formatearPesos(calcularPrecioFinal(producto.precio, producto.descuento)),
  }))
  const activos = productos.filter((producto) => producto.activo)
  const metricas = [
    { titulo: 'Productos publicados', valor: productos.length, descripcion: 'Total de productos cargados', Icono: Package, destacar: true },
    { titulo: 'Productos activos', valor: activos.length, descripcion: 'Publicados aunque alguno no tenga stock', Icono: PackageCheck },
    { titulo: 'Stock bajo', valor: activos.filter((producto) => producto.stock > 0 && producto.stock <= 5).length, descripcion: 'Productos activos con 1 a 5 unidades', Icono: TriangleAlert },
    { titulo: 'Sin stock', valor: activos.filter((producto) => producto.stock === 0).length, descripcion: 'Productos activos sin unidades', Icono: PackageX },
  ]

  return (
    <PaginaGestion usuario={usuario} onCerrarSesion={onCerrarSesion}>
      <EncabezadoPanelVendedor />
      <div className="mt-10"><InformacionPersonal usuario={usuario} /></div>
      <MetricasPanelVendedor metricas={metricas} />
      <div className="mt-12">
        <TablaProductos
          cargando={cargandoProductos}
          error={errorProductos}
          productos={productos}
          onActualizarProducto={onActualizarProducto}
          onEliminarProducto={onEliminarProducto}
        />
      </div>
    </PaginaGestion>
  )
}

export default PanelVendedor
