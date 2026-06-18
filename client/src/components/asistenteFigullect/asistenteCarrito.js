import { resolverSeleccionAsistente } from './asistenteFiltros'
import { normalizarTextoAsistente } from './asistenteTexto'

const obtenerSeleccionArticulo = (articulo) =>
  articulo?.seleccion || articulo?.nombreSeleccion || articulo?.producto?.seleccion || null

const coincideArticuloConProducto = (articulo, producto) => {
  const idArticulo = articulo?.idProducto || articulo?.id
  const idProducto = producto?.idProducto || producto?.id
  if (idArticulo && idProducto && String(idArticulo) === String(idProducto)) return true

  const nombreArticulo = normalizarTextoAsistente(articulo?.nombre)
  const nombreProducto = normalizarTextoAsistente(producto?.nombre)
  return Boolean(nombreArticulo && nombreProducto && nombreArticulo === nombreProducto)
}

const resolverSeleccionArticuloCarrito = (articulo, seleccionesCatalogo, productosReferencia = []) => {
  const seleccionDirecta = resolverSeleccionAsistente(obtenerSeleccionArticulo(articulo), seleccionesCatalogo)
  if (seleccionDirecta) return seleccionDirecta

  const productoRelacionado = productosReferencia.find((producto) => coincideArticuloConProducto(articulo, producto))
  return resolverSeleccionAsistente(productoRelacionado?.seleccion, seleccionesCatalogo)
}

const agregarProductoAnalizado = (grupo, articulo) => {
  if (articulo?.nombre && !grupo.productos.includes(articulo.nombre)) grupo.productos.push(articulo.nombre)
}

export const analizarColeccionCarrito = (carrito, seleccionesCatalogo, productosReferencia = []) => {
  const grupos = new Map()

  carrito.forEach((articulo, indice) => {
    const seleccion = resolverSeleccionArticuloCarrito(articulo, seleccionesCatalogo, productosReferencia)
    if (!seleccion) return

    const grupo = grupos.get(seleccion.valor) || {
      ...seleccion,
      cantidadTotal: 0,
      articulos: 0,
      primerIndice: indice,
      productos: [],
    }

    grupo.cantidadTotal += Math.max(1, Number(articulo?.cantidad || 1))
    grupo.articulos += 1
    agregarProductoAnalizado(grupo, articulo)
    grupos.set(seleccion.valor, grupo)
  })

  return [...grupos.values()].sort((grupoA, grupoB) =>
    grupoB.cantidadTotal - grupoA.cantidadTotal ||
    grupoB.articulos - grupoA.articulos ||
    grupoA.primerIndice - grupoB.primerIndice
  )
}

export const detectarSeleccionEnCarrito = (carrito, seleccionesCatalogo, productosReferencia = []) => {
  const seleccion = analizarColeccionCarrito(carrito, seleccionesCatalogo, productosReferencia)[0]
  return seleccion ? { ...seleccion, productoNombre: carrito[0]?.nombre || '' } : null
}

export const carritoTieneCategoria = (carrito, categoriaBuscada) => {
  const categoriaNormalizada = normalizarTextoAsistente(categoriaBuscada)
  return carrito.some((articulo) =>
    normalizarTextoAsistente(articulo.categoria || articulo.subtitulo || '').includes(categoriaNormalizada),
  )
}
