export const obtenerImagenProducto = (producto) => {
  if (producto.imagen) return producto.imagen
  if (producto.imagenUrl) return producto.imagenUrl

  const contenidoBase64 = producto.imagenes?.find(Boolean)?.contenidoBase64
  return contenidoBase64 ? `data:image/jpeg;base64,${contenidoBase64}` : ''
}

const obtenerIdProducto = (producto) =>
  producto.idProducto ?? producto.id ?? producto.idCombo ?? producto.idAlbum

const obtenerStockProducto = (producto) =>
  producto.stock == null ? undefined : Number(producto.stock)

const obtenerSeleccionProducto = (producto) =>
  producto.seleccion || producto.nombreSeleccion || producto.producto?.seleccion || null

const formatearCategoriaProducto = (categoria = '') => {
  const categorias = {
    ALBUMES: 'Albumes',
    COCA_COLA: 'Coca Cola',
    COMBOS: 'Combos',
    EXTRA_STICKERS: 'Extra Stickers',
    FIGURITAS: 'Figuritas',
  }

  return categorias[categoria] || categoria
}

const normalizarArticulo = (articulo) => ({
  ...articulo,
  id: obtenerIdProducto(articulo),
  idProducto: obtenerIdProducto(articulo),
  cantidad: Math.max(1, Number(articulo.cantidad || 1)),
  precio: Number(articulo.precio || 0),
  precioOriginal: articulo.precioOriginal == null ? null : Number(articulo.precioOriginal),
  descuento: Number(articulo.descuento || 0),
  stock: obtenerStockProducto(articulo),
  subtitulo: formatearCategoriaProducto(articulo.subtitulo),
  seleccion: obtenerSeleccionProducto(articulo),
})

export const agregarProductoAlCarrito = (articulos, producto, cantidad = 1) => {
  const precioBase = Number(producto.precio || 0)
  const descuento = Number(producto.descuento || 0)
  const precioFinal = Math.round(precioBase * (1 - descuento / 100))
  const stock = obtenerStockProducto(producto)
  const idProducto = obtenerIdProducto(producto)

  if ((stock !== undefined && stock <= 0) || idProducto == null) {
    return articulos
  }

  const articulosNormalizados = articulos.map(normalizarArticulo)
  const articuloExistente = articulosNormalizados.find(
    (articulo) => articulo.idProducto === idProducto,
  )
  const cantidadPedida = Math.max(1, Number(cantidad || 1))

  const articuloProducto = {
    id: idProducto,
    idProducto,
    nombre: producto.nombre,
    precio: precioFinal,
    precioOriginal: descuento > 0 ? precioBase : null,
    descuento,
    cantidad: stock === undefined ? cantidadPedida : Math.min(cantidadPedida, stock),
    stock,
    subtitulo: formatearCategoriaProducto(producto.categoria),
    seleccion: obtenerSeleccionProducto(producto),
    imagen: obtenerImagenProducto(producto),
  }

  const articulosActualizados = articuloExistente
    ? articulosNormalizados.map((articulo) =>
        articulo.idProducto === idProducto
          ? {
              ...articulo,
              imagen: articulo.imagen || articuloProducto.imagen,
              precio: articuloProducto.precio,
              precioOriginal: articuloProducto.precioOriginal,
              descuento,
              stock,
              seleccion: articulo.seleccion || articuloProducto.seleccion,
              cantidad:
                stock === undefined
                  ? articulo.cantidad + articuloProducto.cantidad
                  : Math.min(articulo.cantidad + articuloProducto.cantidad, stock),
            }
          : articulo,
      )
    : [...articulosNormalizados, articuloProducto]

  return articulosActualizados
}

export const calcularResumenCarrito = (articulos, envio = 0) => {
  const subtotalOriginal = articulos.reduce((total, articulo) => {
    const precioBase = articulo.precioOriginal || articulo.precio
    return total + precioBase * articulo.cantidad
  }, 0)

  const subtotal = articulos.reduce(
    (total, articulo) => total + articulo.precio * articulo.cantidad,
    0,
  )

  const descuento = Math.max(subtotalOriginal - subtotal, 0)
  const costoEnvio = envio == null ? null : Number(envio || 0)

  return {
    descuento,
    envio: costoEnvio,
    subtotal,
    subtotalOriginal,
    total: subtotal + Number(costoEnvio || 0),
  }
}
