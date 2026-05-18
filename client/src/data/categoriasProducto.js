export const categoriasProducto = [
  { valor: 'FIGURITAS', etiqueta: 'Figuritas' },
  { valor: 'ALBUNES', etiqueta: 'Álbumes' },
  { valor: 'COMBOS', etiqueta: 'Combos' },
]

export const valoresCategoriasProducto = categoriasProducto.map((categoria) => categoria.valor)

export const obtenerEtiquetaCategoria = (valor) =>
  categoriasProducto.find((categoria) => categoria.valor === valor)?.etiqueta || valor
