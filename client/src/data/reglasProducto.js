export const estadoInicialProducto = {
  nombre: '',
  description: '',
  categoria: 'FIGURITAS',
  seleccion: 'NINGUNA',
  stock: 0,
  precio: '',
  descuento: 0,
}

export const MAXIMO_CARACTERES_NOMBRE_PRODUCTO = 25

export const formatearPesos = (monto) => `$${Number(monto || 0).toLocaleString('es-AR')}`

export const calcularPrecioFinal = (precio, descuento) =>
  Math.round(Number(precio || 0) * (1 - Number(descuento || 0) / 100))

export const formatearEtiquetaCategoria = (categoria = '') =>
  categoria
    .toString()
    .toLowerCase()
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (letra) => letra.toUpperCase())

export const normalizarCategorias = (categorias) =>
  (Array.isArray(categorias) ? categorias : []).map((categoria) => ({
    valor: categoria,
    etiqueta: formatearEtiquetaCategoria(categoria),
  }))

export const normalizarSelecciones = normalizarCategorias

export const obtenerErroresProducto = (producto, categorias = [], selecciones = []) => {
  const precio = Number(producto.precio)
  const stock = Number(producto.stock)
  const descuento = Number(producto.descuento)
  const valoresCategorias = categorias.map((categoria) => categoria.valor)
  const valoresSelecciones = selecciones.map((seleccion) => seleccion.valor)

  return {
    nombre: !producto.nombre.trim()
      ? 'El nombre es obligatorio.'
      : producto.nombre.trim().length > MAXIMO_CARACTERES_NOMBRE_PRODUCTO
        ? `El nombre no puede superar ${MAXIMO_CARACTERES_NOMBRE_PRODUCTO} caracteres.`
        : '',
    description: producto.description.trim() ? '' : 'La descripcion es obligatoria.',
    categoria: valoresCategorias.includes(producto.categoria)
      ? ''
      : 'Selecciona una categoria valida.',
    seleccion: valoresSelecciones.includes(producto.seleccion)
      ? ''
      : 'Selecciona una seleccion valida.',
    stock:
      producto.stock !== '' && !Number.isNaN(stock) && stock >= 0
        ? ''
        : 'El stock debe ser 0 o mayor.',
    precio:
      producto.precio !== '' && !Number.isNaN(precio) && precio > 0
        ? ''
        : 'El precio debe ser mayor a 0.',
    descuento:
      producto.descuento !== '' && !Number.isNaN(descuento) && descuento >= 0 && descuento <= 100
        ? ''
        : 'El descuento debe estar entre 0 y 100.',
  }
}

export const obtenerErrorNumeroProducto = (valor, tipo) => {
  if (valor === '' || Number.isNaN(Number(valor))) return 'Este campo es obligatorio.'
  if (Number(valor) < 0) return 'El valor no puede ser negativo.'
  if (tipo === 'descuento' && Number(valor) > 100) {
    return 'El descuento no puede superar el 100%.'
  }

  return ''
}

export const obtenerEstadoProducto = (producto) => {
  if (!producto.activo) return 'INACTIVO'
  if (producto.stock === 0) return 'SIN STOCK'
  if (producto.stock <= 5) return 'STOCK BAJO'
  return 'ACTIVO'
}

export const obtenerPrimerValor = (valores) => Array.from(valores)[0]
