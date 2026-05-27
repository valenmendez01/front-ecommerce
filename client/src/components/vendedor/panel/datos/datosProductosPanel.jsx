import { calcularPrecioFinalProducto, formatearPesosProducto } from '../../productos/datos/reglasProductoVendedor'
import { obtenerUrlImagenProducto } from '../../productos/imagenes/imagenesProductoDetalle'

const crearIniciales = (nombre = '') => {
  const iniciales = nombre
    .trim()
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((palabra) => palabra[0])
    .join('')
    .toUpperCase()

  return iniciales || 'PR'
}

export const obtenerProductosPagina = (data) => {
  if (Array.isArray(data)) return data
  return data?.content || []
}

export const crearDatosProducto = (producto) => ({
  nombre: producto.nombre.trim(),
  description: producto.description.trim(),
  categoria: producto.categoria,
  seleccion: producto.seleccion,
  stock: Number(producto.stock),
  precio: Number(producto.precio),
  descuento: Number(producto.descuento),
  destacado: Boolean(producto.destacado),
  activo: producto.activo ?? true,
})

export const normalizarProductoVendedor = (producto) => ({
  ...producto,
  nombre: producto.nombre || '',
  description: producto.description || '',
  seleccion: producto.seleccion || 'NINGUNA',
  imagen: crearIniciales(producto.nombre),
  imagenUrl: obtenerUrlImagenProducto(producto.imagenes?.find(Boolean)),
  precio: Number(producto.precio || 0),
  stock: Number(producto.stock || 0),
  descuento: Number(producto.descuento || 0),
  destacado: Boolean(producto.destacado),
  activo: producto.activo ?? true,
})

const obtenerItems = (ventas, idProducto) =>
  ventas.flatMap((venta) => venta.items || []).filter((item) => item.idProducto === idProducto)

export const agregarDatosDeVentas = (producto, ventas) => {
  const vendidos = obtenerItems(ventas, producto.idProducto).reduce((total, item) => total + item.cantidad, 0)
  return {
    ...producto,
    vendidos,
    precioTexto: formatearPesosProducto(producto.precio),
    precioFinalTexto: formatearPesosProducto(calcularPrecioFinalProducto(producto.precio, producto.descuento)),
  }
}
