const formatearFecha = (fecha) => {
  if (!fecha) return 'Sin fecha'
  const nuevaFecha = new Date(`${fecha}T00:00:00`)
  if (Number.isNaN(nuevaFecha.getTime())) return fecha

  return new Intl.DateTimeFormat('es-AR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(nuevaFecha)
}

const obtenerComprador = (comprador) => {
  if (!comprador) return 'Comprador sin nombre'
  const nombre = `${comprador.nombre || ''} ${comprador.apellido || ''}`.trim()
  return nombre || comprador.email || 'Comprador sin nombre'
}

const normalizarItem = (item) => {
  const cantidad = Number(item.cantidad || 0)
  const precioUnitario = Number(item.precioUnitario || 0)

  return {
    idProducto: item.idProducto,
    nombreProducto: item.nombreProducto || 'Producto sin nombre',
    cantidad,
    precioUnitario,
    subtotal: Number(item.subtotal || precioUnitario * cantidad),
  }
}

const resumirProductos = (items) => {
  if (!items.length) return 'Sin productos registrados'
  if (items.length === 1) return items[0].nombreProducto
  return `${items[0].nombreProducto} + ${items.length - 1} productos`
}

export const obtenerVentasPagina = (data) => {
  if (Array.isArray(data)) return data
  return data?.content || []
}

export const normalizarVentaVendedor = (venta, indice = 0) => {
  const items = (venta.items || []).map(normalizarItem)
  const cantidad = Number(venta.cantidadTotal ?? items.reduce((total, item) => total + item.cantidad, 0))
  const total = Number(venta.total ?? items.reduce((suma, item) => suma + item.subtotal, 0))

  return {
    ...venta,
    idVenta: venta.idPedido || `sin-id-${indice}`,
    idVentaTexto: venta.idPedido || 'Sin ID',
    fecha: formatearFecha(venta.fechaPedido),
    producto: resumirProductos(items),
    comprador: obtenerComprador(venta.comprador),
    cantidad,
    total,
    items,
  }
}
