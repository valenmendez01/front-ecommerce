const CARRITO_STORAGE_KEY = 'figullect_carrito'

export const obtenerImagenProducto = (producto) => {
  if (producto.imagen) return producto.imagen
  if (producto.imagenUrl) return producto.imagenUrl

  const contenidoBase64 = producto.imagenes?.find(Boolean)?.contenidoBase64

  if (!contenidoBase64) {
    return ''
  }

  return `data:image/jpeg;base64,${contenidoBase64}`
}

const obtenerIdProducto = (producto) =>
  producto.idProducto ?? producto.id ?? producto.idCombo ?? producto.idAlbum

const obtenerStockProducto = (producto) =>
  producto.stock == null ? undefined : Number(producto.stock)

const normalizarArticulo = (articulo) => ({
  ...articulo,
  id: obtenerIdProducto(articulo),
  idProducto: obtenerIdProducto(articulo),
  cantidad: Math.max(1, Number(articulo.cantidad || 1)),
  precio: Number(articulo.precio || 0),
  stock: obtenerStockProducto(articulo),
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
  const stock = obtenerStockProducto(producto)

  if (stock !== undefined && stock <= 0) {
    return obtenerArticulosCarrito()
  }

  const articulos = leerCarrito()
  const idProducto = obtenerIdProducto(producto)

  if (idProducto == null) {
    return obtenerArticulosCarrito()
  }

  const articuloExistente = articulos.find((articulo) => articulo.idProducto === idProducto)
  const cantidadPedida = Math.max(1, Number(cantidad || 1))

  const articuloProducto = {
    id: idProducto,
    idProducto,
    nombre: producto.nombre,
    precio: precioFinal,
    precioOriginal: descuento > 0 ? precioBase : null,
    cantidad: stock === undefined ? cantidadPedida : Math.min(cantidadPedida, stock),
    stock,
    subtitulo: producto.categoria,
    imagen: obtenerImagenProducto(producto),
  }

  const articulosActualizados = articuloExistente
    ? articulos.map((articulo) =>
        articulo.idProducto === idProducto
          ? {
              ...articulo,
              imagen: articulo.imagen || articuloProducto.imagen,
              stock,
              cantidad:
                stock === undefined
                  ? articulo.cantidad + articuloProducto.cantidad
                  : Math.min(articulo.cantidad + articuloProducto.cantidad, stock),
            }
          : articulo,
      )
    : [...articulos, articuloProducto]

  guardarCarrito(articulosActualizados)
  return obtenerArticulosCarrito()
}
