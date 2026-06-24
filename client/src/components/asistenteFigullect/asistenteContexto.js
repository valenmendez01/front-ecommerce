import { formatearValorCatalogo } from './asistenteTexto'

const obtenerSeleccionArticulo = (articulo) =>
  articulo?.seleccion || articulo?.nombreSeleccion || articulo?.producto?.seleccion || null

const resumirProducto = (producto) => ({
  id: producto.idProducto,
  nombre: producto.nombre,
  categoria: producto.categoria,
  seleccion: producto.seleccion,
  precio: producto.precio,
  stock: producto.stock,
  descuento: producto.descuento,
})

const resumirArticuloCarrito = (articulo) => ({
  id: articulo.idProducto || articulo.id,
  nombre: articulo.nombre,
  categoria: articulo.categoria || articulo.subtitulo,
  seleccion: obtenerSeleccionArticulo(articulo),
  cantidad: articulo.cantidad,
  precio: articulo.precio,
})

const resumirMensaje = (mensaje) => ({
  autor: mensaje.autor,
  texto: mensaje.texto,
  acciones: (mensaje.acciones || []).map(({ texto, tipo, filtro, ruta, flujo }) => ({
    texto,
    tipo,
    filtro,
    ruta,
    flujo,
  })),
})

export const crearContextoAsistente = ({
  productos,
  categorias,
  selecciones,
  usuario,
  carrito,
  filtros,
  mensajes = [],
}) => ({
  ubicacion: 'catalogo',
  usuarioLogueado: Boolean(usuario),
  rol: usuario?.rol || 'VISITANTE',
  filtrosActuales: filtros,
  categoriasDisponibles: categorias,
  seleccionesDisponibles: selecciones.map(formatearValorCatalogo),
  productosVisibles: productos.slice(0, 12).map(resumirProducto),
  carrito: carrito.slice(0, 12).map(resumirArticuloCarrito),
  historialConversacion: mensajes
    .filter((mensaje) => mensaje.id !== 'asistente-inicio')
    .slice(-6)
    .map(resumirMensaje),
})
