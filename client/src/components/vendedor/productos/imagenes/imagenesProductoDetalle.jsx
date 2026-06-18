export const MINIMO_IMAGENES_PRODUCTO = 1
export const MAXIMO_IMAGENES_PRODUCTO = 5
export const MAXIMO_TAMANIO_IMAGEN_MB = 5
const MAXIMO_TAMANIO_IMAGEN_BYTES = MAXIMO_TAMANIO_IMAGEN_MB * 1024 * 1024

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

export const crearImagenesLocales = (archivos, cantidadActual) =>
  Array.from(archivos || []).map((archivo, indice) => ({
    archivo,
    id: `${archivo.name}-${archivo.lastModified}-${archivo.size}-${cantidadActual + indice}`,
    nombre: archivo.name,
    url: URL.createObjectURL(archivo),
  }))

export const quitarImagenLocal = (imagenes, idImagen) => {
  const imagenEliminada = imagenes.find((imagen) => imagen.id === idImagen)
  if (imagenEliminada) URL.revokeObjectURL(imagenEliminada.url)
  return imagenes.filter((imagen) => imagen.id !== idImagen)
}

export const liberarImagenesLocales = (imagenes) => {
  imagenes.forEach((imagen) => URL.revokeObjectURL(imagen.url))
}

const obtenerTipoImagen = (contenido) => {
  if (contenido?.startsWith('/9j/')) return 'image/jpeg'
  if (contenido?.startsWith('iVBORw0KGgo')) return 'image/png'
  if (contenido?.startsWith('UklGR')) return 'image/webp'
  return 'image/jpeg'
}

export const obtenerUrlImagenProducto = (imagen) => {
  const contenido = imagen?.contenidoBase64
  return contenido ? `data:${obtenerTipoImagen(contenido)};base64,${contenido}` : ''
}
