export const formatearPesosProducto = (monto) =>
  `$${Number(monto || 0).toLocaleString('es-AR')}`

export const calcularPrecioFinalProducto = (precio, descuento) =>
  Math.round(Number(precio || 0) * (1 - Number(descuento || 0) / 100))

export const formatearEtiquetaCategoriaProducto = (categoria = '') =>
  categoria
    .toString()
    .toLowerCase()
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (letra) => letra.toUpperCase())

export const normalizarCategoriasProducto = (categorias) =>
  (Array.isArray(categorias) ? categorias : []).map((categoria) => ({
    valor: categoria,
    etiqueta: formatearEtiquetaCategoriaProducto(categoria),
  }))

export const obtenerPrimerValorProducto = (valores) => Array.from(valores)[0]

export const MAXIMO_STOCK_PRODUCTO = 10000

export const obtenerErrorNumeroProductoVendedor = (valor, tipo) => {
  const numero = Number(valor)
  const debeSerEntero = ['stock', 'descuento'].includes(tipo)

  if (valor === '' || Number.isNaN(numero)) return 'Este campo es obligatorio.'
  if (numero < 0) return 'El valor no puede ser negativo.'
  if (debeSerEntero && !Number.isInteger(numero)) return 'El valor debe ser un numero entero.'
  if (tipo === 'stock' && numero > MAXIMO_STOCK_PRODUCTO) return `El stock no puede superar ${MAXIMO_STOCK_PRODUCTO} unidades.`
  if (tipo === 'descuento' && numero > 100) return 'El descuento no puede superar el 100%.'

  return ''
}

export const obtenerEstadoProductoVendedor = (producto) => {
  if (!producto.activo) return 'INACTIVO'
  if (producto.stock === 0) return 'SIN STOCK'
  if (producto.stock <= 5) return 'STOCK BAJO'
  return 'ACTIVO'
}
