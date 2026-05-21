const CARRITO_STORAGE_KEY = 'figullect_carrito'

const obtenerMimeImagen = (contenidoBase64) => {
  if (contenidoBase64?.startsWith('/9j/')) return 'image/jpeg'
  if (contenidoBase64?.startsWith('iVBORw0KGgo')) return 'image/png'
  if (contenidoBase64?.startsWith('UklGR')) return 'image/webp'
  return 'image/jpeg'
}

const obtenerImagenProducto = (producto) => {
  const contenidoBase64 = producto.imagenes?.find(Boolean)?.contenidoBase64

  if (!contenidoBase64) {
    return ''
  }

  return `data:${obtenerMimeImagen(contenidoBase64)};base64,${contenidoBase64}`
}

const normalizarArticulo = (articulo) => ({
  ...articulo,
  id: articulo.idProducto || articulo.id,
  idProducto: articulo.idProducto || articulo.id,
  cantidad: Math.max(1, Number(articulo.cantidad || 1)),
  precio: Number(articulo.precio || 0),
  stock: articulo.stock == null ? undefined : Number(articulo.stock),
})

const leerCarrito = () => {
  try {
    const articulos = JSON.parse(localStorage.getItem(CARRITO_STORAGE_KEY) || '[]')
    return Array.isArray(articulos) ? articulos.map(normalizarArticulo) : []
  } catch {
    return []
  }
}

const guardarCarrito = (articulos) => {
  localStorage.setItem(CARRITO_STORAGE_KEY, JSON.stringify(articulos.map(normalizarArticulo)))
}

export const obtenerArticulosCarrito = () => leerCarrito()

export const reemplazarArticulosCarrito = (articulos) => {
  guardarCarrito(articulos)
  return obtenerArticulosCarrito()
}

export const vaciarCarrito = () => {
  localStorage.removeItem(CARRITO_STORAGE_KEY)
}

export const agregarProductoAlCarrito = (producto, cantidad = 1) => {
  const precioBase = Number(producto.precio || 0)
  const descuento = Number(producto.descuento || 0)
  const precioFinal = Math.round(precioBase * (1 - descuento / 100))
  const stock = Number(producto.stock || 0)

  if (stock <= 0) {
    return obtenerArticulosCarrito()
  }

  const articulos = leerCarrito()
  const idProducto = producto.idProducto || producto.id
  const articuloExistente = articulos.find((articulo) => articulo.idProducto === idProducto)
  const cantidadPedida = Math.max(1, Number(cantidad || 1))

  const articuloProducto = {
    id: idProducto,
    idProducto,
    nombre: producto.nombre,
    precio: precioFinal,
    precioOriginal: descuento > 0 ? precioBase : null,
    cantidad: Math.min(cantidadPedida, stock),
    stock,
    subtitulo: producto.categoria,
    imagen: obtenerImagenProducto(producto),
  }

  const articulosActualizados = articuloExistente
    ? articulos.map((articulo) =>
        articulo.idProducto === idProducto
          ? { ...articulo, stock, cantidad: Math.min(articulo.cantidad + articuloProducto.cantidad, stock) }
          : articulo,
      )
    : [...articulos, articuloProducto]

  guardarCarrito(articulosActualizados)
  return obtenerArticulosCarrito()
}
