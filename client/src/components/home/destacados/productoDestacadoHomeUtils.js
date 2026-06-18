import sinImagen from "../../../assets/sinImagen.png"

const etiquetasCategoria = { COCA_COLA: "Coca-Cola", EXTRA_STICKERS: "Extra Stickers" }

const obtenerTipoImagen = (contenido = "") => {
  if (contenido.startsWith("iVBORw0KGgo")) return "image/png"
  if (contenido.startsWith("UklGR")) return "image/webp"
  return "image/jpeg"
}

export const obtenerImagenProducto = (producto) => {
  const contenido = producto.imagenes?.[0]?.contenidoBase64
  return contenido ? `data:${obtenerTipoImagen(contenido)};base64,${contenido}` : sinImagen
}

export const formatearPesos = (precio = 0) =>
  new Intl.NumberFormat("es-AR", { currency: "ARS", style: "currency" }).format(precio)

export const formatearCategoria = (categoria = "") => etiquetasCategoria[categoria] || categoria
export const obtenerDescuento = (producto) => Number(producto.descuento || 0)
export const obtenerPrecioFinal = (producto) =>
  Number(producto.precio || 0) * (1 - obtenerDescuento(producto) / 100)
