export const ACCIONES_RAPIDAS_ASISTENTE = [
  { id: 'empezar', texto: 'Quiero empezar mi colección' },
  { id: 'buscar-seleccion', texto: 'Buscar figuritas por selección' },
  { id: 'elegir', texto: 'No sé qué elegir' },
  { id: 'completar', texto: 'Completar mi colección' },
  { id: 'carrito', texto: 'Ayuda con el carrito' },
  { id: 'pedidos', texto: 'Dónde veo mis pedidos' },
]

export const SELECCIONES_DISPONIBLES_ASISTENTE = [
  { etiqueta: 'Argentina', valor: 'ARGENTINA', alias: ['argentina'] },
  { etiqueta: 'Alemania', valor: 'ALEMANIA', alias: ['alemania'] },
  { etiqueta: 'Brasil', valor: 'BRASIL', alias: ['brasil'] },
  { etiqueta: 'Colombia', valor: 'COLOMBIA', alias: ['colombia'] },
  { etiqueta: 'Croacia', valor: 'CROACIA', alias: ['croacia'] },
  { etiqueta: 'España', valor: 'ESPAÑA', alias: ['espana', 'españa'] },
  { etiqueta: 'Francia', valor: 'FRANCIA', alias: ['francia'] },
  { etiqueta: 'Holanda', valor: 'HOLANDA', alias: ['holanda', 'paises bajos', 'países bajos'] },
  { etiqueta: 'Inglaterra', valor: 'INGLATERRA', alias: ['inglaterra'] },
  { etiqueta: 'Noruega', valor: 'NORUEGA', alias: ['noruega'] },
  { etiqueta: 'Portugal', valor: 'PORTUGAL', alias: ['portugal'] },
]

export const TEXTO_SELECCIONES_DISPONIBLES = SELECCIONES_DISPONIBLES_ASISTENTE
  .map((seleccion) => seleccion.etiqueta)
  .join(', ')

export const ACCIONES_INICIO_COLECCION = [
  {
    texto: 'Mostrar álbumes',
    tipo: 'aplicarFiltro',
    filtro: { categoria: 'ALBUMES' },
  },
  {
    texto: 'Mostrar sobres',
    tipo: 'aplicarFiltro',
    filtro: { categoria: 'SOBRES' },
  },
  {
    texto: 'Mostrar combos',
    tipo: 'aplicarFiltro',
    filtro: { categoria: 'COMBOS' },
  },
]

export const ACCIONES_COMPLETAR_SIN_CARRITO = [
  {
    texto: 'Buscar por selección',
    tipo: 'abrirFlujo',
    flujo: 'seleccion',
  },
]
