import { apiRequest } from './api'

const obtenerVentasDePagina = (respuesta) => {
  if (Array.isArray(respuesta)) return respuesta
  return respuesta?.content || []
}

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

const obtenerComprador = (comprador) => {
  if (!comprador) return 'Comprador sin nombre'

  const nombreCompleto = `${comprador.nombre || ''} ${comprador.apellido || ''}`.trim()
  return nombreCompleto || comprador.email || 'Comprador sin nombre'
}

const normalizarItemVenta = (item) => {
  const cantidad = Number(item.cantidad || 0)
  const precioUnitario = Number(item.precioUnitario || 0)
  const subtotal = Number(item.subtotal || precioUnitario * cantidad)

  return {
    idProducto: item.idProducto,
    nombreProducto: item.nombreProducto || 'Producto sin nombre',
    cantidad,
    precioUnitario,
    subtotal,
  }
}

const obtenerResumenProductos = (items) => {
  if (items.length === 0) return 'Sin productos registrados'
  if (items.length === 1) return items[0].nombreProducto
  return `${items[0].nombreProducto} + ${items.length - 1} productos`
}

export const normalizarVentaVendedor = (venta, indice = 0) => {
  const items = (venta.items || []).map(normalizarItemVenta)
  const cantidad = Number(
    venta.cantidadTotal ?? items.reduce((total, item) => total + item.cantidad, 0),
  )
  const total = Number(venta.total ?? items.reduce((acumulado, item) => acumulado + item.subtotal, 0))

  return {
    ...venta,
    idVenta: venta.idPedido || `sin-id-${indice}`,
    idVentaTexto: venta.idPedido || 'Sin ID',
    fecha: formatearFecha(venta.fechaPedido),
    producto: obtenerResumenProductos(items),
    comprador: obtenerComprador(venta.comprador),
    cantidad,
    total,
    items,
  }
}

export const obtenerVentasMias = async () => {
  const respuesta = await apiRequest('/ventas/mias')
  return obtenerVentasDePagina(respuesta).map(normalizarVentaVendedor)
}
