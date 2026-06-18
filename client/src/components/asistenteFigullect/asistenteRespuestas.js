import { ACCIONES_COMPLETAR_SIN_CARRITO, ACCIONES_INICIO_COLECCION, ACCIONES_RAPIDAS_ASISTENTE, TEXTO_SELECCIONES_DISPONIBLES } from './asistenteConfig.jsx'
import { analizarColeccionCarrito, carritoTieneCategoria } from './asistenteCarrito'
import { crearAccionFiltro, resolverSeleccionAsistente } from './asistenteFiltros'

const crearRespuesta = (texto, acciones = [], extra = {}) => ({ texto, acciones, ...extra })

const accionesParaAlbumEnCarrito = [
  crearAccionFiltro({ texto: 'Mostrar sobres', categoria: 'SOBRES' }),
  crearAccionFiltro({ texto: 'Mostrar figuritas individuales', categoria: 'FIGURITAS' }),
]

const crearAccionesRecomendaciones = (recomendaciones) =>
  recomendaciones.slice(0, 3).map((recomendacion) =>
    crearAccionFiltro({ texto: `Ver productos de ${recomendacion.etiqueta}`, seleccion: recomendacion.valor }),
  )

const formatearCantidadProductos = (cantidad) => `${cantidad} ${cantidad === 1 ? 'producto' : 'productos'}`

const formatearProductosDetectados = (productos = []) => {
  const destacados = productos.slice(0, 2)
  if (destacados.length === 0) return ''
  return destacados.length === 1 ? `, por ${destacados[0]}` : `, por ${destacados.join(' y ')}`
}

const crearRespuestaConRecomendaciones = (recomendaciones) => {
  const [principal, ...alternativas] = recomendaciones
  const detalle = `${formatearCantidadProductos(principal.cantidadTotal)} de ${principal.etiqueta}${formatearProductosDetectados(principal.productos)}`
  const extra = alternativas.length > 0
    ? ` También detecté ${alternativas.slice(0, 2).map((item) => item.etiqueta).join(' y ')} como otra opción para seguir.`
    : ''

  return crearRespuesta(
    `Veo que tu carrito apunta más fuerte a ${principal.etiqueta}: tenés ${detalle}. Te puedo mostrar más productos de esa selección para seguir completando tu colección.${extra}`,
    crearAccionesRecomendaciones(recomendaciones),
  )
}

export const crearRespuestaSeleccionAsistente = (consulta, selecciones) => {
  const seleccion = resolverSeleccionAsistente(consulta, selecciones)
  if (!seleccion) {
    return crearRespuesta(`Por ahora no tenemos figuritas de ${consulta}. Las selecciones disponibles son: ${TEXTO_SELECCIONES_DISPONIBLES}.`)
  }

  return crearRespuesta(
    `Perfecto, tenemos productos de ${seleccion.etiqueta} disponibles. Podés aplicar el filtro para ver figuritas y productos relacionados con esa selección.`,
    [crearAccionFiltro({ texto: `Ver productos de ${seleccion.etiqueta}`, seleccion: seleccion.valor })],
    { flujoActivo: null },
  )
}

export const crearRespuestaCompletarColeccion = ({ carrito, selecciones, productosReferencia }) => {
  if (carrito.length === 0) {
    return crearRespuesta('Para completar tu colección, primero conviene elegir una selección o una categoría. ¿Querés buscar por selección?', ACCIONES_COMPLETAR_SIN_CARRITO)
  }

  const recomendaciones = analizarColeccionCarrito(carrito, selecciones, productosReferencia)
  if (recomendaciones.length > 0) return crearRespuestaConRecomendaciones(recomendaciones)

  if (carritoTieneCategoria(carrito, 'album')) {
    return crearRespuesta('Si ya tenés un álbum, una buena opción es sumar sobres o figuritas individuales para avanzar con la colección.', accionesParaAlbumEnCarrito)
  }

  return crearRespuesta(
    'Veo que ya tenés productos en el carrito. Puedo ayudarte a encontrar artículos relacionados para seguir completando tu colección.',
    ACCIONES_COMPLETAR_SIN_CARRITO,
  )
}

export const obtenerTextoAccionRapida = (id) =>
  ACCIONES_RAPIDAS_ASISTENTE.find((accion) => accion.id === id)?.texto || ''

export const crearRespuestaRapidaAsistente = ({ id, usuario, carrito, selecciones, productosReferencia }) => {
  if (id === 'buscar-seleccion') return crearRespuesta('¿De qué selección te gustaría ver figuritas?', [], { flujoActivo: 'seleccion' })
  if (id === 'empezar') return crearRespuesta('Si estás empezando tu colección, te conviene arrancar con un álbum y algunos sobres. Después podés completar los espacios faltantes con figuritas individuales.', ACCIONES_INICIO_COLECCION)
  if (id === 'elegir') return crearRespuesta('Te ayudo a elegir. Podés contarme si querés empezar una colección, completar una selección, buscar algo premium o encontrar una opción más económica.')
  if (id === 'completar') return crearRespuestaCompletarColeccion({ carrito, selecciones, productosReferencia })

  if (id === 'carrito') {
    return crearRespuesta('En el carrito podés revisar los productos que agregaste, modificar cantidades, eliminar ítems y ver el total antes de finalizar la compra. Para comprar, necesitás iniciar sesión y avanzar al checkout.', [
      { texto: 'Ir al carrito', tipo: 'navegar', ruta: '/carrito' },
    ])
  }

  if (id === 'pedidos' && usuario) {
    return crearRespuesta('Podés ver tus pedidos desde la sección Mi cuenta. Ahí se muestra el historial de compras, el detalle de cada pedido y el total abonado.', [
      { texto: 'Ir a Mi cuenta', tipo: 'navegar', ruta: '/mi-cuenta' },
    ])
  }

  if (id === 'pedidos') {
    return crearRespuesta('Para ver tus pedidos necesitás iniciar sesión. Después vas a poder entrar a Mi cuenta y revisar tu historial de compras.', [
      { texto: 'Iniciar sesión', tipo: 'navegar', ruta: '/iniciar-sesion' },
    ])
  }

  return null
}
