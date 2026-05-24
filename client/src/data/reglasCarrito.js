const CARRITO_STORAGE_KEY = 'figullect_carrito'

const obtenerClaveCarrito = (idUsuario) =>
  idUsuario ? `${CARRITO_STORAGE_KEY}_${idUsuario}` : CARRITO_STORAGE_KEY

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

const leerCarrito = (idUsuario) => {
  try {
    const articulos = JSON.parse(localStorage.getItem(obtenerClaveCarrito(idUsuario)) || '[]')
    return Array.isArray(articulos) ? articulos.map(normalizarArticulo) : []
  } catch {
    return []
  }
}

const guardarCarrito = (articulos, idUsuario) => {
  localStorage.setItem(obtenerClaveCarrito(idUsuario), JSON.stringify(articulos.map(normalizarArticulo)))
}

export const obtenerArticulosCarrito = (idUsuario) => leerCarrito(idUsuario)

export const reemplazarArticulosCarrito = (articulos, idUsuario) => {
  guardarCarrito(articulos, idUsuario)
  return obtenerArticulosCarrito(idUsuario)
}

export const vaciarCarrito = (idUsuario) => {
  if (idUsuario) {
    localStorage.removeItem(obtenerClaveCarrito(idUsuario))
    return
  }

  Object.keys(localStorage)
    .filter((clave) => clave === CARRITO_STORAGE_KEY || clave.startsWith(`${CARRITO_STORAGE_KEY}_`))
    .forEach((clave) => localStorage.removeItem(clave))
}

export const agregarProductoAlCarrito = (producto, cantidad = 1, idUsuario) => {
  const precioBase = Number(producto.precio || 0)
  const descuento = Number(producto.descuento || 0)
  const precioFinal = Math.round(precioBase * (1 - descuento / 100))
  const stock = obtenerStockProducto(producto)

  if (stock !== undefined && stock <= 0) {
    return obtenerArticulosCarrito(idUsuario)
  }

  const articulos = leerCarrito(idUsuario)
  const idProducto = obtenerIdProducto(producto)

  if (idProducto == null) {
    return obtenerArticulosCarrito(idUsuario)
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

  guardarCarrito(articulosActualizados, idUsuario)
  return obtenerArticulosCarrito(idUsuario)
}
