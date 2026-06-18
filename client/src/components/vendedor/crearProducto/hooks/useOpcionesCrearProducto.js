import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { normalizarOpciones } from '../datos/reglasCrearProducto'
import { fetchCategorias, fetchSelecciones } from '../../../../redux/catalogoSlice'

export const useOpcionesCrearProducto = () => {
  const dispatch = useDispatch()
  const categoriasOriginales = useSelector((state) => state.productos.categorias)
  const seleccionesOriginales = useSelector((state) => state.productos.selecciones)
  const categorias = useMemo(() => normalizarOpciones(categoriasOriginales), [categoriasOriginales])
  const selecciones = useMemo(() => normalizarOpciones(seleccionesOriginales), [seleccionesOriginales])

  useEffect(() => {
    if (categoriasOriginales.length === 0) dispatch(fetchCategorias())
    if (seleccionesOriginales.length === 0) dispatch(fetchSelecciones())
  }, [categoriasOriginales.length, dispatch, seleccionesOriginales.length])

  return { categorias, selecciones }
}
