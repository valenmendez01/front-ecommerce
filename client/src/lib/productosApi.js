import { apiRequest } from './api'

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

const obtenerMimeImagen = (contenidoBase64) => {
  if (contenidoBase64?.startsWith('/9j/')) return 'image/jpeg'
  if (contenidoBase64?.startsWith('iVBORw0KGgo')) return 'image/png'
  if (contenidoBase64?.startsWith('UklGR')) return 'image/webp'
  return 'image/jpeg'
}

const obtenerUrlImagenBase64 = (contenidoBase64) => {
  if (!contenidoBase64) {
    return ''
  }

  return `data:${obtenerMimeImagen(contenidoBase64)};base64,${contenidoBase64}`
}

const normalizarImagenProducto = (imagen, indice) => {
  const contenidoBase64 = imagen?.contenidoBase64 || ''
  const tipo = obtenerMimeImagen(contenidoBase64)

  return {
    ...imagen,
    idImagen: imagen?.idImagen,
    nombre: imagen?.url || `Imagen ${indice + 1}`,
    tipo,
    src: obtenerUrlImagenBase64(contenidoBase64),
  }
}

const obtenerImagenProducto = (producto) => {
  const contenidoBase64 = producto.imagenes?.find((imagen) => imagen?.contenidoBase64)?.contenidoBase64

  return obtenerUrlImagenBase64(contenidoBase64)
}

export const normalizarProductoVendedor = (producto) => {
  const imagenes = (producto.imagenes || []).filter(Boolean).map(normalizarImagenProducto)

  return {
    ...producto,
    idProducto: producto.idProducto,
    nombre: producto.nombre || '',
    description: producto.description || '',
    imagen: crearIniciales(producto.nombre),
    imagenes,
    imagenUrl: imagenes.find((imagen) => imagen.src)?.src || obtenerImagenProducto(producto),
    categoria: producto.categoria,
    precio: Number(producto.precio || 0),
    stock: Number(producto.stock || 0),
    descuento: Number(producto.descuento || 0),
    activo: producto.activo ?? true,
  }
}

const obtenerProductosDePagina = (respuesta) => {
  if (Array.isArray(respuesta)) return respuesta
  return respuesta?.content || []
}

const crearProductoRequest = (producto) => ({
  nombre: producto.nombre.trim(),
  description: producto.description.trim(),
  categoria: producto.categoria,
  stock: Number(producto.stock),
  precio: Number(producto.precio),
  descuento: Number(producto.descuento),
  activo: producto.activo ?? true,
})

export const obtenerProductosMios = async () => {
  const respuesta = await apiRequest('/productos/mios')
  return obtenerProductosDePagina(respuesta).map(normalizarProductoVendedor)
}

export const crearProducto = (producto) =>
  apiRequest('/productos', {
    method: 'POST',
    body: crearProductoRequest(producto),
  })

export const obtenerProductoPorId = (idProducto) => apiRequest(`/productos/${idProducto}`)

export const actualizarProducto = async (producto) => {
  const productoActualizado = await apiRequest(`/productos/${producto.idProducto}`, {
    method: 'PUT',
    body: crearProductoRequest(producto),
  })

  return normalizarProductoVendedor(productoActualizado)
}

export const desactivarProducto = (idProducto) =>
  apiRequest(`/productos/${idProducto}/desactivar`, {
    method: 'PUT',
  })

export const subirImagenesProducto = (idProducto, archivos = []) => {
  if (!archivos.length) {
    return Promise.resolve(null)
  }

  const formData = new FormData()
  archivos.forEach((archivo) => {
    formData.append('archivos', archivo)
  })

  return apiRequest(`/productos/${idProducto}/imagenes`, {
    method: 'POST',
    body: formData,
  })
}

export const eliminarImagenProducto = (idProducto, idImagen) =>
  apiRequest(`/productos/${idProducto}/imagenes/${idImagen}`, {
    method: 'DELETE',
  })
