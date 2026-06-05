export const actualizarOpcionesProducto = (producto, categorias, selecciones) => ({
  ...producto,
  categoria: categorias.some((categoria) => categoria.valor === producto.categoria)
    ? producto.categoria
    : categorias[0]?.valor || producto.categoria,
  seleccion: selecciones.some((seleccion) => seleccion.valor === producto.seleccion)
    ? producto.seleccion
    : selecciones[0]?.valor || producto.seleccion,
})
