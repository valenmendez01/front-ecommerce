export const MAXIMO_CARACTERES_NOMBRE_PRODUCTO = 25
export const MAXIMO_STOCK_PRODUCTO = 10000
export const MINIMO_IMAGENES_PRODUCTO = 1
export const MAXIMO_IMAGENES_PRODUCTO = 5
export const MAXIMO_TAMANIO_IMAGEN_MB = 5
const MAXIMO_TAMANIO_IMAGEN_BYTES = MAXIMO_TAMANIO_IMAGEN_MB * 1024 * 1024

export const estadoInicialProducto = {
  nombre: '',
  description: '',
  categoria: 'FIGURITAS',
  seleccion: 'NINGUNA',
  stock: 0,
  precio: '',
  descuento: 0,
  destacado: false,
}

export const formatearPesos = (monto) => `$${Number(monto || 0).toLocaleString('es-AR')}`

export const calcularPrecioFinal = (precio, descuento) =>
  Math.round(Number(precio || 0) * (1 - Number(descuento || 0) / 100))

const formatearEtiquetaCategoria = (categoria = '') =>
  categoria
    .toString()
    .toLowerCase()
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (letra) => letra.toUpperCase())

export const normalizarOpciones = (opciones) =>
  (Array.isArray(opciones) ? opciones : []).map((opcion) => ({
    valor: opcion,
    etiqueta: formatearEtiquetaCategoria(opcion),
  }))

const obtenerErrorStockProducto = (valor) => {
  const stock = Number(valor)
  if (valor === '' || Number.isNaN(stock) || stock < 0) return 'El stock debe ser 0 o mayor.'
  if (!Number.isInteger(stock)) return 'El stock debe ser un numero entero.'
  if (stock > MAXIMO_STOCK_PRODUCTO) return `El stock no puede superar ${MAXIMO_STOCK_PRODUCTO} unidades.`
  return ''
}

export const obtenerErroresProducto = (producto, categorias = [], selecciones = []) => {
  const precio = Number(producto.precio)
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
    categoria: valoresCategorias.includes(producto.categoria) ? '' : 'Selecciona una categoria valida.',
    seleccion: valoresSelecciones.includes(producto.seleccion) ? '' : 'Selecciona una seleccion valida.',
    stock: obtenerErrorStockProducto(producto.stock),
    precio: producto.precio !== '' && !Number.isNaN(precio) && precio > 0 ? '' : 'El precio debe ser mayor a 0.',
    descuento:
      producto.descuento !== '' && !Number.isNaN(descuento) && descuento >= 0 && descuento <= 100
        ? ''
        : 'El descuento debe estar entre 0 y 100.',
  }
}

export const obtenerErrorCantidadImagenesProducto = (cantidadImagenes) => {
  if (cantidadImagenes < MINIMO_IMAGENES_PRODUCTO) {
    return `Carga al menos ${MINIMO_IMAGENES_PRODUCTO} imagen para el producto.`
  }
  if (cantidadImagenes > MAXIMO_IMAGENES_PRODUCTO) {
    return `Podes cargar como maximo ${MAXIMO_IMAGENES_PRODUCTO} imagenes por producto.`
  }
  return ''
}

export const obtenerErrorTamanioImagenesProducto = (archivos) => {
  const imagenes = Array.from(archivos || [])
  const imagenPesada = imagenes.find((archivo) => archivo.size > MAXIMO_TAMANIO_IMAGEN_BYTES)
  if (!imagenPesada) return ''

  return `La imagen "${imagenPesada.name}" supera el maximo de ${MAXIMO_TAMANIO_IMAGEN_MB}MB.`
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

export const obtenerMensajeRespuesta = (json, mensaje) => json?.mensaje || json?.message || mensaje
