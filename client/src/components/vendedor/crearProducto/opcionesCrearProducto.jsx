import { normalizarOpciones } from './reglasCrearProducto'

export const cargarOpcionesProducto = (setCategorias, setSelecciones, setProducto) => {
  let sigueActivo = true

  Promise.all([fetch('/categorias'), fetch('/selecciones')])
    .then(async ([respuestaCategorias, respuestaSelecciones]) => {
      const jsonCategorias = await respuestaCategorias.json()
      const jsonSelecciones = await respuestaSelecciones.json()
      if (!sigueActivo) return

      const categorias = normalizarOpciones(jsonCategorias.data)
      const selecciones = normalizarOpciones(jsonSelecciones.data)
      setCategorias(categorias)
      setSelecciones(selecciones)
      setProducto((actual) => actualizarOpcionesProducto(actual, categorias, selecciones))
    })
    .catch(() => {
      if (!sigueActivo) return
      setCategorias([])
      setSelecciones([])
    })

  return () => {
    sigueActivo = false
  }
}

const actualizarOpcionesProducto = (producto, categorias, selecciones) => ({
  ...producto,
  categoria: categorias.some((categoria) => categoria.valor === producto.categoria)
    ? producto.categoria
    : categorias[0]?.valor || producto.categoria,
  seleccion: selecciones.some((seleccion) => seleccion.valor === producto.seleccion)
    ? producto.seleccion
    : selecciones[0]?.valor || producto.seleccion,
})
