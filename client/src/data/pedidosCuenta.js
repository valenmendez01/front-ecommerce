import { formatearPesos } from './reglasProducto'

const formatearFechaPedido = (fecha) => {
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
      precioUnitarioTexto: formatearPesos(precioUnitario),
      subtotal,
      subtotalTexto: formatearPesos(subtotal),
    }
  })
}

export const normalizarPedidoCuenta = (pedido, indice) => {
  const productos = normalizarProductosPedido(pedido)
  const montoProductos = productos.reduce((total, producto) => total + producto.subtotal, 0)
  const monto = Number(pedido.total || pedido.monto || montoProductos)

  return {
    idPedido: pedido.idPedido || pedido.id || `sin-id-${indice}`,
    idPedidoTexto: pedido.idPedido || pedido.id || 'Sin ID',
    detalle: productos.length
      ? productos.map((producto) => producto.nombre).join(', ')
      : 'Sin productos registrados',
    fecha: formatearFechaPedido(pedido.fechaPedido || pedido.fecha),
    monto,
    total: formatearPesos(monto),
    productos,
    metodoPago: pedido.metodoPago,
    entrega: pedido.entrega,
  }
}
