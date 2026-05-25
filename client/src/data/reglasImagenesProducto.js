export const MINIMO_IMAGENES_PRODUCTO = 1
export const MAXIMO_IMAGENES_PRODUCTO = 5

export const obtenerErrorCantidadImagenesProducto = (cantidadImagenes) => {
  if (cantidadImagenes < MINIMO_IMAGENES_PRODUCTO) {
    return `Cargá al menos ${MINIMO_IMAGENES_PRODUCTO} imágen para el producto.`
  }

  if (cantidadImagenes > MAXIMO_IMAGENES_PRODUCTO) {
    return `Podés cargar como máximo ${MAXIMO_IMAGENES_PRODUCTO} imágenes por producto.`
  }

  return ''
}
