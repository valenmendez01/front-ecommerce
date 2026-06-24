export const MAXIMO_STOCK_PRODUCTO = 99999
export const MAXIMO_PRECIO_PRODUCTO = 99999999
export const MAXIMO_DESCUENTO_PRODUCTO = 100

export const normalizarEntradaNumerica = (valor, maximo, valorAnterior = '') => {
  const digitos = String(valor ?? '')
  if (!/^\d*$/.test(digitos)) return String(valorAnterior)
  if (!digitos) return ''

  const sinCerosIniciales = digitos.replace(/^0+(?=\d)/, '')
  return String(Math.min(Number(sinCerosIniciales), maximo))
}

export const obtenerErrorStockProducto = (valor) => {
  const stock = Number(valor)
  if (valor === '' || Number.isNaN(stock) || stock < 0) return 'El stock debe ser 0 o mayor.'
  if (!Number.isInteger(stock)) return 'El stock debe ser un numero entero.'
  if (stock > MAXIMO_STOCK_PRODUCTO) return `El stock no puede superar ${MAXIMO_STOCK_PRODUCTO} unidades.`
  return ''
}

export const obtenerErrorPrecioProducto = (valor) => {
  const precio = Number(valor)
  if (valor === '' || Number.isNaN(precio) || precio <= 0) return 'El precio debe ser mayor a 0.'
  if (precio > MAXIMO_PRECIO_PRODUCTO) return `El precio no puede superar $${MAXIMO_PRECIO_PRODUCTO}.`
  return ''
}

export const obtenerErrorDescuentoProducto = (valor) => {
  const descuento = Number(valor)
  return valor !== '' && !Number.isNaN(descuento) && descuento >= 0 && descuento <= MAXIMO_DESCUENTO_PRODUCTO
    ? ''
    : `El descuento debe estar entre 0 y ${MAXIMO_DESCUENTO_PRODUCTO}.`
}
