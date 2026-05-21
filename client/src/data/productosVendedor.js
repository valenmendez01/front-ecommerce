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

const obtenerTipoImagen = (contenido) => {
  if (contenido?.startsWith('/9j/')) return 'image/jpeg'
  if (contenido?.startsWith('iVBORw0KGgo')) return 'image/png'
  if (contenido?.startsWith('UklGR')) return 'image/webp'
  return 'image/jpeg'
}

const obtenerImagen = (producto) => {
  const contenido = producto.imagenes?.find(Boolean)?.contenidoBase64
  return contenido ? `data:${obtenerTipoImagen(contenido)};base64,${contenido}` : ''
}

export const obtenerProductosPagina = (data) => {
  if (Array.isArray(data)) return data
  return data?.content || []
}

export const crearDatosProducto = (producto) => ({
  nombre: producto.nombre.trim(),
  description: producto.description.trim(),
  categoria: producto.categoria,
  stock: Number(producto.stock),
  precio: Number(producto.precio),
  descuento: Number(producto.descuento),
  activo: producto.activo ?? true,
})

export const normalizarProductoVendedor = (producto) => ({
  ...producto,
  nombre: producto.nombre || '',
  description: producto.description || '',
  imagen: crearIniciales(producto.nombre),
  imagenUrl: obtenerImagen(producto),
  precio: Number(producto.precio || 0),
  stock: Number(producto.stock || 0),
  descuento: Number(producto.descuento || 0),
  activo: producto.activo ?? true,
})
