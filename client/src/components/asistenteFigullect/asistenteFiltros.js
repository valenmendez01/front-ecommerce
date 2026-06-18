import { SELECCIONES_DISPONIBLES_ASISTENTE } from './asistenteConfig.jsx'
import { formatearValorCatalogo, normalizarTextoAsistente } from './asistenteTexto'

const CATEGORIAS_ASISTENTE = [
  { valor: 'FIGURITAS', alias: ['figurita', 'figuritas', 'individual', 'individuales'] },
  { valor: 'ALBUMES', alias: ['album', 'albumes', 'álbum', 'álbumes'] },
  { valor: 'SOBRES', alias: ['sobre', 'sobres'] },
  { valor: 'COMBOS', alias: ['combo', 'combos'] },
  { valor: 'COCA_COLA', alias: ['coca cola', 'coca-cola', 'coca'] },
  { valor: 'EXTRA_STICKERS', alias: ['extra stickers', 'extra sticker', 'premium', 'dorado', 'doradas'] },
]

const normalizarLista = (valor) => {
  if (!valor) return []
  return Array.isArray(valor) ? valor : [valor]
}

const resolverValorDesdeCatalogo = (valorDeseado, disponibles = []) => {
  const normalizado = normalizarTextoAsistente(formatearValorCatalogo(valorDeseado))

  return disponibles.find((valorCatalogo) => {
    const valorFormateado = normalizarTextoAsistente(formatearValorCatalogo(valorCatalogo))
    const valorCrudo = normalizarTextoAsistente(valorCatalogo)
    return valorFormateado === normalizado || valorCrudo === normalizado
  }) || valorDeseado
}

export const resolverSeleccionAsistente = (texto, seleccionesCatalogo = []) => {
  const consulta = normalizarTextoAsistente(texto)
  const seleccion = SELECCIONES_DISPONIBLES_ASISTENTE.find((item) =>
    item.alias.some((alias) => consulta.includes(normalizarTextoAsistente(alias))),
  )

  return seleccion
    ? { ...seleccion, valor: resolverValorDesdeCatalogo(seleccion.valor, seleccionesCatalogo) }
    : null
}

const resolverCategoriaAsistente = (texto, categoriasCatalogo = []) => {
  if (!texto) return null

  const consulta = normalizarTextoAsistente(texto)
  const categoria = CATEGORIAS_ASISTENTE.find((item) =>
    item.alias.some((alias) => consulta.includes(normalizarTextoAsistente(alias))) ||
    normalizarTextoAsistente(item.valor) === consulta,
  )

  return resolverValorDesdeCatalogo(categoria?.valor || texto, categoriasCatalogo)
}

export const resolverFiltrosDesdeAccion = (accion, { categorias = [], selecciones = [] }) => {
  const filtro = accion?.filtro || {}
  const categoriasFinales = [...new Set([...normalizarLista(filtro.categoria), ...normalizarLista(filtro.categorias)]
    .map((categoria) => resolverCategoriaAsistente(categoria, categorias))
    .filter(Boolean))]
  const seleccionesFinales = [...new Set([...normalizarLista(filtro.seleccion), ...normalizarLista(filtro.selecciones)]
    .map((seleccion) => resolverSeleccionAsistente(seleccion, selecciones)?.valor)
    .filter(Boolean))]
  const soloFiguritas = categoriasFinales.length === 1 && normalizarTextoAsistente(categoriasFinales[0]) === 'figuritas'

  return {
    categorias: seleccionesFinales.length > 0 && soloFiguritas ? [] : categoriasFinales,
    selecciones: seleccionesFinales,
    nombre: filtro.nombre || '',
    precioMin: filtro.min ?? null,
    precioMax: filtro.max ?? null,
  }
}

export const crearAccionFiltro = ({ texto, categoria, seleccion }) => ({
  texto,
  tipo: 'aplicarFiltro',
  filtro: { categoria, seleccion },
})
