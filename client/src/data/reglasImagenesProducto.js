export const MINIMO_IMAGENES_PRODUCTO = 1
export const MAXIMO_IMAGENES_PRODUCTO = 5

export const obtenerErrorCantidadImagenesProducto = (cantidadImagenes) => {
  if (cantidadImagenes < MINIMO_IMAGENES_PRODUCTO) {
    return `Carga al menos ${MINIMO_IMAGENES_PRODUCTO} imagen para el producto.`
  }

  if (cantidadImagenes > MAXIMO_IMAGENES_PRODUCTO) {
    return `Podes cargar como maximo ${MAXIMO_IMAGENES_PRODUCTO} imagenes por producto.`
  }

  return ''
}
